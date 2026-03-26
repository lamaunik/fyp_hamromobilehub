import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const P = {
  navy:  "#282B4A",
  royal: "#282B4A",
  ocean: "#282B4A",
  sky:   "#D4D2C3",
  mist:  "#E5E3D5",
  white: "#FFFFFF",
  muted: "#7A7C8E",
  mistBg:"#EEEBDA",
  font:  "'Inter', 'Helvetica Neue', Helvetica, sans-serif",
  purple:"#282B4A",
  purpleLight:"#E5E3D5"
};

const CONDITION_COLORS = {
  "Like New":{ bg:"rgba(34,197,94,0.1)",  border:"rgba(34,197,94,0.3)",  text:"#16a34a" },
  "Good":    { bg:"rgba(40, 43, 74, 0.1)",  border:"rgba(40, 43, 74, 0.3)",  text:"#282B4A" },
  "Fair":    { bg:"rgba(234,179,8,0.1)",  border:"rgba(234,179,8,0.3)",  text:"#b45309" },
  "Poor":    { bg:"rgba(220,38,38,0.1)",  border:"rgba(220,38,38,0.3)",  text:"#dc2626" },
};

const CATS  = ["All","Smartphones","Laptops","Tablets","Accessories","Wearables","Other"];
const CONDS = ["All","Like New","Good","Fair","Poor"];

// Resolve image URL — handles both absolute URLs and relative backend paths
const getImgSrc = (images) => {
  if (!images || images.length === 0) return null;
  const url = images[0];
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:5000${url.startsWith("/") ? url : "/" + url}`;
};

// Category icons for better placeholders
const CAT_ICONS = {
  Smartphones: (
    <svg width="52" height="52" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
    </svg>
  ),
  Laptops: (
    <svg width="52" height="52" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  ),
  Tablets: (
    <svg width="52" height="52" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
    </svg>
  ),
};

const DefaultPlaceholder = ({ category, title }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:10 }}>
    <div style={{ color:"rgba(124,58,237,0.3)", width:52, height:52 }}>
      {CAT_ICONS[category] || CAT_ICONS.Smartphones}
    </div>
    <span style={{ color:"rgba(124,58,237,0.4)", fontSize:11, fontWeight:700, textAlign:"center", padding:"0 12px", lineHeight:1.4 }}>
      {title?.split(" ").slice(0,3).join(" ")}
    </span>
    <span style={{ fontSize:10, color:"rgba(124,58,237,0.3)", fontWeight:600 }}>No photo yet</span>
  </div>
);

// Contact Modal
function ContactModal({ product, onClose }) {
  const navigate = useNavigate();

  if (!product) return null;
  const seller  = product.seller;
  const imgSrc  = getImgSrc(product.images);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,15,40,0.6)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:P.white, borderRadius:22, padding:"28px 32px", maxWidth:460, width:"100%", boxShadow:"0 24px 60px rgba(40, 43, 74, 0.2)" }}>

        {/* Product preview in modal */}
        <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:20, padding:14, background:P.mistBg, borderRadius:14, border:`1.5px solid ${P.mist}` }}>
          <div style={{ width:64, height:64, borderRadius:12, background:"rgba(124,58,237,0.08)", overflow:"hidden", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(124,58,237,0.15)" }}>
            {imgSrc
              ? <img src={imgSrc} alt={product.title} style={{ width:"100%", height:"100%", objectFit:"cover" }}
                  onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
                />
              : null}
            <div style={{ display: imgSrc ? "none" : "flex", alignItems:"center", justifyContent:"center", width:"100%", height:"100%", color:"rgba(124,58,237,0.4)" }}>
              {CAT_ICONS[product.category] || CAT_ICONS.Smartphones}
            </div>
          </div>
          <div>
            <p style={{ color:P.navy, fontWeight:800, fontSize:15, margin:"0 0 4px" }}>{product.title}</p>
            <p style={{ color:P.navy, fontWeight:900, fontSize:17, margin:0 }}>Rs. {product.price?.toLocaleString()}</p>
          </div>
        </div>

        <h3 style={{ color:P.navy, fontWeight:900, fontSize:17, margin:"0 0 4px", textAlign:"center" }}>Contact Seller</h3>
        <p style={{ color:P.muted, fontSize:13, margin:"0 0 18px", textAlign:"center" }}>Reach out directly to negotiate and buy</p>

        <div style={{ background:P.mistBg, border:`1.5px solid ${P.mist}`, borderRadius:14, padding:"14px 18px", marginBottom:20 }}>
          {[
            { l:"Seller",   v: seller?.name  || "Unknown" },
            { l:"Email",    v: seller?.email || "Not provided" },
            { l:"Phone",    v: product.contactPhone || seller?.phone || "Not provided" },
            { l:"Location", v: product.location || "Not specified" },
          ].map((r, i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom: i < 3 ? `1px solid ${P.mist}` : "none" }}>
              <span style={{ color:P.muted, fontSize:13 }}>{r.l}</span>
              <span style={{ color:P.navy, fontWeight:700, fontSize:13 }}>{r.v}</span>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:10 }}>
          {seller && (
            <button onClick={() => { onClose(); navigate("/messages", { state: { sellerId: seller._id } }); }}
              style={{ flex:1, padding:"11px 0", background:`linear-gradient(135deg,${P.purple},#a855f7)`, color:P.white, borderRadius:11, fontSize:13, fontWeight:700, textAlign:"center", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              Chat Seller
            </button>
          )}
          {(product.contactPhone || seller?.phone) && (
            <a href={`tel:${product.contactPhone || seller?.phone}`}
              style={{ flex:1, padding:"11px 0", background:"rgba(34,197,94,0.1)", border:"1.5px solid rgba(34,197,94,0.3)", color:"#16a34a", borderRadius:11, fontSize:13, fontWeight:700, textAlign:"center", textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              Call
            </a>
          )}
          <button onClick={onClose}
            style={{ padding:"11px 18px", background:P.mistBg, border:`1.5px solid ${P.mist}`, borderRadius:11, fontSize:13, fontWeight:700, color:P.muted, cursor:"pointer", fontFamily:P.font }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=P.sky; e.currentTarget.style.color=P.navy; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor=P.mist; e.currentTarget.style.color=P.muted; }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Product Card
function ListingCard({ p, onContact }) {
  const [imgError, setImgError] = useState(false);
  const cc     = CONDITION_COLORS[p.condition] || CONDITION_COLORS["Good"];
  const imgSrc = getImgSrc(p.images);
  const showImg = imgSrc && !imgError;

  return (
    <div style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:18, overflow:"hidden", boxShadow:"0 4px 16px rgba(40, 43, 74, .05)", transition:"all .2s", display:"flex", flexDirection:"column" }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(124,58,237,.12)"; e.currentTarget.style.borderColor="#c4b5fd"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(40, 43, 74, .05)"; e.currentTarget.style.borderColor=P.mist; }}>

      {/* Image area */}
      <div style={{ height:200, background:`linear-gradient(135deg,rgba(124,58,237,0.06),rgba(124,58,237,0.03))`, position:"relative", overflow:"hidden", flexShrink:0 }}>
        {showImg ? (
          <img
            src={imgSrc}
            alt={p.title}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <DefaultPlaceholder category={p.category} title={p.title} />
        )}

        {/* Condition badge */}
        <span style={{ position:"absolute", top:10, left:10, fontSize:10, fontWeight:800, padding:"4px 10px", borderRadius:999, background:P.white, border:`1px solid ${cc.border}`, color:cc.text, boxShadow:"0 2px 8px rgba(0,0,0,.08)" }}>
          {p.condition}
        </span>
        {/* Category badge */}
        <span style={{ position:"absolute", top:10, right:10, fontSize:10, fontWeight:700, padding:"4px 9px", borderRadius:999, background:P.white, border:"1px solid rgba(124,58,237,0.25)", color:P.purple, boxShadow:"0 2px 8px rgba(0,0,0,.08)" }}>
          {p.category}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding:"16px 18px", flex:1, display:"flex", flexDirection:"column" }}>
        <h3 style={{ color:P.navy, fontWeight:800, fontSize:15, margin:"0 0 6px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</h3>
        <p style={{ color:P.muted, fontSize:12, margin:"0 0 12px", lineHeight:1.6, flex:1, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{p.description}</p>

        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, flexWrap:"wrap" }}>
          {p.location && (
            <span style={{ display:"flex", alignItems:"center", gap:4, color:P.muted, fontSize:11 }}>
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              {p.location}
            </span>
          )}
          <span style={{ color:P.muted, fontSize:11 }}>
            by <strong style={{ color:P.navy }}>{p.seller?.name || "User"}</strong>
          </span>
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:12, borderTop:`1px solid ${P.mist}` }}>
          <span style={{ color:P.navy, fontWeight:900, fontSize:22 }}>Rs. {p.price?.toLocaleString()}</span>
          <button onClick={() => onContact(p)}
            style={{ padding:"9px 18px", background:`linear-gradient(135deg,${P.purple},#a855f7)`, color:P.white, border:"none", borderRadius:11, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:P.font, display:"flex", alignItems:"center", gap:6, boxShadow:"0 3px 10px rgba(124,58,237,.3)", transition:"all .15s" }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 6px 16px rgba(124,58,237,.4)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 3px 10px rgba(124,58,237,.3)"; }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Page
export default function MarketplacePage({ setTab }) {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [cat,      setCat]      = useState("All");
  const [cond,     setCond]     = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { api } = await import("../../utils/api");
      const res = await api.get("/used-products");
      if (res.success) setProducts(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const filtered = products.filter(p =>
    (cat  === "All" || p.category  === cat) &&
    (cond === "All" || p.condition === cond) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
     p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <ContactModal product={selected} onClose={() => setSelected(null)} />

      <div style={{ padding:"28px 32px", fontFamily:P.font }}>

        {/* Header Banner */}
        <div style={{ background:`linear-gradient(135deg,#4c1d95,${P.purple},#a855f7)`, borderRadius:22, padding:"28px 32px", marginBottom:28, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-40, right:-20, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,.07)", filter:"blur(30px)", pointerEvents:"none" }} />
          <div style={{ position:"relative" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:999, padding:"4px 14px", marginBottom:14 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#c4b5fd", display:"inline-block" }} />
              <span style={{ color:"#e9d5ff", fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>Second-hand Marketplace</span>
            </div>
            <h2 style={{ color:"white", fontWeight:900, fontSize:26, margin:"0 0 8px", letterSpacing:"-.02em" }}>Buy Used Devices</h2>
            <p style={{ color:"rgba(233,213,255,.75)", fontSize:14, margin:"0 0 20px" }}>Genuine listings from real users - verified by community trust.</p>
            <button onClick={() => setTab("sell")}
              style={{ padding:"10px 22px", background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.3)", borderRadius:11, color:"white", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:P.font, display:"inline-flex", alignItems:"center", gap:8 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              List Your Item
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display:"flex", gap:12, marginBottom:22, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ position:"relative", flex:1, minWidth:200 }}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={2} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search listings..."
              style={{ paddingLeft:36, paddingRight:14, paddingTop:10, paddingBottom:10, border:`1.5px solid ${P.mist}`, borderRadius:11, outline:"none", fontFamily:P.font, background:P.mistBg, color:P.navy, fontSize:13, width:"100%", boxSizing:"border-box", transition:"border-color .2s" }}
              onFocus={e=>{ e.target.style.borderColor="#a78bfa"; }}
              onBlur={e=>{ e.target.style.borderColor=P.mist; }}
            />
          </div>
          <select value={cat} onChange={e=>setCat(e.target.value)} style={{ padding:"10px 14px", border:`1.5px solid ${P.mist}`, borderRadius:11, outline:"none", fontFamily:P.font, background:P.mistBg, color:P.navy, fontSize:13, cursor:"pointer" }}>
            {CATS.map(c => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
          </select>
          <select value={cond} onChange={e=>setCond(e.target.value)} style={{ padding:"10px 14px", border:`1.5px solid ${P.mist}`, borderRadius:11, outline:"none", fontFamily:P.font, background:P.mistBg, color:P.navy, fontSize:13, cursor:"pointer" }}>
            {CONDS.map(c => <option key={c} value={c}>{c === "All" ? "All Conditions" : c}</option>)}
          </select>
          <button onClick={fetchProducts} style={{ padding:"10px 14px", border:`1.5px solid ${P.mist}`, borderRadius:11, background:P.mistBg, color:P.ocean, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:P.font, display:"flex", alignItems:"center", gap:6, transition:"all .15s" }}
            onMouseEnter={e=>{ e.currentTarget.style.background=P.white; e.currentTarget.style.borderColor=P.sky; }}
            onMouseLeave={e=>{ e.currentTarget.style.background=P.mistBg; e.currentTarget.style.borderColor=P.mist; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            Refresh
          </button>
        </div>

        <p style={{ color:P.muted, fontSize:13, fontWeight:600, marginBottom:18 }}>
          <span style={{ color:P.navy, fontWeight:900 }}>{filtered.length}</span> listing{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Loading skeletons */}
        {loading && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:18 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:18, overflow:"hidden" }}>
                <div style={{ height:200, background:`linear-gradient(90deg,${P.mist} 25%,${P.mistBg} 50%,${P.mist} 75%)`, backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite" }} />
                <div style={{ padding:16 }}>
                  <div style={{ height:16, background:P.mist, borderRadius:6, marginBottom:8, width:"70%" }} />
                  <div style={{ height:12, background:P.mist, borderRadius:6, marginBottom:6, width:"90%" }} />
                  <div style={{ height:12, background:P.mist, borderRadius:6, width:"60%" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid of cards */}
        {!loading && filtered.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:18 }}>
            {filtered.map((p, i) => (
              <div key={p._id} style={{ animationName:"fadeUp", animationDuration:".4s", animationFillMode:"both", animationDelay:`${i*.05}s` }}>
                <ListingCard p={p} onContact={setSelected} />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"72px 0", background:P.white, borderRadius:22, border:`1.5px dashed ${P.mist}` }}>
            <div style={{ width:64, height:64, borderRadius:18, background:P.purpleLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={P.purple} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            </div>
            <h3 style={{ color:P.navy, fontWeight:800, fontSize:18, margin:"0 0 8px" }}>No listings found</h3>
            <p style={{ color:P.muted, fontSize:14, margin:"0 0 20px" }}> Be the first one to List a used device!</p>
            <button onClick={() => setTab("sell")} style={{ padding:"11px 26px", background:`linear-gradient(135deg,${P.purple},#a855f7)`, color:P.white, border:"none", borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:P.font }}>
              + List Your Device
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </>
  );
}