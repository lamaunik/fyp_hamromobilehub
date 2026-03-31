import { useState } from "react";
import { P } from "./DashboardConstants";
import { Icon } from "./DashboardIcons";
import { Btn, ProductThumb } from "./DashboardUI";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function DashboardCart({ cart, removeFromCart, updateQty, setTab, addNotif, clearCart, addOrder, wishlist = [], removeFromWishlist }) {
  const [promo,    setPromo]   = useState("");
  const [promoOk,  setPromoOk] = useState(false);
  const [checking, setChecking]= useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const shipping  = subtotal > 500 ? 0 : 29;
  const discount  = promoOk ? Math.round(subtotal * .1) : 0;
  const tax       = Math.round((subtotal - discount) * .08);
  const total     = subtotal - discount + shipping + tax;

  const applyPromo = () => {
    setChecking(true);
    setTimeout(() => { setChecking(false); if (promo.trim().toUpperCase() === "SAVE10") setPromoOk(true); }, 800);
  };

  const handleProceedToCheckout = () => {
    setTab("checkout");
  };

  /* Empty state */
  if (cart.length === 0) return (
    <div className="page" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", padding: 40, textAlign: "center", fontFamily: P.font }}>
      <div className="float" style={{ width: 100, height: 100, borderRadius: 28, background: `linear-gradient(135deg,${P.mist},${P.sky})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, color: P.royal, boxShadow: "0 12px 36px rgba(40, 43, 74, .16)" }}>{Icon.cart}</div>
      <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 24, margin: "0 0 10px" }}>Your cart is empty</h2>
      <p style={{ color: P.muted, fontSize: 14, margin: "0 0 28px", lineHeight: 1.6 }}>Add some great products to get started!</p>
      <Btn onClick={() => setTab("products")} cls="btn" style={{ background: `linear-gradient(135deg,${P.royal},${P.ocean})`, color: P.white, fontWeight: 800, fontSize: 14, padding: "12px 28px", borderRadius: 12, boxShadow: "0 4px 16px rgba(40, 43, 74, .3)" }}>Browse Products →</Btn>
    </div>
  );

  return (
    <div className="page" style={{ padding: "28px 32px", fontFamily: P.font }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 22, margin: 0, letterSpacing: "-.02em" }}>Shopping Cart</h2>
          <p style={{ color: P.muted, fontSize: 13, margin: "4px 0 0" }}>{cart.reduce((s, p) => s + p.qty, 0)} item{cart.reduce((s, p) => s + p.qty, 0) !== 1 ? "s" : ""}</p>
        </div>
        {subtotal < 500 ? (
          <div style={{ textAlign: "right", minWidth: 230 }}>
            <p style={{ color: P.navy, fontSize: 12, fontWeight: 700, margin: "0 0 6px" }}>Add <span style={{ color: P.ocean }}>Rs. {500 - subtotal}</span> more for FREE shipping!</p>
            <div style={{ height: 7, background: P.mist, borderRadius: 999, overflow: "hidden", width: 230 }}>
              <div style={{ height: "100%", background: `linear-gradient(90deg,${P.royal},${P.ocean})`, borderRadius: 999, width: `${Math.min((subtotal / 500) * 100, 100)}%`, transition: "width .5s cubic-bezier(.4,0,.2,1)" }} />
            </div>
          </div>
        ) : (
          <div style={{ background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.25)", color: "#16a34a", borderRadius: 12, padding: "8px 16px", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", gap: 6 }}>{Icon.check} FREE Shipping Unlocked!</div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>

        {/* Cart Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map((item, i) => (
            <div key={item._id || item.id} className="card" style={{ background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 18, padding: "16px 20px", display: "flex", alignItems: "center", gap: 18, animationName: "fadeUp", animationDuration: ".38s", animationTimingFunction: "cubic-bezier(.4,0,.2,1)", animationFillMode: "both", animationDelay: `${i * .07}s` }}>
              <div style={{ background: `linear-gradient(135deg,${P.mistBg},${P.mist})`, borderRadius: 14, width: 74, height: 74, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${P.mist}`, color: P.sky, overflow: "hidden" }}>
                {item.images && item.images.length > 0 ? (
                  <img src={item.images[0].startsWith("http") ? item.images[0] : `http://localhost:5000${item.images[0]}`} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
                ) : (
                  <ProductThumb cat={item.cat} size={32} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 10, color: P.ocean, fontWeight: 800, margin: "0 0 3px", textTransform: "uppercase" }}>{item.brand}</p>
                <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 15, margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</h3>
                <p style={{ color: P.navy, fontWeight: 900, fontSize: 17, margin: 0 }}>Rs. {item.price} <span style={{ color: P.muted, fontSize: 11, fontWeight: 400 }}>per unit</span></p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                {/* Qty stepper */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${P.mist}`, borderRadius: 12, overflow: "hidden", background: P.mistBg }}>
                    <button onClick={() => updateQty(item._id || item.id, item.qty - 1)} style={{ padding: "8px 13px", background: "transparent", border: "none", color: P.navy, fontWeight: 800, fontSize: 15, cursor: "pointer", transition: "background .15s" }} onMouseEnter={(e) => (e.currentTarget.style.background = P.sky)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>−</button>
                    <span style={{ padding: "8px 14px", fontWeight: 900, color: P.navy, fontSize: 14, borderLeft: `1px solid ${P.mist}`, borderRight: `1px solid ${P.mist}`, minWidth: 38, textAlign: "center" }}>{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item._id || item.id, item.qty + 1)} 
                      disabled={item.qty >= item.stock}
                      style={{ 
                        padding: "8px 13px", background: "transparent", border: "none", 
                        color: item.qty >= item.stock ? P.muted : P.navy, 
                        fontWeight: 800, fontSize: 15, 
                        cursor: item.qty >= item.stock ? "not-allowed" : "pointer", 
                        transition: "background .15s" 
                      }} 
                      onMouseEnter={(e) => { if (item.qty < item.stock) e.currentTarget.style.background = P.sky; }} 
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >+</button>
                  </div>
                  {item.qty >= item.stock && <p style={{ color: P.red, fontSize: 10, fontWeight: 700, margin: 0, textAlign: "center" }}>Max stock reached</p>}
                </div>
                <div style={{ textAlign: "right", minWidth: 80 }}>
                  <p style={{ color: P.navy, fontWeight: 900, fontSize: 17, margin: 0 }}>Rs. {item.price * item.qty}</p>
                  {item.qty > 1 && <p style={{ color: P.muted, fontSize: 11, margin: "2px 0 0" }}>{item.qty}×Rs.{item.price}</p>}
                </div>
                {/* Remove */}
                <button onClick={() => removeFromCart(item._id || item.id)} style={{ width: 36, height: 36, borderRadius: 10, border: `1.5px solid ${P.mist}`, background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center", color: P.muted, cursor: "pointer", transition: "all .17s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,.09)"; e.currentTarget.style.color = P.red; e.currentTarget.style.borderColor = "rgba(220,38,38,.28)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.color = P.muted; e.currentTarget.style.borderColor = P.mist; }}>
                  {Icon.trash}
                </button>
              </div>
            </div>
          ))}
          <div style={{ paddingTop: 8, borderTop: `1px solid ${P.mist}` }}>
            <Btn onClick={() => setTab("products")} style={{ background: "none", border: "none", color: P.ocean, fontSize: 13, fontWeight: 700, padding: "8px 0", display: "flex", alignItems: "center", gap: 6 }}>
              {Icon.back} Continue shopping
            </Btn>
          </div>
        </div>

        {/* Order Summary */}
        <div className="slideRight" style={{ background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 22, padding: "24px 26px", boxShadow: "0 8px 32px rgba(40, 43, 74, .08)", position: "sticky", top: 20 }}>
          <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 17, margin: "0 0 20px" }}>Order Summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 18 }}>
            {[
              { l: `Subtotal (${cart.reduce((s, p) => s + p.qty, 0)} items)`, v: `Rs. ${subtotal}`,          c: P.navy },
              { l: "Shipping",                                                   v: shipping === 0 ? "FREE" : `Rs. ${shipping}`, c: shipping === 0 ? "#16a34a" : P.navy },
              promoOk && { l: "Promo (SAVE10)", v: `-Rs. ${discount}`, c: "#16a34a" },
              { l: "Tax (8%)", v: `Rs. ${tax}`, c: P.navy },
            ].filter(Boolean).map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: P.muted, fontSize: 13, fontWeight: 600 }}>{r.l}</span>
                <span style={{ color: r.c, fontWeight: 700, fontSize: 13 }}>{r.v}</span>
              </div>
            ))}
            <div style={{ borderTop: `1.5px solid ${P.mist}`, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: P.navy, fontWeight: 900, fontSize: 15 }}>Total</span>
              <span style={{ color: P.navy, fontWeight: 900, fontSize: 24, letterSpacing: "-.02em" }}>Rs. {total}</span>
            </div>
          </div>

          {/* Promo code */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".08em", textTransform: "uppercase", margin: "0 0 8px" }}>Promo Code</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={promo} onChange={(e) => setPromo(e.target.value)} disabled={promoOk}
                placeholder={promoOk ? "SAVE10 applied ✓" : "Try SAVE10"}
                style={{ flex: 1, border: `1.5px solid ${promoOk ? "rgba(22,163,74,.4)" : P.mist}`, borderRadius: 10, padding: "9px 12px", fontSize: 12, color: promoOk ? "#16a34a" : P.navy, outline: "none", fontFamily: P.font, background: promoOk ? "rgba(22,163,74,.06)" : P.mistBg, transition: "all .2s" }}
                onFocus={(e) => { if (!promoOk) e.target.style.borderColor = P.sky; }}
                onBlur={(e)  => { if (!promoOk) e.target.style.borderColor = P.mist; }}
              />
              {!promoOk
                ? <Btn onClick={applyPromo} cls="btn" style={{ padding: "9px 14px", background: P.mistBg, border: `1.5px solid ${P.mist}`, borderRadius: 10, fontSize: 12, fontWeight: 700, color: P.royal }}>
                    {checking ? <span className="spin" style={{ display: "inline-block", width: 12, height: 12, border: `2px solid ${P.ocean}`, borderTopColor: "transparent", borderRadius: "50%" }} /> : "Apply"}
                  </Btn>
                : <div style={{ width: 40, height: 38, borderRadius: 10, background: "rgba(22,163,74,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a" }}>{Icon.check}</div>
              }
            </div>
          </div>

          {/* Checkout */}
          <Btn onClick={handleProceedToCheckout} cls="btn" style={{ width: "100%", padding: "15px 0", background: P.royal, color: P.white, fontWeight: 900, fontSize: 14, borderRadius: 14, boxShadow: "0 6px 20px rgba(40, 43, 74, .3)", transition: "background .4s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            Proceed to Checkout →
          </Btn>

          {/* Trust row */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${P.mist}` }}>
            {[{ i: Icon.lock, l: "SSL Secure" }, { i: Icon.refresh, l: "Easy Returns" }, { i: Icon.shield, l: "Verified" }].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>{t.i}<span style={{ color: P.muted, fontSize: 11, fontWeight: 600 }}>{t.l}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}