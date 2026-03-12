import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const STYLES = `
  @keyframes slideDown {
    from { opacity:0; transform:translateY(-16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes badgePop {
    0%   { transform:scale(0); }
    70%  { transform:scale(1.25); }
    100% { transform:scale(1); }
  }
  @keyframes pulseDot {
    0%,100% { box-shadow:0 0 0 0 rgba(1,138,190,0.6); }
    50%     { box-shadow:0 0 0 5px rgba(1,138,190,0); }
  }
  @keyframes searchExpand {
    from { width:0; opacity:0; }
    to   { width:270px; opacity:1; }
  }
  .topbar-wrap  { animation: slideDown 0.35s cubic-bezier(.4,0,.2,1) both; }
  .topbar-btn   { transition: background 0.17s, border-color 0.17s, transform 0.15s, box-shadow 0.17s !important; }
  .topbar-btn:hover { transform:scale(1.07) !important; box-shadow:0 4px 14px rgba(1,138,190,0.18) !important; }
  .topbar-btn:active { transform:scale(0.95) !important; }
  .notif-dot    { animation: pulseDot 2s infinite; }
  .cart-badge   { animation: badgePop 0.35s cubic-bezier(.4,0,.2,1) both; }
`;

export default function DashboardTopbar({ sidebarOpen, setSidebarOpen, cartCount, setActiveTab }) {
  const { user } = useAuth();
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.querySelector("main");
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 4);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <header className="topbar-wrap" style={{
        background: P.white,
        borderBottom: `1px solid ${scrolled ? P.sky : P.mist}`,
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        boxShadow: scrolled ? "0 4px 24px rgba(0,27,72,0.1)" : "0 2px 14px rgba(0,27,72,0.05)",
        fontFamily: P.font,
        position: "sticky",
        top: 0,
        zIndex: 30,
        transition: "box-shadow 0.25s, border-color 0.25s",
      }}>

        {/* ── Left ── */}
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          {/* Hamburger */}
          <button
            className="topbar-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              width:36, height:36, borderRadius:10,
              border:`1px solid ${P.mist}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:P.royal, cursor:"pointer", background:P.mistBg,
            }}
            onMouseEnter={e => { e.currentTarget.style.background=P.mist; e.currentTarget.style.borderColor=P.sky; e.currentTarget.style.color=P.ocean; }}
            onMouseLeave={e => { e.currentTarget.style.background=P.mistBg; e.currentTarget.style.borderColor=P.mist; e.currentTarget.style.color=P.royal; }}>
            {/* animated hamburger lines */}
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              {sidebarOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>

          {/* Breadcrumb / page label */}
          <div style={{ height:28, width:1, background:P.mist }}/>
          <div style={{ display:"flex", flexDirection:"column" }}>
            <span style={{ fontSize:11, color:P.muted, fontWeight:500 }}>Dashboard</span>
            <span style={{ fontSize:14, color:P.navy, fontWeight:800, lineHeight:1.1, letterSpacing:"-0.01em" }}>Welcome back, {user?.name?.split(" ")[0] || "User"}</span>
          </div>
        </div>

        {/* ── Right ── */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>

          {/* Search */}
          <div style={{ position:"relative" }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={searchFocused ? P.ocean : P.muted} strokeWidth={2}
              style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", transition:"stroke 0.2s" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" placeholder="Search phones, brands..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                paddingLeft:32, paddingRight:16, paddingTop:8, paddingBottom:8,
                background: searchFocused ? P.white : P.mistBg,
                border: `1.5px solid ${searchFocused ? P.sky : P.mist}`,
                borderRadius:10, fontSize:13, color:P.navy, outline:"none",
                width: searchFocused ? 280 : 220,
                fontFamily:P.font,
                boxShadow: searchFocused ? "0 0 0 3px rgba(151,202,219,0.22)" : "none",
                transition:"all 0.25s cubic-bezier(.4,0,.2,1)",
              }}
            />
          </div>

          {/* Notifications */}
          <button
            className="topbar-btn"
            style={{
              position:"relative", width:36, height:36, borderRadius:10,
              border:`1px solid ${P.mist}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:P.royal, cursor:"pointer", background:P.mistBg,
            }}
            onMouseEnter={e => { e.currentTarget.style.background=P.mist; e.currentTarget.style.borderColor=P.sky; e.currentTarget.style.color=P.ocean; }}
            onMouseLeave={e => { e.currentTarget.style.background=P.mistBg; e.currentTarget.style.borderColor=P.mist; e.currentTarget.style.color=P.royal; }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span className="notif-dot" style={{ position:"absolute", top:8, right:8, width:7, height:7, background:P.ocean, borderRadius:"50%", border:`2px solid ${P.white}` }}/>
          </button>

          {/* Divider */}
          <div style={{ width:1, height:28, background:P.mist, margin:"0 4px" }}/>

          {/* Avatar card */}
          <div style={{
            display:"flex", alignItems:"center", gap:9,
            padding:"5px 10px 5px 6px", borderRadius:12,
            border:`1px solid ${P.mist}`, background:P.mistBg,
            cursor:"pointer", transition:"all 0.18s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=P.sky; e.currentTarget.style.background=P.white; e.currentTarget.style.boxShadow="0 2px 12px rgba(1,138,190,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=P.mist; e.currentTarget.style.background=P.mistBg; e.currentTarget.style.boxShadow="none"; }}>
            <div style={{
              width:32, height:32, borderRadius:"50%",
              background:`linear-gradient(135deg,${P.royal},${P.ocean})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              border:`2px solid ${P.white}`,
              boxShadow:"0 2px 8px rgba(1,138,190,0.28)",
              flexShrink:0,
            }}>
              <span style={{ color:P.white, fontWeight:900, fontSize:12 }}>{user?.name?.charAt(0).toUpperCase() || "U"}</span>
            </div>
            <div>
              <p style={{ color:P.navy, fontWeight:700, fontSize:13, margin:0, lineHeight:1.2 }}>{user?.name?.split(" ")[0]}</p>
              <p style={{ color:P.muted, fontSize:10, margin:0, letterSpacing:"0.04em" }}>Customer</p>
            </div>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={2} style={{ marginLeft:2 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </header>
    </>
  );
}