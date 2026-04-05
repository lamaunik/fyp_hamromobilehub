import { useState, useEffect } from "react";
import { P } from "./DashboardConstants";
import { Icon } from "./DashboardIcons";
import { Btn } from "./DashboardUI";
import ProductCard from "../common/ProductCard";

const SLIDES = [
  {
    badge: "LIMITED TIME OFFER",
    title: "Find Your Perfect Device",
    subtitle: "Best deals on top-rated phones, laptops & tablets — fast delivery guaranteed.",
    primaryBtn: "Shop Now →",
    primaryAction: "products",
    icon: Icon.laptop,
    feature1: "500+ Products",
    feature2: "4.8 Avg Rating",
    gradient: `linear-gradient(135deg,${P.navy} 0%,${P.royal} 55%,#282B4A 100%)`
  },
  {
    badge: "NEW ARRIVALS",
    title: "Next-Gen Smartphones",
    subtitle: "Experience the fastest processors and most advanced cameras on the market.",
    primaryBtn: "Explore Phones",
    primaryAction: "products",
    icon: Icon.phone,
    feature1: "Latest Models",
    feature2: "Unbeatable Prices",
    gradient: `linear-gradient(135deg,#003152 0%,#005A9C 55%,#0F52BA 100%)`
  },
  {
    badge: "ACCESSORIES SALE",
    title: "Up to 40% Off",
    subtitle: "Upgrade your gear with premium headphones, cases, and fast chargers.",
    primaryBtn: "Grab the Deal",
    primaryAction: "products",
    icon: Icon.camera,
    feature1: "Premium Brands",
    feature2: "Free Shipping",
    gradient: `linear-gradient(135deg,#012E4A 0%,#036280 55%,#378BA4 100%)`
  }
];

function HeroSlider({ setTab }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <div style={{ position: "relative", minHeight: 380, overflow: "hidden", background: P.mistBg, borderRadius: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: `1px solid ${P.mist}`, transition: "background 0.5s ease" }}>
      {SLIDES.map((s, i) => (
        <div key={i} style={{ 
          position: i === current ? "relative" : "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: P.royal, 
          padding: "50px 60px", display: "flex", alignItems: "center", justifyContent: "space-between", 
          opacity: i === current ? 1 : 0,
          visibility: i === current ? "visible" : "hidden",
          transition: "opacity 0.6s ease, visibility 0.6s",
          zIndex: i === current ? 1 : 0
        }}>
          {/* Background Decorative Elements */}
          <div style={{ position: "absolute", right: -50, top: -50, width: 400, height: 400, background: "rgba(255,255,255,0.03)", transform: "rotate(45deg)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: '30%', top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: '60%', top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
          
          <div style={{ position: "relative", zIndex: 1, transform: i === current ? "translateX(0)" : "translateX(-20px)", transition: "transform 0.6s ease", transitionDelay: "0.1s" }}>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", color: P.white, fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "6px 14px", borderRadius: 12, marginBottom: 20 }}>
              {s.badge}
            </div>
            <h2 style={{ color: P.white, fontFamily: P.fontHeading, fontWeight: 800, fontSize: 48, margin: "0 0 16px", letterSpacing: "0.5px", lineHeight: 1 }}>{s.title}</h2>
            <p style={{ color: "rgba(255, 255, 255, .7)", fontSize: 15, margin: "0 0 32px", lineHeight: 1.5, maxWidth: 400 }}>{s.subtitle}</p>
            <div style={{ display: "flex", gap: 14 }}>
              <Btn onClick={() => setTab(s.primaryAction)} style={{ background: P.white, color: P.navy, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", padding: "14px 28px", borderRadius: 12, border: "none" }}>{s.primaryBtn}</Btn>
              <Btn onClick={() => setTab("orders")} style={{ background: "transparent", color: P.white, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", padding: "14px 28px", borderRadius: 12, border: `1.5px solid rgba(255,255,255,0.4)` }}>My Orders</Btn>
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1, flexShrink: 0, color: P.white, transform: i === current ? "translateX(0)" : "translateX(20px)", transition: "transform 0.6s ease", transitionDelay: "0.1s" }}>
            <div style={{ transform: "scale(2)", opacity: 0.9 }}>
              {s.icon}
            </div>
            
            <div style={{ position: "absolute", top: -30, right: -30, background: P.white, color: P.navy, padding: "8px 12px", borderRadius: 10, display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
               {s.feature1}
            </div>
            <div style={{ position: "absolute", bottom: -30, left: -40, background: P.accent, color: P.white, padding: "8px 12px", borderRadius: 10, display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", boxShadow: "0 8px 24px rgba(244, 63, 94, 0.4)" }}>
               {s.feature2}
            </div>
          </div>
        </div>
      ))}

      {/* Slider Controls */}
      <div style={{ position: "absolute", bottom: 24, left: 50, display: "flex", gap: 10, zIndex: 2 }}>
        {SLIDES.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            style={{ 
               width: i === current ? 40 : 12, height: 4, 
               background: i === current ? P.white : "rgba(255,255,255,0.3)", 
               border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0
            }} 
          />
        ))}
      </div>
    </div>
  );
}

export default function DashboardHome({ setTab, viewProduct, addToCart, wishlist, toggleWish, products }) {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targets = [500, 120, 10000, 8000];

  useEffect(() => {
    const timers = targets.map((t, i) => {
      let v = 0;
      const step = t / 60;
      return setInterval(() => {
        v = Math.min(v + step, t);
        setCounts((c) => { const n = [...c]; n[i] = Math.floor(v); return n; });
        if (v >= t) clearInterval(timers?.[i]);
      }, 16);
    });
    return () => timers.forEach(clearInterval);
  }, []);

  const cats = [
    { label: "Smartphones", icon: Icon.phone },
    { label: "Laptops",     icon: Icon.laptop },
    { label: "Tablets",     icon: Icon.tablet },
    { label: "Accessories", icon: Icon.camera },
  ];

  // Use up to 6 products for the featured section
  const featured = products.slice(0, 6);

  return (
    <div className="page" style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 28, fontFamily: P.font }}>

      {/* Implemented Animated Hero Banner */}
      <HeroSlider setTab={setTab} />

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: P.white, border: `1px solid ${P.mist}`, borderRadius: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
        {[
          { label: "Products",  val: counts[0], suf: "+" },
          { label: "Sellers",   val: counts[1], suf: "+" },
          { label: "Orders",    val: counts[2] > 999 ? Math.floor(counts[2] / 1000) + "k+" : counts[2], suf: "" },
          { label: "Customers", val: counts[3] > 999 ? Math.floor(counts[3] / 1000) + "k+" : counts[3], suf: "" },
        ].map((s, i) => (
          <div key={i} className="fadeUp" style={{ padding: "26px 24px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, borderRight: i < 3 ? `1px solid ${P.mist}` : "none", animationDelay: `${i * .07}s` }}>
            <p style={{ color: P.navy, fontFamily: P.fontHeading, fontWeight: 800, fontSize: 32, margin: 0, letterSpacing: "0.5px", lineHeight: 1 }}>
              {typeof s.val === "string" ? s.val : s.val.toLocaleString()}{typeof s.val === "number" ? s.suf : ""}
            </p>
            <p style={{ color: P.muted, fontSize: 11, margin: 0, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ color: P.navy, fontFamily: P.fontHeading, fontWeight: 800, fontSize: 22, margin: 0, letterSpacing: "0.5px" }}>Shop by Category</h3>
          <Btn onClick={() => setTab("products")} style={{ background: "none", border: "none", color: P.navy, fontSize: 13, fontWeight: 700, padding: 0 }}>View All →</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {cats.map((c) => (
            <button key={c.label} className="card" onClick={() => setTab("products")} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, background: P.white, color: P.navy, border: `1px solid ${P.mist}`, padding: "28px 16px", cursor: "pointer", transition: "all 0.3s ease", fontFamily: P.font, borderRadius: 16 }}
            >
              <div style={{ color: P.muted }}>{c.icon}</div>
              <span style={{ fontSize: 13, fontWeight: 700, color: P.navy }}>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ color: P.navy, fontFamily: P.fontHeading, fontWeight: 800, fontSize: 22, margin: 0, letterSpacing: "0.5px" }}>Featured Products</h3>
          <Btn onClick={() => setTab("products")} style={{ background: "none", border: "none", color: P.navy, fontSize: 13, fontWeight: 700, padding: 0 }}>View All →</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {featured.map((p, i) => {
            const pId = p._id || p.id;
            return <ProductCard key={pId} product={p} onView={() => viewProduct(p)} onAddToCart={() => addToCart(p)} wishlisted={wishlist.includes(pId)} onToggleWish={() => toggleWish(pId)} delay={`${i * .06}s`} />
          })}
        </div>
      </div>

      {/* Promo Banners */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { title: "New Arrivals",     sub: "Latest smartphones just dropped",  btn: "Explore",   bg: P.white,  icon: Icon.phone,  txtCol: P.muted,                    btnStyle: { background: P.navy, color: P.white } },
          { title: "Accessories Sale", sub: "Up to 40% off on all accessories", btn: "Shop Now", bg: P.mist, icon: Icon.camera, txtCol: P.muted,                     btnStyle: { background: P.white, color: P.navy, border: `1px solid ${P.sky}` } },
        ].map((b, i) => (
          <div key={i} className="card btn" onClick={() => setTab("products")} style={{ background: b.bg, padding: "28px 32px", display: "flex", alignItems: "center", gap: 30, overflow: "hidden", position: "relative", cursor: "pointer", transition: "all 0.3s ease" }}>
            <div style={{ transform: "scale(2)", color: i === 0 ? P.sky : P.white, position: "absolute", right: 28, top: 40, pointerEvents: "none" }}>{b.icon}</div>
            <div style={{ position: "relative" }}>
              <p style={{ color: P.navy, fontFamily: P.fontHeading, fontWeight: 800, fontSize: 28, margin: "0 0 6px", letterSpacing: "0.5px" }}>{b.title}</p>
              <p style={{ color: b.txtCol, fontSize: 13, margin: "0 0 20px", maxWidth: 220 }}>{b.sub}</p>
              <span style={{ fontSize: 12, fontWeight: 700, padding: "10px 20px", borderRadius: 10, ...b.btnStyle, cursor: "pointer" }}>{b.btn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}