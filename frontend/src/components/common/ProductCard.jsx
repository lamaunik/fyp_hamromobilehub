import { useState } from "react";
import { P, BADGE_COLORS, pct } from "../dashboard/DashboardConstants";
import { Icon } from "../dashboard/DashboardIcons";
import { Stars, ProductThumb } from "../dashboard/DashboardUI";

export default function ProductCard({ product: p, onView, onAddToCart, wishlisted, onToggleWish, delay = "0s" }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const bs = p.badge ? BADGE_COLORS[p.badge] : null;

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: P.white,
        border: `1px solid ${P.mist}`,
        borderRadius: 16,
        padding: 14,
        cursor: "pointer",
        position: "relative",
        animationName: "fadeUp",
        animationDuration: ".4s",
        animationTimingFunction: "ease",
        animationFillMode: "both",
        animationDelay: delay,
        fontFamily: P.font,
      }}
    >
      {/* Wishlist btn */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleWish(); }}
        style={{
          position: "absolute", top: 12, right: 12, zIndex: 2,
          background: wishlisted ? "rgba(244, 63, 94, 0.1)" : P.white,
          border: `1px solid ${wishlisted ? "rgba(244, 63, 94, 0.3)" : P.mist}`,
          borderRadius: "50%", width: 32, height: 32,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all .2s ease", color: wishlisted ? P.accent : P.muted
        }}
        onMouseEnter={(e) => { if(!wishlisted) { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.color = P.navy; } }}
        onMouseLeave={(e) => { if(!wishlisted) { e.currentTarget.style.background = P.white; e.currentTarget.style.color = P.muted; } }}
      >
        <svg width="18" height="18" fill={wishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Image area */}
      <div onClick={onView}>
        <div style={{
          position: "relative",
          background: P.mistBg,
          borderRadius: 12, height: 160,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16, overflow: "hidden", color: P.sky
        }}>
          {p.images && p.images.length > 0 ? (
            <img 
              src={p.images[0].startsWith("http") ? p.images[0] : `http://localhost:5000${p.images[0]}`} 
              alt={p.name} 
              style={{ width: "100%", height: "100%", objectFit: "contain", padding: 12, transition: "transform 0.4s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }} 
            />
          ) : (
            <div style={{ transition: "transform 0.4s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }}><ProductThumb cat={p.cat} size={38} /></div>
          )}
          {bs && (
            <span style={{ position: "absolute", top: 10, left: 10, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", padding: "4px 10px", borderRadius: 8, background: bs.bg, color: bs.text, border: `1px solid ${bs.border}` }}>
              {p.badge}
            </span>
          )}
          {p.old && (
            <span style={{ position: "absolute", top: 10, right: wishlisted ? 50 : 10, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", padding: "4px 8px", borderRadius: 8, background: P.mist, color: P.muted, border: `1px solid ${P.sky}` }}>
              -{pct(p.price, p.old)}%
            </span>
          )}
        </div>
        <p style={{ fontSize: 11, color: P.muted, fontWeight: 600, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", justifyContent: "space-between" }}>
          <span>{p.brand || "Generic"}</span>
          <span style={{ color: P.ocean }}>{p.vendor?.storeName || p.vendor?.name || ""}</span>
        </p>
        <h3 style={{ color: P.navy, fontWeight: 700, fontSize: 14, margin: "0 0 8px", lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{p.name}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <Stars n={p.rating} />
          <span style={{ fontSize: 11, color: P.muted, fontWeight: 600 }}>({p.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: P.navy, fontFamily: P.fontHeading, fontWeight: 800, fontSize: 18, letterSpacing: "0.5px" }}>Rs. {p.price.toLocaleString()}</span>
          {p.old && <span style={{ color: P.muted, fontSize: 12, textDecoration: "line-through", fontWeight: 500 }}>Rs. {p.old.toLocaleString()}</span>}
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={p.stock > 0 ? handleAdd : undefined}
        disabled={p.stock <= 0}
        style={{
          width: "100%", marginTop: 14, padding: "10px 0",
          background: p.stock <= 0 ? P.mist : (added ? "#10b981" : P.navy),
          color: p.stock <= 0 ? P.muted : P.white, 
          fontSize: 12, fontWeight: 700, borderRadius: 10, border: "none",
          cursor: p.stock <= 0 ? "not-allowed" : "pointer",
          opacity: (hovered || added || p.stock <= 0) ? 1 : 0,
          transition: "opacity .2s ease, background .3s ease",
          fontFamily: P.font, textTransform: "uppercase", letterSpacing: "0.5px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        {p.stock <= 0 ? "Out of Stock" : (added ? <>{Icon.check} Added!</> : "+ Add to Cart")}
      </button>
    </div>
  );
}