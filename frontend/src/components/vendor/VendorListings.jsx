import { useState, useEffect, useRef } from "react";
import { P } from "../dashboard/DashboardConstants";

const STATUS_STYLE = {
  Active: { bg: "#f0fdf4", border: "#bcf0da", text: "#16a34a" },
  Paused: { bg: "#fffbeb", border: "#fde68a", text: "#d97706" },
  Sold:   { bg: P.mistBg, border: P.mist, text: P.muted },
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
    width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${P.mist}`,
    background: P.mistBg, color: P.navy, fontSize: 13, fontFamily: P.font,
    outline: "none", transition: "all .2s", boxSizing: "border-box",
  };
  const fi = (e) => { e.target.style.borderColor = P.accent; e.target.style.background = P.white; e.target.style.boxShadow = `0 0 0 4px ${P.mist}`; };
  const fb = (e) => { e.target.style.borderColor = P.mist; e.target.style.background = P.mistBg; e.target.style.boxShadow = "none"; };

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
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(18, 18, 18, 0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: P.font }}>
      <div style={{ background: P.white, borderRadius: 24, width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.15)", border: `1px solid ${P.mist}` }}>

        {/* Header */}
        <div style={{ padding: "24px 28px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 20, margin: 0, fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>Edit Listing</h3>
            <p style={{ color: P.muted, fontSize: 13, fontWeight: 600, margin: "4px 0 0" }}>{product.rawName}</p>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 12, background: P.mistBg, border: `1px solid ${P.mist}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: P.muted, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div style={{ padding: "24px 28px 28px" }}>

          {error && <div style={{ background: "#fef2f2", border: `1.5px solid #fee2e2`, borderRadius: 12, padding: "12px 16px", color: "#ef4444", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>{error}</div>}

          {/* ── Image Upload ── */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>Media Gallery</label>
            <div style={{ position: "relative", width: "100%", height: 180, borderRadius: 16, border: `2px dashed ${imageFile ? P.accent : P.mist}`, background: preview ? P.white : P.mistBg, overflow: "hidden", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = P.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = imageFile ? P.accent : P.mist; }}>
              <input type="file" accept="image/*" onChange={handleImagePick}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%", zIndex: 2 }} />
              {preview ? (
                <>
                  <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 12 }} />
                  <div style={{ position: "absolute", bottom: 12, right: 12, background: P.navy, color: "white", padding: "4px 12px", borderRadius: 10, fontSize: 11, fontWeight: 800, zIndex: 3, pointerEvents: "none" }}>
                    {uploadedImage ? "✓ VERIFIED" : imageFile ? "NEW IMAGE" : "REPLACE MEDIA"}
                  </div>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, pointerEvents: "none" }}>
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <p style={{ color: P.muted, fontSize: 13, fontWeight: 700, margin: 0 }}>Click to upload branding image</p>
                </div>
              )}
            </div>
          </div>

          {/* Name + Brand */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[{ l: "Product Name", k: "name" }, { l: "Brand / Label", k: "brand" }].map(f => (
              <div key={f.k}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>{f.l}</label>
                <input value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} style={inputStyle} onFocus={fi} onBlur={fb} />
              </div>
            ))}
          </div>

          {/* Price + Stock + Category */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[{ l: "Price (NPR)", k: "price", type: "number" }, { l: "Inventory", k: "stock", type: "number" }].map(f => (
              <div key={f.k}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>{f.l}</label>
                <input type={f.type} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} style={inputStyle} onFocus={fi} onBlur={fb} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} onFocus={fi} onBlur={fb}>
                {["Smartphones", "Laptops", "Tablets", "Accessories", "Wearables"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Specifications</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} style={{ ...inputStyle, resize: "vertical", minHeight: 90 }} onFocus={fi} onBlur={fb} />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "14px 0", background: P.white, border: `1px solid ${P.mist}`, borderRadius: 14, fontSize: 14, fontWeight: 700, color: P.muted, cursor: "pointer", fontFamily: P.font, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = P.mistBg} onMouseLeave={e => e.currentTarget.style.background = P.white}>Cancel</button>
            <button onClick={handleSave} disabled={saving}
              style={{ flex: 2, padding: "14px 0", background: saving ? P.mist : P.navy, color: P.white, border: "none", borderRadius: 14, fontSize: 14, fontWeight: 800, cursor: saving ? "not-allowed" : "pointer", fontFamily: P.font, boxShadow: saving ? "none" : "0 4px 12px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s" }}>
              {saving ? (
                <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin .8s linear infinite" }} /> Updating...</>
              ) : "Update Listing"}
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

      <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: P.font }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 24, margin: "0 0 6px", fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>My Listings</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: P.accent }}>{products.length}</span>
              <span style={{ color: P.muted, fontSize: 13 }}>total products found</span>
            </div>
          </div>
          <button onClick={() => setTab("add-product")} style={{ display: "flex", alignItems: "center", gap: 10, background: P.navy, color: P.white, fontSize: 13, fontWeight: 700, padding: "12px 24px", borderRadius: 12, border: "none", cursor: "pointer", fontFamily: P.font, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add New Product
          </button>
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["All", "Active", "Paused", "Sold Out"].map(f => {
            const key    = f === "Sold Out" ? "Sold" : f;
            const active = filter === key;
            return (
              <button key={f} onClick={() => setFilter(key)} style={{ padding: "8px 20px", borderRadius: 12, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: P.font, transition: "all 0.2s", background: active ? P.navy : P.white, color: active ? P.white : P.muted, border: active ? `1px solid ${P.navy}` : `1px solid ${P.mist}`, boxShadow: active ? "0 4px 12px rgba(0,0,0,0.08)" : "none" }}>{f}</button>
            );
          })}
        </div>

        {/* Table Container */}
        <div style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 1fr", padding: "16px 24px", background: P.mistBg, borderBottom: `1px solid ${P.mist}`, fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: P.muted }}>
            <span>Product Details</span><span>Category</span><span>Price</span><span>Inventory</span><span>Status</span><span style={{ textAlign: "right" }}>Actions</span>
          </div>

          {visible.length === 0 && <div style={{ padding: "64px 0", textAlign: "center", color: P.muted, fontSize: 14, fontWeight: 600 }}>No listings matching your filter.</div>}

          {visible.map((p, i) => {
            const ss  = STATUS_STYLE[p.status] || STATUS_STYLE.Sold;
            const src = p.imageUrl ? (p.imageUrl.startsWith("http") ? p.imageUrl : `http://localhost:5000${p.imageUrl}`) : null;
            return (
              <div key={p.id} style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 1fr", alignItems: "center", padding: "18px 24px", borderBottom: i < visible.length - 1 ? `1px solid ${P.mist}` : "none", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = P.mistBg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>

                {/* Product info */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 52, height: 52, background: P.white, borderRadius: 14, border: `1px solid ${P.mist}`, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
                    {src
                      ? <img src={src} alt={p.rawName} style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => e.target.style.display = "none"} />
                      : <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    }
                  </div>
                  <div>
                    <p style={{ color: P.navy, fontWeight: 800, fontSize: 15, margin: 0, fontFamily: P.font }}>{p.rawName}</p>
                    {p.brand && <p style={{ color: P.muted, fontSize: 12, fontWeight: 600, margin: "2px 0 0" }}>{p.brand}</p>}
                  </div>
                </div>

                <p style={{ color: P.navy, fontSize: 13, fontWeight: 600, margin: 0 }}>{p.category}</p>
                <p style={{ color: P.navy, fontWeight: 900, fontSize: 15, margin: 0, fontFamily: P.fontHeading }}>{p.price}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                   <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.stock > 0 ? "#10b981" : "#ef4444" }}></div>
                   <p style={{ color: P.navy, fontSize: 14, fontWeight: 700, margin: 0 }}>{p.stock}</p>
                </div>
                <div>
                   <span style={{ fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 10, display: "inline-block", background: ss.bg, border: `1px solid ${ss.border}`, color: ss.text, textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.status}</span>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
                  <button onClick={() => setEditing(p)} title="Edit Product"
                    style={{ width: 34, height: 34, borderRadius: 10, background: P.white, border: `1px solid ${P.mist}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: P.navy, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = P.accent; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = P.mist; e.currentTarget.style.boxShadow = "none"; }}>
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(p.id)} title="Delete Product"
                    style={{ width: 34, height: 34, borderRadius: 10, background: P.white, border: `1px solid ${P.mist}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.borderColor = "#fecaca"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = P.white; e.currentTarget.style.borderColor = P.mist; }}>
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add CTA */}
        <div style={{ background: P.white, border: `2px dashed ${P.mist}`, borderRadius: 24, padding: 32, textAlign: "center", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = P.accent}
          onMouseLeave={e => e.currentTarget.style.borderColor = P.mist}>
          <p style={{ color: P.navy, fontWeight: 900, fontSize: 16, margin: "0 0 8px", fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>Got more devices to sell?</p>
          <p style={{ color: P.muted, fontSize: 13, fontWeight: 600, margin: "0 0 24px" }}>List new products and reach thousands of buyers in minutes.</p>
          <button onClick={() => setTab("add-product")} style={{ background: P.navy, color: P.white, fontWeight: 700, fontSize: 13, padding: "12px 32px", borderRadius: 12, border: "none", cursor: "pointer", fontFamily: P.font, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            + Add New Listing
          </button>
        </div>
      </div>
    </>
  );
}