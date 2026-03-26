// src/components/vendor/VendorTopbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LABELS = {
  overview:  { label: "Overview" },
  products:  { label: "My Products" },
  orders:    { label: "Orders" },
  analytics: { label: "Analytics" },
  payouts:   { label: "Payouts" },
  reviews:   { label: "Reviews" },
  settings:  { label: "Settings" },
};

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

export default function VendorTopbar({ tab, onMenu, unreadChat }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const current = LABELS[tab] || LABELS.overview;

  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20,
      background: P.white,
      borderBottom: `1px solid ${P.mist}`,
      padding: "14px 28px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: P.font,
    }}>

      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onMenu} style={{
          width: 36, height: 36, borderRadius: 10,
          background: P.mistBg, border: `1px solid ${P.mist}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: P.navy, transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = P.sky; e.currentTarget.style.borderColor = P.sky; }}
          onMouseLeave={e => { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.borderColor = P.mist; }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h1 style={{ color: P.navy, fontWeight: 900, fontSize: 18, margin: 0, fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>
            {current.label}
          </h1>
          <p style={{ color: P.muted, fontSize: 11, fontWeight: 700, margin: "2px 0 0", fontFamily: P.font, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

        {/* Messages */}
        <button onClick={() => navigate("/messages")} style={{
          position: "relative",
          width: 40, height: 40, borderRadius: 12,
          background: P.mistBg, border: `1px solid ${P.mist}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: P.navy, transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = P.sky; }}
          onMouseLeave={e => { e.currentTarget.style.background = P.mistBg; }}
        >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418-4.03-8 9-8s9 3.582 9 8z"/></svg>
            {unreadChat && (
              <span className="pulse" style={{ position: "absolute", top: -2, right: -2, width: 10, height: 10, background: P.accent, borderRadius: "50%", border: `2px solid ${P.white}` }} />
            )}
        </button>

        {/* Notification */}
        <button style={{
          width: 40, height: 40, borderRadius: 12,
          background: P.mistBg, border: `1px solid ${P.mist}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: P.navy, position: "relative", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = P.sky; }}
          onMouseLeave={e => { e.currentTarget.style.background = P.mistBg; }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span style={{ position: "absolute", top: -2, right: -2, width: 10, height: 10, borderRadius: "50%", background: P.accent, border: `2px solid ${P.white}` }} />
        </button>

        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: P.mistBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: P.navy, fontWeight: 900, fontSize: 14,
          border: `1px solid ${P.mist}`,
          overflow: "hidden",
        }}>
          {user?.profilePicture ? (
            <img src={user.profilePicture.startsWith("http") ? user.profilePicture : `http://localhost:5000${user.profilePicture}`} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            user?.name?.charAt(0).toUpperCase() || "V"
          )}
        </div>

        {/* Browse Phones */}
        <Link to="/" style={{
          display: "flex", alignItems: "center", gap: 8,
          background: P.navy,
          color: P.white, fontSize: 13, fontWeight: 700,
          padding: "10px 20px", borderRadius: 12, fontFamily: P.font,
          textDecoration: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          View Store
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}