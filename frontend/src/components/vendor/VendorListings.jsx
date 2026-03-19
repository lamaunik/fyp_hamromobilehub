import { useState, useEffect } from "react";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

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

export default function VendorListings({ setTab }) {
  const [filter, setFilter] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { api } = await import("../../utils/api");
        const res = await api.get("/products/vendor/myproducts");
        if (res.success && res.data) {
          // Map to match exact shape roughly expected by Table
          const mapped = res.data.map(p => ({
            id: p._id,
            name: p.name,
            price: `Rs. ${p.price}`,
            status: p.stock > 0 ? "Active" : "Sold",
            stock: p.stock,
            views: Math.floor(Math.random() * 200), // Fake views since it's not in schema
            category: p.category
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch vendor products", err);
      }
    };
    fetchProducts();
  }, []);

  const visible = filter === "All" ? products : products.filter(p=>p.status===filter);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, fontFamily:P.font }}>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ color:P.navy, fontWeight:900, fontSize:20, margin:"0 0 4px" }}>My Listings</h2>
          <p style={{ color:P.muted, fontSize:14, margin:0 }}>Manage all your active product listings</p>
        </div>
        <button onClick={() => setTab("add-product")} style={{ display:"flex", alignItems:"center", gap:8, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontSize:13, fontWeight:700, padding:"10px 20px", borderRadius:12, border:"none", cursor:"pointer", fontFamily:P.font, boxShadow:"0 4px 14px rgba(1,138,190,0.3)", transition:"opacity 0.15s" }}
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
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 90px 80px", padding:"10px 20px", background:P.mistBg, borderBottom:`1px solid ${P.mist}`, fontSize:10, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", color:P.muted }}>
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Views</span>
          <span>Status</span>
          <span style={{ textAlign: "right" }}>Actions</span>
        </div>

        {visible.length === 0 && (
          <div style={{ padding:"48px 0", textAlign:"center", color:P.muted, fontSize:14 }}>No listings found.</div>
        )}

        {visible.map((p,i)=>{
          const ss = STATUS_STYLE[p.status] || STATUS_STYLE.Sold;
          return (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 90px 80px", alignItems:"center", padding:"14px 20px", borderBottom: i<visible.length-1 ? `1px solid ${P.mist}` : "none", transition:"background 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background=P.mistBg}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:40, height:40, background:`linear-gradient(135deg,${P.mist},${P.sky})`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:P.royal, overflow: "hidden" }}>
                  {p.image ? (
                    <img src={p.image.startsWith("http") ? p.image : `http://localhost:5000${p.image}`} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }} />
                  ) : (
                    <PhoneIcon/>
                  )}
                </div>
                <p style={{ color:P.navy, fontWeight:700, fontSize:14, margin:0 }}>{p.name}</p>
              </div>
              <p style={{ color:P.muted, fontSize:13, margin:0 }}>{p.category}</p>
              <p style={{ color:P.ocean, fontWeight:800, fontSize:14, margin:0 }}>{p.price}</p>
              <p style={{ color:P.navy, fontSize:13, fontWeight:600, margin:0 }}>{p.stock}</p>
              <p style={{ color:P.muted, fontSize:13, margin:0 }}>{p.views}</p>
              <span style={{ fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:999, display:"inline-block", background:ss.bg, border:`1px solid ${ss.border}`, color:ss.text }}>{p.status}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                <button
                  onClick={() => alert("Edit product feature coming soon!")}
                  title="Edit Product"
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: P.ocean, padding: 4 }}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this product?")) {
                       try {
                         const { api } = await import("../../utils/api");
                         await api.delete(`/products/${p.id}`);
                         setProducts(prev => prev.filter(prod => prod.id !== p.id));
                       } catch (e) { console.error("Could not delete", e); }
                    }
                  }}
                  title="Delete Product"
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444", padding: 4 }}
                >
                   <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
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
        <button onClick={() => setTab("add-product")} style={{ background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontWeight:700, fontSize:13, padding:"10px 24px", borderRadius:12, border:"none", cursor:"pointer", fontFamily:P.font, boxShadow:"0 4px 14px rgba(1,138,190,0.3)" }}>
          + Add New Listing
        </button>
      </div>
    </div>
  );
}