import { useState, useEffect, useRef } from "react";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const STYLES = `
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes cardIn {
    from { opacity:0; transform:translateY(14px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes listItemIn {
    from { opacity:0; transform:translateX(-14px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes shimmerMove {
    0%   { background-position:-400px 0; }
    100% { background-position:400px 0; }
  }
  @keyframes badgePop {
    0%   { transform:scale(0); }
    70%  { transform:scale(1.2); }
    100% { transform:scale(1); }
  }
  .filter-sidebar { animation: slideInLeft 0.4s cubic-bezier(.4,0,.2,1) both; }
  .products-area  { animation: fadeUp 0.4s 0.05s cubic-bezier(.4,0,.2,1) both; }
  .prod-grid-card { animation: cardIn cubic-bezier(.4,0,.2,1) both; transition: transform 0.22s, box-shadow 0.22s, border-color 0.2s !important; }
  .prod-grid-card:hover { transform:translateY(-6px) !important; box-shadow:0 16px 38px rgba(1,138,190,0.16) !important; border-color:var(--sky) !important; }
  .prod-list-row  { animation: listItemIn cubic-bezier(.4,0,.2,1) both; transition: all 0.18s !important; }
  .prod-list-row:hover { transform:translateX(4px) !important; box-shadow:0 4px 18px rgba(1,138,190,0.12) !important; border-color:var(--sky) !important; }
  .add-btn        { transition: opacity 0.18s, transform 0.15s !important; }
  .add-btn:hover  { transform:scale(1.04) !important; }
  .add-btn-list   { transition: all 0.15s !important; }
  .add-btn-list:hover { transform:translateY(-2px) !important; box-shadow:0 6px 16px rgba(1,138,190,0.28) !important; }
  .filter-label:hover span { color:${P.ocean} !important; }
  .view-btn       { transition: all 0.15s !important; }
  .sort-select    { transition: border-color 0.18s, box-shadow 0.18s !important; }
  .sort-select:focus { border-color:${P.sky} !important; box-shadow:0 0 0 3px rgba(151,202,219,0.2) !important; }
  .clear-filter   { transition: all 0.15s !important; }
  .clear-filter:hover { background:${P.mist} !important; color:${P.navy} !important; }
  .cat-chip       { transition: all 0.15s !important; }
  .cat-chip:hover { border-color:${P.sky} !important; color:${P.ocean} !important; background:${P.mistBg} !important; }
`;

const badgeStyle = {
  Hot:  { bg:"rgba(220,38,38,0.1)",  border:"rgba(220,38,38,0.25)",  text:"#ef4444" },
  Sale: { bg:"rgba(234,88,12,0.1)",  border:"rgba(234,88,12,0.25)",  text:"#f97316" },
  New:  { bg:"rgba(34,197,94,0.1)",  border:"rgba(34,197,94,0.25)",  text:"#22c55e" },
  Deal: { bg:"rgba(1,138,190,0.1)",  border:"rgba(1,138,190,0.25)",  text:P.ocean   },
};

const allProducts = [
  { id:1,  name:"iPhone 15 Pro Max",        brand:"Apple",     price:1199, oldPrice:1399, rating:4.8, reviews:234, badge:"Hot",  category:"Smartphones", storage:"256GB" },
  { id:2,  name:"Samsung Galaxy S24 Ultra", brand:"Samsung",   price:999,  oldPrice:1199, rating:4.7, reviews:187, badge:"Sale", category:"Smartphones", storage:"512GB" },
  { id:3,  name:"MacBook Pro M3",           brand:"Apple",     price:1799, oldPrice:1999, rating:4.9, reviews:312, badge:"New",  category:"Laptops",     storage:"512GB" },
  { id:4,  name:"Sony Xperia 1 VI",         brand:"Sony",      price:799,  oldPrice:999,  rating:4.5, reviews:98,  badge:null,   category:"Smartphones", storage:"128GB" },
  { id:5,  name:"LG Gram 17",              brand:"LG",        price:1299, oldPrice:1499, rating:4.6, reviews:145, badge:"Deal", category:"Laptops",     storage:"1TB" },
  { id:6,  name:"Microsoft Surface Pro",    brand:"Microsoft", price:999,  oldPrice:1199, rating:4.4, reviews:76,  badge:null,   category:"Tablets",     storage:"256GB" },
  { id:7,  name:"Google Pixel 8 Pro",       brand:"Google",    price:749,  oldPrice:899,  rating:4.6, reviews:203, badge:"Sale", category:"Smartphones", storage:"256GB" },
  { id:8,  name:"OnePlus 12",               brand:"OnePlus",   price:549,  oldPrice:699,  rating:4.5, reviews:156, badge:null,   category:"Smartphones", storage:"256GB" },
  { id:9,  name:"iPad Pro M4",              brand:"Apple",     price:1099, oldPrice:1299, rating:4.8, reviews:189, badge:"New",  category:"Tablets",     storage:"256GB" },
  { id:10, name:"Dell XPS 15",              brand:"Dell",      price:1599, oldPrice:1799, rating:4.7, reviews:267, badge:null,   category:"Laptops",     storage:"1TB" },
  { id:11, name:"Xiaomi 14 Ultra",          brand:"Xiaomi",    price:699,  oldPrice:849,  rating:4.4, reviews:112, badge:"Deal", category:"Smartphones", storage:"512GB" },
  { id:12, name:"Samsung Galaxy Tab S9",    brand:"Samsung",   price:799,  oldPrice:999,  rating:4.6, reviews:134, badge:null,   category:"Tablets",     storage:"256GB" },
];

const categories = ["All","Smartphones","Laptops","Tablets","Accessories"];
const brands     = ["All","Apple","Samsung","Sony","LG","Microsoft","Google","OnePlus","Dell","Xiaomi"];

const PhoneIcon = ({ size=28 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
  </svg>
);

export default function DashboardProducts({ viewProduct, addToCart }) {
  const [search, setSearch]               = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCat, setSelectedCat]     = useState("All");
  const [priceRange, setPriceRange]       = useState(2000);
  const [sortBy, setSortBy]               = useState("featured");
  const [viewMode, setViewMode]           = useState("grid");
  const [searchFocused, setSearchFocused] = useState(false);
  const [addedIds, setAddedIds]           = useState({});
  const [gridKey, setGridKey]             = useState(0);

  const filtered = allProducts
    .filter(p =>
      (selectedBrand==="All" || p.brand===selectedBrand) &&
      (selectedCat==="All"   || p.category===selectedCat) &&
      p.price <= priceRange &&
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a,b) => {
      if (sortBy==="price-asc")  return a.price-b.price;
      if (sortBy==="price-desc") return b.price-a.price;
      if (sortBy==="rating")     return b.rating-a.rating;
      return 0;
    });

  const handleFilter = (fn) => { fn(); setGridKey(k => k+1); };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedIds(prev => ({ ...prev, [product.id]:true }));
    setTimeout(() => setAddedIds(prev => { const n={...prev}; delete n[product.id]; return n; }), 1800);
  };

  const activeFilters = [
    selectedBrand!=="All" && { label:selectedBrand, clear:()=>setSelectedBrand("All") },
    selectedCat!=="All"   && { label:selectedCat,   clear:()=>setSelectedCat("All") },
    priceRange<2000       && { label:`≤$${priceRange}`, clear:()=>setPriceRange(2000) },
  ].filter(Boolean);

  return (
    <>
      <style>{STYLES}</style>
      <div style={{ display:"flex", height:"100%", fontFamily:P.font }}>

        {/* ── Filter Sidebar ── */}
        <div className="filter-sidebar" style={{
          width:224, flexShrink:0, background:P.white, borderRight:`1.5px solid ${P.mist}`,
          padding:"20px 16px", overflowY:"auto", display:"flex", flexDirection:"column", gap:22,
          boxShadow:"2px 0 14px rgba(0,27,72,0.05)",
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <h3 style={{ color:P.navy, fontWeight:900, fontSize:15, margin:0 }}>Filters</h3>
            {activeFilters.length > 0 && (
              <button className="clear-filter" onClick={() => { setSelectedBrand("All"); setSelectedCat("All"); setPriceRange(2000); setGridKey(k=>k+1); }}
                style={{ fontSize:11, fontWeight:700, color:P.muted, background:P.mistBg, border:`1px solid ${P.mist}`, borderRadius:7, padding:"3px 9px", cursor:"pointer" }}>
                Clear all
              </button>
            )}
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {activeFilters.map((f,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(1,138,190,0.08)", border:"1px solid rgba(1,138,190,0.22)", borderRadius:999, padding:"3px 10px", animation:"badgePop 0.3s cubic-bezier(.4,0,.2,1) both" }}>
                  <span style={{ fontSize:11, fontWeight:700, color:P.ocean }}>{f.label}</span>
                  <button onClick={f.clear} style={{ background:"none", border:"none", color:P.ocean, cursor:"pointer", padding:0, lineHeight:1, fontSize:13, fontWeight:700 }}>×</button>
                </div>
              ))}
            </div>
          )}

          {/* Category */}
          <div>
            <p style={{ fontSize:10, fontWeight:800, color:P.muted, letterSpacing:"0.12em", textTransform:"uppercase", margin:"0 0 10px" }}>Category</p>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {categories.map(cat => {
                const active = selectedCat===cat;
                return (
                  <label key={cat} className="filter-label" style={{ display:"flex", alignItems:"center", gap:9, padding:"6px 8px", borderRadius:9, cursor:"pointer", background: active ? "rgba(1,138,190,0.07)" : "transparent", transition:"background 0.15s" }}>
                    <input type="radio" name="category" checked={active} onChange={() => handleFilter(()=>setSelectedCat(cat))} style={{ accentColor:P.ocean, width:14, height:14, cursor:"pointer" }}/>
                    <span style={{ fontSize:13, fontWeight:600, color: active ? P.ocean : P.muted, transition:"color 0.15s" }}>{cat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Brand */}
          <div>
            <p style={{ fontSize:10, fontWeight:800, color:P.muted, letterSpacing:"0.12em", textTransform:"uppercase", margin:"0 0 10px" }}>Brand</p>
            <div style={{ maxHeight:180, overflowY:"auto", display:"flex", flexDirection:"column", gap:4 }}>
              {brands.map(brand => {
                const active = selectedBrand===brand;
                return (
                  <label key={brand} className="filter-label" style={{ display:"flex", alignItems:"center", gap:9, padding:"6px 8px", borderRadius:9, cursor:"pointer", background: active ? "rgba(1,138,190,0.07)" : "transparent", transition:"background 0.15s" }}>
                    <input type="radio" name="brand" checked={active} onChange={() => handleFilter(()=>setSelectedBrand(brand))} style={{ accentColor:P.ocean, width:14, height:14, cursor:"pointer" }}/>
                    <span style={{ fontSize:13, fontWeight:600, color: active ? P.ocean : P.muted, transition:"color 0.15s" }}>{brand}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price range */}
          <div>
            <p style={{ fontSize:10, fontWeight:800, color:P.muted, letterSpacing:"0.12em", textTransform:"uppercase", margin:"0 0 10px" }}>
              Max Price — <span style={{ color:P.ocean, fontWeight:900 }}>${priceRange}</span>
            </p>
            <input type="range" min={100} max={2000} step={50} value={priceRange}
              onChange={e => handleFilter(()=>setPriceRange(Number(e.target.value)))}
              style={{ width:"100%", accentColor:P.ocean, cursor:"pointer" }}/>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
              <span style={{ fontSize:11, color:P.muted, fontWeight:600 }}>$100</span>
              <span style={{ fontSize:11, color:P.muted, fontWeight:600 }}>$2,000</span>
            </div>
          </div>

          {/* Rating */}
          <div>
            <p style={{ fontSize:10, fontWeight:800, color:P.muted, letterSpacing:"0.12em", textTransform:"uppercase", margin:"0 0 10px" }}>Min Rating</p>
            {[4.5, 4.0, 3.5].map(r => (
              <label key={r} className="filter-label" style={{ display:"flex", alignItems:"center", gap:9, padding:"5px 8px", borderRadius:9, cursor:"pointer" }}>
                <input type="radio" name="rating" style={{ accentColor:P.ocean, width:14, height:14 }}/>
                <span style={{ fontSize:12, color:P.muted, fontWeight:600, display:"flex", alignItems:"center", gap:3 }}>
                  <svg width="11" height="11" fill="#f59e0b" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  {r}+
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Products Area ── */}
        <div className="products-area" style={{ flex:1, padding:"22px 24px", overflowY:"auto", display:"flex", flexDirection:"column", gap:18 }}>

          {/* Toolbar */}
          <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
            {/* Search */}
            <div style={{ position:"relative", flex:1, minWidth:200 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={searchFocused ? P.ocean : P.muted} strokeWidth={2}
                style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", transition:"stroke 0.2s" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, brands..."
                onFocus={()=>setSearchFocused(true)} onBlur={()=>setSearchFocused(false)}
                style={{
                  paddingLeft:32, paddingRight:14, paddingTop:9, paddingBottom:9,
                  border:`1.5px solid ${searchFocused ? P.sky : P.mist}`, borderRadius:10, outline:"none",
                  fontFamily:P.font, background: searchFocused ? P.white : P.mistBg, color:P.navy, fontSize:13, width:"100%",
                  boxShadow: searchFocused ? "0 0 0 3px rgba(151,202,219,0.2)" : "none",
                  transition:"all 0.22s cubic-bezier(.4,0,.2,1)",
                }}/>
            </div>

            {/* Sort */}
            <select className="sort-select" value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{
              border:`1.5px solid ${P.mist}`, borderRadius:10, outline:"none", fontFamily:P.font,
              background:P.mistBg, color:P.navy, fontSize:13, padding:"9px 12px", cursor:"pointer",
            }}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* View toggle */}
            <div style={{ display:"flex", border:`1.5px solid ${P.mist}`, borderRadius:10, overflow:"hidden" }}>
              {["grid","list"].map(mode => (
                <button key={mode} className="view-btn" onClick={()=>setViewMode(mode)} style={{
                  padding:"8px 12px", border:"none", cursor:"pointer", fontFamily:P.font,
                  background: viewMode===mode ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.mistBg,
                  color: viewMode===mode ? P.white : P.muted,
                }}>
                  {mode==="grid"
                    ? <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z"/></svg>
                    : <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <p style={{ color:P.muted, fontSize:13, fontWeight:600, margin:0 }}>
              <span style={{ color:P.navy, fontWeight:900 }}>{filtered.length}</span> products found
            </p>
            {activeFilters.map((f,i) => (
              <span key={i} className="cat-chip" style={{
                fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:999,
                background:"rgba(1,138,190,0.08)", border:"1px solid rgba(1,138,190,0.2)",
                color:P.ocean, display:"inline-flex", alignItems:"center", gap:5, cursor:"pointer",
              }} onClick={f.clear}>
                {f.label} ×
              </span>
            ))}
          </div>

          {/* ── Grid view ── */}
          {viewMode==="grid" ? (
            <div key={`grid-${gridKey}`} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(182px,1fr))", gap:15 }}>
              {filtered.map((product, i) => {
                const bs = product.badge ? badgeStyle[product.badge] : null;
                const wasAdded = addedIds[product.id];
                const discount = Math.round((1-product.price/product.oldPrice)*100);
                return (
                  <div key={product.id} className="prod-grid-card" style={{
                    "--sky":P.sky,
                    background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:17,
                    padding:14, cursor:"pointer", position:"relative", overflow:"hidden",
                    animationName:"cardIn", animationDuration:"0.4s",
                    animationTimingFunction:"cubic-bezier(.4,0,.2,1)", animationFillMode:"both",
                    animationDelay:`${Math.min(i*0.05, 0.35)}s`,
                  }}
                    onMouseEnter={e => {
                      const btn = e.currentTarget.querySelector(".add-btn");
                      if(btn) btn.style.opacity="1";
                    }}
                    onMouseLeave={e => {
                      const btn = e.currentTarget.querySelector(".add-btn");
                      if(btn && !addedIds[product.id]) btn.style.opacity="0";
                    }}>
                    <div onClick={() => viewProduct(product)}>
                      <div style={{ position:"relative", background:`linear-gradient(135deg,${P.mistBg},${P.mist})`, borderRadius:13, height:114, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:11, color:P.sky, overflow:"hidden" }}>
                        <PhoneIcon size={36}/>
                        {bs && (
                          <span style={{ position:"absolute", top:8, left:8, fontSize:10, fontWeight:800, padding:"2px 8px", borderRadius:999, background:bs.bg, border:`1px solid ${bs.border}`, color:bs.text, animation:"badgePop 0.35s 0.2s cubic-bezier(.4,0,.2,1) both" }}>
                            {product.badge}
                          </span>
                        )}
                        <span style={{ position:"absolute", top:8, right:8, fontSize:10, fontWeight:800, padding:"2px 6px", borderRadius:999, background:"rgba(1,138,190,0.1)", border:"1px solid rgba(1,138,190,0.2)", color:P.ocean }}>
                          -{discount}%
                        </span>
                      </div>
                      <p style={{ fontSize:10, color:P.ocean, fontWeight:800, margin:"0 0 2px", textTransform:"uppercase", letterSpacing:"0.04em" }}>{product.brand}</p>
                      <h3 style={{ color:P.navy, fontWeight:700, fontSize:13, margin:"0 0 6px", overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", lineHeight:1.4 }}>{product.name}</h3>
                      <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:7 }}>
                        <svg width="10" height="10" fill="#f59e0b" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <span style={{ fontSize:11, color:P.muted, fontWeight:600 }}>{product.rating}</span>
                        <span style={{ fontSize:11, color:P.muted }}>({product.reviews})</span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                        <span style={{ color:P.navy, fontWeight:900, fontSize:16 }}>${product.price}</span>
                        <span style={{ color:P.muted, fontSize:11, textDecoration:"line-through" }}>${product.oldPrice}</span>
                      </div>
                    </div>
                    <button className="add-btn" onClick={() => handleAddToCart(product)} style={{
                      width:"100%", marginTop:10, padding:"8px 0",
                      background: wasAdded ? "linear-gradient(135deg,#16a34a,#22c55e)" : `linear-gradient(135deg,${P.royal},${P.ocean})`,
                      color:P.white, fontSize:11, fontWeight:700, borderRadius:10,
                      border:"none", cursor:"pointer", opacity: wasAdded ? 1 : 0,
                      fontFamily:P.font, transition:"opacity 0.18s, background 0.35s",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:5,
                    }}>
                      {wasAdded
                        ? <><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Added!</>
                        : "+ Add to Cart"
                      }
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── List view ── */
            <div key={`list-${gridKey}`} style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {filtered.map((product, i) => {
                const wasAdded = addedIds[product.id];
                return (
                  <div key={product.id} className="prod-list-row" style={{
                    "--sky":P.sky,
                    background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:16,
                    padding:"14px 20px", display:"flex", alignItems:"center", gap:18, cursor:"pointer",
                    animationName:"listItemIn", animationDuration:"0.35s",
                    animationTimingFunction:"cubic-bezier(.4,0,.2,1)", animationFillMode:"both",
                    animationDelay:`${Math.min(i*0.04, 0.3)}s`,
                  }}
                    onClick={() => viewProduct(product)}>
                    <div style={{ background:`linear-gradient(135deg,${P.mistBg},${P.mist})`, borderRadius:13, width:70, height:70, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:P.sky, border:`1px solid ${P.mist}` }}>
                      <PhoneIcon size={30}/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:11, color:P.ocean, fontWeight:800, margin:"0 0 3px", textTransform:"uppercase", letterSpacing:"0.05em" }}>{product.brand}</p>
                      <h3 style={{ color:P.navy, fontWeight:700, fontSize:14, margin:"0 0 5px" }}>{product.name}</h3>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ fontSize:11, color:P.muted, display:"flex", alignItems:"center", gap:3 }}>
                          <svg width="10" height="10" fill="#f59e0b" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          {product.rating} ({product.reviews})
                        </span>
                        <span style={{ fontSize:11, color:P.mist }}>·</span>
                        <span style={{ fontSize:11, color:P.muted }}>{product.storage}</span>
                        {product.badge && (() => { const bs = badgeStyle[product.badge]; return <span style={{ fontSize:10, fontWeight:800, padding:"1px 7px", borderRadius:999, background:bs.bg, border:`1px solid ${bs.border}`, color:bs.text }}>{product.badge}</span>; })()}
                      </div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }} onClick={e=>e.stopPropagation()}>
                      <p style={{ color:P.navy, fontWeight:900, fontSize:18, margin:"0 0 2px" }}>${product.price}</p>
                      <p style={{ color:P.muted, fontSize:11, textDecoration:"line-through", margin:"0 0 9px" }}>${product.oldPrice}</p>
                      <button className="add-btn-list" onClick={() => handleAddToCart(product)} style={{
                        padding:"7px 16px",
                        background: wasAdded ? "linear-gradient(135deg,#16a34a,#22c55e)" : `linear-gradient(135deg,${P.royal},${P.ocean})`,
                        color:P.white, fontSize:11, fontWeight:700, borderRadius:9,
                        border:"none", cursor:"pointer", fontFamily:P.font,
                        boxShadow:"0 4px 12px rgba(1,138,190,0.22)",
                        transition:"background 0.35s",
                        display:"inline-flex", alignItems:"center", gap:5,
                      }}>
                        {wasAdded
                          ? <><svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Added!</>
                          : "+ Add to Cart"
                        }
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"40vh", animation:"fadeUp 0.4s cubic-bezier(.4,0,.2,1) both" }}>
              <div style={{ width:72, height:72, borderRadius:20, background:`linear-gradient(135deg,${P.mist},${P.sky})`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, color:P.royal }}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <h3 style={{ color:P.navy, fontWeight:800, fontSize:16, margin:"0 0 8px" }}>No products found</h3>
              <p style={{ color:P.muted, fontSize:13, margin:0 }}>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}