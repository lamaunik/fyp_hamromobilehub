import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

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

const CATS  = ["Smartphones","Laptops","Tablets","Accessories","Wearables","Other"];
const CONDS = ["Like New","Good","Fair","Poor"];

const CONDITION_COLORS = {
  "Like New":{ bg:"rgba(34,197,94,0.1)",  border:"rgba(34,197,94,0.3)",  text:"#16a34a" },
  "Good":    { bg:"rgba(40, 43, 74, 0.1)",  border:"rgba(40, 43, 74, 0.3)",  text:"#282B4A" },
  "Fair":    { bg:"rgba(234,179,8,0.1)",  border:"rgba(234,179,8,0.3)",  text:"#b45309" },
  "Poor":    { bg:"rgba(220,38,38,0.1)",  border:"rgba(220,38,38,0.3)",  text:"#dc2626" },
};

// Helper: resolve image URL from backend
const imgSrc = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:5000${url}`;
};

export default function SellProductPage({ setTab }) {
  const { user } = useAuth();
  const [view,      setView]     = useState("form");
  const [loading,   setLoading]  = useState(false);
  const [myList,    setMyList]   = useState([]);
  const [listLoad,  setListLoad] = useState(false);
  const [success,   setSuccess]  = useState(false);
  const [imageFile, setImageFile]= useState(null);
  const [preview,   setPreview]  = useState(null);

  const [form, setForm] = useState({
    title:"", description:"", price:"",
    category:"Smartphones", condition:"Good",
    location:"", contactPhone: user?.phone || "",
  });

  useEffect(() => { if (view === "listings") fetchMyListings(); }, [view]);

  // Create preview URL when image file changes
  useEffect(() => {
    if (!imageFile) { setPreview(null); return; }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const fetchMyListings = async () => {
    setListLoad(true);
    try {
      const { api } = await import("../../utils/api");
      const res = await api.get("/used-products/mine");
      if (res.success) setMyList(res.data);
    } catch (err) { console.error(err); }
    finally { setListLoad(false); }
  };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { api } = await import("../../utils/api");
      let imageUrl = "";

      // Upload image to /api/upload/used (any logged-in user endpoint)
      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);
        const token = localStorage.getItem("token");
        const upRes = await fetch("http://localhost:5000/api/upload/used", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        const upData = await upRes.json();
        if (upData.success) {
          imageUrl = upData.data;
        } else {
          alert("Image upload failed: " + (upData.message || "Unknown error"));
          setLoading(false);
          return;
        }
      }

      const payload = {
        ...form,
        price: Number(form.price),
        images: imageUrl ? [imageUrl] : [],
      };

      const res = await api.post("/used-products", payload);
      if (res.success) {
        setSuccess(true);
        setForm({ title:"", description:"", price:"", category:"Smartphones", condition:"Good", location:"", contactPhone: user?.phone || "" });
        setImageFile(null);
        setPreview(null);
        setTimeout(() => { setSuccess(false); setView("listings"); fetchMyListings(); }, 2000);
      }
    } catch (err) {
      alert(err.message || "Failed to submit listing.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this listing?")) return;
    try {
      const { api } = await import("../../utils/api");
      const res = await api.delete(`/used-products/${id}`);
      if (res.success) setMyList(prev => prev.filter(p => p._id !== id));
    } catch (err) { alert("Failed to delete listing."); }
  };

  const handleMarkSold = async (id) => {
    try {
      const { api } = await import("../../utils/api");
      const res = await api.put(`/used-products/${id}/sold`, {});
      if (res.success) setMyList(prev => prev.map(p => p._id === id ? { ...p, status:"sold" } : p));
    } catch (err) { alert("Failed to mark as sold."); }
  };

  const inputStyle = {
    width:"100%", padding:"12px 14px", borderRadius:12,
    border:`1.5px solid ${P.mist}`, background:P.mistBg,
    color:P.navy, fontSize:14, fontFamily:P.font,
    outline:"none", transition:"all .2s", boxSizing:"border-box",
  };
  const focusStyle  = e => { e.target.style.borderColor="#a78bfa"; e.target.style.boxShadow="0 0 0 3px rgba(124,58,237,.12)"; };
  const blurStyle   = e => { e.target.style.borderColor=P.mist;    e.target.style.boxShadow="none"; };

  return (
    <div style={{ padding:"28px 32px", fontFamily:P.font }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,#4c1d95,${P.purple})`, borderRadius:22, padding:"26px 32px", marginBottom:28, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-10, width:150, height:150, borderRadius:"50%", background:"rgba(255,255,255,.07)", filter:"blur(30px)", pointerEvents:"none" }} />
        <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:999, padding:"4px 14px", marginBottom:12 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#c4b5fd", display:"inline-block" }} />
              <span style={{ color:"#e9d5ff", fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>Sell on HamroMobileHub</span>
            </div>
            <h2 style={{ color:"white", fontWeight:900, fontSize:24, margin:"0 0 6px" }}>List Your Used Device</h2>
            <p style={{ color:"rgba(233,213,255,.75)", fontSize:13, margin:0 }}>Sell directly to buyers - no vendor approval needed.</p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {[{ id:"form", l:"+ New Listing" }, { id:"listings", l:"My Listings" }].map(v => (
              <button key={v.id} onClick={() => setView(v.id)}
                style={{ padding:"9px 18px", borderRadius:11, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:P.font, border:"1px solid rgba(255,255,255,0.3)", background: view===v.id ? "rgba(255,255,255,0.25)" : "transparent", color:"white", transition:"all .15s" }}>
                {v.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* New Listing Form */}
      {view === "form" && (
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          {success && (
            <div style={{ background:"rgba(34,197,94,0.1)", border:"1.5px solid rgba(34,197,94,0.3)", borderRadius:14, padding:"14px 20px", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              <span style={{ color:"#16a34a", fontWeight:700, fontSize:14 }}>Listing published! Switching to your listings...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:20, padding:32, boxShadow:"0 4px 20px rgba(40, 43, 74, .06)" }}>

            {/* Title + Category */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:8 }}>Product Title *</label>
                <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. iPhone 12 Pro 128GB" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:8 }}>Category *</label>
                <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, appearance:"none", cursor:"pointer" }} onFocus={focusStyle} onBlur={blurStyle}>
                  {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Price + Condition */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:8 }}>Asking Price (Rs.) *</label>
                <input name="price" value={form.price} onChange={handleChange} required type="number" min="1" placeholder="5000" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:8 }}>Condition *</label>
                <select name="condition" value={form.condition} onChange={handleChange} style={{ ...inputStyle, appearance:"none", cursor:"pointer" }} onFocus={focusStyle} onBlur={blurStyle}>
                  {CONDS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:8 }}>Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
                placeholder="Describe the product - age, any damage, accessories included, reason for selling..."
                style={{ ...inputStyle, resize:"vertical", minHeight:100 }} onFocus={focusStyle} onBlur={blurStyle} />
            </div>

            {/* Location + Phone */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:8 }}>Location</label>
                <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Kathmandu, Baneshwor" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:8 }}>Contact Phone</label>
                <input name="contactPhone" value={form.contactPhone} onChange={handleChange} placeholder="+977-98XXXXXXXX" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
            </div>

            {/* Image Upload — FIX: shows real preview */}
            <div style={{ marginBottom:24 }}>
              <label style={{ display:"block", fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", marginBottom:8 }}>Product Photo</label>
              <div style={{ position:"relative", width:"100%", height:180, borderRadius:14, border:`2px dashed ${imageFile ? P.purple : P.sky}`, background: imageFile ? "rgba(124,58,237,0.04)" : P.mistBg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", overflow:"hidden", transition:"all .2s" }}
                onMouseEnter={e=>{ if(!imageFile){ e.currentTarget.style.borderColor=P.purple; e.currentTarget.style.background=P.purpleLight; }}}
                onMouseLeave={e=>{ if(!imageFile){ e.currentTarget.style.borderColor=P.sky; e.currentTarget.style.background=P.mistBg; }}}>
                {/* Hidden file input covers the whole area */}
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])}
                  style={{ position:"absolute", inset:0, opacity:0, cursor:"pointer", width:"100%", height:"100%", zIndex:2 }} />

                {/* Show real preview if image selected */}
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" style={{ width:"100%", height:"100%", objectFit:"contain", padding:8 }} />
                    <div style={{ position:"absolute", bottom:8, right:8, background:"rgba(124,58,237,0.9)", color:"white", padding:"4px 12px", borderRadius:8, fontSize:12, fontWeight:700, zIndex:3, pointerEvents:"none" }}>
                      Change Photo
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ width:48, height:48, borderRadius:"50%", background:P.white, display:"flex", alignItems:"center", justifyContent:"center", color:P.purple, marginBottom:10, boxShadow:"0 4px 12px rgba(124,58,237,.15)", pointerEvents:"none" }}>
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                    </div>
                    <p style={{ color:P.navy, fontWeight:700, fontSize:13, margin:0, pointerEvents:"none" }}>Click to upload photo</p>
                    <p style={{ color:P.muted, fontSize:11, margin:"3px 0 0", pointerEvents:"none" }}>JPG, PNG (recommended: clear product shot)</p>
                  </>
                )}
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{ width:"100%", padding:"14px 0", background:`linear-gradient(135deg,${P.purple},#a855f7)`, color:P.white, border:"none", borderRadius:14, fontSize:15, fontWeight:800, cursor:loading?"not-allowed":"pointer", fontFamily:P.font, opacity:loading?0.75:1, boxShadow:"0 6px 20px rgba(124,58,237,.35)", transition:"all .2s", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
              {loading ? (
                <>
                  <span style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.4)", borderTopColor:"white", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }} />
                  Uploading & Publishing...
                </>
              ) : (
                <>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                  Publish Listing
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* My Listings */}
      {view === "listings" && (
        <div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <div>
              <h3 style={{ color:P.navy, fontWeight:900, fontSize:18, margin:0 }}>My Listings</h3>
              <p style={{ color:P.muted, fontSize:13, margin:"4px 0 0" }}>{myList.length} listing{myList.length !== 1 ? "s" : ""}</p>
            </div>
            <button onClick={() => setTab("marketplace")}
              style={{ padding:"9px 18px", background:P.purpleLight, border:`1.5px solid rgba(124,58,237,0.3)`, borderRadius:11, color:P.purple, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:P.font }}>
              View Marketplace
            </button>
          </div>

          {listLoad && (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[1,2,3].map(i => <div key={i} style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:16, height:88, opacity:0.5 }} />)}
            </div>
          )}

          {!listLoad && myList.length === 0 && (
            <div style={{ textAlign:"center", padding:"60px 0", background:P.white, border:`1.5px dashed ${P.mist}`, borderRadius:20 }}>
              <p style={{ color:P.navy, fontWeight:700, fontSize:15, margin:"0 0 8px" }}>No listings yet</p>
              <p style={{ color:P.muted, fontSize:13, margin:"0 0 20px" }}>Create your first listing to start selling!</p>
              <button onClick={() => setView("form")} style={{ padding:"10px 24px", background:`linear-gradient(135deg,${P.purple},#a855f7)`, color:P.white, border:"none", borderRadius:11, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:P.font }}>
                + Create Listing
              </button>
            </div>
          )}

          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {myList.map(p => {
              const cc = CONDITION_COLORS[p.condition] || CONDITION_COLORS["Good"];
              const isSold = p.status === "sold";
              const thumb = p.images && p.images.length > 0 ? imgSrc(p.images[0]) : null;
              return (
                <div key={p._id} style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:16, padding:"16px 20px", display:"flex", alignItems:"center", gap:16, opacity: isSold ? 0.6 : 1, boxShadow:"0 2px 10px rgba(40, 43, 74, .04)" }}>
                  {/* Thumbnail — shows real image */}
                  <div style={{ width:64, height:64, borderRadius:12, background:P.mistBg, border:`1px solid ${P.mist}`, overflow:"hidden", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {thumb
                      ? <img src={thumb} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      : <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                    }
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ color:P.navy, fontWeight:700, fontSize:14, margin:"0 0 5px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</p>
                    <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                      <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:999, background:cc.bg, border:`1px solid ${cc.border}`, color:cc.text }}>{p.condition}</span>
                      <span style={{ color:P.muted, fontSize:12 }}>{p.category}</span>
                      {p.location && <span style={{ color:P.muted, fontSize:12 }}>📍 {p.location}</span>}
                      {isSold && <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:999, background:"rgba(220,38,38,0.1)", border:"1px solid rgba(220,38,38,0.25)", color:"#dc2626" }}>Sold</span>}
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                    <span style={{ color:P.navy, fontWeight:900, fontSize:16 }}>Rs. {p.price.toLocaleString()}</span>

                    {/* Add Photo button for listings missing an image */}
                    {!isSold && (!p.images || p.images.length === 0) && (
                      <label style={{ padding:"7px 12px", background:"rgba(234,179,8,0.1)", border:"1.5px solid rgba(234,179,8,0.35)", borderRadius:9, color:"#b45309", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:P.font, display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap" }}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Add Photo
                        <input type="file" accept="image/*" style={{ display:"none" }}
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const fd = new FormData();
                            fd.append("image", file);
                            const token = localStorage.getItem("token");
                            try {
                              const upRes = await fetch("http://localhost:5000/api/upload/used", {
                                method:"POST", headers:{ Authorization:`Bearer ${token}` }, body: fd,
                              });
                              const upData = await upRes.json();
                              if (upData.success) {
                                const { api } = await import("../../utils/api");
                                const res = await api.put(`/used-products/${p._id}/image`, { imageUrl: upData.data });
                                if (res.success) {
                                  setMyList(prev => prev.map(item =>
                                    item._id === p._id ? { ...item, images: [upData.data] } : item
                                  ));
                                }
                              }
                            } catch (err) { alert("Failed to upload photo"); }
                          }}
                        />
                      </label>
                    )}

                    {!isSold && (
                      <button onClick={() => handleMarkSold(p._id)}
                        style={{ padding:"7px 14px", background:P.purpleLight, border:`1.5px solid rgba(124,58,237,0.3)`, borderRadius:9, color:P.purple, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:P.font }}>
                        Mark Sold
                      </button>
                    )}
                    <button onClick={() => handleDelete(p._id)}
                      style={{ padding:"7px 12px", background:"rgba(220,38,38,0.08)", border:"1.5px solid rgba(220,38,38,0.2)", borderRadius:9, color:"#dc2626", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:P.font }}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}