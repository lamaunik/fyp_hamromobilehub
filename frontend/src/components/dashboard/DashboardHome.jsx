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
    <div style={{ position: "relative", minHeight: 220, overflow: "hidden", borderRadius: 24, boxShadow: "0 12px 40px rgba(40, 43, 74, .28)", transition: "background 0.5s ease" }}>
      {SLIDES.map((s, i) => (
        <div key={i} style={{ 
          position: i === current ? "relative" : "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: s.gradient, 
          padding: "36px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", 
          opacity: i === current ? 1 : 0,
          visibility: i === current ? "visible" : "hidden",
          transition: "opacity 0.6s ease-in-out, visibility 0.6s",
          zIndex: i === current ? 1 : 0
        }}>
          {/* Background Decorative Elements */}
          <div style={{ position: "absolute", top: -50, right: 140, width: 250, height: 250, borderRadius: "50%", background: "rgba(40, 43, 74, .15)", filter: "blur(55px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: `linear-gradient(rgba(212, 210, 195, 1) 1px,transparent 1px),linear-gradient(90deg,rgba(212, 210, 195, 1) 1px,transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
          
          <div style={{ position: "relative", zIndex: 1, transform: i === current ? "translateX(0)" : "translateX(-20px)", transition: "transform 0.6s ease", transitionDelay: "0.1s" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(40, 43, 74, .22)", border: "1px solid rgba(40, 43, 74, .4)", borderRadius: 999, padding: "5px 14px", marginBottom: 16 }}>
              <svg width="11" height="11" fill={P.sky} viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              <span style={{ color: P.sky, fontSize: 10, fontWeight: 800, letterSpacing: ".12em" }}>{s.badge}</span>
            </div>
            <h2 style={{ color: P.white, fontWeight: 900, fontSize: 30, margin: "0 0 10px", letterSpacing: "-.03em", lineHeight: 1.15 }}>{s.title}</h2>
            <p style={{ color: "rgba(212, 210, 195, .72)", fontSize: 14, margin: "0 0 24px", lineHeight: 1.6, maxWidth: 380 }}>{s.subtitle}</p>
            <div style={{ display: "flex", gap: 12 }}>
              <Btn onClick={() => setTab(s.primaryAction)} style={{ background: P.white, color: P.royal, fontWeight: 800, fontSize: 13, padding: "12px 26px", borderRadius: 12, boxShadow: "0 4px 16px rgba(40, 43, 74, .2)" }}>{s.primaryBtn}</Btn>
              <Btn onClick={() => setTab("orders")} style={{ background: "transparent", color: P.sky, fontWeight: 700, fontSize: 13, padding: "11px 20px", borderRadius: 12, border: "1px solid rgba(212, 210, 195, .35)" }}>My Orders</Btn>
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1, flexShrink: 0, width: 130, height: 130, borderRadius: 28, background: "rgba(40, 43, 74, .18)", border: "1px solid rgba(212, 210, 195, .22)", display: "flex", alignItems: "center", justifyContent: "center", color: P.sky, transform: i === current ? "translateX(0)" : "translateX(20px)", transition: "transform 0.6s ease", transitionDelay: "0.1s" }}>
            {s.icon}
            <div style={{ position: "absolute", top: -12, right: -16, background: P.white, borderRadius: 10, padding: "6px 10px", boxShadow: "0 4px 16px rgba(40, 43, 74, .12)", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: P.green, display: "inline-block" }} />
              <span style={{ fontSize: 11, color: P.navy, fontWeight: 700 }}>{s.feature1}</span>
            </div>
            <div style={{ position: "absolute", bottom: -12, left: -16, background: P.white, borderRadius: 10, padding: "6px 10px", boxShadow: "0 4px 16px rgba(40, 43, 74, .12)", display: "flex", alignItems: "center", gap: 5 }}>
              {Icon.star}<span style={{ fontSize: 11, color: P.navy, fontWeight: 700 }}>{s.feature2}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Slider Controls */}
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 2 }}>
        {SLIDES.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            style={{ 
               width: 30, height: 4, borderRadius: 2, 
               background: i === current ? P.white : "rgba(255,255,255,0.3)", 
               border: "none", cursor: "pointer", transition: "background 0.3s" 
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {[
          { label: "Products",  val: counts[0], suf: "+" },
          { label: "Sellers",   val: counts[1], suf: "+" },
          { label: "Orders",    val: counts[2] > 999 ? Math.floor(counts[2] / 1000) + "k+" : counts[2], suf: "" },
          { label: "Customers", val: counts[3] > 999 ? Math.floor(counts[3] / 1000) + "k+" : counts[3], suf: "" },
        ].map((s, i) => (
          <div key={i} className="card fadeUp" style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, animationDelay: `${i * .07}s` }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg,${P.royal},${P.ocean})`, display: "flex", alignItems: "center", justifyContent: "center", color: P.white, flexShrink: 0, boxShadow: "0 4px 12px rgba(40, 43, 74, .28)" }}>
              {[Icon.phone, Icon.shield, Icon.truck, Icon.map][i]}
            </div>
            <div>
              <p style={{ color: P.navy, fontWeight: 900, fontSize: 20, margin: 0, letterSpacing: "-.02em" }}>
                {typeof s.val === "string" ? s.val : s.val.toLocaleString()}{typeof s.val === "number" ? s.suf : ""}
              </p>
              <p style={{ color: P.muted, fontSize: 11, margin: "2px 0 0" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 17, margin: 0 }}>Shop by Category</h3>
          <Btn onClick={() => setTab("products")} style={{ background: "none", border: "none", color: P.ocean, fontSize: 13, fontWeight: 700, padding: 0 }}>View All →</Btn>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
          {cats.map((c) => (
            <button key={c.label} className="card btn" onClick={() => setTab("products")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 18, padding: "18px 26px", cursor: "pointer", flexShrink: 0, fontFamily: P.font }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center", color: P.ocean, border: `1px solid ${P.mist}` }}>{c.icon}</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: P.navy, whiteSpace: "nowrap" }}>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 17, margin: 0 }}>Featured Products</h3>
          <Btn onClick={() => setTab("products")} style={{ background: "none", border: "none", color: P.ocean, fontSize: 13, fontWeight: 700, padding: 0 }}>View All →</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 14 }}>
          {featured.map((p, i) => {
            const pId = p._id || p.id;
            return <ProductCard key={pId} product={p} onView={() => viewProduct(p)} onAddToCart={() => addToCart(p)} wishlisted={wishlist.includes(pId)} onToggleWish={() => toggleWish(pId)} delay={`${i * .06}s`} />
          })}
        </div>
      </div>

      {/* Promo Banners */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { title: "New Arrivals",     sub: "Latest smartphones just dropped",  btn: "Explore →",   bg: `linear-gradient(135deg,${P.navy},${P.royal})`,  icon: Icon.phone,  txtCol: P.sky,                    btnStyle: { border: "1px solid rgba(212, 210, 195, .4)", color: P.sky } },
          { title: "Accessories Sale", sub: "Up to 40% off on all accessories", btn: "Shop Now →", bg: `linear-gradient(135deg,${P.royal},${P.ocean})`, icon: Icon.camera, txtCol: "rgba(229, 227, 213, .8)",    btnStyle: { background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.3)", color: P.white } },
        ].map((b, i) => (
          <div key={i} className="btn" onClick={() => setTab("products")} style={{ background: b.bg, borderRadius: 20, padding: "24px 28px", display: "flex", alignItems: "center", gap: 20, overflow: "hidden", position: "relative", cursor: "pointer" }}>
            <div className="float" style={{ position: "absolute", top: -30, right: -10, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,.06)", filter: "blur(30px)", pointerEvents: "none" }} />
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: P.white }}>{b.icon}</div>
            <div style={{ position: "relative" }}>
              <p style={{ color: P.white, fontWeight: 900, fontSize: 17, margin: "0 0 4px" }}>{b.title}</p>
              <p style={{ color: b.txtCol, fontSize: 13, margin: "0 0 12px" }}>{b.sub}</p>
              <span style={{ fontSize: 12, fontWeight: 700, padding: "6px 16px", borderRadius: 8, background: "transparent", ...b.btnStyle, cursor: "pointer" }}>{b.btn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}