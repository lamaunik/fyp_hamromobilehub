import { useState } from "react";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const STYLES = `
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideInRight {
    from { opacity:0; transform:translateX(28px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes emptyBounce {
    0%,100% { transform:translateY(0); }
    40%     { transform:translateY(-14px); }
    60%     { transform:translateY(-7px); }
  }
  @keyframes checkPop {
    0%   { transform:scale(0) rotate(-20deg); opacity:0; }
    60%  { transform:scale(1.18) rotate(4deg); opacity:1; }
    100% { transform:scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes progressFill {
    from { width:0%; }
    to   { width:var(--prog,60%); }
  }
  @keyframes shimmer {
    0%   { background-position:-400px 0; }
    100% { background-position:400px 0; }
  }
  @keyframes badgePulse {
    0%,100% { box-shadow:0 0 0 0 rgba(1,138,190,0.4); }
    50%     { box-shadow:0 0 0 6px rgba(1,138,190,0); }
  }
  .cart-item    { animation: fadeUp 0.38s cubic-bezier(.4,0,.2,1) both; }
  .cart-summary { animation: slideInRight 0.42s 0.08s cubic-bezier(.4,0,.2,1) both; }
  .empty-icon   { animation: emptyBounce 2s 0.4s ease-in-out infinite; }
  .empty-wrap   { animation: fadeUp 0.5s cubic-bezier(.4,0,.2,1) both; }
  .check-anim   { animation: checkPop 0.4s cubic-bezier(.4,0,.2,1) both; }
  .progress-bar { animation: progressFill 0.9s 0.3s cubic-bezier(.4,0,.2,1) both; }
  .free-badge   { animation: badgePulse 2s infinite; }
  .cart-row-btn { transition: all 0.17s cubic-bezier(.4,0,.2,1) !important; }
  .cart-row-btn:hover  { transform:scale(1.09) !important; }
  .cart-row-btn:active { transform:scale(0.93) !important; }
  .qty-btn { transition: background 0.15s, color 0.15s !important; }
  .qty-btn:hover { background:${P.sky} !important; color:${P.navy} !important; }
  .checkout-btn { transition: transform 0.18s, box-shadow 0.18s !important; }
  .checkout-btn:hover { transform:translateY(-2px) !important; box-shadow:0 10px 28px rgba(1,138,190,0.38) !important; }
  .checkout-btn:active { transform:translateY(0) !important; }
  .remove-btn:hover { background:rgba(220,38,38,0.09) !important; color:#ef4444 !important; border-color:rgba(220,38,38,0.28) !important; transform:scale(1.1) !important; }
`;

const PhoneIcon = () => (
  <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
  </svg>
);

export default function DashboardCart({ cart, removeFromCart, updateQty }) {
  const [promoCode, setPromoCode]     = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutClicked, setCheckoutClicked] = useState(false);

  const subtotal  = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
  const shipping  = subtotal > 500 ? 0 : 29;
  const discount  = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const tax       = Math.round((subtotal - discount) * 0.08);
  const total     = subtotal - discount + shipping + tax;
  const freeShipProgress = Math.min((subtotal / 500) * 100, 100);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE10") setPromoApplied(true);
  };

  // ── Empty state ──
  if (cart.length === 0) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="empty-wrap" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"70vh", padding:40, textAlign:"center", fontFamily:P.font }}>
          <div className="empty-icon" style={{ width:100, height:100, borderRadius:28, background:`linear-gradient(135deg,${P.mist},${P.sky})`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24, color:P.royal, boxShadow:`0 12px 36px rgba(1,138,190,0.16)` }}>
            <svg width="46" height="46" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h2 style={{ color:P.navy, fontWeight:900, fontSize:24, margin:"0 0 10px", letterSpacing:"-0.02em" }}>Your cart is empty</h2>
          <p style={{ color:P.muted, fontSize:14, margin:"0 0 28px", lineHeight:1.6, maxWidth:300 }}>Looks like you haven't added anything yet. Discover great deals on our products!</p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
            {["Smartphones","Laptops","Tablets","Accessories"].map((cat, i) => (
              <span key={cat} style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:10, padding:"7px 16px", fontSize:12, fontWeight:700, color:P.navy, animationName:"fadeUp", animationDuration:"0.4s", animationDelay:`${0.2+i*0.07}s`, animationFillMode:"both", animationTimingFunction:"cubic-bezier(.4,0,.2,1)", cursor:"pointer" }}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{STYLES}</style>
      <div style={{ padding:"28px 32px", fontFamily:P.font }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28, animation:"fadeUp 0.35s cubic-bezier(.4,0,.2,1) both" }}>
          <div>
            <h2 style={{ color:P.navy, fontWeight:900, fontSize:22, margin:0, letterSpacing:"-0.02em" }}>Shopping Cart</h2>
            <p style={{ color:P.muted, fontSize:13, margin:"4px 0 0" }}>{cart.reduce((s,p)=>s+p.qty,0)} item{cart.reduce((s,p)=>s+p.qty,0)!==1?"s":""} in your cart</p>
          </div>
          {/* Free shipping progress */}
          {subtotal < 500 && (
            <div style={{ textAlign:"right", minWidth:220 }}>
              <p style={{ color:P.navy, fontSize:12, fontWeight:700, margin:"0 0 6px" }}>
                Add <span style={{ color:P.ocean }}>${500-subtotal}</span> more for FREE shipping!
              </p>
              <div style={{ height:7, background:P.mist, borderRadius:999, overflow:"hidden", width:220 }}>
                <div className="progress-bar" style={{ "--prog":`${freeShipProgress}%`, height:"100%", background:`linear-gradient(90deg,${P.royal},${P.ocean})`, borderRadius:999 }}/>
              </div>
            </div>
          )}
          {subtotal >= 500 && (
            <div className="free-badge" style={{ background:"rgba(22,163,74,0.1)", border:"1px solid rgba(22,163,74,0.25)", color:"#16a34a", borderRadius:12, padding:"8px 16px", fontSize:13, fontWeight:800, display:"flex", alignItems:"center", gap:6 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              FREE Shipping Unlocked!
            </div>
          )}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:24, alignItems:"start" }}>

          {/* ── Cart Items ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {cart.map((item, i) => (
              <div key={item.id} className="cart-item" style={{
                animationDelay:`${i*0.07}s`,
                background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:18,
                padding:"16px 20px", display:"flex", alignItems:"center", gap:18,
                transition:"box-shadow 0.2s, border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow="0 6px 24px rgba(1,138,190,0.11)"; e.currentTarget.style.borderColor=P.sky; e.currentTarget.style.transform="translateX(3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor=P.mist; e.currentTarget.style.transform="translateX(0)"; }}>

                {/* Thumbnail */}
                <div style={{ background:`linear-gradient(135deg,${P.mistBg},${P.mist})`, borderRadius:14, width:74, height:74, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:P.sky, border:`1px solid ${P.mist}` }}>
                  <PhoneIcon/>
                </div>

                {/* Details */}
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:11, color:P.ocean, fontWeight:800, margin:"0 0 3px", letterSpacing:"0.04em", textTransform:"uppercase" }}>{item.brand}</p>
                  <h3 style={{ color:P.navy, fontWeight:800, fontSize:15, margin:"0 0 5px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.name}</h3>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ color:P.navy, fontWeight:900, fontSize:17 }}>${item.price}</span>
                    <span style={{ fontSize:11, color:P.muted }}>per unit</span>
                  </div>
                </div>

                {/* Controls */}
                <div style={{ display:"flex", alignItems:"center", gap:14, flexShrink:0 }}>
                  {/* Qty stepper */}
                  <div style={{ display:"flex", alignItems:"center", border:`1.5px solid ${P.mist}`, borderRadius:12, overflow:"hidden", background:P.mistBg }}>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty-1)}
                      style={{ padding:"8px 13px", background:"transparent", border:"none", color:P.navy, fontWeight:800, fontSize:15, cursor:"pointer" }}>−</button>
                    <span style={{ padding:"8px 14px", fontWeight:900, color:P.navy, fontSize:14, borderLeft:`1px solid ${P.mist}`, borderRight:`1px solid ${P.mist}`, minWidth:38, textAlign:"center" }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty+1)}
                      style={{ padding:"8px 13px", background:"transparent", border:"none", color:P.navy, fontWeight:800, fontSize:15, cursor:"pointer" }}>+</button>
                  </div>

                  {/* Line total */}
                  <div style={{ textAlign:"right", minWidth:80 }}>
                    <p style={{ color:P.navy, fontWeight:900, fontSize:17, margin:0 }}>${item.price * item.qty}</p>
                    {item.qty > 1 && <p style={{ color:P.muted, fontSize:11, margin:"2px 0 0" }}>{item.qty} × ${item.price}</p>}
                  </div>

                  {/* Remove */}
                  <button className="remove-btn cart-row-btn" onClick={() => removeFromCart(item.id)}
                    style={{ width:36, height:36, borderRadius:10, border:`1.5px solid ${P.mist}`, background:P.mistBg, display:"flex", alignItems:"center", justifyContent:"center", color:P.muted, cursor:"pointer", transition:"all 0.17s" }}>
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Continue shopping hint */}
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 4px", animation:"fadeUp 0.4s 0.35s cubic-bezier(.4,0,.2,1) both" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
              <span style={{ color:P.muted, fontSize:13, fontWeight:600 }}>Continue shopping</span>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="cart-summary" style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:22, padding:"24px 26px", boxShadow:"0 8px 32px rgba(0,27,72,0.08)", position:"sticky", top:80 }}>

            <h3 style={{ color:P.navy, fontWeight:900, fontSize:17, margin:"0 0 20px", letterSpacing:"-0.01em" }}>Order Summary</h3>

            {/* Line items */}
            <div style={{ display:"flex", flexDirection:"column", gap:13, marginBottom:18 }}>
              {[
                { label:`Subtotal (${cart.reduce((s,p)=>s+p.qty,0)} items)`, value:`$${subtotal}`, color:P.navy },
                { label:"Shipping",  value: shipping===0 ? "FREE" : `$${shipping}`, color: shipping===0 ? "#16a34a" : P.navy },
                promoApplied && { label:"Promo (SAVE10)", value:`-$${discount}`, color:"#16a34a" },
                { label:"Tax (8%)", value:`$${tax}`, color:P.navy },
              ].filter(Boolean).map((row, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color:P.muted, fontSize:13, fontWeight:600 }}>{row.label}</span>
                  <span style={{ color:row.color, fontWeight:700, fontSize:13 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ borderTop:`1.5px solid ${P.mist}`, paddingTop:14, display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:4 }}>
                <span style={{ color:P.navy, fontWeight:900, fontSize:15 }}>Total</span>
                <span style={{ color:P.navy, fontWeight:900, fontSize:24, letterSpacing:"-0.02em" }}>${total}</span>
              </div>
            </div>

            {/* Promo code */}
            <div style={{ marginBottom:16 }}>
              <p style={{ fontSize:11, fontWeight:800, color:P.muted, letterSpacing:"0.08em", textTransform:"uppercase", margin:"0 0 8px" }}>Promo Code</p>
              <div style={{ display:"flex", gap:8 }}>
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder={promoApplied ? "SAVE10 applied ✓" : "Enter code (try SAVE10)"}
                  disabled={promoApplied}
                  style={{
                    flex:1, border:`1.5px solid ${promoApplied ? "rgba(22,163,74,0.4)" : P.mist}`,
                    borderRadius:10, padding:"9px 12px", fontSize:12, color: promoApplied ? "#16a34a" : P.navy,
                    outline:"none", fontFamily:P.font, background: promoApplied ? "rgba(22,163,74,0.06)" : P.mistBg,
                    transition:"all 0.2s",
                  }}
                  onFocus={e => { if(!promoApplied){ e.target.style.borderColor=P.sky; e.target.style.background=P.white; e.target.style.boxShadow=`0 0 0 3px rgba(151,202,219,0.2)`; }}}
                  onBlur={e  => { if(!promoApplied){ e.target.style.borderColor=P.mist; e.target.style.background=P.mistBg; e.target.style.boxShadow="none"; }}}
                />
                {!promoApplied ? (
                  <button onClick={handleApplyPromo} style={{
                    padding:"9px 16px", background:P.mistBg, border:`1.5px solid ${P.mist}`,
                    borderRadius:10, fontSize:12, fontWeight:700, color:P.royal,
                    cursor:"pointer", fontFamily:P.font, transition:"all 0.15s",
                  }}
                    onMouseEnter={e=>{ e.currentTarget.style.background=P.mist; e.currentTarget.style.borderColor=P.sky; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background=P.mistBg; e.currentTarget.style.borderColor=P.mist; }}>
                    Apply
                  </button>
                ) : (
                  <div className="check-anim" style={{ width:40, height:38, borderRadius:10, background:"rgba(22,163,74,0.12)", display:"flex", alignItems:"center", justifyContent:"center", color:"#16a34a", flexShrink:0 }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                )}
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              className="checkout-btn"
              onClick={() => setCheckoutClicked(true)}
              style={{
                width:"100%", padding:"15px 0",
                background: checkoutClicked
                  ? "linear-gradient(135deg,#16a34a,#22c55e)"
                  : `linear-gradient(135deg,${P.royal},${P.ocean})`,
                color:P.white, fontWeight:900, fontSize:14, borderRadius:14,
                border:"none", cursor:"pointer", fontFamily:P.font,
                boxShadow: checkoutClicked ? "0 6px 20px rgba(22,163,74,0.3)" : "0 6px 20px rgba(1,138,190,0.3)",
                transition:"background 0.4s, box-shadow 0.3s",
                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              }}>
              {checkoutClicked
                ? <><svg className="check-anim" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Order Placed!</>
                : <>Proceed to Checkout <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></>
              }
            </button>

            {/* Trust row */}
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:16, marginTop:16, paddingTop:16, borderTop:`1px solid ${P.mist}` }}>
              {[
                { icon:<svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>, label:"SSL Secure" },
                { icon:<svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>, label:"Easy Returns" },
                { icon:<svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>, label:"Verified" },
              ].map((t, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:5 }}>
                  {t.icon}
                  <span style={{ color:P.muted, fontSize:11, fontWeight:600 }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}