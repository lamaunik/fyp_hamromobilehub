import { useState } from "react";
import { P, pct, BADGE_COLORS } from "./DashboardConstants";
import { Icon } from "./DashboardIcons";
import { Btn, Stars, ProductThumb } from "./DashboardUI";
import ProductCard from "../common/ProductCard";

export default function DashboardProductDetail({ product, viewProduct, addToCart, wishlist, toggleWish, setTab, products }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 16 }}>
        <p style={{ color: P.muted, fontSize: 16 }}>Product not found.</p>
        <Btn onClick={() => setTab("home")} style={{ background: P.mistBg, color: P.navy, border: `1px solid ${P.mist}`, padding: "10px 20px", borderRadius: 12 }}>← Back to Home</Btn>
      </div>
    );
  }

  const pId = product._id || product.id;
  const isWishlisted = wishlist.includes(pId);
  const bs = product.badge ? BADGE_COLORS[product.badge] : null;

  // Related: same category, different vendor, max 6
  const vendorId = product.vendor?._id || product.vendor?.id || product.vendor;
  const related = (products || [])
    .filter(p => {
      const pVendorId = p.vendor?._id || p.vendor?.id || p.vendor;
      const pid = p._id || p.id;
      return pid !== pId && p.category === product.category && pVendorId !== vendorId;
    })
    .slice(0, 6);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page slideRight" style={{ padding: "28px 32px", fontFamily: P.font, display: "flex", flexDirection: "column", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
      
      {/* Top Nav: Back Button and Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button 
          onClick={() => setTab("products")} 
          style={{ 
            display: "flex", alignItems: "center", gap: 8, 
            background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 12, padding: "8px 16px",
            color: P.navy, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .2s"
          }}
          className="btn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: P.muted, fontSize: 12, fontWeight: 600 }}>
          <span onClick={() => setTab("home")} style={{ cursor: "pointer", transition: "color .2s" }} onMouseEnter={(e) => e.target.style.color = P.ocean} onMouseLeave={(e) => e.target.style.color = P.muted}>Home</span>
          <span>/</span>
          <span onClick={() => setTab("products")} style={{ cursor: "pointer", transition: "color .2s" }} onMouseEnter={(e) => e.target.style.color = P.ocean} onMouseLeave={(e) => e.target.style.color = P.muted}>Products</span>
          <span>/</span>
          <span style={{ color: P.navy }}>{product.category || "Details"}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        
        {/* Left: Image Gallery (Single Image for now) */}
        <div style={{ flex: "1 1 400px", maxWidth: 500, position: "relative" }}>
          <div style={{ 
            position: "relative",
            background: `linear-gradient(135deg,${P.mistBg},${P.mist})`,
            borderRadius: 24, padding: 32, height: 450,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(40, 43, 74, .1)",
            border: `1.5px solid ${P.mist}`
          }}>
            {/* Wishlist Heart */}
            <button
              onClick={() => toggleWish(pId)}
              style={{
                position: "absolute", top: 16, right: 16, zIndex: 10,
                background: isWishlisted ? "rgba(239,68,68,.1)" : P.white,
                border: `1px solid ${isWishlisted ? "rgba(239,68,68,.3)" : P.mist}`,
                borderRadius: "50%", width: 44, height: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all .18s",
                boxShadow: "0 4px 12px rgba(0,0,0,.06)"
              }}
              className="icon-btn"
            >
              <svg width="22" height="22" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            {bs && (
              <span style={{ position: "absolute", top: 16, left: 16, fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 999, background: bs.bg, border: `1px solid ${bs.border}`, color: bs.text, zIndex: 10 }}>
                {product.badge}
              </span>
            )}
            
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[0].startsWith("http") ? product.images[0] : `http://localhost:5000${product.images[0]}`} 
                alt={product.name} 
                style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply", filter: "drop-shadow(0 20px 30px rgba(0,0,0,.15))" }} 
                className="float"
              />
            ) : (
              <div style={{ color: P.sky, transform: "scale(2.5)" }}>
                <ProductThumb cat={product.category} size={64} />
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Details & Actions */}
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", py: 10 }}>
          
          <p style={{ color: P.ocean, fontWeight: 900, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 8px" }}>
            {product.brand || "Hamro Mobile"}
          </p>
          
          <h1 style={{ color: P.navy, fontWeight: 900, fontSize: 32, margin: "0 0 12px", lineHeight: 1.2 }}>
            {product.name}
          </h1>
          
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Stars n={product.rating || 0} size={16} />
            </div>
            <span style={{ fontSize: 14, color: P.muted, fontWeight: 600 }}>{product.rating || "0.0"} Rating</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: P.mist }} />
            <span style={{ fontSize: 14, color: P.muted, fontWeight: 600 }}>{product.reviews || 0} Reviews</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 28 }}>
            <span style={{ color: P.navy, fontWeight: 900, fontSize: 36, lineHeight: 1 }}>Rs. {product.price?.toLocaleString()}</span>
            {product.old && product.old > product.price && (
              <>
                <span style={{ color: P.muted, fontSize: 18, textDecoration: "line-through", marginBottom: 4, fontWeight: 600 }}>Rs. {product.old?.toLocaleString()}</span>
                <span style={{ background: "rgba(40, 43, 74, .1)", border: "1px solid rgba(40, 43, 74, .25)", color: P.ocean, padding: "4px 8px", borderRadius: 8, fontSize: 12, fontWeight: 800, marginBottom: 6 }}>
                  Save {pct(product.price, product.old)}%
                </span>
              </>
            )}
          </div>

          <div style={{ background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 16, padding: "18px 24px", marginBottom: 32, boxShadow: "0 4px 16px rgba(40, 43, 74, .02)" }}>
            <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 15, margin: "0 0 8px" }}>Description</h3>
            <p style={{ color: P.muted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              {product.description || `Experience the ultimate in mobile technology with the ${product.name}. Featuring a stunning display, lightning-fast processor, and an advanced camera system that captures every detail. Designed to keep up with your busy lifestyle while providing premium elegance.`}
            </p>
          </div>
          
          {/* Vendor Info & Date */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32, padding: "12px 16px", background: P.mistBg, borderRadius: 16, border: `1px solid ${P.mist}`, width: "fit-content" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: P.white, border: `1px solid ${P.mist}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {product.vendor?.profilePicture ? (
                <img src={product.vendor.profilePicture.startsWith("http") ? product.vendor.profilePicture : `http://localhost:5000${product.vendor.profilePicture}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ color: P.ocean, fontWeight: 900, fontSize: 14 }}>{product.vendor?.name?.[0] || "V"}</span>
              )}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: P.navy, fontWeight: 800 }}>Posted by <span style={{ color: P.ocean }}>{product.vendor?.storeName || product.vendor?.name || "Official Store"}</span></p>
              <p style={{ margin: 0, fontSize: 10, color: P.muted, fontWeight: 700 }}>{product.createdAt ? new Date(product.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "Recently listed"}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: "auto" }}>
            {/* Quantity Selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", background: P.mistBg, border: `1.5px solid ${P.mist}`, borderRadius: 14, height: 52, padding: "0 6px" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 40, borderRadius: 10, background: "transparent", border: "none", cursor: "pointer", color: P.navy, fontSize: 20, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }} className="icon-btn">-</button>
                <span style={{ width: 40, textAlign: "center", color: P.navy, fontWeight: 800, fontSize: 16 }}>{qty}</span>
                <button 
                  onClick={() => setQty(prev => Math.min(product.stock, prev + 1))} 
                  disabled={qty >= product.stock}
                  style={{ 
                    width: 40, height: 40, borderRadius: 10, background: "transparent", 
                    border: "none", cursor: qty >= product.stock ? "not-allowed" : "pointer", 
                    color: qty >= product.stock ? P.muted : P.navy, fontSize: 20, 
                    fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" 
                  }} 
                  className="icon-btn"
                >+</button>
              </div>
              {qty >= product.stock && product.stock > 0 && <p style={{ color: P.red, fontSize: 10, fontWeight: 700, margin: 0, textAlign: "center" }}>Max stock reached</p>}
            </div>
            
            {/* Add to Cart Button */}
            <Btn 
              onClick={product.stock > 0 ? handleAdd : undefined} 
              disabled={product.stock <= 0}
              style={{ 
                flex: 1, height: 52, 
                background: product.stock <= 0 ? P.mist : (added ? `linear-gradient(135deg,#16a34a,${P.green})` : `linear-gradient(135deg,${P.royal},${P.ocean})`), 
                color: product.stock <= 0 ? P.muted : P.white, 
                fontSize: 16, fontWeight: 800, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, 
                boxShadow: added ? "0 8px 24px rgba(34,197,94,.3)" : (product.stock <= 0 ? "none" : "0 8px 24px rgba(40, 43, 74, .25)"), 
                transition: "all .3s",
                cursor: product.stock <= 0 ? "not-allowed" : "pointer"
              }} 
              className="btn"
            >
              {product.stock <= 0 ? "Out of Stock" : (added ? <>{Icon.check} Added to Cart</> : <><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add to Cart</>)}
            </Btn>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 24, paddingTop: 20, borderTop: `1px solid ${P.mist}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: P.muted, fontSize: 13, fontWeight: 600 }}>
              <span style={{ color: P.green }}>{Icon.check}</span> In Stock
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: P.muted, fontSize: 13, fontWeight: 600 }}>
              <span style={{ color: P.sky }}>{Icon.truck}</span> Free Shipping
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: P.muted, fontSize: 13, fontWeight: 600 }}>
              <span style={{ color: P.sky }}>{Icon.shield}</span> 1 Year Warranty
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: `2px solid ${P.mist}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 20, margin: 0, letterSpacing: "-.02em" }}>Related Products</h2>
              <p style={{ color: P.muted, fontSize: 13, margin: "4px 0 0", fontWeight: 600 }}>More {product.category} from other vendors</p>
            </div>
            <span style={{ background: P.mistBg, border: `1px solid ${P.mist}`, color: P.ocean, fontWeight: 800, fontSize: 12, padding: "4px 12px", borderRadius: 999 }}>{related.length} items</span>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24
          }}>
            {related.map((p, i) => {
              const relId = p._id || p.id;
              return (
                <ProductCard
                  key={relId}
                  product={p}
                  onView={() => viewProduct(p)}
                  onAddToCart={() => addToCart(p)}
                  wishlisted={wishlist.includes(relId)}
                  onToggleWish={() => toggleWish(relId)}
                  delay={`${Math.min(i * 0.06, 0.3)}s`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}