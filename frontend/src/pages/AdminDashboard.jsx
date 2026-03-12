import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const STATS = [
  { label:"Total Users",    value:"—",  color:P.ocean,
    icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
  { label:"Total Vendors",  value:"—",  color:P.royal,
    icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
  { label:"Total Products", value:"—",  color:"#0ea5e9",
    icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
  { label:"Total Revenue",  value:"$—", color:P.sky,
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
  user:   { bg:`rgba(1,138,190,0.12)`,  border:`rgba(1,138,190,0.28)`,  text:P.ocean },
  vendor: { bg:`rgba(2,69,122,0.18)`,   border:`rgba(2,69,122,0.35)`,   text:P.sky },
  admin:  { bg:`rgba(0,27,72,0.2)`,     border:`rgba(151,202,219,0.3)`, text:P.mist },
};

const STATUS_STYLE = {
  Active:    { bg:"rgba(34,197,94,0.1)",   border:"rgba(34,197,94,0.25)",  text:"#4ade80" },
  Suspended: { bg:"rgba(220,38,38,0.1)",   border:"rgba(220,38,38,0.25)", text:"#f87171" },
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

  const handleLogout = () => { logout(); navigate("/signin"); };

  return (
    <div style={{ minHeight:"100vh", display:"flex", background:`linear-gradient(160deg,${P.navy} 0%,${P.royal} 100%)`, fontFamily:P.font }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width:220, flexShrink:0, display:"flex", flexDirection:"column", height:"100vh", position:"sticky", top:0, background:"rgba(0,15,40,0.92)", borderRight:`1px solid rgba(1,138,190,0.15)`, backdropFilter:"blur(12px)" }}>

        {/* Logo */}
        <div style={{ padding:"20px 20px 16px", borderBottom:"1px solid rgba(1,138,190,0.1)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 14px rgba(1,138,190,0.35)", flexShrink:0 }}>
              <span style={{ color:P.white, fontWeight:900, fontSize:16 }}>A</span>
            </div>
            <div>
              <p style={{ color:P.white, fontWeight:900, fontSize:13, lineHeight:1, margin:0 }}>HamroMobile Hub</p>
              <p style={{ color:P.sky, fontSize:9, fontWeight:800, letterSpacing:"0.12em", marginTop:3 }}>ADMIN PANEL</p>
            </div>
          </div>
        </div>

        {/* User chip */}
        <div style={{ padding:"12px 12px", borderBottom:"1px solid rgba(1,138,190,0.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, background:"rgba(1,138,190,0.1)", border:`1px solid rgba(1,138,190,0.2)` }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14, color:P.white, flexShrink:0 }}>
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div style={{ minWidth:0 }}>
              <p style={{ color:P.white, fontWeight:700, fontSize:12, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name}</p>
              <span style={{ display:"inline-block", background:"rgba(1,138,190,0.2)", color:P.sky, fontSize:9, fontWeight:800, letterSpacing:"0.08em", padding:"2px 6px", borderRadius:4, marginTop:3 }}>ADMINISTRATOR</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"12px", display:"flex", flexDirection:"column", gap:2, overflowY:"auto" }}>
          {NAV.map(item => {
            const active = activeNav === item.id;
            return (
              <button key={item.id} onClick={()=>setActiveNav(item.id)}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, fontSize:13, fontWeight:600, cursor:"pointer", border:"none", textAlign:"left", transition:"all 0.15s", fontFamily:P.font,
                  background: active ? `rgba(1,138,190,0.18)` : "transparent",
                  color: active ? P.sky : "rgba(151,202,219,0.45)",
                  outline: active ? `1px solid rgba(1,138,190,0.3)` : "1px solid transparent",
                }}
                onMouseEnter={e=>{ if(!active){ e.currentTarget.style.background="rgba(1,138,190,0.08)"; e.currentTarget.style.color="rgba(151,202,219,0.85)"; }}}
                onMouseLeave={e=>{ if(!active){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="rgba(151,202,219,0.45)"; }}}>
                <span style={{ color: active ? P.sky : P.muted, flexShrink:0 }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding:"12px", borderTop:"1px solid rgba(1,138,190,0.1)" }}>
          <button onClick={handleLogout}
            style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, fontSize:13, fontWeight:600, cursor:"pointer", background:"transparent", border:"none", color:"rgba(151,202,219,0.35)", fontFamily:P.font, transition:"all 0.15s" }}
            onMouseEnter={e=>{ e.currentTarget.style.background="rgba(220,38,38,0.08)"; e.currentTarget.style.color="#f87171"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="rgba(151,202,219,0.35)"; }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

        {/* Topbar */}
        <header style={{ height:56, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 32px", flexShrink:0, position:"sticky", top:0, zIndex:20, background:"rgba(0,15,40,0.88)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(1,138,190,0.1)" }}>
          <h1 style={{ color:P.white, fontWeight:900, fontSize:15, margin:0, textTransform:"capitalize" }}>
            {NAV.find(n=>n.id===activeNav)?.label || "Overview"}
          </h1>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:12, fontWeight:800, padding:"4px 12px", borderRadius:999, background:"rgba(1,138,190,0.15)", border:`1px solid rgba(1,138,190,0.3)`, color:P.sky, letterSpacing:"0.05em", display:"flex", alignItems:"center", gap:6 }}>
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
              <div style={{ position:"relative", borderRadius:20, overflow:"hidden", padding:"32px 36px", background:`linear-gradient(135deg,${P.navy},${P.royal})`, border:`1px solid rgba(1,138,190,0.25)` }}>
                <div style={{ position:"absolute", inset:0, opacity:0.06, backgroundImage:`linear-gradient(rgba(1,138,190,1) 1px,transparent 1px),linear-gradient(90deg,rgba(1,138,190,1) 1px,transparent 1px)`, backgroundSize:"36px 36px" }}/>
                <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(1,138,190,0.15)", filter:"blur(40px)" }}/>
                <div style={{ position:"relative", zIndex:1 }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:6, borderRadius:999, padding:"4px 12px", marginBottom:14, background:"rgba(1,138,190,0.2)", border:`1px solid rgba(1,138,190,0.35)` }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:P.sky, display:"inline-block" }}/>
                    <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.12em", color:P.sky }}>ADMIN DASHBOARD</span>
                  </span>
                  <h2 style={{ color:P.white, fontWeight:900, fontSize:28, margin:"0 0 6px", letterSpacing:"-0.02em" }}>
                    Welcome back, {user?.name?.split(" ")[0]}
                  </h2>
                  <p style={{ color:"rgba(151,202,219,0.6)", fontSize:14, margin:0 }}>You have full administrative access to HamroHub platform.</p>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
                {STATS.map((s,i)=>(
                  <div key={i} style={{ padding:"20px", borderRadius:16, display:"flex", alignItems:"center", gap:16, background:`rgba(0,15,40,0.6)`, border:`1px solid rgba(1,138,190,0.15)`, backdropFilter:"blur(8px)" }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:P.white, boxShadow:"0 4px 14px rgba(1,138,190,0.25)" }}>
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
                <UsersTable users={MOCK_USERS} />
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
                <button style={{ padding:"9px 20px", borderRadius:12, fontSize:13, fontWeight:700, color:P.white, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, border:"none", cursor:"pointer", fontFamily:P.font, boxShadow:"0 4px 14px rgba(1,138,190,0.3)" }}>
                  + Invite User
                </button>
              </div>
              <UsersTable users={MOCK_USERS} showActions />
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
              <UsersTable users={MOCK_USERS.filter(u=>u.role==="vendor")} showActions />
            </div>
          )}

          {/* ── PLACEHOLDER TABS ── */}
          {["products","orders","settings"].includes(activeNav) && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"40vh", textAlign:"center" }}>
              <div style={{ width:64, height:64, borderRadius:18, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, boxShadow:"0 8px 24px rgba(1,138,190,0.3)", color:P.white }}>
                {NAV.find(n=>n.id===activeNav)?.icon}
              </div>
              <h2 style={{ color:P.white, fontWeight:900, fontSize:20, margin:"0 0 8px" }}>{NAV.find(n=>n.id===activeNav)?.label}</h2>
              <p style={{ color:P.muted, fontSize:14, margin:0 }}>This section is coming soon.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

// ─── Users Table ─────────────────────────────────────────────────────────────
function UsersTable({ users, showActions = false }) {
  const cols = showActions ? "2fr 2fr 1fr 1fr 1.5fr 1fr" : "2fr 2fr 1fr 1fr 1.5fr";
  return (
    <div style={{ borderRadius:16, overflow:"hidden", background:"rgba(0,15,40,0.6)", border:"1px solid rgba(1,138,190,0.15)", backdropFilter:"blur(8px)" }}>
      {/* Header row */}
      <div style={{ display:"grid", gridTemplateColumns:cols, padding:"10px 20px", color:P.muted, fontSize:10, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", borderBottom:"1px solid rgba(1,138,190,0.1)" }}>
        <span>Name</span>
        <span>Email</span>
        <span>Role</span>
        <span>Status</span>
        <span>Joined</span>
        {showActions && <span>Actions</span>}
      </div>

      {users.map((u,i)=>{
        const rs = ROLE_STYLE[u.role];
        const ss = STATUS_STYLE[u.status];
        return (
          <div key={i} style={{ display:"grid", gridTemplateColumns:cols, alignItems:"center", padding:"12px 20px", borderBottom: i < users.length-1 ? "1px solid rgba(1,138,190,0.07)" : "none", transition:"background 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(1,138,190,0.05)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>

            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13, color:P.white, flexShrink:0 }}>
                {u.name.charAt(0)}
              </div>
              <span style={{ color:P.white, fontWeight:600, fontSize:13 }}>{u.name}</span>
            </div>

            <span style={{ color:P.muted, fontSize:13 }}>{u.email}</span>

            <span style={{ fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:999, display:"inline-block", background:rs.bg, border:`1px solid ${rs.border}`, color:rs.text }}>
              {u.role}
            </span>

            <span style={{ fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:999, display:"inline-block", background:ss.bg, border:`1px solid ${ss.border}`, color:ss.text }}>
              {u.status}
            </span>

            <span style={{ color:"rgba(151,202,219,0.4)", fontSize:12 }}>{u.joined}</span>

            {showActions && (
              <div style={{ display:"flex", gap:6 }}>
                <button style={{ fontSize:10, fontWeight:700, padding:"4px 10px", borderRadius:8, background:"rgba(1,138,190,0.1)", border:`1px solid rgba(1,138,190,0.25)`, color:P.sky, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(1,138,190,0.2)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(1,138,190,0.1)"; }}>
                  Edit
                </button>
                <button style={{ fontSize:10, fontWeight:700, padding:"4px 10px", borderRadius:8, background:"rgba(220,38,38,0.08)", border:"1px solid rgba(220,38,38,0.2)", color:"#f87171", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(220,38,38,0.15)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(220,38,38,0.08)"; }}>
                  Ban
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}