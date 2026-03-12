import { useState } from "react";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const PRODUCTS = [
  { name:"iPhone 14 Pro",      price:"$899",  status:"Active", stock:3, views:120, category:"Smartphones" },
  { name:"Samsung Galaxy S23", price:"$749",  status:"Active", stock:5, views:88,  category:"Smartphones" },
  { name:"Google Pixel 7",     price:"$549",  status:"Paused", stock:0, views:45,  category:"Smartphones" },
  { name:"MacBook Air M2",     price:"$1099", status:"Active", stock:2, views:67,  category:"Laptops"     },
];

const STATUS_STYLE = {
  Active: { bg:"rgba(34,197,94,0.1)",   border:"rgba(34,197,94,0.25)",  text:"#16a34a" },
  Paused: { bg:"rgba(234,179,8,0.1)",   border:"rgba(234,179,8,0.25)",  text:"#b45309" },
  Sold:   { bg:"rgba(107,153,181,0.1)", border:"rgba(107,153,181,0.2)", text:P.muted  },
};

const FILTERS = ["All","Active","Paused","Sold Out"];

const PhoneIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
  </svg>
);

export default function VendorListings() {
  const [filter, setFilter] = useState("All");
  const visible = filter==="All" ? PRODUCTS : PRODUCTS.filter(p=>p.status===filter);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, fontFamily:P.font }}>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ color:P.navy, fontWeight:900, fontSize:20, margin:"0 0 4px" }}>My Listings</h2>
          <p style={{ color:P.muted, fontSize:14, margin:0 }}>Manage all your active product listings</p>
        </div>
        <button style={{ display:"flex", alignItems:"center", gap:8, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontSize:13, fontWeight:700, padding:"10px 20px", borderRadius:12, border:"none", cursor:"pointer", fontFamily:P.font, boxShadow:"0 4px 14px rgba(1,138,190,0.3)", transition:"opacity 0.15s" }}
          onMouseEnter={e=>e.currentTarget.style.opacity="0.9"}
          onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Add Product
        </button>
      </div>

      {/* Filter pills */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        {FILTERS.map(f=>{
          const key = f==="Sold Out" ? "Sold" : f;
          const active = filter===key;
          return (
            <button key={f} onClick={()=>setFilter(key)} style={{
              padding:"6px 16px", borderRadius:999, fontSize:12, fontWeight:700, cursor:"pointer",
              fontFamily:P.font, transition:"all 0.15s",
              background: active ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.white,
              color: active ? P.white : P.muted,
              border: active ? "none" : `1px solid ${P.mist}`,
              boxShadow: active ? "0 4px 12px rgba(1,138,190,0.25)" : "none",
            }}>{f}</button>
          );
        })}
      </div>

      {/* Table */}
      <div style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:20, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,27,72,0.05)" }}>
        {/* Header row */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 90px", padding:"10px 20px", background:P.mistBg, borderBottom:`1px solid ${P.mist}`, fontSize:10, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", color:P.muted }}>
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Views</span>
          <span>Status</span>
        </div>

        {visible.length === 0 && (
          <div style={{ padding:"48px 0", textAlign:"center", color:P.muted, fontSize:14 }}>No listings found.</div>
        )}

        {visible.map((p,i)=>{
          const ss = STATUS_STYLE[p.status] || STATUS_STYLE.Sold;
          return (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 90px", alignItems:"center", padding:"14px 20px", borderBottom: i<visible.length-1 ? `1px solid ${P.mist}` : "none", transition:"background 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background=P.mistBg}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:40, height:40, background:`linear-gradient(135deg,${P.mist},${P.sky})`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:P.royal }}>
                  <PhoneIcon/>
                </div>
                <p style={{ color:P.navy, fontWeight:700, fontSize:14, margin:0 }}>{p.name}</p>
              </div>
              <p style={{ color:P.muted, fontSize:13, margin:0 }}>{p.category}</p>
              <p style={{ color:P.ocean, fontWeight:800, fontSize:14, margin:0 }}>{p.price}</p>
              <p style={{ color:P.navy, fontSize:13, fontWeight:600, margin:0 }}>{p.stock}</p>
              <p style={{ color:P.muted, fontSize:13, margin:0 }}>{p.views}</p>
              <span style={{ fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:999, display:"inline-block", background:ss.bg, border:`1px solid ${ss.border}`, color:ss.text }}>{p.status}</span>
            </div>
          );
        })}
      </div>

      {/* Add CTA */}
      <div style={{ background:P.white, border:`2px dashed ${P.sky}`, borderRadius:20, padding:28, textAlign:"center", transition:"border-color 0.15s" }}
        onMouseEnter={e=>e.currentTarget.style.borderColor=P.ocean}
        onMouseLeave={e=>e.currentTarget.style.borderColor=P.sky}>
        <p style={{ color:P.navy, fontWeight:700, fontSize:15, margin:"0 0 6px" }}>Got more devices to sell?</p>
        <p style={{ color:P.muted, fontSize:13, margin:"0 0 18px" }}>List new products and reach thousands of buyers in minutes.</p>
        <button style={{ background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontWeight:700, fontSize:13, padding:"10px 24px", borderRadius:12, border:"none", cursor:"pointer", fontFamily:P.font, boxShadow:"0 4px 14px rgba(1,138,190,0.3)" }}>
          + Add New Listing
        </button>
      </div>
    </div>
  );
}