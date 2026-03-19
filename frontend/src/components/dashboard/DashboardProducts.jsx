import { useState } from "react";
import { P } from "./DashboardConstants";
import { Icon } from "./DashboardIcons";
import { Btn, Stars, ProductThumb } from "./DashboardUI";
import ProductCard from "../common/ProductCard";

export default function DashboardProducts({ viewProduct, addToCart, wishlist, toggleWish, products, loading, onRefresh }) {
  const [search, setSearch] = useState("");
  const [brand,  setBrand]  = useState("All");
  const [cat,    setCat]    = useState("All");
  const [price,  setPrice]  = useState(999999); // FIX: high default so all products show
  const [sort,   setSort]   = useState("featured");
  const [view,   setView]   = useState("grid");
  const [gridKey,setGridKey]= useState(0);

  const cats   = ["All", "Smartphones", "Laptops", "Tablets", "Accessories", "Wearables"];

  // FIX: derive brands dynamically from actual products instead of hardcoded list
  const brands = ["All", ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))];

  // FIX: maxPrice derived from products so range slider is meaningful
  const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price), 1000) : 1000;

  const filtered = products
    .filter((p) =>
      (cat   === "All" || p.category === cat) &&
      // FIX: brand filter was computed but never applied — now it is
      (brand === "All" || p.brand === brand) &&
      p.price <= price &&
      (p.name.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) =>
      sort === "price-asc"  ? a.price - b.price :
      sort === "price-desc" ? b.price - a.price : 0
    );

  const setF = (fn) => { fn(); setGridKey((k) => k + 1); };

  return (
    <div className="page" style={{ display: "flex", height: "100%", fontFamily: P.font }}>

      {/* Filter Sidebar */}
      <div className="slideLeft" style={{ width: 220, flexShrink: 0, background: P.white, borderRight: `1.5px solid ${P.mist}`, padding: "20px 16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 15, margin: 0 }}>Filters</h3>
          <button onClick={() => setF(() => { setBrand("All"); setCat("All"); setPrice(maxPrice); })} style={{ fontSize: 11, fontWeight: 700, color: P.muted, background: P.mistBg, border: `1px solid ${P.mist}`, borderRadius: 7, padding: "3px 9px", cursor: "pointer" }}>Reset</button>
        </div>

        {[
          { title: "Category", items: cats,   val: cat,   set: (v) => setF(() => setCat(v)),   name: "cat"   },
          { title: "Brand",    items: brands, val: brand, set: (v) => setF(() => setBrand(v)), name: "brand" },
        ].map(({ title, items, val, set, name }) => (
          <div key={name}>
            <p style={{ fontSize: 10, fontWeight: 800, color: P.muted, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 10px" }}>{title}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 160, overflowY: "auto" }}>
              {items.map((item) => (
                <label key={item} style={{ display: "flex", alignItems: "center", gap: 9, padding: "5px 8px", borderRadius: 9, cursor: "pointer", background: val === item ? "rgba(1,138,190,.07)" : "transparent", transition: "background .15s" }}>
                  <input type="radio" name={name} checked={val === item} onChange={() => set(item)} style={{ accentColor: P.ocean, cursor: "pointer" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: val === item ? P.ocean : P.muted }}>{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div>
          <p style={{ fontSize: 10, fontWeight: 800, color: P.muted, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 8px" }}>Max Price — <span style={{ color: P.ocean }}>Rs. {price >= maxPrice ? "Any" : price}</span></p>
          <input type="range" min={0} max={maxPrice} step={50} value={price} onChange={(e) => setF(() => setPrice(+e.target.value))} style={{ width: "100%", accentColor: P.ocean, cursor: "pointer" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontSize: 11, color: P.muted }}>Rs. 0</span>
            <span style={{ fontSize: 11, color: P.muted }}>Rs. {maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "22px 24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: P.muted, display: "flex", pointerEvents: "none" }}>{Icon.search}</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
              style={{ paddingLeft: 34, paddingRight: 14, paddingTop: 9, paddingBottom: 9, border: `1.5px solid ${P.mist}`, borderRadius: 10, outline: "none", fontFamily: P.font, background: P.mistBg, color: P.navy, fontSize: 13, width: "100%", transition: "all .2s" }}
              onFocus={(e) => { e.target.style.borderColor = P.sky; e.target.style.background = P.white; }}
              onBlur={(e)  => { e.target.style.borderColor = P.mist; e.target.style.background = P.mistBg; }}
            />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ border: `1.5px solid ${P.mist}`, borderRadius: 10, outline: "none", fontFamily: P.font, background: P.mistBg, color: P.navy, fontSize: 13, padding: "9px 12px", cursor: "pointer" }}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
          <div style={{ display: "flex", border: `1.5px solid ${P.mist}`, borderRadius: 10, overflow: "hidden" }}>
            {["grid", "list"].map((m) => (
              <button key={m} onClick={() => setView(m)} style={{ padding: "8px 12px", border: "none", cursor: "pointer", fontFamily: P.font, background: view === m ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.mistBg, color: view === m ? P.white : P.muted, transition: "all .15s" }}>
                {m === "grid"
                  ? <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z" /></svg>
                  : <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>}
              </button>
            ))}
          </div>
          {/* FIX: Refresh button to manually reload latest vendor products */}
          <button
            onClick={onRefresh}
            disabled={loading}
            title="Refresh products"
            style={{ padding: "8px 12px", border: `1.5px solid ${P.mist}`, borderRadius: 10, background: P.mistBg, color: P.ocean, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, transition: "all .2s" }}
            onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = P.white; e.currentTarget.style.borderColor = P.ocean; }}}
            onMouseLeave={(e) => { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.borderColor = P.mist; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
              style={{ animation: loading ? "spin 1s linear infinite" : "none" }}>
              <path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        <p style={{ color: P.muted, fontSize: 13, fontWeight: 600, margin: 0 }}>
          <span style={{ color: P.navy, fontWeight: 900 }}>{filtered.length}</span> products found
        </p>

        {/* Loading skeleton */}
        {loading && products.length === 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(185px,1fr))", gap: 14 }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 16, height: 240, animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
          </div>
        )}

        {/* Grid View */}
        {!loading && view === "grid" && (
          <div key={`g${gridKey}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(185px,1fr))", gap: 14 }}>
            {filtered.map((p, i) => {
              const pId = p._id || p.id;
              return <ProductCard key={pId} product={p} onView={() => viewProduct(p)} onAddToCart={() => addToCart(p)} wishlisted={wishlist.includes(pId)} onToggleWish={() => toggleWish(pId)} delay={`${Math.min(i * .04, .3)}s`} />
            })}
          </div>
        )}

        {/* List View */}
        {!loading && view === "list" && (
          <div key={`l${gridKey}`} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((p, i) => {
              const pId = p._id || p.id;
              return (
                <div key={pId} className="card" onClick={() => viewProduct(p)} style={{ background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 16, padding: "14px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", animationName: "slideLeft", animationDuration: ".35s", animationTimingFunction: "cubic-bezier(.4,0,.2,1)", animationFillMode: "both", animationDelay: `${Math.min(i * .04, .3)}s` }}>
                  <div style={{ background: P.mistBg, borderRadius: 12, width: 68, height: 68, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${P.mist}`, overflow: "hidden" }}>
                    {p.images && p.images.length > 0 ? (
                      <img src={p.images[0].startsWith("http") ? p.images[0] : `http://localhost:5000${p.images[0]}`} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
                    ) : (
                      <ProductThumb cat={p.category} size={30} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 10, color: P.ocean, fontWeight: 800, margin: "0 0 2px", textTransform: "uppercase" }}>{p.brand || p.vendor?.name || "Vendor"}</p>
                    <h3 style={{ color: P.navy, fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{p.name}</h3>
                    <p style={{ color: P.muted, fontSize: 12, margin: 0 }}>{p.category} · Stock: {p.stock}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                    <p style={{ color: P.navy, fontWeight: 900, fontSize: 18, margin: "0 0 8px" }}>Rs. {p.price}</p>
                    <Btn onClick={() => addToCart(p)} style={{ padding: "6px 14px", background: `linear-gradient(135deg,${P.royal},${P.ocean})`, color: P.white, fontSize: 11, fontWeight: 700, borderRadius: 9 }}>+ Cart</Btn>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, background: P.white, borderRadius: 20, border: `1.5px dashed ${P.mist}` }}>
            <p style={{ color: P.muted, fontSize: 14, margin: "0 0 12px" }}>No products found. Try adjusting filters.</p>
            <button onClick={onRefresh} style={{ padding: "8px 20px", background: `linear-gradient(135deg,${P.royal},${P.ocean})`, color: P.white, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              Refresh Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}