// src/components/admin/AdminSidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { P } from "../dashboard/DashboardConstants";

const NAV = [
  { id: "overview", label: "Overview", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
  { id: "users",    label: "Users",    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { id: "vendors",  label: "Vendors",  icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { id: "products", label: "Products", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
  { id: "orders",   label: "Orders",   icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
  { id: "settings", label: "Settings", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
];

export default function AdminSidebar({ tab, setTab, open, setOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside style={{
      width: open ? 240 : 0,
      minHeight: "100vh",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      background: P.white,
      borderRight: open ? `1px solid ${P.mist}` : "none",
      fontFamily: P.font,
      position: "relative",
      boxShadow: open ? "2px 0 12px rgba(40, 43, 74, 0.06)" : "none",
      overflow: "hidden",
      zIndex: 1000,
    }}>
      <div style={{ 
        width: 240, 
        height: "100%", 
        display: "flex", 
        flexDirection: "column",
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transition: "opacity 0.2s"
      }}>
        
        {/* Logo Section */}
        <div style={{ 
          padding: "0 22px", 
          borderBottom: `1px solid ${P.mist}`, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          flexShrink: 0, 
          height: 80 
        }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="/logo.png" alt="Logo" style={{ height: 36, width: "auto" }} />
            <span style={{ fontSize: 18, fontWeight: 900, color: P.navy, letterSpacing: "-0.02em", fontFamily: "'Barlow Condensed', sans-serif" }}>
              HamroMobile<span style={{ color: "#f43f5e" }}>Hub</span>
            </span>
          </Link>
          <button 
            onClick={() => setOpen(false)} 
            style={{ background: "none", border: "none", cursor: "pointer", color: P.muted, padding: 4, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = P.navy}
            onMouseLeave={e => e.currentTarget.style.color = P.muted}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
          </button>
        </div>

        {/* Navigation Sidebar List */}
        <nav style={{ flex: 1, padding: "24px 12px", overflowY: "auto" }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: P.muted, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 12px", marginBottom: 4 }}>Menu</p>
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
                  fontSize: 13, fontWeight: 700,
                  fontFamily: P.font, cursor: "pointer",
                  transition: "all 0.2s",
                  justifyContent: "flex-start",
                  marginBottom: 2,
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.color = P.navy; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "none"; e.currentTarget.style.color = P.muted; }}}
              >
                <span style={{ color: isActive ? P.white : P.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div style={{ padding: "16px 12px", borderTop: `1px solid ${P.mist}` }}>
          <button
            onClick={() => { logout(); navigate("/signin"); }}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", borderRadius: 12, border: "none",
              background: "none", cursor: "pointer",
              color: P.muted, fontSize: 13, fontWeight: 700, fontFamily: P.font,
              justifyContent: "flex-start",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = P.muted; }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </button>
        </div>

      </div>
    </aside>
  );
}
