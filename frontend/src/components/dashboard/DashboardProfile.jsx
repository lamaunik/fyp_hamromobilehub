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

  const [form, setForm] = useState({
    name:           user?.name           || "",
    email:          user?.email          || "",
    phone:          user?.phone          || "",
    address:        user?.address        || "",
    profilePicture: user?.profilePicture || "",
    bio:            user?.bio            || "",
  });

  const [saved,   setSaved]  = useState(false);
  const [pwForm,  setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwSaved, setPwSaved]= useState(false);

  // Live stats from DB
  const [stats, setStats] = useState({
    ordersPlaced:  0,
    totalSpent:    0,
    wishlistCount: 0,
  });

  // Load full profile from DB on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) return;
        const res = await api.get("/users/profile");
        const d = res.data;
        setForm(prev => ({
          ...prev,
          name:           d.name           || "",
          email:          d.email          || "",
          phone:          d.phone          || "",
          address:        d.address        || "",
          profilePicture: d.profilePicture || "",
          bio:            d.bio            || "",
        }));
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, [user]);

  // Load real stats from DB
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/users/stats");
        if (res.success) setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    };
    fetchStats();
  }, []);

  // Sync wishlist to DB whenever it changes in localStorage
  useEffect(() => {
    const syncWishlist = async () => {
      try {
        const saved = localStorage.getItem("hmh_wishlist");
        const wishlist = saved ? JSON.parse(saved) : [];
        await api.put("/users/wishlist", { wishlist });
      } catch (err) {
        console.error("Failed to sync wishlist:", err);
      }
    };
    syncWishlist();
  }, []);

  const saveInfo = async () => {
    try {
      const res = await api.put("/users/profile", {
        name:           form.name,
        email:          form.email,
        phone:          form.phone,
        address:        form.address,
        profilePicture: form.profilePicture,
        bio:            form.bio,
      });
      updateUser(res.data);
      setSaved(true);
      addNotif({ title: "Profile updated successfully", time: "Just now" });
      setTimeout(() => { setSaved(false); setEditing(false); }, 1500);
    } catch (err) {
      addNotif({ title: "Failed to update profile", time: "Just now" });
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

  const statCards = [
    { l: "Orders Placed",     v: stats.ordersPlaced },
    { l: "Wishlist Items",    v: stats.wishlistCount },
    { l: "Products Reviewed", v: 0 },
    { l: "Total Spent",       v: `Rs. ${stats.totalSpent.toLocaleString()}` },
  ];

  return (
    <div className="page" style={{ padding: "28px 32px", fontFamily: P.font }}>

      {/* Hero header card */}
      <div style={{ background: `linear-gradient(135deg,${P.navy},${P.royal})`, borderRadius: 22, padding: "28px 32px", display: "flex", alignItems: "center", gap: 24, marginBottom: 28, position: "relative", overflow: "hidden" }}>
        <div className="float" style={{ position: "absolute", top: -30, right: -10, width: 160, height: 160, borderRadius: "50%", background: "rgba(1,138,190,.15)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg,${P.ocean},${P.sky})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(1,138,190,.4)", border: "3px solid rgba(255,255,255,.3)", overflow: "hidden" }}>
            {form.profilePicture ? (
              <img src={form.profilePicture} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ color: P.white, fontWeight: 900, fontSize: 28 }}>{form.name?.charAt(0)?.toUpperCase() || "U"}</span>
            )}
          </div>
          <button style={{ position: "absolute", bottom: -2, right: -2, width: 24, height: 24, borderRadius: "50%", background: P.ocean, border: `2px solid ${P.white}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: P.white }}>
            {Icon.camera}
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <h2 style={{ color: P.white, fontWeight: 900, fontSize: 22, margin: "0 0 4px" }}>{form.name}</h2>
          <p style={{ color: "rgba(151,202,219,.8)", fontSize: 14, margin: "0 0 12px" }}>{form.email}</p>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ background: "rgba(1,138,190,.25)", border: "1px solid rgba(1,138,190,.4)", color: P.sky, fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 999 }}>Customer</span>
            <span style={{ background: "rgba(34,197,94,.2)", border: "1px solid rgba(34,197,94,.3)", color: "#86efac", fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 999 }}>Verified</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, position: "relative" }}>
          {statCards.map((s, i) => (
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

      {/* Personal Info */}
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
                placeholder="Tell buyers a bit about yourself..."
                style={{ width: "100%", border: `1.5px solid ${P.mist}`, borderRadius: 11, padding: "11px 14px", fontSize: 14, color: P.navy, fontFamily: P.font, background: editing ? P.white : P.mistBg, outline: "none", resize: "none", transition: "all .2s", boxSizing: "border-box", opacity: editing ? 1 : .85 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Addresses */}
      {tab === "address" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[{ title: "Home Address", addr: form.address || "Not set", default: true }].map((a, i) => (
            <div key={i} style={{ background: P.white, border: `1.5px solid ${a.default ? P.ocean : P.mist}`, borderRadius: 18, padding: 22, position: "relative", boxShadow: a.default ? "0 4px 16px rgba(1,138,190,.1)" : "none" }}>
              {a.default && <span style={{ position: "absolute", top: 14, right: 14, fontSize: 10, fontWeight: 800, padding: "2px 9px", borderRadius: 999, background: "rgba(1,138,190,.1)", border: "1px solid rgba(1,138,190,.25)", color: P.ocean }}>Default</span>}
              <div style={{ width: 40, height: 40, borderRadius: 11, background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: P.ocean, border: `1px solid ${P.mist}` }}>{Icon.map}</div>
              <h4 style={{ color: P.navy, fontWeight: 800, fontSize: 15, margin: "0 0 6px" }}>{a.title}</h4>
              <p style={{ color: P.muted, fontSize: 13, margin: "0 0 16px", lineHeight: 1.5 }}>{a.addr}</p>
              <Btn cls="btn" onClick={() => setPTab("info")} style={{ padding: "7px 14px", background: P.mistBg, border: `1px solid ${P.mist}`, borderRadius: 9, color: P.navy, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>{Icon.edit} Edit in Profile</Btn>
            </div>
          ))}
        </div>
      )}

      {/* Security */}
      {tab === "security" && (
        <div style={{ background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 20, padding: 28, maxWidth: 520 }}>
          <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 16, margin: "0 0 22px" }}>Change Password</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[{ l: "Current Password", k: "current" }, { l: "New Password", k: "next" }, { l: "Confirm New Password", k: "confirm" }].map((f) => (
              <div key={f.k}>
                <p style={{ fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 8px" }}>{f.l}</p>
                <input type="password" value={pwForm[f.k]} onChange={(e) => setPwForm((v) => ({ ...v, [f.k]: e.target.value }))} placeholder="........"
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

      {/* Preferences */}
      {tab === "preferences" && (
        <div style={{ background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 20, padding: 28 }}>
          <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 16, margin: "0 0 22px" }}>Notification Preferences</h3>
          <PreferenceToggles />
        </div>
      )}
    </div>
  );
}

function PreferenceToggles() {
  const items = [
    { l: "Order Updates",      sub: "Get notified about order status changes",       on: true  },
    { l: "Promotions & Deals", sub: "Receive special offers and discount codes",      on: true  },
    { l: "New Arrivals",       sub: "Be first to know about new products",            on: false },
    { l: "Price Drops",        sub: "Alerts when wishlisted items go on sale",        on: true  },
    { l: "Newsletter",         sub: "Weekly tech news and product reviews",           on: false },
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