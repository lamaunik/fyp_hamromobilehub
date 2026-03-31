import { useState } from "react";
import { P } from "../dashboard/DashboardConstants";

const InputField = ({ label, name, value, onChange, type = "text", placeholder, options, required }) => {
  const commonStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 14,
    border: `1px solid ${P.mist}`, background: P.mistBg,
    color: P.navy, fontSize: 14, fontFamily: P.font,
    outline: "none", transition: "all 0.2s", boxSizing: "border-box",
  };
  const focusStyle = (e) => { e.target.style.borderColor = P.accent; e.target.style.background = P.white; e.target.style.boxShadow = `0 0 0 4px ${P.mist}`; };
  const blurStyle  = (e) => { e.target.style.borderColor = P.mist; e.target.style.background = P.mistBg; e.target.style.boxShadow = "none"; };

  return (
    <div style={{ marginBottom: 22 }}>
      <label style={{ display: "block", color: P.navy, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, fontFamily: P.font }}>
        {label}{required && <span style={{ color: P.accent, marginLeft: 2 }}>*</span>}
      </label>
      {type === "select" ? (
        <div style={{ position: "relative" }}>
          <select name={name} value={value || ""} onChange={onChange} style={{ ...commonStyle, appearance: "none", cursor: "pointer" }} onFocus={focusStyle} onBlur={blurStyle} required={required}>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: P.muted }}>
             <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
      ) : type === "textarea" ? (
        <textarea name={name} value={value || ""} onChange={onChange} placeholder={placeholder} style={{ ...commonStyle, minHeight: 120, resize: "vertical" }} onFocus={focusStyle} onBlur={blurStyle} required={required} />
      ) : (
        <input type={type} name={name} value={value || ""} onChange={onChange} placeholder={placeholder} style={commonStyle} onFocus={focusStyle} onBlur={blurStyle} required={required} />
      )}
    </div>
  );
};

export default function VendorAddProduct({ setTab }) {
  const [formData, setFormData] = useState({
    name: "", brand: "", description: "", price: "",
    category: "Smartphones", stock: "", discountPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setUploadedImage(null);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { api } = await import("../../utils/api");
      let imageMeta = null;

      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);
        const token = localStorage.getItem("token");

        const uploadRes = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        const uploadData = await uploadRes.json();

        if (uploadData.success) {
          imageMeta = uploadData.image || { url: uploadData.data, originalName: imageFile.name, mimetype: imageFile.type, size: imageFile.size, width: 0, height: 0, uploadedAt: new Date() };
          setUploadedImage(imageMeta);
        } else {
          setError("Image upload failed: " + (uploadData.message || "Unknown error"));
          setLoading(false);
          return;
        }
      }

      const payload = {
        name: formData.name,
        brand: formData.brand,
        description: formData.description || "No description provided",
        price: Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
        category: formData.category,
        stock: Number(formData.stock),
        images: imageMeta ? [imageMeta.url] : [], // Send only the URL string
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
    <div style={{ display: "flex", flexDirection: "column", gap: 32, fontFamily: P.font, maxWidth: 840, margin: "0 auto", paddingBottom: 60 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <button onClick={() => setTab("listings")} style={{ width: 44, height: 44, borderRadius: 14, background: P.white, border: `1px solid ${P.mist}`, cursor: "pointer", color: P.navy, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }} onMouseEnter={e => { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.transform = "translateX(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = P.white; e.currentTarget.style.transform = "none"; }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 28, margin: "0 0 6px", fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>Add New Listing</h2>
          <p style={{ color: P.muted, fontSize: 14, fontWeight: 500, margin: 0 }}>Publish a new product to the HamroMobileHub marketplace.</p>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div style={{ background: "#fef2f2", border: `1px solid #fee2e2`, borderRadius: 16, padding: "14px 20px", color: "#ef4444", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 10 }}>
           <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      {success && (
        <div style={{ background: "#f0fdf4", border: `1px solid #bcf0da`, borderRadius: 16, padding: "14px 20px", color: "#16a34a", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 10px 30px rgba(22,163,74,0.1)" }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          Product added successfully! Redirecting to your inventory...
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 28, padding: 40, boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 8 }}>
          <InputField label="Product Title" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. iPhone 15 Pro Max" required />
          <InputField label="Brand / Manufacturer" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Apple" />
        </div>

        <InputField label="Market Category" name="category" value={formData.category} onChange={handleChange} type="select"
          options={["Smartphones", "Laptops", "Tablets", "Accessories", "Wearables"]} required />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 8 }}>
          <InputField label="Price (NPR)" name="price" value={formData.price} onChange={handleChange} type="number" placeholder="0.00" required />
          <InputField label="Special Price (NPR)" name="discountPrice" value={formData.discountPrice} onChange={handleChange} type="number" placeholder="Optional" />
          <InputField label="Stock Quantity" name="stock" value={formData.stock} onChange={handleChange} type="number" placeholder="Quantity" required />
        </div>

        {/* Media Upload */}
        <div style={{ marginBottom: 32 }}>
          <label style={{ display: "block", color: P.navy, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10, fontFamily: P.font }}>
            Product Showcase Media
          </label>

          <div style={{ position: "relative", width: "100%", height: 220, borderRadius: 20, border: `2px dashed ${imageFile ? P.accent : P.mist}`, background: imageFile ? P.white : P.mistBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s", overflow: "hidden" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = P.accent; e.currentTarget.style.background = P.white; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = imageFile ? P.accent : P.mist; e.currentTarget.style.background = imageFile ? P.white : P.mistBg; }}>

            <input type="file" accept="image/*" onChange={handleImageChange}
              style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%", zIndex: 10 }} />

            {preview ? (
              <>
                <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 16 }} />
                <div style={{ position: "absolute", bottom: 16, right: 16, background: P.navy, padding: "6px 16px", borderRadius: 12, fontSize: 12, fontWeight: 800, color: P.white, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 11 }}>
                  REPLACE MEDIA
                </div>
              </>
            ) : (
              <>
                <div style={{ width: 56, height: 56, borderRadius: 18, background: P.white, display: "flex", alignItems: "center", justifyContent: "center", color: P.navy, marginBottom: 16, boxShadow: "0 8px 20px rgba(0,0,0,0.06)" }}>
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </div>
                <p style={{ color: P.navy, fontWeight: 800, fontSize: 15, margin: "0 0 4px" }}>Select Product Image</p>
                <p style={{ color: P.muted, fontSize: 12, fontWeight: 600, margin: 0 }}>High resolution JPG, PNG or WebP</p>
              </>
            )}
          </div>

          {imageFile && (
            <div style={{ marginTop: 14, background: P.mistBg, border: `1px solid ${P.mist}`, borderRadius: 14, padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 20 }}>
              {[
                { l: "File Name", v: imageFile.name },
                { l: "File Type", v: imageFile.type },
                { l: "File Size", v: `${(imageFile.size / 1024).toFixed(1)} KB` },
                { l: "Upload Status", v: uploadedImage ? "✓ Verified" : "Ready" },
              ].map(({ l, v }) => (
                <div key={l}>
                  <p style={{ color: P.muted, fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>{l}</p>
                  <p style={{ color: l === "Upload Status" && uploadedImage ? "#16a34a" : P.navy, fontSize: 13, fontWeight: 700, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <InputField label="Product Specifications / Description" name="description" value={formData.description} onChange={handleChange} type="textarea" placeholder="Describe your product in detail..." required />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 16 }}>
          <button type="button" onClick={() => setTab("listings")}
            style={{ padding: "14px 32px", background: P.white, border: `1px solid ${P.mist}`, borderRadius: 14, color: P.muted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: P.font, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = P.mistBg} onMouseLeave={e => e.currentTarget.style.background = P.white}>
            Cancel
          </button>
          <button type="submit" disabled={loading || success}
            style={{ background: success ? "#16a34a" : P.navy, color: P.white, opacity: loading ? 0.8 : 1, fontWeight: 800, fontSize: 14, padding: "14px 44px", borderRadius: 14, border: "none", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 10, transition: "all 0.3s" }} onMouseEnter={e => !loading && (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={e => !loading && (e.currentTarget.style.transform = "none")}>
            {loading ? (
              <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin .8s linear infinite" }} /> Publishing...</>
            ) : success ? (
              <><svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Success!</>
            ) : (
              "Confirm & Publish"
            )}
          </button>
        </div>
      </form>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}