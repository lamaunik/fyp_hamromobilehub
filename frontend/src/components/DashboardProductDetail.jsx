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
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-24px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity:0; transform:translateX(24px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes checkPop {
    0%   { transform:scale(0) rotate(-20deg); opacity:0; }
    60%  { transform:scale(1.2) rotate(4deg); opacity:1; }
    100% { transform:scale(1) rotate(0); opacity:1; }
  }
  @keyframes imageFloat {
    0%,100% { transform:translateY(0); }
    50%     { transform:translateY(-8px); }
  }
  @keyframes thumbIn {
    from { opacity:0; transform:scale(0.85); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes reviewIn {
    from { opacity:0; transform:translateX(-12px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes blobFloat {
    0%,100% { transform:translateY(0) scale(1); }
    50%     { transform:translateY(-12px) scale(1.04); }
  }
  @keyframes relatedIn {
    from { opacity:0; transform:translateY(14px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes pricePop {
    0%   { transform:scale(0.85); opacity:0; }
    70%  { transform:scale(1.05); }
    100% { transform:scale(1); opacity:1; }
  }
  .detail-left   { animation: slideInLeft 0.45s cubic-bezier(.4,0,.2,1) both; }
  .detail-right  { animation: slideInRight 0.45s 0.08s cubic-bezier(.4,0,.2,1) both; }
  .img-float     { animation: imageFloat 4s ease-in-out infinite; }
  .thumb-item    { animation: thumbIn cubic-bezier(.4,0,.2,1) both; }
  .review-item   { animation: reviewIn 0.4s cubic-bezier(.4,0,.2,1) both; }
  .related-card  { animation: relatedIn cubic-bezier(.4,0,.2,1) both; }
  .price-block   { animation: pricePop 0.5s 0.2s cubic-bezier(.4,0,.2,1) both; }
  .option-btn    { transition: all 0.18s cubic-bezier(.4,0,.2,1) !important; }
  .option-btn:hover { transform:translateY(-2px) !important; box-shadow:0 4px 14px rgba(1,138,190,0.18) !important; }
  .related-card  { transition: transform 0.22s, box-shadow 0.22s, border-color 0.2s !important; }
  .related-card:hover { transform:translateY(-5px) !important; box-shadow:0 12px 32px rgba(1,138,190,0.15) !important; border-color:var(--sky,#97CADB) !important; }
  .trust-badge   { transition: transform 0.18s, box-shadow 0.18s !important; }
  .trust-badge:hover { transform:translateY(-2px) !important; box-shadow:0 4px 14px rgba(1,138,190,0.12) !important; }
  .add-btn-main  { transition: transform 0.18s, box-shadow 0.18s !important; }
  .add-btn-main:hover { transform:translateY(-2px) !important; box-shadow:0 10px 28px rgba(1,138,190,0.35) !important; }
  .buy-now-btn   { transition: transform 0.18s, box-shadow 0.18s !important; }
  .buy-now-btn:hover { transform:translateY(-2px) !important; box-shadow:0 8px 24px rgba(0,27,72,0.22) !important; }
  .wishlist-btn  { transition: all 0.18s !important; }
  .wishlist-btn:hover { border-color:#fca5a5 !important; color:#ef4444 !important; transform:scale(1.1) !important; }
  .qty-step      { transition: background 0.15s, color 0.15s !important; }
  .qty-step:hover { background:${P.sky} !important; color:${P.navy} !important; }
  .blob-bg       { animation: blobFloat 6s ease-in-out infinite; }
  .blob-bg2      { animation: blobFloat 8s 2s ease-in-out infinite; }
`;

const related = [
  { id:7,  name:"Google Pixel 8 Pro", brand:"Google",  price:749, rating:4.6 },
  { id:8,  name:"OnePlus 12",         brand:"OnePlus", price:549, rating:4.5 },
  { id:11, name:"Xiaomi 14 Ultra",    brand:"Xiaomi",  price:699, rating:4.4 },
  { id:4,  name:"Sony Xperia 1 VI",   brand:"Sony",    price:799, rating:4.5 },
];

const PhoneIcon = ({ size=40 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
  </svg>
);

const Stars = ({ rating, size=13 }) => (
  <div style={{ display:"flex", gap:2 }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24"
        fill={i <= Math.floor(rating) ? "#f59e0b" : i - 0.5 <= rating ? "#f59e0b" : P.mist}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

export default function DashboardProductDetail({ product, addToCart, viewProduct }) {
  const [qty, setQty]                         = useState(1);
  const [review, setReview]                   = useState("");
  const [selectedStorage, setSelectedStorage] = useState("256GB");
  const [selectedColor, setSelectedColor]     = useState("Black");
  const [selectedThumb, setSelectedThumb]     = useState(0);
  const [added, setAdded]                     = useState(false);
  const [wishlisted, setWishlisted]           = useState(false);
  const [activeTab, setActiveTab]             = useState("description");

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const storageOptions = ["128GB","256GB","512GB","1TB"];
  const colorOptions   = ["Black","White","Silver","Gold"];
  const reviews = [
    { user:"Alex M.",  rating:5, comment:"Absolutely amazing device! Best purchase I've made this year.", date:"Feb 28", helpful:14 },
    { user:"Sarah K.", rating:4, comment:"Great phone, battery life is impressive. Camera is top notch.", date:"Feb 20", helpful:8 },
    { user:"James T.", rating:5, comment:"Worth every penny. Fast, beautiful display, great camera system.", date:"Feb 15", helpful:22 },
  ];

  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

  return (
    <>
      <style>{STYLES}</style>
      <div style={{ padding:"28px 32px", fontFamily:P.font }}>

        {/* Breadcrumb */}
        <div style={{ display:"flex", alignItems:"center", gap:7, fontSize:13, marginBottom:26, animation:"fadeUp 0.35s cubic-bezier(.4,0,.2,1) both" }}>
          <span style={{ color:P.ocean, fontWeight:700, cursor:"pointer", transition:"color 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.color=P.royal}
            onMouseLeave={e=>e.currentTarget.style.color=P.ocean}>Home</span>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={P.mist} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          <span style={{ color:P.muted, fontWeight:600, cursor:"pointer" }}>{product.category}</span>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={P.mist} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          <span style={{ color:P.navy, fontWeight:700 }}>{product.name}</span>
        </div>

        {/* ── Main product grid ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:36, marginBottom:32 }}>

          {/* Left: Images */}
          <div className="detail-left">
            {/* Main image */}
            <div style={{ position:"relative", background:`linear-gradient(135deg,${P.mistBg} 0%,${P.mist} 100%)`, borderRadius:22, height:300, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14, border:`1.5px solid ${P.mist}`, overflow:"hidden" }}>
              <div className="blob-bg" style={{ position:"absolute", top:-30, right:-20, width:160, height:160, borderRadius:"50%", background:"rgba(1,138,190,0.1)", filter:"blur(40px)", pointerEvents:"none" }}/>
              <div className="blob-bg2" style={{ position:"absolute", bottom:-20, left:-20, width:120, height:120, borderRadius:"50%", background:"rgba(151,202,219,0.12)", filter:"blur(30px)", pointerEvents:"none" }}/>
              <div className="img-float" style={{ color:P.sky, position:"relative", zIndex:1 }}>
                <PhoneIcon size={110}/>
              </div>
              {/* Discount ribbon */}
              {discount > 0 && (
                <div style={{ position:"absolute", top:16, right:16, background:`linear-gradient(135deg,#dc2626,#ef4444)`, color:P.white, fontSize:12, fontWeight:900, padding:"5px 12px", borderRadius:999, boxShadow:"0 4px 12px rgba(220,38,38,0.3)" }}>
                  -{discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
              {[0,1,2,3].map(i => (
                <div key={i} className="thumb-item" onClick={() => setSelectedThumb(i)}
                  style={{
                    animationDuration:"0.35s", animationDelay:`${0.1+i*0.06}s`,
                    background: selectedThumb===i ? `linear-gradient(135deg,${P.mist},${P.sky})` : P.mistBg,
                    borderRadius:14, height:66, display:"flex", alignItems:"center", justifyContent:"center",
                    border: `2px solid ${selectedThumb===i ? P.ocean : P.mist}`,
                    cursor:"pointer", color:selectedThumb===i ? P.royal : P.sky,
                    transition:"all 0.18s",
                    boxShadow: selectedThumb===i ? "0 4px 14px rgba(1,138,190,0.2)" : "none",
                  }}
                  onMouseEnter={e => { if(selectedThumb!==i){ e.currentTarget.style.borderColor=P.sky; e.currentTarget.style.background=P.mist; }}}
                  onMouseLeave={e => { if(selectedThumb!==i){ e.currentTarget.style.borderColor=P.mist; e.currentTarget.style.background=P.mistBg; }}}>
                  <PhoneIcon size={24}/>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="detail-right">
            {/* Brand + title + wishlist */}
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
              <div>
                <p style={{ color:P.ocean, fontSize:12, fontWeight:800, margin:"0 0 5px", letterSpacing:"0.08em", textTransform:"uppercase" }}>{product.brand}</p>
                <h1 style={{ color:P.navy, fontWeight:900, fontSize:24, margin:0, letterSpacing:"-0.025em", lineHeight:1.2 }}>{product.name}</h1>
              </div>
              <button className="wishlist-btn" onClick={() => setWishlisted(v => !v)}
                style={{ width:40, height:40, borderRadius:"50%", border:`1.5px solid ${wishlisted ? "#fca5a5" : P.mist}`, background: wishlisted ? "rgba(239,68,68,0.08)" : P.mistBg, display:"flex", alignItems:"center", justifyContent:"center", color: wishlisted ? "#ef4444" : P.muted, cursor:"pointer", flexShrink:0 }}>
                <svg width="18" height="18" fill={wishlisted ? "#ef4444" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>

            {/* Rating row */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
              <Stars rating={product.rating}/>
              <span style={{ color:P.navy, fontWeight:700, fontSize:13 }}>{product.rating}</span>
              <span style={{ color:P.muted, fontSize:13 }}>({product.reviews} reviews)</span>
              <span style={{ background:"rgba(34,197,94,0.1)", color:"#16a34a", fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:999, border:"1px solid rgba(34,197,94,0.25)", display:"flex", alignItems:"center", gap:4 }}>
                <svg width="9" height="9" fill="#16a34a" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
                In Stock
              </span>
            </div>

            {/* Price block */}
            <div className="price-block" style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22, padding:"16px 20px", background:`linear-gradient(135deg,${P.mistBg},${P.mist})`, borderRadius:16, border:`1.5px solid ${P.mist}` }}>
              <span style={{ color:P.navy, fontWeight:900, fontSize:30, letterSpacing:"-0.03em" }}>${product.price}</span>
              <span style={{ color:P.muted, fontSize:17, textDecoration:"line-through" }}>${product.oldPrice}</span>
              <span style={{ background:"rgba(220,38,38,0.1)", color:"#dc2626", fontSize:12, fontWeight:800, padding:"4px 11px", borderRadius:9, border:"1px solid rgba(220,38,38,0.2)" }}>
                SAVE ${product.oldPrice - product.price}
              </span>
            </div>

            {/* Storage */}
            <div style={{ marginBottom:16 }}>
              <p style={{ fontSize:10, fontWeight:800, color:P.muted, letterSpacing:"0.12em", textTransform:"uppercase", margin:"0 0 9px" }}>
                Storage — <span style={{ color:P.navy }}>{selectedStorage}</span>
              </p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {storageOptions.map(s => {
                  const active = selectedStorage===s;
                  return (
                    <button key={s} className="option-btn" onClick={()=>setSelectedStorage(s)} style={{
                      padding:"7px 16px", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:P.font,
                      background: active ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.mistBg,
                      color: active ? P.white : P.muted,
                      border: active ? "none" : `1.5px solid ${P.mist}`,
                      boxShadow: active ? "0 4px 14px rgba(1,138,190,0.28)" : "none",
                    }}>{s}</button>
                  );
                })}
              </div>
            </div>

            {/* Color */}
            <div style={{ marginBottom:22 }}>
              <p style={{ fontSize:10, fontWeight:800, color:P.muted, letterSpacing:"0.12em", textTransform:"uppercase", margin:"0 0 9px" }}>
                Color — <span style={{ color:P.navy }}>{selectedColor}</span>
              </p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {colorOptions.map(c => {
                  const active = selectedColor===c;
                  return (
                    <button key={c} className="option-btn" onClick={()=>setSelectedColor(c)} style={{
                      padding:"7px 16px", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:P.font,
                      background: active ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.mistBg,
                      color: active ? P.white : P.muted,
                      border: active ? "none" : `1.5px solid ${P.mist}`,
                      boxShadow: active ? "0 4px 14px rgba(1,138,190,0.28)" : "none",
                    }}>{c}</button>
                  );
                })}
              </div>
            </div>

            {/* Qty + Add to Cart */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <div style={{ display:"flex", alignItems:"center", border:`1.5px solid ${P.mist}`, borderRadius:12, overflow:"hidden", background:P.mistBg }}>
                <button className="qty-step" onClick={()=>setQty(Math.max(1,qty-1))} style={{ padding:"11px 14px", background:"transparent", border:"none", color:P.navy, fontWeight:800, fontSize:16, cursor:"pointer" }}>−</button>
                <span style={{ padding:"11px 16px", fontWeight:900, color:P.navy, fontSize:15, borderLeft:`1px solid ${P.mist}`, borderRight:`1px solid ${P.mist}`, minWidth:38, textAlign:"center" }}>{qty}</span>
                <button className="qty-step" onClick={()=>setQty(qty+1)} style={{ padding:"11px 14px", background:"transparent", border:"none", color:P.navy, fontWeight:800, fontSize:16, cursor:"pointer" }}>+</button>
              </div>
              <button className="add-btn-main" onClick={handleAddToCart} style={{
                flex:1, padding:"13px 0", borderRadius:12, fontWeight:900, fontSize:14,
                color:P.white, border:"none", cursor:"pointer", fontFamily:P.font,
                background: added ? "linear-gradient(135deg,#16a34a,#22c55e)" : `linear-gradient(135deg,${P.royal},${P.ocean})`,
                boxShadow: added ? "0 4px 16px rgba(22,163,74,0.3)" : "0 4px 16px rgba(1,138,190,0.28)",
                transition:"background 0.4s, box-shadow 0.3s",
                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              }}>
                {added
                  ? <><svg style={{ animation:"checkPop 0.4s cubic-bezier(.4,0,.2,1) both" }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Added to Cart!</>
                  : <><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg> Add to Cart</>
                }
              </button>
            </div>
            <button className="buy-now-btn" style={{
              width:"100%", padding:"13px 0",
              background:`linear-gradient(135deg,${P.navy},${P.royal})`,
              color:P.white, borderRadius:12, fontWeight:900, fontSize:14,
              border:"none", cursor:"pointer", fontFamily:P.font,
              boxShadow:"0 4px 16px rgba(0,27,72,0.2)",
            }}>
              Buy Now
            </button>

            {/* Trust badges */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginTop:18 }}>
              {[
                { label:"Secure Payment", icon:<svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke={P.ocean} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> },
                { label:"Free Shipping",  icon:<svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke={P.ocean} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg> },
                { label:"Easy Returns",   icon:<svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke={P.ocean} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> },
              ].map(t => (
                <div key={t.label} className="trust-badge" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, background:P.mistBg, borderRadius:12, padding:"11px 6px", border:`1.5px solid ${P.mist}`, cursor:"default" }}>
                  {t.icon}
                  <span style={{ color:P.navy, fontSize:10, fontWeight:700, textAlign:"center" }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Reviews ── */}
        <div style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:22, marginBottom:24, overflow:"hidden", animation:"fadeUp 0.45s 0.15s cubic-bezier(.4,0,.2,1) both" }}>
          {/* Tab bar */}
          <div style={{ display:"flex", borderBottom:`1.5px solid ${P.mist}` }}>
            {[
              { id:"description", label:"Description" },
              { id:"reviews",     label:`Reviews (${reviews.length})` },
              { id:"specs",       label:"Specifications" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding:"14px 24px", fontSize:13, fontWeight:700, cursor:"pointer",
                background:"transparent", border:"none", fontFamily:P.font,
                color: activeTab===tab.id ? P.ocean : P.muted,
                borderBottom: `2.5px solid ${activeTab===tab.id ? P.ocean : "transparent"}`,
                marginBottom:"-1.5px", transition:"color 0.18s, border-color 0.18s",
              }}>
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding:24 }}>
            {activeTab === "description" && (
              <p style={{ color:P.muted, fontSize:14, lineHeight:1.75, margin:0 }}>
                The <strong style={{ color:P.navy }}>{product.name}</strong> represents the pinnacle of mobile technology.
                Featuring a stunning ProMotion display, a cutting-edge processor, and an exceptional camera system that captures
                every detail with professional clarity. With all-day battery life, fast charging, and a premium aerospace-grade
                build, this device is engineered for those who demand the very best.
                Configuration: <strong style={{ color:P.navy }}>{selectedStorage} · {selectedColor}</strong>.
              </p>
            )}

            {activeTab === "reviews" && (
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {reviews.map((r, i) => (
                  <div key={i} className="review-item" style={{
                    animationDelay:`${i*0.09}s`,
                    paddingBottom:20, borderBottom: i<reviews.length-1 ? `1px solid ${P.mist}` : "none",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ color:P.white, fontWeight:900, fontSize:13 }}>{r.user[0]}</span>
                        </div>
                        <div>
                          <p style={{ color:P.navy, fontWeight:700, fontSize:14, margin:0 }}>{r.user}</p>
                          <Stars rating={r.rating} size={11}/>
                        </div>
                      </div>
                      <span style={{ color:P.muted, fontSize:12 }}>{r.date}</span>
                    </div>
                    <p style={{ color:P.muted, fontSize:13, margin:"0 0 10px", lineHeight:1.6 }}>{r.comment}</p>
                    <button style={{ background:"none", border:`1px solid ${P.mist}`, borderRadius:8, padding:"4px 12px", fontSize:11, fontWeight:600, color:P.muted, cursor:"pointer", fontFamily:P.font, transition:"all 0.15s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor=P.sky; e.currentTarget.style.color=P.ocean; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor=P.mist; e.currentTarget.style.color=P.muted; }}>
                      Helpful ({r.helpful})
                    </button>
                  </div>
                ))}

                {/* Write review */}
                <div style={{ paddingTop:8 }}>
                  <h4 style={{ color:P.navy, fontWeight:800, fontSize:14, margin:"0 0 12px" }}>Write a Review</h4>
                  <textarea value={review} onChange={e=>setReview(e.target.value)} placeholder="Share your experience with this product..." rows={3}
                    style={{ width:"100%", border:`1.5px solid ${P.mist}`, borderRadius:12, padding:"12px 14px", fontSize:13, color:P.navy, outline:"none", resize:"none", marginBottom:10, fontFamily:P.font, background:P.mistBg, boxSizing:"border-box", transition:"all 0.2s" }}
                    onFocus={e=>{ e.target.style.borderColor=P.sky; e.target.style.background=P.white; e.target.style.boxShadow=`0 0 0 3px rgba(151,202,219,0.2)`; }}
                    onBlur={e=> { e.target.style.borderColor=P.mist; e.target.style.background=P.mistBg; e.target.style.boxShadow="none"; }}
                  />
                  <button style={{ padding:"10px 24px", background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontSize:13, fontWeight:700, borderRadius:10, border:"none", cursor:"pointer", fontFamily:P.font, boxShadow:"0 4px 12px rgba(1,138,190,0.28)", transition:"transform 0.15s, box-shadow 0.15s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 20px rgba(1,138,190,0.32)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 12px rgba(1,138,190,0.28)"; }}>
                    Submit Review
                  </button>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 32px" }}>
                {[
                  ["Display","6.7\" Super Retina XDR OLED"],["Processor","A17 Pro Chip"],
                  ["RAM","8 GB"],["Storage",selectedStorage],
                  ["Battery","4,422 mAh"],["Camera","48MP + 12MP + 12MP"],
                  ["OS","Latest iOS / Android"],["Weight","221g"],
                  ["5G","Yes"],["Color",selectedColor],
                ].map(([k,v],i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"11px 0", borderBottom:`1px solid ${P.mist}`, animation:`fadeUp 0.35s ${0.05+i*0.04}s cubic-bezier(.4,0,.2,1) both` }}>
                    <span style={{ color:P.muted, fontSize:13, fontWeight:600 }}>{k}</span>
                    <span style={{ color:P.navy, fontSize:13, fontWeight:700 }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        <div style={{ animation:"fadeUp 0.45s 0.25s cubic-bezier(.4,0,.2,1) both" }}>
          <h3 style={{ color:P.navy, fontWeight:900, fontSize:17, margin:"0 0 18px", letterSpacing:"-0.01em" }}>You May Also Like</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
            {related.map((item, i) => (
              <div key={item.id} className="related-card" onClick={() => viewProduct({...item, oldPrice:item.price+150, reviews:100, badge:null, category:"Smartphones"})}
                style={{
                  "--sky": P.sky,
                  background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:18,
                  padding:16, cursor:"pointer",
                  animationName:"relatedIn", animationDuration:"0.4s",
                  animationTimingFunction:"cubic-bezier(.4,0,.2,1)", animationFillMode:"both",
                  animationDelay:`${0.1+i*0.07}s`,
                }}>
                <div style={{ background:P.mistBg, borderRadius:14, height:96, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12, color:P.sky, border:`1px solid ${P.mist}` }}>
                  <PhoneIcon size={32}/>
                </div>
                <p style={{ fontSize:10, color:P.ocean, fontWeight:800, margin:"0 0 3px", textTransform:"uppercase", letterSpacing:"0.06em" }}>{item.brand}</p>
                <p style={{ color:P.navy, fontWeight:700, fontSize:13, margin:"0 0 6px", lineHeight:1.3 }}>{item.name}</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span style={{ color:P.navy, fontWeight:900, fontSize:15 }}>${item.price}</span>
                  <Stars rating={item.rating} size={10}/>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}