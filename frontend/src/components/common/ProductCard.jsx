import { useState } from "react";
import { P, BADGE_COLORS, pct, COLOR_MAP } from "../dashboard/DashboardConstants";
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
        borderRadius: 24,
        cursor: "pointer",
        position: "relative",
        animationName: "fadeUp",
        animationDuration: ".5s",
        animationTimingFunction: "ease",
        animationFillMode: "both",
        animationDelay: delay,
        fontFamily: P.font,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 10px 40px rgba(0,0,0,0.04)"
      }}
    >
      <div onClick={onView} style={{ position: "relative" }}>
        {/* Full-Bleed Image Section */}
        <div style={{
          position: "relative",
          height: 220,
          background: "#fdfdfd",
          width: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden"
        }}>
          {p.images && p.images.length > 0 ? (
            <img 
              src={p.images[0].startsWith("http") ? p.images[0] : `http://localhost:5000${p.images[0]}`} 
              alt={p.name} 
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", transform: (hovered && p.stock > 0) ? "scale(1.08)" : "scale(1)", filter: p.stock <= 0 ? "grayscale(0.5)" : "none" }} 
            />
          ) : (
            <div style={{ transition: "transform 0.6s ease", transform: (hovered && p.stock > 0) ? "scale(1.08)" : "scale(1)" }}><ProductThumb cat={p.cat} size={48} /></div>
          )}

          {p.stock <= 0 && (
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5, backdropFilter: "blur(2px)" }}>
               <span style={{ background: P.white, color: "#ef4444", fontWeight: 900, fontSize: 11, padding: "6px 14px", borderRadius: 100, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", letterSpacing: "0.05em", border: "1.5px solid #ef4444" }}>
                 OUT OF STOCK
               </span>
            </div>
          )}

          {/* Floating Badges */}
          <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 8 }}>
            <span style={{ background: "rgba(255,255,255,0.95)", color: P.navy, fontSize: 10, fontWeight: 800, padding: "5px 12px", borderRadius: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", backdropFilter:"blur(4px)" }}>
              {p.badge || "Good"}
            </span>
          </div>
          <div style={{ position: "absolute", top: 12, right: 12 }}>
            <span style={{ background: "rgba(255,255,255,0.95)", color: P.navy, fontSize: 10, fontWeight: 700, padding: "5px 12px", borderRadius: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", backdropFilter:"blur(4px)" }}>
              {p.category || "Smartphones"}
            </span>
          </div>

          {/* Wishlist Floating Btn - Moved here to image corner */}
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWish(); }}
            style={{
              position: "absolute", bottom: 12, right: 12, zIndex: 10,
              background: wishlisted ? "#ef4444" : "rgba(255,255,255,0.9)",
              border: "none", borderRadius: "50%", width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all .2s ease", color: wishlisted ? "white" : P.muted,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>


        {/* Text Content */}
        <div style={{ padding: "20px 20px 24px" }}>
          <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 19, margin: "0 0 8px", lineHeight: 1.2 }}>{p.name}</h3>
          
          <p style={{ color: P.muted, fontSize: 12, lineHeight: 1.5, margin: "0 0 16px", minHeight: 36, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
             {p.description || "Top performance, premium condition, and officially verified local warranty included."}
          </p>

          {/* Meta Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: P.muted, fontSize: 11, fontWeight: 500 }}>
              {Icon.map}
              <span>{p.vendor?.storeLocation || "Baneshwor, Kathmandu"}</span>
              <span style={{ margin: "0 4px", opacity: 0.3 }}>•</span>
              <span style={{ fontSize: 11 }}>by <b style={{ color: P.navy }}>{p.vendor?.storeName || p.vendor?.name || "Official Hub"}</b></span>
            </div>

            {/* Color preview dots */}
            {p.colors && p.colors.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {p.colors.slice(0, 5).map(c => (
                  <div key={c.name} title={c.name} style={{ width: 10, height: 10, borderRadius: "50%", background: c.hex, border: "1.5px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }} />
                ))}
                {p.colors.length > 5 && <span style={{ fontSize: 9, color: P.muted, fontWeight: 800 }}>+{p.colors.length - 5}</span>}
              </div>
            )}
          </div>

          {/* Footer Area */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
               <span style={{ color: P.navy, fontWeight: 900, fontSize: 24 }}>Rs. {p.price.toLocaleString()}</span>
            </div>
            
            <button
              onClick={handleAdd}
              disabled={p.stock <= 0}
              style={{
                background: p.stock <= 0 ? P.mist : P.navy, color: p.stock <= 0 ? P.muted : P.white, 
                fontSize: 13, fontWeight: 800, borderRadius: 12, border: "none",
                cursor: p.stock <= 0 ? "not-allowed" : "pointer", transition: "all .2s ease",
                padding: "10px 20px", display: "flex", alignItems: "center", gap: 8,
                boxShadow: p.stock <= 0 ? "none" : "0 4px 14px rgba(40, 43, 74, 0.2)"
              }}
              onMouseEnter={e => p.stock > 0 && (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => p.stock > 0 && (e.currentTarget.style.transform = "scale(1)")}
            >
              {p.stock > 0 ? Icon.cart : <span style={{fontSize: 14}}>●</span>}
              <span>{p.stock <= 0 ? "Out of Stock" : (added ? "Added" : "Add to Cart")}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}