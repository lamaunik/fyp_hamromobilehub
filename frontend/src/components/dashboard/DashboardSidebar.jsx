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
        boxShadow: "3px 0 20px rgba(40, 43, 74, .07)",
        transition: "width .32s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        flexDirection: "column",
        fontFamily: P.font,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid ${P.mist}`, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg,${P.royal},${P.ocean})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(40, 43, 74, .35)", flexShrink: 0 }}>
          <span style={{ color: P.white, fontWeight: 900, fontSize: 18 }}>M</span>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 900, color: P.navy, whiteSpace: "nowrap", letterSpacing: "-.02em" }}>
            HamroMobile<span style={{ color: P.ocean }}>Hub</span>
          </div>
          <div style={{ fontSize: 9, fontWeight: 700, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase" }}>User Dashboard</div>
        </div>
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
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 12, fontSize: 13, fontWeight: 600,
                cursor: "pointer", border: "none", textAlign: "left", fontFamily: P.font,
                transition: "all .15s", position: "relative",
                background: active ? `linear-gradient(135deg,${P.royal},${P.ocean})` : "transparent",
                color: active ? P.white : P.muted,
                boxShadow: active ? "0 4px 18px rgba(40, 43, 74, .3)" : "none",
                animationName: "fadeUp", animationDuration: ".4s",
                animationTimingFunction: "cubic-bezier(.4,0,.2,1)",
                animationFillMode: "both", animationDelay: `${0.1 + i * 0.04}s`,
              }}
            >
              {active && (
                <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: "60%", borderRadius: "0 3px 3px 0", background: "rgba(255,255,255,.6)" }} />
              )}
              <span style={{ color: active ? P.white : P.sky, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ whiteSpace: "nowrap", flex: 1 }}>{item.label}</span>
              {item.badge > 0 && (
                <span style={{ background: active ? "rgba(255,255,255,.28)" : "#dc2626", color: P.white, fontSize: 10, fontWeight: 900, minWidth: 18, height: 18, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>
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
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 12, cursor: "pointer",
                border: active ? "none" : `1.5px solid ${P.mist}`,
                textAlign: "left", fontFamily: P.font, transition: "all .15s",
                position: "relative",
                background: active
                  ? `linear-gradient(135deg,#7c3aed,#a855f7)`   // purple for marketplace
                  : P.mistBg,
                boxShadow: active ? "0 4px 18px rgba(124,58,237,.3)" : "none",
              }}
            >
              {active && (
                <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: "60%", borderRadius: "0 3px 3px 0", background: "rgba(255,255,255,.6)" }} />
              )}
              <span style={{ color: active ? "white" : "#7c3aed", flexShrink: 0 }}>{item.icon}</span>
              <div style={{ minWidth: 0 }}>
                <p style={{ color: active ? P.white : P.navy, fontWeight: 700, fontSize: 13, margin: 0, whiteSpace: "nowrap" }}>{item.label}</p>
                <p style={{ color: active ? "rgba(255,255,255,.7)" : P.muted, fontSize: 10, margin: 0 }}>{item.desc}</p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Auth action */}
      <div style={{ padding: "10px", borderTop: `1px solid ${P.mist}`, flexShrink: 0 }}>
        {user ? (
          <button
            className="nav-item"
            onClick={() => { logout(); navigate("/"); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", background: "transparent", border: "none", color: "#dc2626", fontFamily: P.font }}
          >
            {Icon.logout}<span>Sign Out</span>
          </button>
        ) : (
          <button
            className="nav-item"
            onClick={() => navigate("/signin")}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", background: "transparent", border: "none", color: P.ocean, fontFamily: P.font }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
            <span>Sign In</span>
          </button>
        )}
      </div>
    </aside>
  );
}