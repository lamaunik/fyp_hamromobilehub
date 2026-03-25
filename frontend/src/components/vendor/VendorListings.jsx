import { useState, useEffect, useRef } from "react";

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

// Resolve image URL from string or object { url }
const imgSrc = (img) => {
  if (!img) return null;
  const url = typeof img === "object" ? img.url : img;
  if (!url) return null;
  return url.startsWith("http") ? url : `http://localhost:5000${url}`;
};

// ── Edit Product Modal ────────────────────────────────────────────────────────
function EditModal({ product, onClose, onSaved }) {
  const [form, setForm] = useState({
    name:         product.rawName     || "",
    brand:        product.brand       || "",
    price:        product.rawPrice    || "",
    stock:        product.stock       || "",
    category:     product.category    || "",
    description:  product.description || "",
  });
  const [imageFile,     setImageFile]     = useState(null);
  const [preview,       setPreview]       = useState(imgSrc(product.rawImage) || null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [saving,        setSaving]        = useState(false);
  const [error,         setError]         = useState("");

  const inputStyle = {
    width:"100%", padding:"10px 13px", borderRadius:10, border:`1.5px solid ${P.mist}`,
    background:P.mistBg, color:P.navy, fontSize:13, fontFamily:P.font,
    outline:"none", transition:"all .2s", boxSizing:"border-box",
  };
  const fi = (e) => { e.target.style.borderColor=P.ocean; e.target.style.background=P.white; e.target.style.boxShadow="0 0 0 3px rgba(1,138,190,.12)"; };
  const fb = (e) => { e.target.style.borderColor=P.mist;  e.target.style.background=P.mistBg; e.target.style.boxShadow="none"; };

  const handleImagePick = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setUploadedImage(null);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      const { api } = await import("../../utils/api");
      let imageMeta = product.rawImage || null;

      // Upload new image if selected
      if (imageFile) {
        const fd    = new FormData();
        fd.append("image", imageFile);
        const token = localStorage.getItem("token");
        const upRes = await fetch("http://localhost:5000/api/upload", {
          method:"POST", headers:{ Authorization:`Bearer ${token}` }, body: fd,
        });
        const upData = await upRes.json();
        if (upData.success) {
          imageMeta = upData.image || { url: upData.data, originalName: imageFile.name, mimetype: imageFile.type, size: imageFile.size };
          setUploadedImage(imageMeta);
        } else {
          setError("Image upload failed: " + (upData.message || "Unknown"));
          setSaving(false); return;
        }
      }

      const payload = {
        name:        form.name,
        brand:       form.brand,
        price:       Number(form.price),
        stock:       Number(form.stock),
        category:    form.category,
        description: form.description,
        images:      imageMeta ? [imageMeta] : (product.rawImages || []),
      };

      const res = await api.put(`/products/${product.id}`, payload);
      if (res.success) {
        onSaved(res.data);
        onClose();
      } else {
        setError(res.message || "Failed to save");
      }
    } catch (err) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,15,40,0.6)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16, fontFamily:P.font }}>
      <div style={{ background:P.white, borderRadius:22, width:"100%", maxWidth:560, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 24px 60px rgba(0,27,72,0.2)" }}>

        {/* Header */}
        <div style={{ padding:"20px 24px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <h3 style={{ color:P.navy, fontWeight:900, fontSize:18, margin:0 }}>Edit Product</h3>
            <p style={{ color:P.muted, fontSize:13, margin:"3px 0 0" }}>{product.rawName}</p>
          </div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:"50%", background:P.mistBg, border:`1px solid ${P.mist}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:P.muted }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div style={{ padding:"20px 24px 24px" }}>

          {error && <div style={{ background:"rgba(239,68,68,.08)", border:"1.5px solid rgba(239,68,68,.25)", borderRadius:10, padding:"10px 14px", color:"#ef4444", fontSize:13, marginBottom:16 }}>{error}</div>}

          {/* ── Image Upload ── */}
          <div style={{ marginBottom:18 }}>
            <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:8 }}>Product Image</label>
            <div style={{ position:"relative", width:"100%", height:160, borderRadius:14, border:`2px dashed ${imageFile ? P.ocean : P.sky}`, background: preview ? "rgba(1,138,190,0.04)" : P.mistBg, overflow:"hidden", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=P.ocean; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=imageFile?P.ocean:P.sky; }}>
              <input type="file" accept="image/*" onChange={handleImagePick}
                style={{ position:"absolute", inset:0, opacity:0, cursor:"pointer", width:"100%", height:"100%", zIndex:2 }} />
              {preview ? (
                <>
                  <img src={preview} alt="Preview" style={{ width:"100%", height:"100%", objectFit:"contain", padding:8 }} />
                  <div style={{ position:"absolute", bottom:8, right:8, background:"rgba(2,69,122,0.85)", color:"white", padding:"3px 10px", borderRadius:7, fontSize:11, fontWeight:700, zIndex:3, pointerEvents:"none" }}>
                    {uploadedImage ? "✓ Uploaded" : imageFile ? "New image selected" : "Change Image"}
                  </div>
                </>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, pointerEvents:"none" }}>
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                  <p style={{ color:P.muted, fontSize:13, margin:0 }}>Click to upload image</p>
                </div>
              )}
            </div>
            {/* Image metadata */}
            {imageFile && (
              <div style={{ marginTop:8, display:"flex", gap:16, fontSize:11, color:P.muted }}>
                <span><strong style={{ color:P.navy }}>File:</strong> {imageFile.name}</span>
                <span><strong style={{ color:P.navy }}>Size:</strong> {(imageFile.size/1024).toFixed(1)} KB</span>
                <span><strong style={{ color:P.navy }}>Type:</strong> {imageFile.type}</span>
                {uploadedImage && <span style={{ color:"#16a34a", fontWeight:700 }}>✓ Saved to server</span>}
              </div>
            )}
          </div>

          {/* Name + Brand */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
            {[{ l:"Product Name", k:"name" }, { l:"Brand", k:"brand" }].map(f => (
              <div key={f.k}>
                <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:6 }}>{f.l}</label>
                <input value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} style={inputStyle} onFocus={fi} onBlur={fb} />
              </div>
            ))}
          </div>

          {/* Price + Stock + Category */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:14 }}>
            {[{ l:"Price (Rs.)", k:"price", type:"number" }, { l:"Stock", k:"stock", type:"number" }].map(f => (
              <div key={f.k}>
                <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:6 }}>{f.l}</label>
                <input type={f.type} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} style={inputStyle} onFocus={fi} onBlur={fb} />
              </div>
            ))}
            <div>
              <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:6 }}>Category</label>
              <select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} style={{ ...inputStyle, appearance:"none", cursor:"pointer" }} onFocus={fi} onBlur={fb}>
                {["Smartphones","Laptops","Tablets","Accessories","Wearables"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom:22 }}>
            <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:6 }}>Description</label>
            <textarea value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} rows={3} style={{ ...inputStyle, resize:"vertical", minHeight:80 }} onFocus={fi} onBlur={fb} />
          </div>

          {/* Buttons */}
          <div style={{ display:"flex", gap:12 }}>
            <button onClick={onClose} style={{ flex:1, padding:"12px 0", background:P.mistBg, border:`1.5px solid ${P.mist}`, borderRadius:12, fontSize:14, fontWeight:700, color:P.muted, cursor:"pointer", fontFamily:P.font }}>Cancel</button>
            <button onClick={handleSave} disabled={saving}
              style={{ flex:2, padding:"12px 0", background: saving ? P.mist : `linear-gradient(135deg,${P.royal},${P.ocean})`, color: saving ? P.muted : P.white, border:"none", borderRadius:12, fontSize:14, fontWeight:800, cursor: saving?"not-allowed":"pointer", fontFamily:P.font, boxShadow: saving?"none":"0 6px 20px rgba(1,138,190,.3)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {saving ? (
                <><span style={{ width:14, height:14, border:"2px solid rgba(255,255,255,.4)", borderTopColor:"white", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }} /> Saving...</>
              ) : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function VendorListings({ setTab }) {
  const [filter,   setFilter]   = useState("All");
  const [products, setProducts] = useState([]);
  const [editing,  setEditing]  = useState(null); // product being edited

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const { api } = await import("../../utils/api");
      const res = await api.get("/products/vendor/myproducts");
      if (res.success && res.data) {
        const mapped = res.data.map(p => {
          const firstImg = p.images?.[0];
          const url      = firstImg ? (typeof firstImg === "object" ? firstImg.url : firstImg) : null;
          return {
            id:          p._id,
            name:        `Rs. ${p.price}`, // display price
            rawName:     p.name,
            rawPrice:    p.price,
            rawImages:   p.images || [],
            rawImage:    firstImg || null,
            imageUrl:    url,
            brand:       p.brand       || "",
            description: p.description || "",
            price:       `Rs. ${p.price}`,
            status:      p.stock > 0 ? "Active" : "Sold",
            stock:       p.stock,
            category:    p.category,
          };
        });
        setProducts(mapped);
      }
    } catch (err) { console.error("Failed to fetch vendor products", err); }
  };

  // Called when EditModal saves successfully
  const handleSaved = (updatedProduct) => {
    const firstImg = updatedProduct.images?.[0];
    const url      = firstImg ? (typeof firstImg === "object" ? firstImg.url : firstImg) : null;
    setProducts(prev => prev.map(p =>
      p.id === updatedProduct._id ? {
        ...p,
        rawName:     updatedProduct.name,
        rawPrice:    updatedProduct.price,
        rawImages:   updatedProduct.images || [],
        rawImage:    firstImg || null,
        imageUrl:    url,
        brand:       updatedProduct.brand       || "",
        description: updatedProduct.description || "",
        price:       `Rs. ${updatedProduct.price}`,
        stock:       updatedProduct.stock,
        status:      updatedProduct.stock > 0 ? "Active" : "Sold",
        category:    updatedProduct.category,
      } : p
    ));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      const { api } = await import("../../utils/api");
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (e) { alert("Could not delete product"); }
  };

  const visible = filter === "All" ? products : products.filter(p => p.status === filter);

  return (
    <>
      {editing && <EditModal product={editing} onClose={() => setEditing(null)} onSaved={handleSaved} />}

      <div style={{ display:"flex", flexDirection:"column", gap:20, fontFamily:P.font }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <h2 style={{ color:P.navy, fontWeight:900, fontSize:20, margin:"0 0 4px" }}>My Listings</h2>
            <p style={{ color:P.muted, fontSize:14, margin:0 }}>{products.length} total products</p>
          </div>
          <button onClick={() => setTab("add-product")} style={{ display:"flex", alignItems:"center", gap:8, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontSize:13, fontWeight:700, padding:"10px 20px", borderRadius:12, border:"none", cursor:"pointer", fontFamily:P.font, boxShadow:"0 4px 14px rgba(1,138,190,0.3)" }}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            Add Product
          </button>
        </div>

        {/* Filter pills */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {["All","Active","Paused","Sold Out"].map(f => {
            const key    = f === "Sold Out" ? "Sold" : f;
            const active = filter === key;
            return (
              <button key={f} onClick={() => setFilter(key)} style={{ padding:"6px 16px", borderRadius:999, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:P.font, transition:"all 0.15s", background: active ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.white, color: active ? P.white : P.muted, border: active ? "none" : `1px solid ${P.mist}`, boxShadow: active ? "0 4px 12px rgba(1,138,190,0.25)" : "none" }}>{f}</button>
            );
          })}
        </div>

        {/* Table */}
        <div style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:20, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,27,72,0.05)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 90px 80px", padding:"10px 20px", background:P.mistBg, borderBottom:`1px solid ${P.mist}`, fontSize:10, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", color:P.muted }}>
            <span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span>Status</span><span style={{ textAlign:"right" }}>Actions</span>
          </div>

          {visible.length === 0 && <div style={{ padding:"48px 0", textAlign:"center", color:P.muted, fontSize:14 }}>No listings found.</div>}

          {visible.map((p, i) => {
            const ss  = STATUS_STYLE[p.status] || STATUS_STYLE.Sold;
            const src = p.imageUrl ? (p.imageUrl.startsWith("http") ? p.imageUrl : `http://localhost:5000${p.imageUrl}`) : null;
            return (
              <div key={p.id} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 90px 80px", alignItems:"center", padding:"14px 20px", borderBottom: i < visible.length-1 ? `1px solid ${P.mist}` : "none", transition:"background 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.background=P.mistBg}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>

                {/* Product info */}
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:44, height:44, background:`linear-gradient(135deg,${P.mist},${P.sky})`, borderRadius:12, flexShrink:0, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {src
                      ? <img src={src} alt={p.rawName} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"} />
                      : <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={P.royal} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                    }
                  </div>
                  <div>
                    <p style={{ color:P.navy, fontWeight:700, fontSize:14, margin:0 }}>{p.rawName}</p>
                    {p.brand && <p style={{ color:P.muted, fontSize:11, margin:0 }}>{p.brand}</p>}
                  </div>
                </div>

                <p style={{ color:P.muted, fontSize:13, margin:0 }}>{p.category}</p>
                <p style={{ color:P.ocean, fontWeight:800, fontSize:14, margin:0 }}>{p.price}</p>
                <p style={{ color:P.navy, fontSize:13, fontWeight:600, margin:0 }}>{p.stock}</p>
                <span style={{ fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:999, display:"inline-block", background:ss.bg, border:`1px solid ${ss.border}`, color:ss.text }}>{p.status}</span>

                {/* Actions */}
                <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"flex-end" }}>
                  {/* Edit — opens modal */}
                  <button onClick={() => setEditing(p)} title="Edit Product"
                    style={{ width:30, height:30, borderRadius:8, background:P.mistBg, border:`1px solid ${P.mist}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:P.ocean, transition:"all .15s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background=P.ocean; e.currentTarget.style.color=P.white; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background=P.mistBg; e.currentTarget.style.color=P.ocean; }}>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  </button>
                  {/* Delete */}
                  <button onClick={() => handleDelete(p.id)} title="Delete Product"
                    style={{ width:30, height:30, borderRadius:8, background:"rgba(239,68,68,.08)", border:"1px solid rgba(239,68,68,.2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#ef4444", transition:"all .15s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="#ef4444"; e.currentTarget.style.color=P.white; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="rgba(239,68,68,.08)"; e.currentTarget.style.color="#ef4444"; }}>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add CTA */}
        <div style={{ background:P.white, border:`2px dashed ${P.sky}`, borderRadius:20, padding:28, textAlign:"center" }}
          onMouseEnter={e=>e.currentTarget.style.borderColor=P.ocean}
          onMouseLeave={e=>e.currentTarget.style.borderColor=P.sky}>
          <p style={{ color:P.navy, fontWeight:700, fontSize:15, margin:"0 0 6px" }}>Got more devices to sell?</p>
          <p style={{ color:P.muted, fontSize:13, margin:"0 0 18px" }}>List new products and reach thousands of buyers in minutes.</p>
          <button onClick={() => setTab("add-product")} style={{ background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontWeight:700, fontSize:13, padding:"10px 24px", borderRadius:12, border:"none", cursor:"pointer", fontFamily:P.font, boxShadow:"0 4px 14px rgba(1,138,190,0.3)" }}>
            + Add New Listing
          </button>
        </div>
      </div>
    </>
  );
}