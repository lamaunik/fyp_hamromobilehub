import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { P } from "./DashboardConstants";
import { Icon } from "./DashboardIcons";
import { Btn } from "./DashboardUI";
import { api } from "../../utils/api";

export default function DashboardProfile({ addNotif }) {
  const { user, updateUser } = useAuth();
  const [tab,     setPTab]   = useState("info");
  const [editing, setEditing]= useState(false);
  
  // Real initial state from `user` context or fetch
  const [form,    setForm]   = useState({
    name:    user?.name    || "",
    email:   user?.email   || "",
    phone:   user?.phone   || "",
    address: user?.address || "",
    profilePicture: user?.profilePicture || "",
    bio:     user?.bio     || "",
  });
  
  const [saved,   setSaved]  = useState(false);
  const [pwForm,  setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwSaved, setPwSaved]= useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Load the full profile explicitly in case Context isn't fully updated
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) return;
        const res = await api.get("/users/profile");
        const d = res.data;
        setForm(prev => ({
          ...prev,
          name: d.name || "",
          email: d.email || "",
          phone: d.phone || "",
          address: d.address || "",
          profilePicture: d.profilePicture || "",
          bio: d.bio || "",
        }));
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, [user]);

  const saveInfo = async () => {
    try {
      await api.put("/users/profile", form);
      updateUser(form);
      setSaved(true);
      addNotif({ title: "Profile updated successfully", time: "Just now" });
      setTimeout(() => { setSaved(false); setEditing(false); }, 1500);
    } catch (err) {
      addNotif({ title: "Failed to update profile", time: "Just now" });
    }
  };

  // ── Upload profile picture — sends file, auto-saves URL to DB ──────────────
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const fd    = new FormData();
      fd.append("image", file);
      const token = localStorage.getItem("token");
      const res   = await fetch("http://localhost:5000/api/upload/profile", {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}` },
        body:    fd,
      });
      const data = await res.json();
      if (data.success) {
        const newUrl = data.data; // URL string returned by backend
        setForm(prev => ({ ...prev, profilePicture: newUrl }));
        updateUser({ profilePicture: newUrl }); // update AuthContext + localStorage immediately
        await api.put("/users/profile", { profilePicture: newUrl }); // Persist to DB immediately
        addNotif({ title: "Profile photo updated!", time: "Just now" });
      } else {
        addNotif({ title: data.message || "Photo upload failed", time: "Just now" });
      }
    } catch (err) {
      addNotif({ title: "Failed to upload photo", time: "Just now" });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const savePw = async () => {
    if (pwForm.next !== pwForm.confirm || pwForm.next.length < 6) {
      addNotif({ title: "Passwords must match and be at least 6 chars.", time: "Just now" });
      return;
    }
    
    try {
      await api.put("/users/profile", { password: pwForm.next });
      setPwForm({ current: "", next: "", confirm: "" });
      setPwSaved(true);
      addNotif({ title: "Password changed successfully", time: "Just now" });
      setTimeout(() => setPwSaved(false), 2000);
    } catch (err) {
      addNotif({ title: "Failed to change password", time: "Just now" });
    }
  };

  const stats = [
    { l: "Orders Placed",    v: 0 },
    { l: "Products Reviewed",v: 7 },
    { l: "Wishlist Items",   v: 3 },
    { l: "Total Spent",      v: "Rs. 4,598" },
  ];

  return (
    <div className="page" style={{ padding: "28px 32px", fontFamily: P.font }}>

      {/* Hero header card */}
      <div style={{ background: `linear-gradient(135deg,${P.navy},${P.royal})`, borderRadius: 22, padding: "28px 32px", display: "flex", alignItems: "center", gap: 24, marginBottom: 28, position: "relative", overflow: "hidden" }}>
        <div className="float" style={{ position: "absolute", top: -30, right: -10, width: 160, height: 160, borderRadius: "50%", background: "rgba(1,138,190,.15)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg,${P.ocean},${P.sky})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(1,138,190,.4)", border: "3px solid rgba(255,255,255,.3)", overflow: "hidden" }}>
            {form.profilePicture ? (
              <img src={form.profilePicture.startsWith("http") ? form.profilePicture : `http://localhost:5000${form.profilePicture}`} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ color: P.white, fontWeight: 900, fontSize: 28 }}>{form.name?.charAt(0)?.toUpperCase() || "U"}</span>
            )}
          </div>
          {/* Camera button — clicking this opens file picker */}
          <label style={{ position: "absolute", bottom: -2, right: -2, width: 24, height: 24, borderRadius: "50%", background: uploadingAvatar ? P.muted : P.ocean, border: `2px solid ${P.white}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: uploadingAvatar ? "not-allowed" : "pointer", color: P.white }}>
            {uploadingAvatar
              ? <span style={{ width: 10, height: 10, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} />
              : Icon.camera}
            <input type="file" accept="image/*" onChange={handleAvatarChange} disabled={uploadingAvatar} style={{ display: "none" }} />
          </label>
        </div>
        <div style={{ position: "relative" }}>
          <h2 style={{ color: P.white, fontWeight: 900, fontSize: 22, margin: "0 0 4px" }}>{form.name}</h2>
          <p style={{ color: "rgba(151,202,219,.8)", fontSize: 14, margin: "0 0 12px" }}>{form.email}</p>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ background: "rgba(1,138,190,.25)", border: "1px solid rgba(1,138,190,.4)", color: P.sky, fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 999 }}>Customer</span>
            <span style={{ background: "rgba(34,197,94,.2)",   border: "1px solid rgba(34,197,94,.3)", color: "#86efac", fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 999 }}>Verified ✓</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, position: "relative" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,.1)", borderRadius: 12, padding: "10px 16px", textAlign: "center", border: "1px solid rgba(255,255,255,.1)" }}>
              <p style={{ color: P.white, fontWeight: 900, fontSize: 18, margin: 0 }}>{s.v}</p>
              <p style={{ color: "rgba(151,202,219,.7)", fontSize: 11, margin: "2px 0 0" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab pills */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 14, padding: 5, width: "fit-content" }}>
        {[{ id: "info", l: "Personal Info" }, { id: "address", l: "Addresses" }, { id: "security", l: "Security" }, { id: "preferences", l: "Preferences" }].map((t) => (
          <button key={t.id} onClick={() => setPTab(t.id)} style={{ padding: "9px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none", fontFamily: P.font, background: tab === t.id ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.white, color: tab === t.id ? P.white : P.muted, boxShadow: tab === t.id ? "0 4px 14px rgba(1,138,190,.25)" : "none", transition: "all .18s" }}>{t.l}</button>
        ))}
      </div>

      {/* ── Personal Info ── */}
      {tab === "info" && (
        <div style={{ background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 20, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 16, margin: 0 }}>Personal Information</h3>
            {!editing
              ? <Btn cls="btn" onClick={() => setEditing(true)} style={{ padding: "8px 18px", background: P.mistBg, border: `1px solid ${P.mist}`, borderRadius: 10, color: P.navy, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>{Icon.edit} Edit</Btn>
              : <div style={{ display: "flex", gap: 8 }}>
                  <Btn cls="btn" onClick={() => setEditing(false)} style={{ padding: "8px 16px", background: P.mistBg, border: `1px solid ${P.mist}`, borderRadius: 10, color: P.muted, fontSize: 13, fontWeight: 700 }}>Cancel</Btn>
                  <Btn cls="btn" onClick={saveInfo} style={{ padding: "8px 18px", background: saved ? `linear-gradient(135deg,#16a34a,${P.green})` : `linear-gradient(135deg,${P.royal},${P.ocean})`, color: P.white, fontSize: 13, fontWeight: 700, borderRadius: 10, display: "flex", alignItems: "center", gap: 6, transition: "background .35s" }}>
                    {saved ? <>{Icon.check} Saved!</> : "Save Changes"}
                  </Btn>
                </div>
            }
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {[{ l: "Full Name", k: "name", type: "text" }, { l: "Email Address", k: "email", type: "email" }, { l: "Phone Number", k: "phone", type: "tel" }, { l: "Location", k: "address", type: "text" }].map((f) => (
              <div key={f.k}>
                <p style={{ fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 8px" }}>{f.l}</p>
                <input type={f.type} value={form[f.k]} onChange={(e) => setForm((v) => ({ ...v, [f.k]: e.target.value }))} disabled={!editing}
                  style={{ width: "100%", border: `1.5px solid ${P.mist}`, borderRadius: 11, padding: "11px 14px", fontSize: 14, color: P.navy, fontFamily: P.font, background: editing ? P.white : P.mistBg, outline: "none", transition: "all .2s", boxSizing: "border-box", opacity: editing ? 1 : .85 }}
                  onFocus={(e) => { if (editing) { e.target.style.borderColor = P.sky; e.target.style.boxShadow = "0 0 0 3px rgba(151,202,219,.2)"; } }}
                  onBlur={(e)  => { e.target.style.borderColor = P.mist; e.target.style.boxShadow = "none"; }}
                />
              </div>
            ))}
            <div style={{ gridColumn: "1/-1" }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 8px" }}>Profile Image URL</p>
              <input type="text" value={form.profilePicture} onChange={(e) => setForm((v) => ({ ...v, profilePicture: e.target.value }))} disabled={!editing}
                placeholder="https://example.com/avatar.jpg"
                style={{ width: "100%", border: `1.5px solid ${P.mist}`, borderRadius: 11, padding: "11px 14px", fontSize: 14, color: P.navy, fontFamily: P.font, background: editing ? P.white : P.mistBg, outline: "none", transition: "all .2s", boxSizing: "border-box", opacity: editing ? 1 : .85, marginBottom: 18 }}
              />
              
              <p style={{ fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 8px" }}>Bio</p>
              <textarea value={form.bio} onChange={(e) => setForm((v) => ({ ...v, bio: e.target.value }))} disabled={!editing} rows={3}
                style={{ width: "100%", border: `1.5px solid ${P.mist}`, borderRadius: 11, padding: "11px 14px", fontSize: 14, color: P.navy, fontFamily: P.font, background: editing ? P.white : P.mistBg, outline: "none", resize: "none", transition: "all .2s", boxSizing: "border-box", opacity: editing ? 1 : .85 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Addresses ── */}
      {tab === "address" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[{ title: "Home Address", addr: "Kathmandu, Bagmati Province", default: true }, { title: "Work Address", addr: "Patan, Lalitpur", default: false }].map((a, i) => (
            <div key={i} style={{ background: P.white, border: `1.5px solid ${a.default ? P.ocean : P.mist}`, borderRadius: 18, padding: 22, position: "relative", boxShadow: a.default ? "0 4px 16px rgba(1,138,190,.1)" : "none" }}>
              {a.default && <span style={{ position: "absolute", top: 14, right: 14, fontSize: 10, fontWeight: 800, padding: "2px 9px", borderRadius: 999, background: "rgba(1,138,190,.1)", border: "1px solid rgba(1,138,190,.25)", color: P.ocean }}>Default</span>}
              <div style={{ width: 40, height: 40, borderRadius: 11, background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: P.ocean, border: `1px solid ${P.mist}` }}>{Icon.map}</div>
              <h4 style={{ color: P.navy, fontWeight: 800, fontSize: 15, margin: "0 0 6px" }}>{a.title}</h4>
              <p style={{ color: P.muted, fontSize: 13, margin: "0 0 16px", lineHeight: 1.5 }}>{a.addr}, Nepal</p>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn cls="btn" style={{ padding: "7px 14px", background: P.mistBg, border: `1px solid ${P.mist}`, borderRadius: 9, color: P.navy, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>{Icon.edit} Edit</Btn>
                {!a.default && <Btn cls="btn" style={{ padding: "7px 14px", background: "rgba(220,38,38,.07)", border: "1px solid rgba(220,38,38,.2)", borderRadius: 9, color: P.red, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>{Icon.trash} Remove</Btn>}
              </div>
            </div>
          ))}
          {/* Add new address */}
          <div style={{ background: P.white, border: `1.5px dashed ${P.mist}`, borderRadius: 18, padding: 22, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", transition: "all .18s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = P.sky; e.currentTarget.style.background = P.mistBg; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = P.mist; e.currentTarget.style.background = P.white; }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center", color: P.ocean, border: `1px solid ${P.mist}` }}>{Icon.plus}</div>
            <p style={{ color: P.navy, fontWeight: 700, fontSize: 14, margin: 0 }}>Add New Address</p>
            <p style={{ color: P.muted, fontSize: 12, margin: 0, textAlign: "center" }}>Add a delivery address</p>
          </div>
        </div>
      )}

      {/* ── Security ── */}
      {tab === "security" && (
        <div style={{ background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 20, padding: 28, maxWidth: 520 }}>
          <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 16, margin: "0 0 22px" }}>Change Password</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[{ l: "Current Password", k: "current" }, { l: "New Password", k: "next" }, { l: "Confirm New Password", k: "confirm" }].map((f) => (
              <div key={f.k}>
                <p style={{ fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 8px" }}>{f.l}</p>
                <input type="password" value={pwForm[f.k]} onChange={(e) => setPwForm((v) => ({ ...v, [f.k]: e.target.value }))} placeholder="••••••••"
                  style={{ width: "100%", border: `1.5px solid ${P.mist}`, borderRadius: 11, padding: "11px 14px", fontSize: 14, color: P.navy, fontFamily: P.font, background: P.mistBg, outline: "none", transition: "all .2s", boxSizing: "border-box" }}
                  onFocus={(e) => { e.target.style.borderColor = P.sky; e.target.style.background = P.white; e.target.style.boxShadow = "0 0 0 3px rgba(151,202,219,.2)"; }}
                  onBlur={(e)  => { e.target.style.borderColor = P.mist; e.target.style.background = P.mistBg; e.target.style.boxShadow = "none"; }}
                />
              </div>
            ))}
            {pwForm.next && pwForm.confirm && pwForm.next !== pwForm.confirm && (
              <p style={{ color: P.red, fontSize: 12, margin: 0 }}>Passwords do not match</p>
            )}
            <Btn cls="btn" onClick={savePw} style={{ padding: "12px 0", background: pwSaved ? `linear-gradient(135deg,#16a34a,${P.green})` : `linear-gradient(135deg,${P.royal},${P.ocean})`, color: P.white, fontSize: 14, fontWeight: 700, borderRadius: 12, transition: "background .35s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {pwSaved ? <>{Icon.check} Password Changed!</> : "Update Password"}
            </Btn>
          </div>
        </div>
      )}

      {/* ── Preferences ── */}
      {tab === "preferences" && (
        <div style={{ background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 20, padding: 28 }}>
          <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 16, margin: "0 0 22px" }}>Notification Preferences</h3>
          <PreferenceToggles />
        </div>
      )}
    </div>
  );
}

// Extracted so each toggle has its own state cleanly
function PreferenceToggles() {
  const items = [
    { l: "Order Updates",     sub: "Get notified about order status changes",       on: true  },
    { l: "Promotions & Deals",sub: "Receive special offers and discount codes",      on: true  },
    { l: "New Arrivals",      sub: "Be first to know about new products",            on: false },
    { l: "Price Drops",       sub: "Alerts when wishlisted items go on sale",        on: true  },
    { l: "Newsletter",        sub: "Weekly tech news and product reviews",           on: false },
  ];
  const [states, setStates] = useState(items.map((i) => i.on));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {items.map((pref, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: i < items.length - 1 ? `1px solid ${P.mist}` : "none" }}>
          <div>
            <p style={{ color: P.navy, fontWeight: 700, fontSize: 14, margin: 0 }}>{pref.l}</p>
            <p style={{ color: P.muted, fontSize: 12, margin: "3px 0 0" }}>{pref.sub}</p>
          </div>
          <div onClick={() => setStates((s) => s.map((v, j) => j === i ? !v : v))} style={{ width: 44, height: 24, borderRadius: 999, background: states[i] ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.mist, cursor: "pointer", transition: "background .3s", position: "relative", flexShrink: 0 }}>
            <div style={{ position: "absolute", top: 2, left: states[i] ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: P.white, boxShadow: "0 2px 6px rgba(0,0,0,.2)", transition: "left .25s cubic-bezier(.4,0,.2,1)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}