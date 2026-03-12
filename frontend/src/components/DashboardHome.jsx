import { useState, useEffect, useRef } from "react";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const STYLES = `
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes heroSlide {
    from { opacity:0; transform:translateX(-28px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes heroIcon {
    from { opacity:0; transform:translateX(28px) rotate(6deg); }
    to   { opacity:1; transform:translateX(0) rotate(0deg); }
  }
  @keyframes blobFloat {
    0%,100% { transform:translateY(0) scale(1); }
    50%     { transform:translateY(-14px) scale(1.06); }
  }
  @keyframes statCount {
    from { opacity:0; transform:translateY(10px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes shimmerBadge {
    0%   { background-position:-200px 0; }
    100% { background-position:200px 0; }
  }
  @keyframes cardIn {
    from { opacity:0; transform:translateY(16px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes spin-slow {
    from { transform:rotate(0deg); }
    to   { transform:rotate(360deg); }
  }
  .hero-text    { animation: heroSlide 0.5s 0.05s cubic-bezier(.4,0,.2,1) both; }
  .hero-icon    { animation: heroIcon 0.5s 0.1s cubic-bezier(.4,0,.2,1) both; }
  .blob-float   { animation: blobFloat 5s ease-in-out infinite; }
  .blob-float2  { animation: blobFloat 7s 1.5s ease-in-out infinite; }
  .section-title { animation: fadeUp 0.4s cubic-bezier(.4,0,.2,1) both; }
  .stat-card    { animation: statCount cubic-bezier(.4,0,.2,1) both; }
  .cat-btn:hover { transform:translateY(-4px) !important; box-shadow:0 8px 24px rgba(1,138,190,0.14) !important; }
  .cat-btn      { transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s !important; }
  .brand-btn:hover { transform:translateY(-2px) !important; }
  .brand-btn    { transition: all 0.18s !important; }
  .prod-card    { transition: transform 0.22s cubic-bezier(.4,0,.2,1), box-shadow 0.22s, border-color 0.2s !important; }
  .prod-card:hover { transform:translateY(-6px) !important; box-shadow:0 16px 40px rgba(1,138,190,0.16) !important; border-color:var(--sky) !important; }
  .add-btn      { transition: opacity 0.18s, transform 0.15s !important; }
  .add-btn:hover { transform:scale(1.03) !important; }
  .blog-card:hover { transform:translateY(-4px) !important; box-shadow:0 10px 28px rgba(1,138,190,0.13) !important; }
  .blog-card    { transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s !important; }
`;

const badgeStyle = {
  Hot:  { bg:"rgba(220,38,38,0.1)",  border:"rgba(220,38,38,0.25)",  text:"#ef4444" },
  Sale: { bg:"rgba(234,88,12,0.1)",  border:"rgba(234,88,12,0.25)",  text:"#f97316" },
  New:  { bg:"rgba(34,197,94,0.1)",  border:"rgba(34,197,94,0.25)",  text:"#22c55e" },
  Deal: { bg:"rgba(1,138,190,0.1)",  border:"rgba(1,138,190,0.25)",  text:P.ocean   },
};

const brands = ["SAMSUNG","Apple","Microsoft","LG","SONY"];

const categories = [
  { label:"Smartphones", icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
  { label:"Laptops",     icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
  { label:"Tablets",     icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
  { label:"Accessories", icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg> },
  { label:"Cameras",     icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
];

const featured = [
  { id:1, name:"iPhone 15 Pro Max",       brand:"Apple",     price:1199, oldPrice:1399, rating:4.8, reviews:234, badge:"Hot",  category:"Smartphones" },
  { id:2, name:"Samsung Galaxy S24 Ultra",brand:"Samsung",   price:999,  oldPrice:1199, rating:4.7, reviews:187, badge:"Sale", category:"Smartphones" },
  { id:3, name:"MacBook Pro M3",          brand:"Apple",     price:1799, oldPrice:1999, rating:4.9, reviews:312, badge:"New",  category:"Laptops" },
  { id:4, name:"Sony Xperia 1 VI",        brand:"Sony",      price:799,  oldPrice:999,  rating:4.5, reviews:98,  badge:null,   category:"Smartphones" },
  { id:5, name:"LG Gram 17",             brand:"LG",        price:1299, oldPrice:1499, rating:4.6, reviews:145, badge:"Deal", category:"Laptops" },
  { id:6, name:"Microsoft Surface Pro",   brand:"Microsoft", price:999,  oldPrice:1199, rating:4.4, reviews:76,  badge:null,   category:"Tablets" },
];

const PhoneIcon = ({ size=32 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
  </svg>
);

/* Animated counter hook */
function useCountUp(target, duration=900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return val;
}

function StatCard({ label, value, suffix="", icon, delay }) {
  const num = parseInt(value);
  const count = useCountUp(num, 800);
  return (
    <div className="stat-card" style={{
      background:P.white, border:`1px solid ${P.mist}`, borderRadius:16,
      padding:"16px 18px", display:"flex", alignItems:"center", gap:14,
      animationDuration:"0.5s", animationDelay:delay,
      transition:"box-shadow 0.2s, border-color 0.2s, transform 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow="0 8px 28px rgba(1,138,190,0.13)"; e.currentTarget.style.borderColor=P.sky; e.currentTarget.style.transform="translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor=P.mist; e.currentTarget.style.transform="translateY(0)"; }}>
      <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", color:P.white, flexShrink:0, boxShadow:"0 4px 12px rgba(1,138,190,0.28)" }}>
        {icon}
      </div>
      <div>
        <p style={{ color:P.navy, fontWeight:900, fontSize:18, margin:0, letterSpacing:"-0.02em" }}>{count}{suffix}</p>
        <p style={{ color:P.muted, fontSize:11, margin:"2px 0 0" }}>{label}</p>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick, onAddToCart, delay }) {
  const [hovered, setHovered] = useState(false);
  const bs = product.badge ? badgeStyle[product.badge] : null;
  return (
    <div
      className="prod-card"
      style={{
        "--sky": P.sky,
        background:P.white, border:`1px solid ${P.mist}`, borderRadius:16,
        padding:14, cursor:"pointer", position:"relative",
        animationName:"cardIn", animationDuration:"0.45s",
        animationTimingFunction:"cubic-bezier(.4,0,.2,1)",
        animationFillMode:"both", animationDelay:delay,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div onClick={() => onClick(product)}>
        <div style={{ position:"relative", background:P.mistBg, borderRadius:12, height:118, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10, color:P.sky, overflow:"hidden" }}>
          {/* animated shimmer on hover */}
          {hovered && <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,${P.mist}00,${P.sky}22,${P.mist}00)`, backgroundSize:"200% 200%", animation:"shimmerBadge 1.2s infinite" }}/>}
          <PhoneIcon/>
          {bs && (
            <span style={{ position:"absolute", top:8, left:8, fontSize:10, fontWeight:800, padding:"2px 8px", borderRadius:999, background:bs.bg, border:`1px solid ${bs.border}`, color:bs.text }}>
              {product.badge}
            </span>
          )}
        </div>
        <p style={{ fontSize:11, color:P.ocean, fontWeight:700, margin:"0 0 2px" }}>{product.brand}</p>
        <h3 style={{ color:P.navy, fontWeight:700, fontSize:13, margin:"0 0 6px", overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{product.name}</h3>
        <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:6 }}>
          <svg width="11" height="11" fill="#f59e0b" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span style={{ color:P.muted, fontSize:11, fontWeight:600 }}>{product.rating}</span>
          <span style={{ color:P.muted, fontSize:11 }}>({product.reviews})</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ color:P.navy, fontWeight:900, fontSize:15 }}>${product.price}</span>
          <span style={{ color:P.muted, fontSize:11, textDecoration:"line-through" }}>${product.oldPrice}</span>
          <span style={{ fontSize:10, fontWeight:800, color:P.ocean, background:"rgba(1,138,190,0.08)", padding:"1px 6px", borderRadius:999 }}>
            -{Math.round((1-product.price/product.oldPrice)*100)}%
          </span>
        </div>
      </div>
      <button className="add-btn" onClick={() => onAddToCart(product)} style={{
        width:"100%", marginTop:10, padding:"8px 0",
        background:`linear-gradient(135deg,${P.royal},${P.ocean})`,
        color:P.white, fontSize:11, fontWeight:700, borderRadius:10,
        border:"none", cursor:"pointer",
        opacity: hovered ? 1 : 0,
        fontFamily:P.font,
        boxShadow: hovered ? "0 4px 14px rgba(1,138,190,0.3)" : "none",
      }}>
        + Add to Cart
      </button>
    </div>
  );
}

export default function DashboardHome({ setActiveTab, viewProduct, addToCart }) {
  return (
    <>
      <style>{STYLES}</style>
      <div style={{ padding:"24px 28px", display:"flex", flexDirection:"column", gap:30, fontFamily:P.font }}>

        {/* ── Hero Banner ── */}
        <div style={{
          position:"relative", borderRadius:24,
          background:`linear-gradient(135deg,${P.navy} 0%,${P.royal} 55%,#013d6e 100%)`,
          padding:"36px 40px", display:"flex", alignItems:"center",
          justifyContent:"space-between", overflow:"hidden",
          boxShadow:"0 12px 40px rgba(0,27,72,0.28)",
          minHeight:180,
        }}>
          {/* animated blobs */}
          <div className="blob-float" style={{ position:"absolute", top:-50, right:140, width:240, height:240, borderRadius:"50%", background:"rgba(1,138,190,0.18)", filter:"blur(55px)", pointerEvents:"none" }}/>
          <div className="blob-float2" style={{ position:"absolute", bottom:-40, right:-20, width:180, height:180, borderRadius:"50%", background:"rgba(151,202,219,0.1)", filter:"blur(45px)", pointerEvents:"none" }}/>
          {/* subtle grid */}
          <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:`linear-gradient(rgba(151,202,219,1) 1px,transparent 1px),linear-gradient(90deg,rgba(151,202,219,1) 1px,transparent 1px)`, backgroundSize:"40px 40px", pointerEvents:"none" }}/>

          <div className="hero-text" style={{ position:"relative", zIndex:1, maxWidth:440 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(1,138,190,0.22)", border:"1px solid rgba(1,138,190,0.4)", borderRadius:999, padding:"5px 14px", marginBottom:16 }}>
              <svg width="11" height="11" fill={P.sky} viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              <span style={{ color:P.sky, fontSize:10, fontWeight:800, letterSpacing:"0.12em" }}>LIMITED TIME OFFER</span>
            </div>
            <h2 style={{ color:P.white, fontWeight:900, fontSize:30, margin:"0 0 10px", letterSpacing:"-0.03em", lineHeight:1.15 }}>Find Your Perfect Device</h2>
            <p style={{ color:"rgba(151,202,219,0.72)", fontSize:14, margin:"0 0 24px", lineHeight:1.6 }}>Best deals on top-rated laptops, phones & accessories — shipped fast.</p>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <button onClick={() => setActiveTab("products")} style={{
                background:P.white, color:P.royal, fontWeight:800, fontSize:13,
                padding:"12px 26px", borderRadius:12, border:"none", cursor:"pointer",
                fontFamily:P.font, boxShadow:"0 4px 16px rgba(0,27,72,0.2)",
                transition:"transform 0.18s, box-shadow 0.18s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,27,72,0.28)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(0,27,72,0.2)"; }}>
                Shop Now →
              </button>
              <button onClick={() => setActiveTab("products")} style={{
                background:"transparent", color:P.sky, fontWeight:700, fontSize:13,
                padding:"11px 20px", borderRadius:12,
                border:`1px solid rgba(151,202,219,0.35)`, cursor:"pointer",
                fontFamily:P.font, transition:"all 0.18s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(151,202,219,0.1)"; e.currentTarget.style.borderColor="rgba(151,202,219,0.6)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(151,202,219,0.35)"; }}>
                View Deals
              </button>
            </div>
          </div>

          {/* Hero device illustration */}
          <div className="hero-icon" style={{ position:"relative", zIndex:1, flexShrink:0 }}>
            <div style={{ width:130, height:130, borderRadius:28, background:"rgba(1,138,190,0.18)", border:`1px solid rgba(151,202,219,0.22)`, display:"flex", alignItems:"center", justifyContent:"center", color:P.sky, boxShadow:"0 8px 32px rgba(1,138,190,0.2)" }}>
              <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            {/* floating badges */}
            <div style={{ position:"absolute", top:-12, right:-16, background:P.white, borderRadius:10, padding:"6px 10px", boxShadow:"0 4px 16px rgba(0,27,72,0.12)", display:"flex", alignItems:"center", gap:5, animation:"fadeUp 0.5s 0.3s both" }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#22c55e", display:"inline-block" }}/>
              <span style={{ fontSize:11, color:P.navy, fontWeight:700 }}>500+ Products</span>
            </div>
            <div style={{ position:"absolute", bottom:-12, left:-16, background:P.white, borderRadius:10, padding:"6px 10px", boxShadow:"0 4px 16px rgba(0,27,72,0.12)", display:"flex", alignItems:"center", gap:5, animation:"fadeUp 0.5s 0.45s both" }}>
              <svg width="12" height="12" fill="#f59e0b" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span style={{ fontSize:11, color:P.navy, fontWeight:700 }}>4.9 Rating</span>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
          {[
            { label:"Products Listed",  value:500, suffix:"+",  icon:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>, delay:"0.1s" },
            { label:"Verified Sellers", value:120, suffix:"+",  icon:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>, delay:"0.18s" },
            { label:"Orders Delivered", value:10,  suffix:"k+", icon:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>, delay:"0.26s" },
            { label:"Happy Customers",  value:8,   suffix:"k+", icon:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, delay:"0.34s" },
          ].map((s,i) => <StatCard key={i} {...s}/>)}
        </div>

        {/* ── Categories ── */}
        <div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <h3 className="section-title" style={{ color:P.navy, fontWeight:900, fontSize:17, margin:0 }}>Shop by Category</h3>
            <button onClick={() => setActiveTab("products")} style={{ color:P.ocean, fontSize:13, fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:0, transition:"color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.color=P.royal}
              onMouseLeave={e=>e.currentTarget.style.color=P.ocean}>
              View All →
            </button>
          </div>
          <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:4 }}>
            {categories.map((cat, i) => (
              <button key={cat.label} className="cat-btn" onClick={() => setActiveTab("products")} style={{
                display:"flex", flexDirection:"column", alignItems:"center", gap:9,
                background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:18,
                padding:"18px 24px", cursor:"pointer", flexShrink:0, fontFamily:P.font,
                animationName:"cardIn", animationDuration:"0.4s",
                animationTimingFunction:"cubic-bezier(.4,0,.2,1)", animationFillMode:"both",
                animationDelay:`${0.05 + i*0.06}s`,
              }}>
                <div style={{ width:44, height:44, borderRadius:12, background:P.mistBg, display:"flex", alignItems:"center", justifyContent:"center", color:P.ocean, border:`1px solid ${P.mist}`, transition:"background 0.18s" }}>
                  {cat.icon}
                </div>
                <span style={{ fontSize:12, fontWeight:700, color:P.navy, whiteSpace:"nowrap" }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Brands ── */}
        <div>
          <h3 className="section-title" style={{ color:P.navy, fontWeight:900, fontSize:17, margin:"0 0 14px" }}>Top Brands</h3>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {brands.map((brand, i) => (
              <button key={brand} className="brand-btn" style={{
                background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:10,
                padding:"9px 22px", fontSize:13, fontWeight:800, color:P.navy,
                cursor:"pointer", fontFamily:P.font,
                animationName:"fadeUp", animationDuration:"0.4s",
                animationTimingFunction:"cubic-bezier(.4,0,.2,1)", animationFillMode:"both",
                animationDelay:`${0.1 + i*0.05}s`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=P.sky; e.currentTarget.style.color=P.ocean; e.currentTarget.style.background=P.mistBg; e.currentTarget.style.boxShadow="0 4px 14px rgba(1,138,190,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=P.mist; e.currentTarget.style.color=P.navy; e.currentTarget.style.background=P.white; e.currentTarget.style.boxShadow="none"; }}>
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* ── Featured Products ── */}
        <div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <h3 className="section-title" style={{ color:P.navy, fontWeight:900, fontSize:17, margin:0 }}>Featured Products</h3>
            <button onClick={() => setActiveTab("products")} style={{ color:P.ocean, fontSize:13, fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:0, transition:"color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.color=P.royal}
              onMouseLeave={e=>e.currentTarget.style.color=P.ocean}>
              View All →
            </button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:14 }}>
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} onClick={viewProduct} onAddToCart={addToCart} delay={`${0.08 + i*0.07}s`}/>
            ))}
          </div>
        </div>

        {/* ── Promo Banners ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {/* New Arrivals */}
          <div style={{
            background:`linear-gradient(135deg,${P.navy},${P.royal})`,
            borderRadius:20, padding:"24px 28px", display:"flex", alignItems:"center", gap:20,
            border:`1px solid rgba(1,138,190,0.2)`, overflow:"hidden", position:"relative",
            cursor:"pointer", transition:"transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 36px rgba(0,27,72,0.22)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
            <div className="blob-float" style={{ position:"absolute", top:-30, right:-10, width:140, height:140, borderRadius:"50%", background:"rgba(1,138,190,0.14)", filter:"blur(35px)", pointerEvents:"none" }}/>
            <div style={{ width:56, height:56, borderRadius:16, background:"rgba(1,138,190,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:P.sky, position:"relative", border:`1px solid rgba(151,202,219,0.2)` }}>
              <PhoneIcon size={28}/>
            </div>
            <div style={{ position:"relative" }}>
              <p style={{ color:P.white, fontWeight:900, fontSize:17, margin:"0 0 4px" }}>New Arrivals</p>
              <p style={{ color:"rgba(151,202,219,0.65)", fontSize:13, margin:"0 0 12px" }}>Latest smartphones just landed</p>
              <button onClick={() => setActiveTab("products")} style={{ background:"none", border:`1px solid rgba(151,202,219,0.4)`, color:P.sky, fontSize:12, fontWeight:700, cursor:"pointer", padding:"6px 16px", borderRadius:8, fontFamily:P.font, transition:"all 0.18s" }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(151,202,219,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="none"; }}>
                Explore →
              </button>
            </div>
          </div>

          {/* Accessories Sale */}
          <div style={{
            background:`linear-gradient(135deg,${P.royal},${P.ocean})`,
            borderRadius:20, padding:"24px 28px", display:"flex", alignItems:"center", gap:20,
            overflow:"hidden", position:"relative",
            cursor:"pointer", transition:"transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 36px rgba(1,138,190,0.28)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
            <div className="blob-float2" style={{ position:"absolute", bottom:-30, left:-10, width:140, height:140, borderRadius:"50%", background:"rgba(214,232,238,0.12)", filter:"blur(35px)", pointerEvents:"none" }}/>
            <div style={{ width:56, height:56, borderRadius:16, background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:P.white, position:"relative" }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
            </div>
            <div style={{ position:"relative" }}>
              <p style={{ color:P.white, fontWeight:900, fontSize:17, margin:"0 0 4px" }}>Accessories Sale</p>
              <p style={{ color:"rgba(214,232,238,0.8)", fontSize:13, margin:"0 0 12px" }}>Up to 40% off on accessories</p>
              <button onClick={() => setActiveTab("products")} style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.3)", color:P.white, fontSize:12, fontWeight:700, cursor:"pointer", padding:"6px 16px", borderRadius:8, fontFamily:P.font, transition:"all 0.18s" }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.28)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.18)"; }}>
                Shop Now →
              </button>
            </div>
          </div>
        </div>

        {/* ── Tech Tips ── */}
        <div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <h3 className="section-title" style={{ color:P.navy, fontWeight:900, fontSize:17, margin:0 }}>Tech Tips & Guides</h3>
            <button style={{ color:P.ocean, fontSize:13, fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:0, transition:"color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.color=P.royal}
              onMouseLeave={e=>e.currentTarget.style.color=P.ocean}>
              View All →
            </button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {[
              { title:"Best Budget Smartphones 2026", tag:"Guide",  date:"Mar 1",  tagColor:P.ocean },
              { title:"How to Choose the Right Laptop", tag:"Tips",   date:"Feb 28", tagColor:"#16a34a" },
              { title:"Top 5 Camera Phones Compared",  tag:"Review", date:"Feb 25", tagColor:"#d97706" },
            ].map((post, i) => (
              <div key={i} className="blog-card" style={{
                background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:18,
                overflow:"hidden", cursor:"pointer",
                animationName:"cardIn", animationDuration:"0.45s",
                animationTimingFunction:"cubic-bezier(.4,0,.2,1)", animationFillMode:"both",
                animationDelay:`${0.1 + i*0.08}s`,
              }}>
                <div style={{ background:`linear-gradient(135deg,${P.mist},${P.sky})`, height:108, display:"flex", alignItems:"center", justifyContent:"center", color:P.royal, position:"relative", overflow:"hidden" }}>
                  <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${P.royal},${P.ocean})` }}/>
                </div>
                <div style={{ padding:"14px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <span style={{ fontSize:10, fontWeight:800, padding:"2px 9px", borderRadius:999, background:`${post.tagColor}15`, color:post.tagColor, border:`1px solid ${post.tagColor}30` }}>{post.tag}</span>
                    <span style={{ color:P.muted, fontSize:11 }}>{post.date}</span>
                  </div>
                  <p style={{ color:P.navy, fontWeight:700, fontSize:13, margin:0, lineHeight:1.5 }}>{post.title}</p>
                  <p style={{ color:P.ocean, fontSize:12, fontWeight:600, margin:"8px 0 0" }}>Read more →</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}