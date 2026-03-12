import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const navItems = [
  { id:"home",     label:"Home",
    icon:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> },
  { id:"products", label:"Browse Products",
    icon:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg> },
  { id:"orders",   label:"My Orders",
    icon:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg> },
  { id:"wishlist", label:"Wishlist",
    icon:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg> },
  { id:"cart",     label:"Shopping Cart",
    icon:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg> },
  { id:"profile",  label:"My Profile",
    icon:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> },
];

export default function DashboardSidebar({ activeTab, setActiveTab, sidebarOpen, cartCount }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside style={{
      width: sidebarOpen ? 248 : 0,
      flexShrink: 0,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "sticky",
      top: 0,
      background: P.white,
      borderRight: `1px solid ${P.mist}`,
      boxShadow: "2px 0 16px rgba(0,27,72,0.07)",
      transition: "width 0.3s ease",
      fontFamily: P.font,
    }}>

      {/* Logo */}
      <div style={{ padding:"20px 20px 16px", borderBottom:`1px solid ${P.mist}`, display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
        <div style={{ width:38, height:38, borderRadius:11, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:`0 4px 14px rgba(1,138,190,0.35)` }}>
          <span style={{ color:P.white, fontWeight:900, fontSize:17 }}>M</span>
        </div>
        <span style={{ fontSize:15, fontWeight:900, color:P.navy, whiteSpace:"nowrap", letterSpacing:"-0.01em" }}>
          HamroMobile<span style={{ color:P.ocean }}>Hub</span>
        </span>
      </div>

      {/* User chip */}
      <div style={{ padding:"12px 14px", borderBottom:`1px solid ${P.mist}`, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, background:P.mistBg, borderRadius:14, padding:"10px 12px", border:`1px solid ${P.mist}` }}>
          <div style={{ width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 2px 8px rgba(1,138,190,0.3)" }}>
            <span style={{ color:P.white, fontWeight:900, fontSize:15 }}>{user?.name?.charAt(0).toUpperCase() || "U"}</span>
          </div>
          <div style={{ minWidth:0 }}>
            <p style={{ color:P.navy, fontWeight:700, fontSize:13, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name || "User"}</p>
            <p style={{ color:P.muted, fontSize:11, margin:"2px 0 0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.email || ""}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"10px 10px", display:"flex", flexDirection:"column", gap:3, overflowY:"auto" }}>
        {navItems.map((item) => {
          const active = activeTab === item.id;
          return (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              width:"100%", display:"flex", alignItems:"center", gap:10,
              padding:"10px 12px", borderRadius:12, fontSize:13, fontWeight:600,
              cursor:"pointer", border:"none", textAlign:"left",
              transition:"all 0.15s", fontFamily:P.font, position:"relative",
              background: active ? `linear-gradient(135deg,${P.royal},${P.ocean})` : "transparent",
              color: active ? P.white : P.muted,
              boxShadow: active ? "0 4px 16px rgba(1,138,190,0.28)" : "none",
            }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.color = P.navy; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = P.muted; } }}>
              <span style={{ color: active ? P.white : P.sky, flexShrink:0 }}>{item.icon}</span>
              <span style={{ whiteSpace:"nowrap", flex:1 }}>{item.label}</span>
              {item.id === "cart" && cartCount > 0 && (
                <span style={{ background:"#dc2626", color:P.white, fontSize:10, fontWeight:900, width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {cartCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding:"10px", borderTop:`1px solid ${P.mist}`, flexShrink:0 }}>
        <button onClick={() => { logout(); navigate("/"); }} style={{
          width:"100%", display:"flex", alignItems:"center", gap:10,
          padding:"10px 12px", borderRadius:12, fontSize:13, fontWeight:600,
          cursor:"pointer", background:"transparent", border:"none",
          color:"#dc2626", fontFamily:P.font, transition:"all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,38,38,0.07)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}