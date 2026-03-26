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
        border: `1.5px solid ${P.mist}`,
        borderRadius: 16,
        padding: 14,
        cursor: "pointer",
        position: "relative",
        animationName: "fadeUp",
        animationDuration: ".4s",
        animationTimingFunction: "cubic-bezier(.4,0,.2,1)",
        animationFillMode: "both",
        animationDelay: delay,
        fontFamily: P.font,
      }}
    >
      {/* Wishlist btn */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleWish(); }}
        style={{
          position: "absolute", top: 10, right: 10, zIndex: 2,
          background: wishlisted ? "rgba(239,68,68,.1)" : P.mistBg,
          border: `1px solid ${wishlisted ? "rgba(239,68,68,.3)" : P.mist}`,
          borderRadius: "50%", width: 28, height: 28,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all .18s",
        }}
      >
        {Icon.heart(wishlisted)}
      </button>

      {/* Image area */}
      <div onClick={onView}>
        <div style={{
          position: "relative",
          background: `linear-gradient(135deg,${P.mistBg},${P.mist})`,
          borderRadius: 12, height: 110,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 10, overflow: "hidden", color: P.sky,
        }}>
          {p.images && p.images.length > 0 ? (
            <img 
              src={p.images[0].startsWith("http") ? p.images[0] : `http://localhost:5000${p.images[0]}`} 
              alt={p.name} 
              style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} 
            />
          ) : (
            <ProductThumb cat={p.cat} size={38} />
          )}
          {bs && (
            <span style={{ position: "absolute", top: 8, left: 8, fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 999, background: bs.bg, border: `1px solid ${bs.border}`, color: bs.text }}>
              {p.badge}
            </span>
          )}
          <span style={{ position: "absolute", top: 8, right: 8, fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 999, background: "rgba(40, 43, 74, .1)", border: "1px solid rgba(40, 43, 74, .2)", color: P.ocean }}>
            -{pct(p.price, p.old)}%
          </span>
        </div>
        <p style={{ fontSize: 10, color: P.ocean, fontWeight: 800, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: ".04em" }}>{p.brand}</p>
        <h3 style={{ color: P.navy, fontWeight: 700, fontSize: 13, margin: "0 0 5px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", lineHeight: 1.4 }}>{p.name}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
          <Stars n={p.rating} />
          <span style={{ fontSize: 11, color: P.muted }}>{p.rating} ({p.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: P.navy, fontWeight: 900, fontSize: 16 }}>Rs. {p.price}</span>
          <span style={{ color: P.muted, fontSize: 11, textDecoration: "line-through" }}>Rs. {p.old}</span>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        style={{
          width: "100%", marginTop: 10, padding: "8px 0",
          background: added ? `linear-gradient(135deg,#16a34a,${P.green})` : `linear-gradient(135deg,${P.royal},${P.ocean})`,
          color: P.white, fontSize: 11, fontWeight: 700, borderRadius: 10, border: "none",
          cursor: "pointer",
          opacity: hovered || added ? 1 : 0,
          transition: "opacity .18s, background .35s",
          fontFamily: P.font,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
        }}
      >
        {added ? <>{Icon.check} Added!</> : "+ Add to Cart"}
      </button>
    </div>
  );
}