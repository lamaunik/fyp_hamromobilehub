// src/components/vendor/VendorSidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { id: "overview",  label: "Overview" },
  { id: "listings",  label: "My Products" },
  { id: "orders",    label: "Orders" },
  { id: "analytics", label: "Analytics" },
  { id: "reviews",   label: "Reviews" },
  { id: "settings",  label: "Settings" },
];

const P = {
  navy:  "#282B4A",
  royal: "#282B4A",
  ocean: "#282B4A",
  sky:   "#D4D2C3",
  mist:  "#E5E3D5",
  white: "#FFFFFF",
  muted: "#7A7C8E",
  mistBg:"#EEEBDA",
  font:  "'Inter', 'Helvetica Neue', Helvetica, sans-serif",
  purple:"#282B4A",
  purpleLight:"#E5E3D5"
};

export default function VendorSidebar({ tab, setTab, open, setOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside style={{
      width: open ? 240 : 72,
      minHeight: "100vh",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      transition: "width 0.3s",
      background: P.white,
      borderRight: `1px solid ${P.mist}`,
      fontFamily: P.font,
      position: "relative",
      boxShadow: "2px 0 12px rgba(40, 43, 74, 0.06)",
    }}>

      {/* Logo */}
      <div style={{ padding: "0 22px", borderBottom: `1px solid ${P.mist}`, display: "flex", alignItems: "center", justifyContent: open ? "space-between" : "center", flexShrink: 0, height: 80, overflow: "hidden" }}>
        {open ? (
          <Link to="/" style={{ display: "flex", alignItems: "center", gap:10, textDecoration: "none" }}>
            <img src="/logo.png" alt="Logo" style={{ height: 36, width: "auto" }} />
            <span style={{ fontSize:18, fontWeight:900, color:P.navy, letterSpacing:"-0.02em", fontFamily: "'Barlow Condensed', sans-serif" }}>
              HamroMobile<span style={{ color:"#f43f5e" }}>Hub</span>
            </span>
          </Link>
        ) : (
          <Link to="/">
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${P.accent}, #fda4af)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(244, 63, 94, 0.25)" }}>
              <span style={{ color: P.white, fontWeight: 900, fontSize: 16 }}>H</span>
            </div>
          </Link>
        )}
        {open && (
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: P.muted, padding: 4, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = P.navy} onMouseLeave={e => e.currentTarget.style.color = P.muted}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
          </button>
        )}
        {!open && (
          <button onClick={() => setOpen(true)} style={{ position: "absolute", right: -12, top: 28, width: 24, height: 24, borderRadius: "50%", background: P.navy, border: `2px solid ${P.white}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", color: P.white }}>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>



      {/* Nav */}
      <nav style={{ flex: 1, padding: "24px 12px", overflowY: "auto" }}>
        <p style={{ fontSize: 10, fontWeight: 800, color: P.muted, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 12px", marginBottom: 4 }}>{open && "Menu"}</p>
        {NAV.map((item) => {
          const isActive = tab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                width: "100%",
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 12,
                border: "none",
                background: isActive ? P.navy : "none",
                color: isActive ? P.white : P.muted,
                fontSize: 13, fontWeight: isActive ? 700 : 700,
                fontFamily: P.font, cursor: "pointer",
                transition: "all 0.2s",
                justifyContent: open ? "flex-start" : "center",
                marginBottom: 2,
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.color = P.navy; }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "none"; e.currentTarget.style.color = P.muted; }}}
            >
              {open && item.label}
            </button>
          );
        })}
      </nav>

      {/* Add Product CTA */}
      {open && (
        <div style={{ padding: "0 12px 8px" }}>
          <button 
            onClick={() => setTab("add-product")}
            style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            background: P.navy,
            color: P.white, fontSize: 13, fontWeight: 700, fontFamily: P.font,
            padding: "11px", borderRadius: 12, border: "none", cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            + Add Product
          </button>
        </div>
      )}

      {/* Logout */}
      <div style={{ padding: "16px 12px", borderTop: `1px solid ${P.mist}` }}>
        <button
          onClick={() => { logout(); navigate("/signin"); }}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 12, border: "none",
            background: "none", cursor: "pointer",
            color: P.muted, fontSize: 13, fontWeight: 700, fontFamily: P.font,
            justifyContent: open ? "flex-start" : "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = P.muted; }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {open && "Log Out"}
        </button>
      </div>
    </aside>
  );
}