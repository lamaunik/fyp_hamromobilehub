import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9", border:"#D6E8EE",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const InputField = ({ label, name, value, onChange, type="text", placeholder, options }) => {
  const commonStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 12,
    border: `1px solid ${P.border}`, background: P.mistBg,
    color: P.navy, fontSize: 14, fontFamily: P.font,
    outline: "none", transition: "all 0.2s", boxSizing: "border-box"
  };
  const focusStyle = (e) => { e.target.style.borderColor=P.ocean; e.target.style.boxShadow="0 0 0 3px rgba(1,138,190,0.15)"; };
  const blurStyle = (e) => { e.target.style.borderColor=P.border; e.target.style.boxShadow="none"; };

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", color: P.navy, fontSize: 13, fontWeight: 700, marginBottom: 8, fontFamily: P.font }}>
        {label}
      </label>
      {type === "select" ? (
        <select name={name} value={value || ""} onChange={onChange} style={{...commonStyle, appearance:"none"}} onFocus={focusStyle} onBlur={blurStyle} required>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea name={name} value={value || ""} onChange={onChange} placeholder={placeholder} style={{...commonStyle, minHeight:100, resize:"vertical"}} onFocus={focusStyle} onBlur={blurStyle} required/>
      ) : (
        <input type={type} name={name} value={value || ""} onChange={onChange} placeholder={placeholder} style={commonStyle} onFocus={focusStyle} onBlur={blurStyle} required={name!=="image"}/>
      )}
    </div>
  );
};

export default function VendorAddProduct({ setTab }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "Smartphones",
    stock: "",
    image: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { api } = await import("../../utils/api");
      let uploadedImageUrl = formData.image;

      if (imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("image", imageFile);

        const token = localStorage.getItem("token");
        const uploadRes = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: formDataUpload,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          uploadedImageUrl = uploadData.data;
        } else {
          alert("Image upload failed: " + uploadData.message);
          setLoading(false);
          return;
        }
      }

      const payload = {
        name: formData.name,
        brand: formData.brand,
        description: formData.description || "No description provided",
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        images: uploadedImageUrl ? [uploadedImageUrl] : []
      };

      const res = await api.post("/products", payload);
      if (res.success) {
        alert("Product added successfully!");
        setTab("listings");
      } else {
        alert(res.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: P.font, maxWidth:800, margin:"0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setTab("listings")} style={{ background:"transparent", border:"none", cursor:"pointer", color:P.muted, display:"flex", alignItems:"center", padding:5 }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <div>
          <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 24, margin: "0 0 4px" }}>Add New Product</h2>
          <p style={{ color: P.muted, fontSize: 14, margin: 0 }}>Create a new listing for your store.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ background: P.white, border: `1px solid ${P.border}`, borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,27,72,0.04)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <InputField label="Brand" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Apple, Samsung" />
          <InputField label="Product Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. iPhone 14 Pro" />
          <InputField label="Category" name="category" value={formData.category} onChange={handleChange} type="select" options={["Smartphones", "Laptops", "Tablets", "Accessories", "Wearables"]} />
        </div>
        
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <InputField label="Price (USD)" name="price" value={formData.price} onChange={handleChange} type="number" placeholder="999.99" />
          <InputField label="Stock Quantity" name="stock" value={formData.stock} onChange={handleChange} type="number" placeholder="50" />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", color: P.navy, fontSize: 13, fontWeight: 700, marginBottom: 8, fontFamily: P.font }}>
            Product Image
          </label>
          <div style={{
            position: "relative", width: "100%", height: 160, borderRadius: 16,
            border: `2px dashed ${imageFile ? P.ocean : P.sky}`,
            background: imageFile ? "rgba(1,138,190,0.05)" : P.mistBg,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s", overflow: "hidden"
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = P.ocean; e.currentTarget.style.background = "rgba(1,138,190,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = imageFile ? P.ocean : P.sky; e.currentTarget.style.background = imageFile ? "rgba(1,138,190,0.05)" : P.mistBg; }}
          >
            <input type="file" accept="image/*" onChange={handleImageChange} style={{
              position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%"
            }} />
            
            {imageFile ? (
              <>
                <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
                <div style={{ position: "absolute", bottom: 8, right: 8, background: P.white, padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, color: P.navy, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  Change Image
                </div>
              </>
            ) : (
              <>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: P.white, display: "flex", alignItems: "center", justifyContent: "center", color: P.ocean, marginBottom: 12, boxShadow: "0 4px 12px rgba(1,138,190,0.15)" }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <p style={{ color: P.navy, fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>Click to upload image</p>
                <p style={{ color: P.muted, fontSize: 12, margin: 0 }}>SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </>
            )}
          </div>
        </div>

        <InputField label="Description" name="description" value={formData.description} onChange={handleChange} type="textarea" placeholder="Detailed product description..." />

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button type="submit" disabled={loading} style={{
            background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`, color: P.white, opacity: loading ? 0.7 : 1,
            fontWeight: 700, fontSize: 14, padding: "12px 32px", borderRadius: 12, border: "none", cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 16px rgba(1,138,190,0.3)"
          }}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}