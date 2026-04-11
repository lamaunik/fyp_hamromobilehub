import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { P } from "../components/dashboard/DashboardConstants";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar  from "../components/admin/AdminTopbar";



const ROLE_STYLE = {
  user:   { bg: "#f4f4f5", border: "#e4e4e7", text: "#71717a" },
  vendor: { bg: "#fff1f2", border: "#fecdd3", text: "#f43f5e" },
  admin:  { bg: "#f0f9ff", border: "#bae6fd", text: "#0369a1" },
};

const STATUS_STYLE = {
  Active:    { bg: "#f0fdf4", border: "#bbf7d0", text: "#16a34a" },
  Suspended: { bg: "#fef2f2", border: "#fecaca", text: "#ef4444" },
};

const NAV = [
  { id:"overview", label:"Overview",
    icon:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> },
  { id:"users",    label:"Users",
    icon:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
  { id:"vendors",  label:"Vendors",
    icon:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
  { id:"products", label:"Products",
    icon:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
  { id:"orders",   label:"Orders",
    icon:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg> },
  { id:"settings", label:"Settings",
    icon:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { tab: urlTab } = useParams();
  const activeNav = urlTab || "overview";
  
  const setActiveNav = (t) => {
    navigate(`/admin/dashboard/${t}`);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ users: 0, vendors: 0, products: 0, revenue: 0 });
  const [kycReviewData, setKycReviewData] = useState(null); 
  
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { api } = await import("../utils/api");
        // Parallel fetch for overview numbers
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          api.get("/users"),
          api.get("/products"),
          api.get("/orders")
        ]);

        if (usersRes.success && usersRes.data) {
          const mapped = usersRes.data.map(u => ({
            id: u._id,
            name: u.name || "Unknown",
            email: u.email || "No Email",
            phone: u.phone || "—",
            address: u.address || "—",
            role: u.role,
            isApproved: u.isApproved,
            status: u.isDeactivated ? "Suspended" : "Active",
            joined: new Date(u.createdAt).toLocaleDateString()
          }));
          setUsers(mapped);
          
          const vendorsCount = mapped.filter(u => u.role === "vendor").length;
          setStats(prev => ({ ...prev, users: mapped.length, vendors: vendorsCount }));
        }

        if (productsRes.success && productsRes.data) {
          setProducts(productsRes.data);
          setStats(prev => ({ ...prev, products: productsRes.data.length }));
        }
        if (ordersRes.success && ordersRes.data) {
          setOrders(ordersRes.data);
          const rev = ordersRes.data.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
          setStats(prev => ({ ...prev, revenue: rev }));
        }

      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      }
    };
    fetchAllData();
  }, []);

  // Update setUsers to include KYC fields
  useEffect(() => {
    const fetchDetailedUsers = async () => {
      try {
        const { api } = await import("../utils/api");
        const res = await api.get("/users");
        if (res.success && res.data) {
          const mapped = res.data.map(u => ({
            id: u._id,
            name: u.name, email: u.email, phone: u.phone, address: u.address,
            role: u.role, isApproved: u.isApproved, status: u.isDeactivated ? "Suspended" : "Active",
            joined: new Date(u.createdAt).toLocaleDateString(),
            // KYC Fields
            storeName: u.storeName, storePhone: u.storePhone, storeLocation: u.storeLocation,
            panNumber: u.panNumber, panImage: u.panImage, licenseImage: u.licenseImage,
            kycSubmitted: u.kycSubmitted
          }));
          setUsers(mapped);
        }
      } catch (err) { console.error(err); }
    };
    fetchDetailedUsers();
  }, []);

  const handleLogout = () => { logout(); navigate("/signin"); };

  const handleToggleBan = async (userId, currentStatus) => {
    try {
      const { api } = await import("../utils/api");
      const res = await api.put(`/users/${userId}`, { isDeactivated: currentStatus === "Active" });
      if (res.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, status: currentStatus === "Active" ? "Suspended" : "Active" } : u));
      }
    } catch (err) {
      console.error("Failed to toggle ban", err);
    }
  };

  const handleToggleApprove = async (userId, isCurrentlyApproved) => {
    try {
      const { api } = await import("../utils/api");
      const res = await api.put(`/users/${userId}`, { isApproved: !isCurrentlyApproved });
      if (res.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, isApproved: !isCurrentlyApproved } : u));
      }
    } catch (err) {
      console.error("Failed to toggle approval", err);
    }
  };

  const dynamicStats = [
    { label:"Total Users",    value: stats.users,  color:P.ocean,
      icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
    { label:"Total Vendors",  value: stats.vendors,  color:P.royal,
      icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
    { label:"Total Products", value: stats.products,  color:"#0ea5e9",
      icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
    { label:"Total Revenue",  value: `Rs. ${stats.revenue.toLocaleString()}`, color:P.sky,
      icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  ];

  const handleReviewKYC = (vendor) => {
    setKycReviewData(vendor);
  };

  return (
    <div style={{ height: "100vh", display: "flex", background: P.mistBg, fontFamily: P.font, overflow: "hidden" }}>
      <AdminSidebar tab={activeNav} setTab={setActiveNav} open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminTopbar tab={activeNav} onMenu={() => setSidebarOpen(!sidebarOpen)} />
        
        <main style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
          <div style={{ maxWidth: "1600px", margin: "0 auto" }}>

          {/* ── OVERVIEW ── */}
          {activeNav === "overview" && (
            <div style={{ display:"flex", flexDirection:"column", gap:28 }}>

              {/* Hero Welcome Banner */}
              <div style={{
                background: `linear-gradient(135deg, ${P.navy}, ${P.royal})`,
                borderRadius: 28, padding: "48px 56px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
                position: "relative", overflow: "hidden"
              }}>
                <div style={{ position: "absolute", top: -40, right: -20, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.03)", filter: "blur(60px)" }} />
                
                <div style={{ flex: 1, position: "relative" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 12, padding: "6px 14px", marginBottom: 20,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: P.accent }} />
                    <span style={{ color: P.white, fontSize: 10, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                      System Authority Center
                    </span>
                  </div>
                  <h2 style={{ color: P.white, fontWeight: 900, fontSize: 36, margin: "0 0 12px", fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>
                    Welcome, {user?.name?.split(" ")[0] || "Administrator"}
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, maxWidth: 520, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                    Platform synchronization complete. You have full oversight of users, inventory, and fiscal trajectories.
                  </p>
                </div>
                
                <div style={{
                  width: 90, height: 90, borderRadius: 24, flexShrink: 0,
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}>
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>

              {/* KPI Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
                {dynamicStats.map((s, i) => (
                  <div key={i} style={{
                    background: P.white, border: `1px solid ${P.mist}`,
                    borderRadius: 28, padding: 24, cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = P.accent; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.02)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = P.mist; }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 16, color: P.navy
                    }}>
                      {s.icon}
                    </div>
                    <p style={{ color: P.navy, fontWeight: 900, fontSize: 28, margin: "0 0 2px", fontFamily: P.fontHeading, letterSpacing: "-0.5px" }}>{s.value}</p>
                    <p style={{ color: P.muted, fontSize: 11, fontWeight: 800, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity / Table */}
              <div style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 28, padding: 32, boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
                <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 18, margin: "0 0 20px", fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>System Integrity: Recent Users</h2>
                <UsersTable 
                  users={users.filter(u => u.role !== "vendor" || u.kycSubmitted).slice(0, 5)} 
                  onToggleBan={handleToggleBan} 
                  onToggleApprove={handleToggleApprove} 
                  onReview={handleReviewKYC} 
                />
              </div>
            </div>
          )}

          {/* ── USERS ── */}
          {activeNav === "users" && (
            <div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
                <div>
                  <h2 style={{ color:P.white, fontWeight:900, fontSize:20, margin:0 }}>All Users</h2>
                  <p style={{ color:P.muted, fontSize:12, margin:"4px 0 0" }}>Manage platform users and their roles</p>
                </div>
                <button style={{ padding:"9px 20px", borderRadius:12, fontSize:13, fontWeight:700, color:P.white, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, border:"none", cursor:"pointer", fontFamily:P.font, boxShadow:"0 4px 14px rgba(40, 43, 74, 0.3)" }}>
                  + Invite User
                </button>
              </div>
              <UsersTable users={users} showActions onToggleBan={handleToggleBan} onToggleApprove={handleToggleApprove} onReview={handleReviewKYC} />
            </div>
          )}

          {/* ── VENDORS ── */}
          {activeNav === "vendors" && (
            <div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
                <div>
                  <h2 style={{ color:P.white, fontWeight:900, fontSize:20, margin:0 }}>Vendors</h2>
                  <p style={{ color:P.muted, fontSize:12, margin:"4px 0 0" }}>Approve, suspend or manage vendor accounts</p>
                </div>
              </div>
              <UsersTable 
                users={users.filter(u => u.role === "vendor" && (u.kycSubmitted || u.isApproved))} 
                showActions 
                onToggleBan={handleToggleBan} 
                onToggleApprove={handleToggleApprove} 
                onReview={handleReviewKYC} 
              />
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {activeNav === "products" && (
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <h2 style={{ color:P.navy, fontWeight:900, fontSize:24, fontFamily:P.fontHeading }}>Products Authority</h2>
                  <p style={{ color:P.muted, fontSize:14 }}>Manage every listed product across the marketplace.</p>
                </div>
              </div>
              <ProductsTable 
                products={products} 
                onDelete={async (id) => {
                  if(!window.confirm("Permanent removal of product #"+id.substr(-6)+"?")) return;
                  try {
                    const { api } = await import("../utils/api");
                    const res = await api.delete(`/products/${id}`);
                    if(res.success) setProducts(prev => prev.filter(p => p._id !== id));
                  } catch(e) { console.error(e); }
                }} 
              />
            </div>
          )}
 
          {/* ── ORDERS ── */}
          {activeNav === "orders" && (
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <h2 style={{ color:P.navy, fontWeight:900, fontSize:24, fontFamily:P.fontHeading }}>Fulfillment Oversight</h2>
                  <p style={{ color:P.muted, fontSize:14 }}>Track every transaction and override order states.</p>
                </div>
              </div>
              <OrdersTable 
                orders={orders}
                onUpdateStatus={async (id) => {
                  try {
                    const { api } = await import("../utils/api");
                    const res = await api.put(`/orders/${id}/deliver`);
                    if(res.success) setOrders(prev => prev.map(o => o._id === id ? { ...o, isDelivered: true, paymentStatus: "Delivered" } : o));
                  } catch(e) { console.error(e); }
                }}
                onDelete={async (id) => {
                  if(!window.confirm("Archive transaction #"+id.substr(-6)+"?")) return;
                  try {
                    const { api } = await import("../utils/api");
                    const res = await api.delete(`/orders/${id}`);
                    if(res.success) setOrders(prev => prev.filter(o => o._id !== id));
                  } catch(e) { console.error(e); }
                }} 
              />
            </div>
          )}

          {/* ── SETTINGS ── */}
          {activeNav === "settings" && (
            <div style={{ display:"flex", flexDirection:"column", gap:24, maxWidth: 800 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <h2 style={{ color:P.navy, fontWeight:900, fontSize:24, margin:"0 0 8px", fontFamily:P.fontHeading, letterSpacing:"0.5px" }}>Settings</h2>
                  <p style={{ color:P.muted, fontSize:14, margin:0 }}>Manage your platform preferences and admin account details.</p>
                </div>
                <button
                  style={{
                    display:"inline-flex", alignItems:"center", gap:8,
                    background:P.navy, color:P.white, fontWeight:700, fontSize:14, fontFamily:P.font,
                    padding:"12px 24px", borderRadius:12, border:"none", cursor:"pointer",
                    boxShadow:"0 4px 12px rgba(24,24,27,0.08)", transition:"all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; }}
                >
                  Save Changes
                </button>
              </div>

              <div style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(24,24,27,0.03)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24, paddingBottom:16, borderBottom:`1px solid ${P.mist}` }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:P.mistBg, border:`1px solid ${P.mist}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={P.navy} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div>
                    <h3 style={{ color:P.navy, fontWeight:800, fontSize:16, margin:0 }}>Admin Profile</h3>
                    <p style={{ color:P.muted, fontSize:13, margin:0 }}>Update your administrative details.</p>
                  </div>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display:"block", color:P.navy, fontSize:13, fontWeight:700, marginBottom:8 }}>Full Name</label>
                    <input defaultValue={user?.name || ""} placeholder="Admin Name" style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:`1px solid ${P.mist}`, background:P.mistBg, color:P.navy, fontSize:14, outline:"none", boxSizing:"border-box" }} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display:"block", color:P.navy, fontSize:13, fontWeight:700, marginBottom:8 }}>Email Address</label>
                    <input defaultValue={user?.email || ""} placeholder="admin@example.com" type="email" style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:`1px solid ${P.mist}`, background:P.mistBg, color:P.navy, fontSize:14, outline:"none", boxSizing:"border-box" }} />
                  </div>
                </div>
              </div>

              <div style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(24,24,27,0.03)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16, paddingBottom:16, borderBottom:`1px solid ${P.mist}` }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:P.mistBg, border:`1px solid ${P.mist}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={P.navy} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  </div>
                  <div>
                    <h3 style={{ color:P.navy, fontWeight:800, fontSize:16, margin:0 }}>Platform Notifications</h3>
                    <p style={{ color:P.muted, fontSize:13, margin:0 }}>Control your administrative alerts.</p>
                  </div>
                </div>

                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 0" }}>
                  <div>
                    <span style={{ display:"block", color:P.navy, fontSize:14, fontWeight:700, marginBottom:4 }}>New Vendor Approvals</span>
                    <span style={{ display:"block", color:P.muted, fontSize:13 }}>Get notified when a new vendor applies for an account.</span>
                  </div>
                  <label style={{ position:"relative", display:"inline-block", width:44, height:24, flexShrink:0 }}>
                    <input type="checkbox" defaultChecked style={{ opacity:0, width:0, height:0 }} />
                    <span style={{ position:"absolute", cursor:"pointer", top:0, left:0, right:0, bottom:0, backgroundColor:P.accent, borderRadius:34 }}>
                      <span style={{ position:"absolute", height:18, width:18, left:3, bottom:3, backgroundColor:"white", borderRadius:"50%", transform:"translateX(20px)", transition:".3s", boxShadow:"0 2px 4px rgba(0,0,0,0.2)" }} />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          </div>
        </main>
      </div>

      {/* KYC Review Modal */}
      {kycReviewData && (
        <KYCReviewModal 
          vendor={kycReviewData} 
          onClose={() => setKycReviewData(null)} 
          onApprove={() => {
            handleToggleApprove(kycReviewData.id, false);
            setKycReviewData(null);
          }} 
        />
      )}
    </div>
  );
}

function KYCReviewModal({ vendor, onClose, onApprove }) {
  const [viewImg, setViewImg] = useState(null);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", padding: 20
    }}>
      <div style={{
        maxWidth: 900, width: "100%", background: P.white, borderRadius: 24,
        overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "90vh",
        boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
      }}>
        {/* Header */}
        <div style={{ padding: "20px 32px", borderBottom: `1px solid ${P.mist}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ color: P.navy, fontSize: 20, fontWeight: 900, margin: 0, fontFamily: P.fontHeading }}>KYC Review: {vendor.storeName || vendor.name}</h2>
            <p style={{ color: P.muted, fontSize: 12, margin: 0 }}>Review legal documents and business details</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: P.navy }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 32, overflowY: "auto", flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {/* Left: Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <h4 style={{ textTransform: "uppercase", fontSize: 11, fontWeight: 900, color: P.muted, letterSpacing: "1px", marginBottom: 8 }}>Store Information</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{vendor.storeName}</p>
                  <p style={{ margin: 0, fontSize: 13, color: P.muted }}>Location: {vendor.storeLocation}</p>
                  <p style={{ margin: 0, fontSize: 13, color: P.muted }}>Contact: {vendor.storePhone}</p>
                </div>
              </div>

              <div>
                <h4 style={{ textTransform: "uppercase", fontSize: 11, fontWeight: 900, color: P.muted, letterSpacing: "1px", marginBottom: 8 }}>Legal Details</h4>
                <div style={{ background: P.mistBg, padding: 16, borderRadius: 12, border: `1px solid ${P.mist}` }}>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 900, color: P.navy }}>PAN: {vendor.panNumber || "Not Provided"}</p>
                </div>
              </div>

              <div style={{ marginTop: "auto", padding: "20px", background: "#f0fdf4", borderRadius: 16, border: "1px solid #bbf7d0" }}>
                 <p style={{ margin:0, fontSize: 13, color: "#166534", lineHeight: 1.5, fontWeight: 500 }}>
                   Ensure that the PAN image matches the provided name and number before approving.
                 </p>
              </div>
            </div>

            {/* Right: Documents */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h4 style={{ textTransform: "uppercase", fontSize: 11, fontWeight: 900, color: P.muted, letterSpacing: "1px", margin: 0 }}>Documents</h4>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div 
                  onClick={() => setViewImg(vendor.panImage)}
                  style={{ cursor:"pointer", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3", background: P.mistBg, border: `1px solid ${P.mist}`, position:"relative" }}>
                  {vendor.panImage ? (
                    <img src={vendor.panImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: P.muted }}>No PAN Image</div>
                  )}
                  <div style={{ position:"absolute", bottom:0, background: "rgba(0,0,0,0.6)", color: "white", width: "100%", padding: 6, fontSize: 10, textAlign: "center" }}>PAN DOCUMENT</div>
                </div>

                <div 
                  onClick={() => setViewImg(vendor.licenseImage)}
                  style={{ cursor:"pointer", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3", background: P.mistBg, border: `1px solid ${P.mist}`, position:"relative" }}>
                  {vendor.licenseImage ? (
                    <img src={vendor.licenseImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: P.muted }}>No License Image</div>
                  )}
                  <div style={{ position:"absolute", bottom:0, background: "rgba(0,0,0,0.6)", color: "white", width: "100%", padding: 6, fontSize: 10, textAlign: "center" }}>BUSINESS LICENSE</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "24px 32px", borderTop: `1px solid ${P.mist}`, background: P.mistBg, display: "flex", gap: 16, justifyContent: "flex-end" }}>
           <button onClick={onClose} style={{ padding: "12px 24px", borderRadius: 12, border: "none", background: "none", color: P.muted, fontWeight: 800, cursor: "pointer" }}>Close</button>
           <button 
             onClick={onApprove}
             style={{ 
               padding: "12px 32px", borderRadius: 12, border: "none", background: P.navy, color: P.white, 
               fontWeight: 900, cursor: "pointer", transition: "transform 0.2s" 
             }}
             onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
             onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
           >
             Verified & Approve Vendor
           </button>
        </div>
      </div>

      {/* Fullscreen Preview */}
      {viewImg && (
        <div 
          onClick={() => setViewImg(null)}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: 40, cursor: "zoom-out" }}>
          <img src={viewImg} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8 }} />
          <button style={{ position:"absolute", top: 30, right: 30, background: "none", border: "none", color: "white", cursor: "pointer" }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Users Table ─────────────────────────────────────────────────────────────
function UsersTable({ users, showActions = false, onToggleBan, onToggleApprove, onReview }) {
  const cols = showActions ? "1.5fr 1.8fr 1fr 0.8fr 1fr 1.2fr 1fr 1.4fr" : "1.8fr 2fr 1.2fr 1.2fr 1.2fr 1.5fr 1.8fr";
  return (
    <div style={{ borderRadius: 24, overflow: "hidden", background: P.white, border: `1px solid ${P.mist}`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
      {/* Header row */}
      <div style={{ display: "grid", gridTemplateColumns: cols, padding: "14px 24px", color: P.muted, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: `1px solid ${P.mist}`, background: P.mistBg }}>
        <span>Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Role</span>
        <span>Status</span>
        <span>Joined</span>
        <span>Address</span>
        {showActions && <span>Actions</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {users.length > 0 ? users.map((u, i) => {
          const rs = ROLE_STYLE[u.role] || ROLE_STYLE.user;
          const ss = STATUS_STYLE[u.status] || STATUS_STYLE.Active;
          
          let customStatusUI = (
            <span style={{ fontSize: 11, fontWeight: 750, padding: "4px 10px", borderRadius: 8, display: "inline-block", background: ss.bg, border: `1px solid ${ss.border}`, color: ss.text }}>
              {u.status}
            </span>
          );
          
          if (u.role === "vendor" && !u.isApproved) {
            customStatusUI = (
              <span style={{ fontSize: 11, fontWeight: 750, padding: "4px 10px", borderRadius: 8, display: "inline-block", background: "#fffbeb", border: "1px solid #fde68a", color: "#d97706" }}>
                Pending
              </span>
            );
          }

          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: cols, alignItems: "center", padding: "16px 24px", borderBottom: i < users.length - 1 ? `1px solid ${P.mist}` : "none", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = P.mistBg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: P.mistBg, border: `1px solid ${P.mist}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: P.navy, flexShrink: 0 }}>
                  {u.name?.charAt(0) || "U"}
                </div>
                <span style={{ color: P.navy, fontWeight: 750, fontSize: 14 }}>{u.name || "Unknown"}</span>
              </div>

              <span style={{ color: P.muted, fontSize: 13, fontWeight: 500 }}>{u.email}</span>
              <span style={{ color: P.navy, fontSize: 12, fontWeight: 800 }}>{u.phone}</span>

              <div style={{ display: "flex" }}>
                <span style={{ fontSize: 10, fontWeight: 800, padding: "4px 10px", borderRadius: 8, background: rs.bg, border: `1px solid ${rs.border}`, color: rs.text, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {u.role}
                </span>
              </div>

              <div style={{ display: "flex" }}>{customStatusUI}</div>

              <span style={{ color: P.muted, fontSize: 12, fontWeight: 600 }}>{u.joined}</span>

              <span style={{ color: P.muted, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={u.address}>
                {u.address}
              </span>

              {showActions && (
                <div style={{ display: "flex", gap: 8 }}>
                  {u.role === "vendor" && (
                    <>
                      <button onClick={() => onReview(u)} 
                        title="Review KYC"
                        style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, background: P.mistBg, border: `1px solid ${P.mist}`, color: P.navy, cursor: "pointer", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = P.white; e.currentTarget.style.borderColor = P.accent; e.currentTarget.style.color = P.accent; }}
                        onMouseLeave={e => { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.borderColor = P.mist; e.currentTarget.style.color = P.navy; }}
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      </button>
                      <button onClick={() => onToggleApprove(u.id, u.isApproved)}
                        style={{ fontSize: 11, fontWeight: 800, padding: "6px 14px", borderRadius: 10, border: "none", background: u.isApproved ? "#fee2e2" : "#f0fdf4", color: u.isApproved ? "#ef4444" : "#16a34a", cursor: "pointer", transition: "all 0.2s" }}
                      >
                        {u.isApproved ? "Revoke" : "Approve"}
                      </button>
                    </>
                  )}
                  <button onClick={() => onToggleBan(u.id, u.status)}
                    style={{ fontSize: 11, fontWeight: 800, padding: "6px 14px", borderRadius: 10, border: "none", background: "#f4f4f5", color: P.navy, cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#f4f4f5"; e.currentTarget.style.color = P.navy; }}
                  >
                    {u.status === "Active" ? "Ban" : "Unban"}
                  </button>
                </div>
              )}
            </div>
          );
        }) : (
          <div style={{ padding: 40, textAlign: "center", color: P.muted, fontWeight: 600 }}>Zero users registered in directory.</div>
        )}
      </div>
    </div>
  );
}

// ─── Products Table (Admin) ──────────────────────────────────────────────────
function ProductsTable({ products, onDelete }) {
  const cols = "1fr 2fr 1.2fr 1.2fr 1fr 1fr 1.2fr 0.8fr";
  return (
    <div style={{ borderRadius: 24, overflow: "hidden", background: P.white, border: `1px solid ${P.mist}`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
      <div style={{ display: "grid", gridTemplateColumns: cols, padding: "14px 24px", color: P.muted, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: `1px solid ${P.mist}`, background: P.mistBg }}>
        <span>Thumbnail</span>
        <span>Product Name</span>
        <span>Brand</span>
        <span>Category</span>
        <span>Price</span>
        <span>Stock</span>
        <span>Vendor</span>
        <span>Actions</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {products.length > 0 ? products.map((p, i) => (
          <div key={p._id} style={{ display: "grid", gridTemplateColumns: cols, alignItems: "center", padding: "12px 24px", borderBottom: i < products.length - 1 ? `1px solid ${P.mist}` : "none" }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: P.mistBg, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {p.images?.[0] ? <img src={p.images[0].startsWith("http") ? p.images[0] : `http://localhost:5000${p.images[0]}`} style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : "—"}
            </div>
            <span style={{ color: P.navy, fontWeight: 750, fontSize: 13 }}>{p.name}</span>
            <span style={{ color: P.muted, fontSize: 12, fontWeight: 700 }}>{p.brand}</span>
            <span style={{ color: P.muted, fontSize: 12, fontWeight: 600 }}>{p.category}</span>
            <span style={{ color: P.navy, fontWeight: 800, fontSize: 13 }}>Rs. {p.price?.toLocaleString()}</span>
            <span style={{ color: p.stock < 5 ? P.accent : P.muted, fontWeight: 800, fontSize: 12 }}>{p.stock} units</span>
            <span style={{ color: P.ocean, fontWeight: 700, fontSize: 12 }}>{p.vendor?.name || "Official Store"}</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => onDelete(p._id)} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#fee2e2", color: "#ef4444", fontSize: 10, fontWeight: 800, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        )) : <div style={{ padding: 40, textAlign: "center", color: P.muted }}>No products listed.</div>}
      </div>
    </div>
  );
}

// ─── Orders Table (Admin) ────────────────────────────────────────────────────
function OrdersTable({ orders, onUpdateStatus, onDelete }) {
  const cols = "1.2fr 1.8fr 1.5fr 1.5fr 1.2fr 1fr 1fr";
  return (
    <div style={{ borderRadius: 24, overflow: "hidden", background: P.white, border: `1px solid ${P.mist}`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
      <div style={{ display: "grid", gridTemplateColumns: cols, padding: "14px 24px", color: P.muted, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: `1px solid ${P.mist}`, background: P.mistBg }}>
        <span>Reference</span>
        <span>Customer</span>
        <span>Transaction Date</span>
        <span>Total Value</span>
        <span>Payment</span>
        <span>Shipping</span>
        <span>Actions</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {orders.length > 0 ? orders.map((o, i) => (
          <div key={o._id} style={{ display: "grid", gridTemplateColumns: cols, alignItems: "center", padding: "16px 24px", borderBottom: i < orders.length - 1 ? `1px solid ${P.mist}` : "none" }}>
            <span style={{ color: P.accent, fontWeight: 900, fontSize: 12 }}>#{o._id.substr(-8).toUpperCase()}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ color: P.navy, fontWeight: 800, fontSize: 13 }}>{o.user?.name || "Guest User"}</span>
              <span style={{ color: P.muted, fontSize: 11 }}>{o.user?.email}</span>
            </div>
            <span style={{ color: P.muted, fontSize: 12, fontWeight: 600 }}>{new Date(o.createdAt).toLocaleDateString(undefined, { day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })}</span>
            <span style={{ color: P.navy, fontWeight: 950, fontSize: 14 }}>Rs. {o.totalPrice?.toLocaleString()}</span>
            <span style={{ color: o.isPaid ? "#16a34a" : "#d97706", fontSize: 11, fontWeight: 800 }}>{o.paymentStatus}</span>
            <span style={{ color: o.isDelivered ? "#16a34a" : "#4b5563", fontSize: 11, fontWeight: 800 }}>{o.isDelivered ? "Delivered" : "Processing"}</span>
            <div style={{ display: "flex", gap: 8 }}>
              {!o.isDelivered && (
                <button onClick={() => onUpdateStatus(o._id)} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#f0fdf4", color: "#16a34a", fontSize: 10, fontWeight: 800, cursor: "pointer" }}>Mark Delivered</button>
              )}
              <button onClick={() => onDelete(o._id)} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#f4f4f5", color: P.navy, fontSize: 10, fontWeight: 800, cursor: "pointer" }}>Archive</button>
            </div>
          </div>
        )) : <div style={{ padding: 40, textAlign: "center", color: P.muted }}>No orders processed recently.</div>}
      </div>
    </div>
  );
}