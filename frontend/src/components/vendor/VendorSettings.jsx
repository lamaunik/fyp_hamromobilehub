import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { P } from "../dashboard/DashboardConstants";

function Toggle({ label, description, checked, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "20px 0", borderBottom: `1px solid ${P.mist}` }}>
      <div style={{ flex: 1, paddingRight: 24 }}>
        <span style={{ display: "block", color: P.navy, fontSize: 14, fontWeight: 800, marginBottom: 4 }}>{label}</span>
        <span style={{ display: "block", color: P.muted, fontSize: 13, fontWeight: 500, lineHeight: 1.5 }}>{description}</span>
      </div>
      <div onClick={onChange} style={{ width: 48, height: 26, borderRadius: 999, background: checked ? P.navy : P.mist, cursor: "pointer", transition: "all 0.3s ease", position: "relative", flexShrink: 0, marginTop: 4 }}>
        <div style={{ position: "absolute", top: 3, left: checked ? 25 : 3, width: 20, height: 20, borderRadius: "50%", background: P.white, boxShadow: "0 2px 6px rgba(0,0,0,0.15)", transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
      </div>
    </div>
  );
}

export default function VendorSettings() {
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState("info");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);

  const [form, setForm] = useState({
    name:           user?.name  || "",
    email:          user?.email || "",
    phone:          user?.phone || "",
    address:        user?.address || "",
    profilePicture: user?.profilePicture || "",
    bio:            user?.bio || "Passionate vendor on HamroMobileHub.",
    storeName:      user?.storeName || "My Store",
    panNumber:      user?.panNumber || "",
    storeLocation:  user?.storeLocation || "",
  });

  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });

  const [notifs, setNotifs] = useState({
    emailNotifications: true,
    smsNotifications:   false,
    twoFactorAuth:      false,
    newOrders:          true,
    promotions:         false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { api } = await import("../../utils/api");
        const res = await api.get("/users/profile");
        if (res.data) {
          setForm(prev => ({
            ...prev,
            name:           res.data.name  || "",
            email:          res.data.email || "",
            phone:          res.data.phone || "",
            address:        res.data.address || "",
            profilePicture: res.data.profilePicture || "",
            bio:            res.data.bio || "Passionate vendor on HamroMobileHub.",
            storeName:      res.data.storeName || "My Store",
            panNumber:      res.data.panNumber || "",
            storeLocation:  res.data.storeLocation || "",
          }));
        }
      } catch (err) { console.error("Profile fetch failed", err); }
    };
    if (user) fetchProfile();
  }, [user]);

  const [stats, setStats] = useState({ listings: 0, orders: 0, revenue: 0, rating: "4.8" });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { api } = await import("../../utils/api");
        const [pRes, oRes] = await Promise.all([
          api.get("/products/vendor/myproducts"),
          api.get("/orders/vendor/myorders"),
        ]);
        const listings = pRes.success ? pRes.data.length : 0;
        const orders   = oRes.success ? oRes.data.length : 0;
        const revenue  = oRes.success ? oRes.data.reduce((s, o) => s + (o.totalPrice || 0), 0) : 0;
        setStats(prev => ({ ...prev, listings, orders, revenue }));
      } catch (err) { console.error(err); }
    };
    fetchStats();
  }, []);

  const saveInfo = async () => {
    try {
      const { api } = await import("../../utils/api");
      const res = await api.put("/users/profile", form);
      if (res.success) {
        updateUser(form);
        setSaved(true);
        setTimeout(() => { setSaved(false); setEditing(false); }, 1500);
      }
    } catch (err) { console.error(err); }
  };

  const savePw = async () => {
    if (pwForm.next !== pwForm.confirm || pwForm.next.length < 6) {
      alert("Passwords must match and be at least 6 characters.");
      return;
    }
    try {
      const { api } = await import("../../utils/api");
      await api.put("/users/profile", { password: pwForm.next });
      setPwForm({ current: "", next: "", confirm: "" });
      setPwSaved(true);
      setTimeout(() => setPwSaved(false), 2000);
    } catch (err) { console.error(err); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { api } = await import("../../utils/api");
      // Use the dedicated profile upload endpoint
      const res = await api.post("/upload/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.success) {
        // The backend returns the URL directly in res.data
        const imageUrl = res.data; 
        
        setForm(prev => ({ ...prev, profilePicture: imageUrl }));
        updateUser({ profilePicture: imageUrl });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Failed to upload image. Please try again.");
    }
  };

  const inputStyle = (editable) => ({
    width: "100%", border: `1px solid ${P.mist}`, borderRadius: 14,
    padding: "12px 16px", fontSize: 14, color: P.navy, fontFamily: P.font,
    background: editable ? P.white : P.mistBg, outline: "none",
    transition: "all .2s", boxSizing: "border-box", opacity: editable ? 1 : 0.85,
    fontWeight: editable ? 500 : 600,
  });

  const TABS = [
    { id: "info",        l: "Profile" },
    { id: "store",       l: "Store" },
    { id: "security",    l: "Security" },
    { id: "preferences", l: "Preferences" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, fontFamily: P.font, paddingBottom: 60 }}>

      {/* ── Brand Hero Section ── */}
      <div style={{ background: `linear-gradient(135deg, ${P.navy}, #3f3f46)`, borderRadius: 32, padding: 48, display: "flex", alignItems: "center", gap: 40, position: "relative", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}>
        <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.03)", filter: "blur(60px)" }} />
        
        {/* Avatar Area */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{ width: 100, height: 100, borderRadius: 28, background: P.white, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", border: "4px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
            {form.profilePicture ? (
              <img src={form.profilePicture.startsWith("http") ? form.profilePicture : `http://localhost:5000${form.profilePicture}`} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ color: P.navy, fontWeight: 900, fontSize: 36, fontFamily: P.fontHeading }}>{form.name?.charAt(0)?.toUpperCase() || "V"}</span>
            )}
          </div>
          <input 
            type="file" 
            id="profilePicInput" 
            hidden 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          <div 
            onClick={() => document.getElementById("profilePicInput").click()}
            style={{ position: "absolute", bottom: -6, right: -6, width: 32, height: 32, borderRadius: 12, background: P.accent, border: `3px solid ${P.navy}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
        </div>

        {/* Identity */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <h2 style={{ color: P.white, fontWeight: 900, fontSize: 32, margin: 0, fontFamily: P.fontHeading }}>{form.name || "Vendor Partner"}</h2>
            <span style={{ background: "rgba(255,255,255,0.15)", color: P.white, fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 8, letterSpacing: "0.5px" }}>VERIFIED</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: 500, margin: "0 0 20px" }}>{form.email}</p>
          <div style={{ display: "flex", gap: 32 }}>
             <div>
               <p style={{ color: P.white, fontWeight: 900, fontSize: 18, margin: 0 }}>{stats.listings}</p>
               <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", margin: 0 }}>Skus</p>
             </div>
             <div style={{ width: 1, height: 30, background: "rgba(255,255,255,0.1)", marginTop: 4 }}></div>
             <div>
               <p style={{ color: P.white, fontWeight: 900, fontSize: 18, margin: 0 }}>{stats.rating}</p>
               <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", margin: 0 }}>Rating</p>
             </div>
             <div style={{ width: 1, height: 30, background: "rgba(255,255,255,0.1)", marginTop: 4 }}></div>
             <div>
               <p style={{ color: P.white, fontWeight: 900, fontSize: 18, margin: 0 }}>NPR {Math.floor(stats.revenue/1000)}k</p>
               <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", margin: 0 }}>Volume</p>
             </div>
          </div>
        </div>
      </div>

      {/* ── Navigation Area ── */}
      <div style={{ display: "flex", gap: 10, background: P.white, padding: 6, borderRadius: 20, border: `1px solid ${P.mist}`, width: "fit-content", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setEditing(false); }} style={{ padding: "10px 24px", borderRadius: 14, fontSize: 14, fontWeight: 800, cursor: "pointer", border: "none", fontFamily: P.font, background: tab === t.id ? P.navy : "transparent", color: tab === t.id ? P.white : P.muted, transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>{t.l}</button>
        ))}
      </div>

      <div style={{ maxWidth: 840 }}>
        {/* Profile Information */}
        {tab === "info" && (
          <div style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 32, padding: 40, boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
              <div>
                <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 20, margin: "0 0 4px", fontFamily: P.fontHeading }}>Account Credential</h3>
                <p style={{ color: P.muted, fontSize: 14, fontWeight: 500, margin: 0 }}>Manage your representative profile on the platform.</p>
              </div>
              {!editing
                ? <button onClick={() => setEditing(true)} style={{ padding: "10px 24px", background: P.white, border: `1px solid ${P.mist}`, borderRadius: 14, color: P.navy, fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = P.mistBg} onMouseLeave={e => e.currentTarget.style.background = P.white}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    Modify
                  </button>
                : <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setEditing(false)} style={{ padding: "10px 20px", background: P.white, color: P.muted, fontSize: 13, fontWeight: 800, border: "none", cursor: "pointer" }}>Discard</button>
                    <button onClick={saveInfo} style={{ padding: "10px 28px", background: saved ? "#16a34a" : P.navy, color: P.white, fontSize: 13, fontWeight: 800, borderRadius: 14, border: "none", cursor: "pointer", transition: "all 0.3s" }}>
                      {saved ? "Success ✓" : "Commit Changes"}
                    </button>
                  </div>
              }
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[
                { l: "Platform Identity", k: "name", type: "text" },
                { l: "Official Email", k: "email", type: "email" },
                { l: "Direct Contact", k: "phone", type: "tel" },
                { l: "Headquarters", k: "address", type: "text" },
              ].map(f => (
                <div key={f.k}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 900, color: P.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{f.l}</label>
                  <input type={f.type} value={form[f.k]} onChange={e => setForm(v => ({ ...v, [f.k]: e.target.value }))} disabled={!editing}
                    style={inputStyle(editing)}
                    onFocus={e => { if(editing) { e.target.style.borderColor = P.accent; e.target.style.background = P.white; e.target.style.boxShadow = `0 0 0 4px ${P.mist}`; }}}
                    onBlur={e => { e.target.style.borderColor = P.mist; e.target.style.background = editing ? P.white : P.mistBg; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              ))}
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 900, color: P.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Bio / Statement</label>
                <textarea value={form.bio} onChange={e => setForm(v => ({ ...v, bio: e.target.value }))} disabled={!editing} rows={3}
                  style={{ ...inputStyle(editing), resize: "none", minHeight: 100 }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Store Profile */}
        {tab === "store" && (
          <div style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 32, padding: 40, boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
            <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 20, margin: "0 0 12px", fontFamily: P.fontHeading }}>Marketplace Presence</h3>
            <p style={{ color: P.muted, fontSize: 14, fontWeight: 500, margin: "0 0 32px" }}>Configure how your brand appears to potential buyers.</p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 900, color: P.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Primary Store Name</label>
                <input type="text" value={form.storeName} onChange={e => setForm(v => ({ ...v, storeName: e.target.value }))} placeholder="Your Business Name" style={inputStyle(true)} />
              </div>
              
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 900, color: P.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>PAN / Tax Number</label>
                <input type="text" value={form.panNumber} onChange={e => setForm(v => ({ ...v, panNumber: e.target.value }))} placeholder="123456789" style={inputStyle(true)} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 900, color: P.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Full Store Location (Address)</label>
                <input type="text" value={form.storeLocation} onChange={e => setForm(v => ({ ...v, storeLocation: e.target.value }))} placeholder="Street, City, Nepal" style={inputStyle(true)} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 900, color: P.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Operating Currency</label>
                <select style={{ ...inputStyle(true), appearance: "none" }}>
                  <option>Nepalese Rupee (NPR)</option>
                  <option>US Dollar (USD)</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 900, color: P.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Timezone</label>
                <select style={{ ...inputStyle(true), appearance: "none" }}>
                  <option>(GMT+05:45) Kathmandu</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: 40, borderTop: `1px solid ${P.mist}`, paddingTop: 32, display: "flex", justifyContent: "flex-end" }}>
              <button onClick={saveInfo} style={{ padding: "14px 44px", background: P.navy, color: P.white, fontSize: 14, fontWeight: 800, borderRadius: 14, border: "none", cursor: "pointer", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>Update Ecosystem</button>
            </div>
          </div>
        )}

        {/* Security Matrix */}
        {tab === "security" && (
          <div style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 32, padding: 40, maxWidth: 520, boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
            <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 20, margin: "0 0 12px", fontFamily: P.fontHeading }}>Access Control</h3>
            <p style={{ color: P.muted, fontSize: 14, fontWeight: 500, margin: "0 0 32px" }}>Maintain the integrity of your vendor vault.</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { l: "Secret Key", k: "current", ph: "Enter Current Password" }, 
                { l: "New Secret Key", k: "next", ph: "Minimum 8 characters" }, 
                { l: "Verify Secret Key", k: "confirm", ph: "Retype new password" }
              ].map(f => (
                <div key={f.k}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 900, color: P.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{f.l}</label>
                  <input type="password" value={pwForm[f.k]} onChange={e => setPwForm(v => ({ ...v, [f.k]: e.target.value }))} placeholder={f.ph} style={inputStyle(true)} />
                </div>
              ))}
              <button onClick={savePw} style={{ marginTop: 12, padding: "16px 0", background: pwSaved ? "#16a34a" : P.navy, color: P.white, fontSize: 14, fontWeight: 800, borderRadius: 14, border: "none", cursor: "pointer", transition: "all 0.3s", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                {pwSaved ? "Security Synchronized ✓" : "Rotate Secret Key"}
              </button>
            </div>
          </div>
        )}

        {/* Config Preferences */}
        {tab === "preferences" && (
          <div style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 32, padding: 40, boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
            <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 20, margin: "0 0 12px", fontFamily: P.fontHeading }}>Channel Preferences</h3>
            <p style={{ color: P.muted, fontSize: 14, fontWeight: 500, margin: "0 0 16px" }}>Define how the system communicates critical events.</p>
            
            {[
              { k: "emailNotifications", l: "Cloud Email Logs", sub: "Receive cryptographic transaction receipts and daily inventory logs." },
              { k: "smsNotifications", l: "Secure SMS Tunnels", sub: "Priority alerts for account access and high-value orders." },
              { k: "newOrders", l: "Instant Order Broadcast", sub: "Real-time socket notifications for every successful conversion." },
              { k: "promotions", l: "Market Intelligence", sub: "Analytic reports on trending gadgets and platform campaigns." },
              { k: "twoFactorAuth", l: "Multi-Signature Login", sub: "Require biometric or token-based verification for dashboard entry." },
            ].map(item => (
              <Toggle key={item.k} label={item.l} description={item.sub} checked={notifs[item.k]} onChange={() => setNotifs(n => ({ ...n, [item.k]: !n[item.k] }))} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}