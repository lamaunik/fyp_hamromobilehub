import { useState } from "react";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9", border:"#D6E8EE",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const InputField = ({ label, name, value, onChange, type="text", placeholder, options, required }) => {
  const commonStyle = {
    width:"100%", padding:"12px 16px", borderRadius:12,
    border:`1px solid ${P.border}`, background:P.mistBg,
    color:P.navy, fontSize:14, fontFamily:P.font,
    outline:"none", transition:"all 0.2s", boxSizing:"border-box",
  };
  const focusStyle = (e) => { e.target.style.borderColor=P.ocean; e.target.style.boxShadow="0 0 0 3px rgba(1,138,190,0.15)"; };
  const blurStyle  = (e) => { e.target.style.borderColor=P.border; e.target.style.boxShadow="none"; };

  return (
    <div style={{ marginBottom:20 }}>
      <label style={{ display:"block", color:P.navy, fontSize:13, fontWeight:700, marginBottom:8, fontFamily:P.font }}>
        {label}{required && <span style={{ color:"#ef4444", marginLeft:3 }}>*</span>}
      </label>
      {type === "select" ? (
        <select name={name} value={value||""} onChange={onChange} style={{...commonStyle,appearance:"none"}} onFocus={focusStyle} onBlur={blurStyle} required={required}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea name={name} value={value||""} onChange={onChange} placeholder={placeholder} style={{...commonStyle,minHeight:100,resize:"vertical"}} onFocus={focusStyle} onBlur={blurStyle} required={required}/>
      ) : (
        <input type={type} name={name} value={value||""} onChange={onChange} placeholder={placeholder} style={commonStyle} onFocus={focusStyle} onBlur={blurStyle} required={required}/>
      )}
    </div>
  );
};

export default function VendorAddProduct({ setTab }) {
  const [formData, setFormData] = useState({
    name:"", brand:"", description:"", price:"",
    category:"Smartphones", stock:"", discountPrice:"",
  });

  const [loading,    setLoading]    = useState(false);
  const [imageFile,  setImageFile]  = useState(null);
  const [preview,    setPreview]    = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // full metadata object
  const [success,    setSuccess]    = useState(false);
  const [error,      setError]      = useState("");

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setUploadedImage(null); // reset if user picks a new file
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { api } = await import("../../utils/api");
      let imageMeta = null;

      // ── Upload image and get full metadata ──────────────────────────────────
      if (imageFile) {
        const fd    = new FormData();
        fd.append("image", imageFile);
        const token = localStorage.getItem("token");

        const uploadRes = await fetch("http://localhost:5000/api/upload", {
          method:"POST",
          headers:{ Authorization:`Bearer ${token}` },
          body: fd,
        });
        const uploadData = await uploadRes.json();

        if (uploadData.success) {
          // Use full metadata object if backend returns it; fall back to URL string
          imageMeta = uploadData.image || { url: uploadData.data, originalName: imageFile.name, mimetype: imageFile.type, size: imageFile.size, width:0, height:0, uploadedAt: new Date() };
          setUploadedImage(imageMeta);
        } else {
          setError("Image upload failed: " + (uploadData.message || "Unknown error"));
          setLoading(false);
          return;
        }
      }

      const payload = {
        name:          formData.name,
        brand:         formData.brand,
        description:   formData.description || "No description provided",
        price:         Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
        category:      formData.category,
        stock:         Number(formData.stock),
        // Send array of image metadata objects — backend normalises to schema
        images:        imageMeta ? [imageMeta] : [],
      };

      const res = await api.post("/products", payload);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => { setSuccess(false); setTab("listings"); }, 1800);
      } else {
        setError(res.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24, fontFamily:P.font, maxWidth:800, margin:"0 auto" }}>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={() => setTab("listings")} style={{ background:"transparent", border:"none", cursor:"pointer", color:P.muted, display:"flex", alignItems:"center", padding:5 }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <div>
          <h2 style={{ color:P.navy, fontWeight:900, fontSize:24, margin:"0 0 4px" }}>Add New Product</h2>
          <p style={{ color:P.muted, fontSize:14, margin:0 }}>Create a new listing for your store.</p>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{ background:"rgba(239,68,68,.08)", border:"1.5px solid rgba(239,68,68,.25)", borderRadius:12, padding:"12px 18px", color:"#ef4444", fontSize:13, fontWeight:600 }}>
          {error}
        </div>
      )}

      {/* Success banner */}
      {success && (
        <div style={{ background:"rgba(34,197,94,.08)", border:"1.5px solid rgba(34,197,94,.25)", borderRadius:12, padding:"12px 18px", color:"#16a34a", fontSize:13, fontWeight:700, display:"flex", alignItems:"center", gap:8 }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          Product added successfully! Redirecting to listings...
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background:P.white, border:`1px solid ${P.border}`, borderRadius:16, padding:32, boxShadow:"0 2px 12px rgba(0,27,72,0.04)" }}>

        {/* Name + Brand */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <InputField label="Product Name"  name="name"  value={formData.name}  onChange={handleChange} placeholder="e.g. iPhone 14 Pro" required />
          <InputField label="Brand"         name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Apple, Samsung" />
        </div>

        {/* Category */}
        <InputField label="Category" name="category" value={formData.category} onChange={handleChange} type="select"
          options={["Smartphones","Laptops","Tablets","Accessories","Wearables"]} required />

        {/* Price + Discount + Stock */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
          <InputField label="Price (Rs.)"          name="price"         value={formData.price}         onChange={handleChange} type="number" placeholder="999" required />
          <InputField label="Discount Price (Rs.)" name="discountPrice" value={formData.discountPrice} onChange={handleChange} type="number" placeholder="Optional" />
          <InputField label="Stock Quantity"       name="stock"         value={formData.stock}         onChange={handleChange} type="number" placeholder="50" required />
        </div>

        {/* ── Image Upload with full metadata display ── */}
        <div style={{ marginBottom:20 }}>
          <label style={{ display:"block", color:P.navy, fontSize:13, fontWeight:700, marginBottom:8, fontFamily:P.font }}>
            Product Image
          </label>

          <div style={{ position:"relative", width:"100%", height:180, borderRadius:16, border:`2px dashed ${imageFile ? P.ocean : P.sky}`, background: imageFile ? "rgba(1,138,190,0.04)" : P.mistBg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.2s", overflow:"hidden" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=P.ocean; e.currentTarget.style.background="rgba(1,138,190,0.07)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor=imageFile?P.ocean:P.sky; e.currentTarget.style.background=imageFile?"rgba(1,138,190,0.04)":P.mistBg; }}>

            <input type="file" accept="image/*" onChange={handleImageChange}
              style={{ position:"absolute", inset:0, opacity:0, cursor:"pointer", width:"100%", height:"100%" }} />

            {preview ? (
              <>
                <img src={preview} alt="Preview" style={{ width:"100%", height:"100%", objectFit:"contain", padding:8 }} />
                <div style={{ position:"absolute", bottom:8, right:8, background:P.white, padding:"4px 10px", borderRadius:8, fontSize:11, fontWeight:700, color:P.navy, boxShadow:"0 2px 8px rgba(0,0,0,0.1)" }}>
                  Change Image
                </div>
              </>
            ) : (
              <>
                <div style={{ width:48, height:48, borderRadius:"50%", background:P.white, display:"flex", alignItems:"center", justifyContent:"center", color:P.ocean, marginBottom:12, boxShadow:"0 4px 12px rgba(1,138,190,0.15)" }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                </div>
                <p style={{ color:P.navy, fontWeight:700, fontSize:14, margin:"0 0 4px" }}>Click to upload image</p>
                <p style={{ color:P.muted, fontSize:12, margin:0 }}>JPG, PNG, WebP (max 5MB)</p>
              </>
            )}
          </div>

          {/* Image metadata preview — shown after a file is selected */}
          {imageFile && (
            <div style={{ marginTop:10, background:P.mistBg, border:`1px solid ${P.mist}`, borderRadius:10, padding:"10px 14px", display:"flex", flexWrap:"wrap", gap:16 }}>
              {[
                { l:"File name",  v: imageFile.name },
                { l:"Type",       v: imageFile.type },
                { l:"Size",       v: `${(imageFile.size / 1024).toFixed(1)} KB` },
                { l:"Status",     v: uploadedImage ? "Uploaded to server ✓" : "Ready to upload" },
              ].map(({ l, v }) => (
                <div key={l}>
                  <p style={{ color:P.muted, fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:".08em", margin:"0 0 2px" }}>{l}</p>
                  <p style={{ color: l==="Status" && uploadedImage ? "#16a34a" : P.navy, fontSize:12, fontWeight:700, margin:0 }}>{v}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <InputField label="Description" name="description" value={formData.description} onChange={handleChange} type="textarea" placeholder="Detailed product description — features, specs, warranty..." required />

        <div style={{ display:"flex", justifyContent:"flex-end", gap:12, marginTop:20 }}>
          <button type="button" onClick={() => setTab("listings")}
            style={{ padding:"12px 24px", background:P.mistBg, border:`1px solid ${P.border}`, borderRadius:12, color:P.muted, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:P.font }}>
            Cancel
          </button>
          <button type="submit" disabled={loading || success}
            style={{ background: success ? "linear-gradient(135deg,#16a34a,#22c55e)" : `linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, opacity: loading ? 0.75 : 1, fontWeight:700, fontSize:14, padding:"12px 32px", borderRadius:12, border:"none", cursor: loading ? "not-allowed" : "pointer", boxShadow:"0 4px 16px rgba(1,138,190,0.3)", display:"flex", alignItems:"center", gap:8, transition:"background .3s" }}>
            {loading ? (
              <><span style={{ width:14, height:14, border:"2px solid rgba(255,255,255,.4)", borderTopColor:"white", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }} /> Saving...</>
            ) : success ? (
              <><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Saved!</>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}