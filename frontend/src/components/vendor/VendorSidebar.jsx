// src/components/vendor/VendorSidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { id: "overview",  label: "Overview" },
  { id: "products",  label: "My Products" },
  { id: "orders",    label: "Orders" },
  { id: "analytics", label: "Analytics" },
  { id: "reviews",   label: "Reviews" },
  { id: "settings",  label: "Settings" },
];

const P = {
  navy:   "#001B48",
  royal:  "#02457A",
  ocean:  "#018ABE",
  sky:    "#97CADB",
  mist:   "#D6E8EE",
  mistBg: "#f0f6f9",
  white:  "#ffffff",
  muted:  "#6b99b5",
  font:   "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif",
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
      boxShadow: "2px 0 12px rgba(0,27,72,0.06)",
    }}>

      {/* Logo */}
      <div style={{
        padding: "18px 20px",
        borderBottom: `1px solid ${P.mist}`,
        display: "flex", alignItems: "center",
        justifyContent: open ? "space-between" : "center",
      }}>
        {open ? (
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(1,138,190,0.25)",
            }}>
              <span style={{ color: P.white, fontWeight: 900, fontSize: 15 }}>M</span>
            </div>
            <div>
              <p style={{ color: P.navy, fontWeight: 900, fontSize: 13, lineHeight: 1, margin: 0, fontFamily: P.font }}>
                HamroMobile<span style={{ color: P.ocean }}>Hub</span>
              </p>
              <p style={{ color: P.muted, fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", margin: "3px 0 0", fontFamily: P.font }}>
                Vendor
              </p>
            </div>
          </Link>
        ) : (
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(1,138,190,0.25)",
          }}>
            <span style={{ color: P.white, fontWeight: 900, fontSize: 15 }}>M</span>
          </div>
        )}
        {open && (
          <button onClick={() => setOpen(false)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: P.sky, padding: 4, transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = P.ocean}
            onMouseLeave={e => e.currentTarget.style.color = P.sky}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        )}
        {!open && (
          <button onClick={() => setOpen(true)} style={{
            position: "absolute", right: -12, top: 24,
            width: 24, height: 24, borderRadius: "50%",
            background: P.ocean, border: `2px solid ${P.white}`,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 10px rgba(1,138,190,0.3)", color: P.white,
          }}>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* User card */}
      <div style={{ padding: "14px 16px", borderBottom: `1px solid ${P.mist}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: open ? "flex-start" : "center" }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
            background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: P.white, fontWeight: 900, fontSize: 15,
            boxShadow: "0 4px 10px rgba(1,138,190,0.2)",
          }}>
            {user?.name?.charAt(0).toUpperCase() || "V"}
          </div>
          {open && (
            <div style={{ minWidth: 0 }}>
              <p style={{ color: P.navy, fontWeight: 700, fontSize: 13, margin: 0, fontFamily: P.font, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.name || "Vendor"}
              </p>
              <p style={{ color: P.muted, fontSize: 11, margin: "2px 0 0", fontFamily: P.font, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.email || ""}
              </p>
              <span style={{
                display: "inline-block", marginTop: 4,
                background: "rgba(1,138,190,0.1)", border: `1px solid ${P.sky}`,
                color: P.ocean, fontSize: 10, fontWeight: 700,
                padding: "2px 8px", borderRadius: 999, fontFamily: P.font,
              }}>
                Vendor
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
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
                border: isActive ? `1px solid ${P.sky}` : "1px solid transparent",
                background: isActive ? `linear-gradient(135deg, rgba(2,69,122,0.08), rgba(1,138,190,0.12))` : "none",
                color: isActive ? P.navy : P.muted,
                fontSize: 13, fontWeight: isActive ? 700 : 600,
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
          <button style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
            color: P.white, fontSize: 13, fontWeight: 700, fontFamily: P.font,
            padding: "11px", borderRadius: 12, border: "none", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(1,138,190,0.25)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(1,138,190,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(1,138,190,0.25)"; }}
          >
            + Add Product
          </button>
        </div>
      )}

      {/* Logout */}
      <div style={{ padding: "12px", borderTop: `1px solid ${P.mist}` }}>
        <button
          onClick={() => { logout(); navigate("/signin"); }}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 12, border: "none",
            background: "none", cursor: "pointer",
            color: "#dc2626", fontSize: 13, fontWeight: 600, fontFamily: P.font,
            justifyContent: open ? "flex-start" : "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(220,38,38,0.07)"}
          onMouseLeave={e => e.currentTarget.style.background = "none"}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {open && "Logout"}
        </button>
      </div>
    </aside>
  );
}