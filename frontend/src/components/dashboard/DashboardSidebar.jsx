import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { P } from "./DashboardConstants";
import { Icon } from "./DashboardIcons";

// Marketplace icon
const MarketIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
  </svg>
);

// Sell icon
const SellIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
  </svg>
);

export default function DashboardSidebar({ tab, setTab, open, cartCount, wishCount, orderCount }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const nav = [
    { id: "home",        label: "Home",            icon: Icon.home,     badge: null },
    { id: "products",    label: "Browse Products", icon: Icon.products, badge: null },
    { id: "orders",      label: "My Orders",       icon: Icon.orders,   badge: orderCount || null },
    { id: "wishlist",    label: "Wishlist",         icon: Icon.wishlist, badge: wishCount || null },
    { id: "cart",        label: "Shopping Cart",   icon: Icon.cart,     badge: cartCount || null },
    { id: "profile",     label: "My Profile",      icon: Icon.profile,  badge: null },
  ];

  return (
    <aside
      className="slideLeft"
      style={{
        width: open ? 252 : 0,
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        overflow: "hidden",
        background: P.white,
        borderRight: `1px solid ${P.mist}`,
        transition: "width .32s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        flexDirection: "column",
        fontFamily: P.font,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "0 22px", borderBottom: `1px solid ${P.mist}`, display: "flex", alignItems: "center", flexShrink: 0, height: 70, overflow: "hidden" }}>
        <img src="/logo.png" alt="HamroMobile Hub" style={{ width: 180, height: 180, minWidth: 180, minHeight: 180, objectFit: "contain", marginLeft: -14, filter: "hue-rotate(225deg) saturate(1.6) brightness(1.1)" }} />
      </div>



      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
        <p style={{ fontSize: 9, fontWeight: 800, color: P.muted, letterSpacing: ".12em", textTransform: "uppercase", padding: "6px 12px 4px" }}>Navigation</p>

        {nav.map((item, i) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              className={active ? "" : "nav-item"}
              onClick={() => setTab(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", fontSize: 13, fontWeight: active ? 700 : 600,
                cursor: "pointer", border: "none", textAlign: "left", fontFamily: P.font,
                transition: "all .2s ease", position: "relative",
                background: active ? P.mist : "transparent",
                color: active ? P.navy : P.muted,
                boxShadow: "none", borderRadius: 10,
                animationName: "fadeUp", animationDuration: ".4s",
                animationTimingFunction: "ease",
                animationFillMode: "both", animationDelay: `${0.1 + i * 0.04}s`,
              }}
            >
              <span style={{ color: active ? P.accent : P.muted, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ whiteSpace: "nowrap", flex: 1, letterSpacing: "0.2px" }}>{item.label}</span>
              {item.badge > 0 && (
                <span style={{ background: P.accent, color: P.white, fontSize: 10, fontWeight: 800, minWidth: 20, height: 20, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px" }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* ── Second-hand Marketplace Section ── */}
        <p style={{ fontSize: 9, fontWeight: 800, color: P.muted, letterSpacing: ".12em", textTransform: "uppercase", padding: "14px 12px 4px" }}>Marketplace</p>

        {/* Buy Used Products */}
        {[
          { id: "marketplace", label: "Buy Used",  icon: MarketIcon, desc: "Browse listings" },
          { id: "sell",        label: "Sell Yours", icon: SellIcon,   desc: "List your item"  },
        ].map((item, i) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              className={active ? "" : "nav-item"}
              onClick={() => setTab(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", cursor: "pointer",
                border: active ? "none" : `1px solid ${P.mist}`,
                textAlign: "left", fontFamily: P.font, transition: "all .2s ease",
                position: "relative", borderRadius: 12,
                background: active ? P.navy : P.white,
                boxShadow: active ? "0 4px 14px rgba(24, 24, 27, 0.15)" : "0 2px 6px rgba(0,0,0,0.02)",
              }}
            >
              <span style={{ color: active ? P.white : P.accent, flexShrink: 0 }}>{item.icon}</span>
              <div style={{ minWidth: 0 }}>
                <p style={{ color: active ? P.white : P.navy, fontWeight: 700, fontSize: 13, margin: 0, whiteSpace: "nowrap", letterSpacing: "0.2px" }}>{item.label}</p>
                {!active && <p style={{ color: P.muted, fontSize: 11, margin: 0 }}>{item.desc}</p>}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Auth action */}
      <div style={{ padding: "16px", borderTop: `1px solid ${P.mist}`, flexShrink: 0 }}>
        {user ? (
          <button
            className="nav-item"
            onClick={() => { logout(); navigate("/"); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", background: "transparent", border: "none", color: P.accent, fontFamily: P.font }}
          >
            {Icon.logout}<span>Sign Out</span>
          </button>
        ) : (
          <button
            className="nav-item"
            onClick={() => navigate("/signin")}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", background: "transparent", border: "none", color: P.navy, fontFamily: P.font }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
            <span>Sign In</span>
          </button>
        )}
      </div>
    </aside>
  );
}