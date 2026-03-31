import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const P = {
  navy:  "#18181b",
  royal: "#27272a",
  ocean: "#3f3f46",
  sky:   "#e4e4e7",
  mist:  "#f4f4f5",
  white: "#ffffff",
  muted: "#71717a",
  mistBg:"#fafafa",
  font:  "'DM Sans', 'Inter', sans-serif",
  fontHeading: "'Barlow Condensed', 'Inter', sans-serif",
  accent: "#f43f5e"
};

const STATS = [
  { label:"Total Users",    value:"—",  color:P.ocean,
    icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
  { label:"Total Vendors",  value:"—",  color:P.royal,
    icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
  { label:"Total Products", value:"—",  color:"#0ea5e9",
    icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
  { label:"Total Revenue",  value:"Rs. —", color:P.sky,
    icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
];

const MOCK_USERS = [
  { name:"Alice Sharma",  email:"alice@example.com",  role:"user",   status:"Active",    joined:"Mar 1, 2026" },
  { name:"Bob Thapa",     email:"bob@example.com",    role:"vendor", status:"Active",    joined:"Feb 28, 2026" },
  { name:"Carol Magar",   email:"carol@example.com",  role:"user",   status:"Active",    joined:"Feb 20, 2026" },
  { name:"Dev Karki",     email:"dev@example.com",    role:"vendor", status:"Suspended", joined:"Feb 15, 2026" },
  { name:"Eve Rai",       email:"eve@example.com",    role:"user",   status:"Active",    joined:"Feb 10, 2026" },
];

const ROLE_STYLE = {
  user:   { bg:P.mistBg,  border:P.sky,  text:P.muted },
  vendor: { bg:"#fff1f2", border:"#ffe4e6", text:P.accent },
  admin:  { bg:"#f8fafc", border:"#e2e8f0", text:P.navy },
};

const STATUS_STYLE = {
  Active:    { bg:"#f0fdf4", border:"#bbf7d0", text:"#16a34a" },
  Suspended: { bg:"#fef2f2", border:"#fecaca", text:"#ef4444" },
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
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ users: 0, vendors: 0, products: 0, revenue: 0 });
  
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
          setStats(prev => ({ ...prev, products: productsRes.data.length }));
        }

        if (ordersRes.success && ordersRes.data) {
          const rev = ordersRes.data.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
          setStats(prev => ({ ...prev, revenue: rev }));
        }

      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      }
    };
    fetchAllData();
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

  return (
    <div style={{ minHeight:"100vh", display:"flex", background:P.mistBg, fontFamily:P.font }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ 
        width: sidebarOpen ? 220 : 0, 
        flexShrink: 0, 
        display: "flex", 
        flexDirection: "column", 
        height: "100vh", 
        position: "sticky", 
        top: 0, 
        background: P.white, 
        borderRight: sidebarOpen ? `1px solid ${P.mist}` : "none",
        transition: "width .32s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden"
      }}>

        {/* Logo */}
        <div style={{ padding:"0 22px", borderBottom:`1px solid ${P.mist}`, display:"flex", alignItems:"center", gap:10, flexShrink:0, height:80, whiteSpace: "nowrap" }}>
          <img src="/logo.png" alt="Logo" style={{ height: 40, width: "auto" }} />
          <span style={{ fontSize:20, fontWeight:900, color:P.navy, letterSpacing:"-0.02em", fontFamily: "'Barlow Condensed', sans-serif" }}>
            HamroMobile<span style={{ color:"#f43f5e" }}>Hub</span>
          </span>
        </div>



        {/* Nav */}
        <nav style={{ flex:1, padding:"24px 12px", display:"flex", flexDirection:"column", gap:6, overflowY:"auto" }}>
          <p style={{ fontSize:10, fontWeight:800, color:P.muted, letterSpacing:"0.1em", textTransform:"uppercase", padding:"0 12px", marginBottom:4 }}>Menu</p>
          {NAV.map(item => {
            const active = activeNav === item.id;
            return (
              <button key={item.id} onClick={()=>setActiveNav(item.id)}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, fontSize:13, fontWeight:700, cursor:"pointer", border:"none", textAlign:"left", transition:"all 0.2s", fontFamily:P.font,
                  background: active ? P.navy : "transparent",
                  color: active ? P.white : P.muted,
                }}
                onMouseEnter={e=>{ if(!active){ e.currentTarget.style.background=P.mistBg; e.currentTarget.style.color=P.navy; }}}
                onMouseLeave={e=>{ if(!active){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=P.muted; }}}>
                <span style={{ color: active ? P.white : P.muted, flexShrink:0 }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding:"16px 12px", borderTop:`1px solid ${P.mist}` }}>
          <button onClick={handleLogout}
            style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, fontSize:13, fontWeight:700, cursor:"pointer", background:"transparent", border:"none", color:P.muted, fontFamily:P.font, transition:"all 0.2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.background="#fee2e2"; e.currentTarget.style.color="#ef4444"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=P.muted; }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

        {/* Topbar */}
        <header style={{ height:56, display:"flex", alignItems:"center", gap:16, padding:"0 24px", flexShrink:0, position:"sticky", top:0, zIndex:20, background:"rgba(0,15,40,0.88)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(40, 43, 74, 0.1)" }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ 
              width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(212, 210, 195, 0.2)", 
              background: "rgba(255,255,255,0.05)", color: P.white, cursor: "pointer", 
              display: "flex", alignItems: "center", justifyContent: "center" 
            }}
          >
            {sidebarOpen ? (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
          
          <h1 style={{ color:P.white, fontWeight:900, fontSize:15, margin:0, textTransform:"capitalize", flex:1 }}>
            {NAV.find(n=>n.id===activeNav)?.label || "Overview"}
          </h1>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:12, fontWeight:800, padding:"4px 12px", borderRadius:999, background:"rgba(40, 43, 74, 0.15)", border:`1px solid rgba(40, 43, 74, 0.3)`, color:P.sky, letterSpacing:"0.05em", display:"flex", alignItems:"center", gap:6 }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              Admin
            </span>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, padding:"28px 32px", overflowY:"auto" }}>

          {/* ── OVERVIEW ── */}
          {activeNav === "overview" && (
            <div style={{ display:"flex", flexDirection:"column", gap:28 }}>

              {/* Welcome banner */}
              <div style={{ position:"relative", borderRadius:20, overflow:"hidden", padding:"32px 36px", background:`linear-gradient(135deg,${P.navy},${P.royal})`, border:`1px solid rgba(40, 43, 74, 0.25)` }}>
                <div style={{ position:"absolute", inset:0, opacity:0.06, backgroundImage:`linear-gradient(rgba(40, 43, 74, 1) 1px,transparent 1px),linear-gradient(90deg,rgba(40, 43, 74, 1) 1px,transparent 1px)`, backgroundSize:"36px 36px" }}/>
                <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(40, 43, 74, 0.15)", filter:"blur(40px)" }}/>
                <div style={{ position:"relative", zIndex:1 }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:6, borderRadius:999, padding:"4px 12px", marginBottom:14, background:"rgba(40, 43, 74, 0.2)", border:`1px solid rgba(40, 43, 74, 0.35)` }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:P.sky, display:"inline-block" }}/>
                    <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.12em", color:P.sky }}>ADMIN DASHBOARD</span>
                  </span>
                  <h2 style={{ color:P.white, fontWeight:900, fontSize:28, margin:"0 0 6px", letterSpacing:"-0.02em" }}>
                    Welcome back, {user?.name?.split(" ")[0] || "Admin"}
                  </h2>
                  <p style={{ color:"rgba(212, 210, 195, 0.6)", fontSize:14, margin:0 }}>You have full administrative access to HamroHub platform.</p>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
                {dynamicStats.map((s,i)=>(
                  <div key={i} style={{ padding:"20px", borderRadius:16, display:"flex", alignItems:"center", gap:16, background:`rgba(0,15,40,0.6)`, border:`1px solid rgba(40, 43, 74, 0.15)`, backdropFilter:"blur(8px)" }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:P.white, boxShadow:"0 4px 14px rgba(40, 43, 74, 0.25)" }}>
                      {s.icon}
                    </div>
                    <div>
                      <p style={{ color:P.white, fontWeight:900, fontSize:22, lineHeight:1, margin:0 }}>{s.value}</p>
                      <p style={{ color:P.muted, fontSize:12, margin:"4px 0 0" }}>{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent users */}
              <div>
                <h2 style={{ color:P.white, fontWeight:900, fontSize:15, margin:"0 0 16px" }}>Recent Users</h2>
                <UsersTable users={users.slice(0, 5)} onToggleBan={handleToggleBan} onToggleApprove={handleToggleApprove} />
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
              <UsersTable users={users} showActions onToggleBan={handleToggleBan} onToggleApprove={handleToggleApprove} />
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
              <UsersTable users={users.filter(u=>u.role==="vendor")} showActions onToggleBan={handleToggleBan} onToggleApprove={handleToggleApprove} />
            </div>
          )}

          {/* ── PLACEHOLDER TABS ── */}
          {["products","orders"].includes(activeNav) && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"40vh", textAlign:"center" }}>
              <div style={{ width:64, height:64, borderRadius:18, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, boxShadow:"0 8px 24px rgba(40, 43, 74, 0.3)", color:P.white }}>
                {NAV.find(n=>n.id===activeNav)?.icon}
              </div>
              <h2 style={{ color:P.white, fontWeight:900, fontSize:20, margin:"0 0 8px" }}>{NAV.find(n=>n.id===activeNav)?.label}</h2>
              <p style={{ color:P.muted, fontSize:14, margin:0 }}>This section is coming soon.</p>
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

        </main>
      </div>
    </div>
  );
}

// ─── Users Table ─────────────────────────────────────────────────────────────
function UsersTable({ users, showActions = false, onToggleBan, onToggleApprove }) {
  const cols = showActions ? "1.5fr 1.8fr 1fr 0.8fr 1fr 1.2fr 1fr 1.2fr" : "1.8fr 2fr 1.2fr 1fr 1fr 1.5fr 1.8fr";
  return (
    <div style={{ borderRadius:16, overflow:"hidden", background:P.white, border:`1px solid ${P.mist}`, boxShadow:"0 2px 12px rgba(24,24,27,0.03)" }}>
      {/* Header row */}
      <div style={{ display:"grid", gridTemplateColumns:cols, padding:"10px 20px", color:P.muted, fontSize:10, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", borderBottom:`1px solid ${P.mist}`, background:P.mistBg }}>
        <span>Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Role</span>
        <span>Status</span>
        <span>Joined</span>
        <span style={{ paddingLeft: 10 }}>Address</span>
        {showActions && <span>Actions</span>}
      </div>

      {users.map((u,i)=>{
        const rs = ROLE_STYLE[u.role] || ROLE_STYLE.user;
        const ss = STATUS_STYLE[u.status] || STATUS_STYLE.Active;
        
        let customStatusUI = (
          <span style={{ fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:999, display:"inline-block", background:ss.bg, border:`1px solid ${ss.border}`, color:ss.text }}>
            {u.status}
          </span>
        );
        
        if (u.role === "vendor" && !u.isApproved) {
            customStatusUI = (
                <span style={{ fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:999, display:"inline-block", background:"#fefce8", border:"1px solid #fef08a", color:"#eab308" }}>
                  Pending
                </span>
            );
        }

        return (
          <div key={i} style={{ display:"grid", gridTemplateColumns:cols, alignItems:"center", padding:"12px 20px", borderBottom: i < users.length-1 ? `1px solid ${P.mist}` : "none", transition:"background 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.background=P.mistBg}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>

            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:P.mistBg, border:`1px solid ${P.mist}`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13, color:P.navy, flexShrink:0 }}>
                {u.name?.charAt(0) || "U"}
              </div>
              <span style={{ color:P.navy, fontWeight:600, fontSize:13 }}>{u.name || "Unknown"}</span>
            </div>

            <span style={{ color:P.muted, fontSize:13 }}>{u.email}</span>
            <span style={{ color:P.navy, fontSize:12, fontWeight: 700 }}>{u.phone}</span>

            <span style={{ fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:999, display:"inline-block", background:rs.bg, border:`1px solid ${rs.border}`, color:rs.text, textAlign: "center" }}>
              {u.role}
            </span>

            {customStatusUI}

            <span style={{ color:P.muted, fontSize:12 }}>{u.joined}</span>

            <span style={{ color:P.muted, fontSize:12, paddingLeft: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={u.address}>
               {u.address}
            </span>

            {showActions && (
              <div style={{ display:"flex", gap:6 }}>
                {u.role === "vendor" && (
                  <button onClick={() => onToggleApprove(u.id, u.isApproved)}
                    style={{ fontSize:10, fontWeight:700, padding:"4px 10px", borderRadius:8, background: u.isApproved ? "#fef2f2" : "#f0fdf4", border: u.isApproved ? "1px solid #fecaca" : "1px solid #bbf7d0", color: u.isApproved ? "#ef4444" : "#16a34a", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
                    {u.isApproved ? "Revoke" : "Approve"}
                  </button>
                )}
                <button onClick={() => onToggleBan(u.id, u.status)}
                  style={{ fontSize:10, fontWeight:700, padding:"4px 10px", borderRadius:8, background:"#fef2f2", border:"1px solid #fecaca", color:"#ef4444", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="#fee2e2"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="#fef2f2"; }}>
                  {u.status === "Active" ? "Ban" : "Unban"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}