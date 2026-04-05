// src/components/admin/AdminTopbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { P } from "../dashboard/DashboardConstants";

const LABELS = {
  overview: { label: "Command Center" },
  users:    { label: "User Directory" },
  vendors:  { label: "Vendor Management" },
  products: { label: "Product Catalog" },
  orders:   { label: "Order Logistics" },
  settings: { label: "System Settings" },
};

export default function AdminTopbar({ tab, onMenu }) {
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
            Admin Portal • {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        
        {/* Status Badge */}
        <div style={{ 
          display: "flex", alignItems: "center", gap: 6, 
          padding: "6px 14px", borderRadius: 12, 
          background: "#f0fdf4", border: "1px solid #bbf7d0" 
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
          <span style={{ fontSize: 10, fontWeight: 800, color: "#166534", letterSpacing: "0.05em", textTransform: "uppercase" }}>System Online</span>
        </div>

        {/* Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
              user?.name?.charAt(0).toUpperCase() || "A"
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: P.navy }}>{user?.name || "Administrator"}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: P.muted, textTransform: "uppercase" }}>System Admin</span>
          </div>
        </div>

      </div>
    </div>
  );
}
