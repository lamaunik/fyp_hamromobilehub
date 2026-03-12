// src/components/vendor/VendorTopbar.jsx
import { Link } from "react-router-dom";
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
  navy:  "#001B48",
  royal: "#02457A",
  ocean: "#018ABE",
  sky:   "#97CADB",
  mist:  "#D6E8EE",
  white: "#ffffff",
  muted: "#6b99b5",
  font:  "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif",
};

export default function VendorTopbar({ tab, onMenu }) {
  const { user } = useAuth();
  const current = LABELS[tab] || LABELS.overview;

  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20,
      background: P.white,
      borderBottom: `1px solid ${P.mist}`,
      padding: "14px 28px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: P.font,
      boxShadow: "0 2px 12px rgba(0,27,72,0.06)",
    }}>

      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onMenu} style={{
          width: 36, height: 36, borderRadius: 10,
          background: "rgba(1,138,190,0.07)", border: `1px solid ${P.mist}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: P.royal, transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(1,138,190,0.14)"; e.currentTarget.style.borderColor = P.sky; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(1,138,190,0.07)"; e.currentTarget.style.borderColor = P.mist; }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h1 style={{ color: P.navy, fontWeight: 800, fontSize: 18, margin: 0, fontFamily: P.font }}>
            {current.label}
          </h1>
          <p style={{ color: P.muted, fontSize: 11, margin: "2px 0 0", fontFamily: P.font }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

        {/* Notification */}
        <button style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "rgba(1,138,190,0.07)", border: `1px solid ${P.mist}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: P.royal, position: "relative", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(1,138,190,0.14)"; e.currentTarget.style.borderColor = P.sky; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(1,138,190,0.07)"; e.currentTarget.style.borderColor = P.mist; }}
        >
          <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span style={{
            position: "absolute", top: 7, right: 7,
            width: 7, height: 7, borderRadius: "50%",
            background: P.ocean, border: `2px solid ${P.white}`,
          }} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: P.white, fontWeight: 900, fontSize: 14,
          border: `2px solid ${P.mist}`,
          boxShadow: "0 2px 8px rgba(1,138,190,0.2)",
        }}>
          {user?.name?.charAt(0).toUpperCase() || "V"}
        </div>

        {/* Browse Phones */}
        <Link to="/" style={{
          display: "flex", alignItems: "center", gap: 6,
          background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
          color: P.white, fontSize: 13, fontWeight: 700,
          padding: "8px 18px", borderRadius: 999, fontFamily: P.font,
          textDecoration: "none",
          boxShadow: "0 4px 14px rgba(1,138,190,0.25)",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(1,138,190,0.35)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(1,138,190,0.25)"; }}
        >
          Browse Phones
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}