import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const P = {
  navy:   "#001B48", royal:  "#02457A", ocean:  "#018ABE",
  sky:    "#97CADB", mist:   "#D6E8EE", white:  "#ffffff",
  muted:  "#6b99b5", mistBg: "#f0f6f9", border: "#D6E8EE",
  green:  "#22c55e", red:    "#ef4444",
  font:   "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif",
};

function Toggle({ label, description, checked, onChange }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"16px 0", borderBottom:`1px solid ${P.mist}` }}>
      <div>
        <span style={{ display:"block", color:P.navy, fontSize:14, fontWeight:700, marginBottom:4 }}>{label}</span>
        <span style={{ display:"block", color:P.muted, fontSize:13 }}>{description}</span>
      </div>
      <div onClick={onChange} style={{ width:44, height:24, borderRadius:999, background: checked ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.mist, cursor:"pointer", transition:"background .3s", position:"relative", flexShrink:0, marginTop:4 }}>
        <div style={{ position:"absolute", top:2, left: checked ? 22 : 2, width:20, height:20, borderRadius:"50%", background:P.white, boxShadow:"0 2px 6px rgba(0,0,0,.2)", transition:"left .25s cubic-bezier(.4,0,.2,1)" }} />
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
    bio:            "Passionate vendor on HamroMobileHub.",
    storeName:      "My Store",
  });

  const [pwForm, setPwForm] = useState({ current:"", next:"", confirm:"" });

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
          }));
        }
      } catch (err) { console.error("Profile fetch failed", err); }
    };
    if (user) fetchProfile();
  }, [user]);

  // Live stats
  const [stats, setStats] = useState({ listings: 0, orders: 0, revenue: 0, rating: "—" });
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
        setStats({ listings, orders, revenue, rating: "—" });
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
      setPwForm({ current:"", next:"", confirm:"" });
      setPwSaved(true);
      setTimeout(() => setPwSaved(false), 2000);
    } catch (err) { console.error(err); }
  };

  const inputStyle = (editable) => ({
    width:"100%", border:`1.5px solid ${P.mist}`, borderRadius:11,
    padding:"11px 14px", fontSize:14, color:P.navy, fontFamily:P.font,
    background: editable ? P.white : P.mistBg, outline:"none",
    transition:"all .2s", boxSizing:"border-box", opacity: editable ? 1 : 0.85,
  });

  const TABS = [
    { id:"info",        l:"Personal Info"    },
    { id:"store",       l:"Store Settings"   },
    { id:"security",    l:"Security"         },
    { id:"preferences", l:"Preferences"      },
  ];

  const statCards = [
    { l:"Total Listings", v: stats.listings },
    { l:"Total Orders",   v: stats.orders   },
    { l:"Wishlist Items", v: "—"            },
    { l:"Total Revenue",  v: `Rs. ${stats.revenue.toLocaleString()}` },
  ];

  return (
    <div style={{ padding:"28px 32px", fontFamily:P.font }}>

      {/* ── Hero Banner ── */}
      <div style={{ background:`linear-gradient(135deg,${P.navy},${P.royal})`, borderRadius:22, padding:"28px 32px", display:"flex", alignItems:"center", gap:24, marginBottom:28, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-10, width:160, height:160, borderRadius:"50%", background:"rgba(1,138,190,.15)", filter:"blur(40px)", pointerEvents:"none" }} />

        {/* Avatar */}
        <div style={{ position:"relative", flexShrink:0 }}>
          <div style={{ width:72, height:72, borderRadius:"50%", background:`linear-gradient(135deg,${P.ocean},${P.sky})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 20px rgba(1,138,190,.4)", border:"3px solid rgba(255,255,255,.3)", overflow:"hidden" }}>
            {form.profilePicture ? (
              <img src={form.profilePicture} alt="Avatar" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            ) : (
              <span style={{ color:P.white, fontWeight:900, fontSize:28 }}>{form.name?.charAt(0)?.toUpperCase() || "V"}</span>
            )}
          </div>
          <div style={{ position:"absolute", bottom:-2, right:-2, width:24, height:24, borderRadius:"50%", background:P.ocean, border:`2px solid ${P.white}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
        </div>

        {/* Info */}
        <div style={{ position:"relative" }}>
          <h2 style={{ color:P.white, fontWeight:900, fontSize:22, margin:"0 0 4px" }}>{form.name || "Vendor"}</h2>
          <p style={{ color:"rgba(151,202,219,.8)", fontSize:14, margin:"0 0 12px" }}>{form.email}</p>
          <div style={{ display:"flex", gap:8 }}>
            <span style={{ background:"rgba(1,138,190,.25)", border:"1px solid rgba(1,138,190,.4)", color:P.sky, fontSize:11, fontWeight:700, padding:"3px 12px", borderRadius:999 }}>Vendor</span>
            <span style={{ background:"rgba(34,197,94,.2)", border:"1px solid rgba(34,197,94,.3)", color:"#86efac", fontSize:11, fontWeight:700, padding:"3px 12px", borderRadius:999 }}>Verified ✓</span>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ marginLeft:"auto", display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14, position:"relative" }}>
          {statCards.map((s, i) => (
            <div key={i} style={{ background:"rgba(255,255,255,.1)", borderRadius:12, padding:"10px 16px", textAlign:"center", border:"1px solid rgba(255,255,255,.1)" }}>
              <p style={{ color:P.white, fontWeight:900, fontSize:18, margin:0 }}>{s.v}</p>
              <p style={{ color:"rgba(151,202,219,.7)", fontSize:11, margin:"2px 0 0" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab pills ── */}
      <div style={{ display:"flex", gap:4, marginBottom:24, background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:14, padding:5, width:"fit-content" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setEditing(false); }} style={{ padding:"9px 20px", borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer", border:"none", fontFamily:P.font, background: tab===t.id ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.white, color: tab===t.id ? P.white : P.muted, boxShadow: tab===t.id ? "0 4px 14px rgba(1,138,190,.25)" : "none", transition:"all .18s" }}>{t.l}</button>
        ))}
      </div>

      {/* ── Personal Info ── */}
      {tab === "info" && (
        <div style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:20, padding:28 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
            <h3 style={{ color:P.navy, fontWeight:800, fontSize:16, margin:0 }}>Personal Information</h3>
            {!editing
              ? <button onClick={() => setEditing(true)} style={{ padding:"8px 18px", background:P.mistBg, border:`1px solid ${P.mist}`, borderRadius:10, color:P.navy, fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:P.font }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  Edit
                </button>
              : <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => setEditing(false)} style={{ padding:"8px 16px", background:P.mistBg, border:`1px solid ${P.mist}`, borderRadius:10, color:P.muted, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:P.font }}>Cancel</button>
                  <button onClick={saveInfo} style={{ padding:"8px 18px", background: saved ? "linear-gradient(135deg,#16a34a,#22c55e)" : `linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontSize:13, fontWeight:700, borderRadius:10, border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:6, transition:"background .35s", fontFamily:P.font }}>
                    {saved ? "✓ Saved!" : "Save Changes"}
                  </button>
                </div>
            }
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
            {[
              { l:"Full Name",      k:"name",    type:"text"  },
              { l:"Email Address",  k:"email",   type:"email" },
              { l:"Phone Number",   k:"phone",   type:"tel"   },
              { l:"Location",       k:"address", type:"text"  },
            ].map(f => (
              <div key={f.k}>
                <p style={{ fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", margin:"0 0 8px" }}>{f.l}</p>
                <input type={f.type} value={form[f.k]} onChange={e => setForm(v => ({ ...v, [f.k]: e.target.value }))} disabled={!editing}
                  style={inputStyle(editing)}
                  onFocus={e => { if(editing){ e.target.style.borderColor=P.sky; e.target.style.boxShadow="0 0 0 3px rgba(151,202,219,.2)"; }}}
                  onBlur={e  => { e.target.style.borderColor=P.mist; e.target.style.boxShadow="none"; }}
                />
              </div>
            ))}
            <div style={{ gridColumn:"1/-1" }}>
              <p style={{ fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", margin:"0 0 8px" }}>Profile Image URL</p>
              <input type="text" value={form.profilePicture} onChange={e => setForm(v => ({ ...v, profilePicture: e.target.value }))} disabled={!editing}
                placeholder="https://example.com/avatar.jpg"
                style={{ ...inputStyle(editing), marginBottom:18 }}
              />
              <p style={{ fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", margin:"0 0 8px" }}>Bio</p>
              <textarea value={form.bio} onChange={e => setForm(v => ({ ...v, bio: e.target.value }))} disabled={!editing} rows={3}
                style={{ ...inputStyle(editing), resize:"none" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Store Settings ── */}
      {tab === "store" && (
        <div style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:20, padding:28 }}>
          <h3 style={{ color:P.navy, fontWeight:800, fontSize:16, margin:"0 0 22px" }}>Store Settings</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
            {[
              { l:"Store Name",    k:"storeName", type:"text",  ph:"My Awesome Store"       },
              { l:"Phone Number",  k:"phone",     type:"tel",   ph:"+977-98XXXXXXXX"         },
            ].map(f => (
              <div key={f.k}>
                <p style={{ fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", margin:"0 0 8px" }}>{f.l}</p>
                <input type={f.type} value={form[f.k] || ""} onChange={e => setForm(v => ({ ...v, [f.k]: e.target.value }))}
                  placeholder={f.ph} style={inputStyle(true)}
                  onFocus={e => { e.target.style.borderColor=P.sky; e.target.style.boxShadow="0 0 0 3px rgba(151,202,219,.2)"; }}
                  onBlur={e  => { e.target.style.borderColor=P.mist; e.target.style.boxShadow="none"; }}
                />
              </div>
            ))}
            <div style={{ gridColumn:"1/-1" }}>
              <p style={{ fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", margin:"0 0 8px" }}>Currency</p>
              <select value="NPR" style={{ ...inputStyle(true), appearance:"none" }}>
                <option value="NPR">NPR (Rs.)</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop:24, display:"flex", justifyContent:"flex-end" }}>
            <button onClick={saveInfo} style={{ padding:"11px 28px", background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontSize:14, fontWeight:700, borderRadius:12, border:"none", cursor:"pointer", fontFamily:P.font, boxShadow:"0 4px 16px rgba(1,138,190,.3)" }}>
              Save Store Settings
            </button>
          </div>
        </div>
      )}

      {/* ── Security ── */}
      {tab === "security" && (
        <div style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:20, padding:28, maxWidth:520 }}>
          <h3 style={{ color:P.navy, fontWeight:800, fontSize:16, margin:"0 0 22px" }}>Change Password</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {[{ l:"Current Password", k:"current" }, { l:"New Password", k:"next" }, { l:"Confirm New Password", k:"confirm" }].map(f => (
              <div key={f.k}>
                <p style={{ fontSize:11, fontWeight:800, color:P.muted, letterSpacing:".1em", textTransform:"uppercase", margin:"0 0 8px" }}>{f.l}</p>
                <input type="password" value={pwForm[f.k]} onChange={e => setPwForm(v => ({ ...v, [f.k]: e.target.value }))} placeholder="••••••••"
                  style={inputStyle(true)}
                  onFocus={e => { e.target.style.borderColor=P.sky; e.target.style.background=P.white; e.target.style.boxShadow="0 0 0 3px rgba(151,202,219,.2)"; }}
                  onBlur={e  => { e.target.style.borderColor=P.mist; e.target.style.background=P.mistBg; e.target.style.boxShadow="none"; }}
                />
              </div>
            ))}
            {pwForm.next && pwForm.confirm && pwForm.next !== pwForm.confirm && (
              <p style={{ color:P.red, fontSize:12, margin:0 }}>Passwords do not match</p>
            )}
            <button onClick={savePw} style={{ padding:"12px 0", background: pwSaved ? "linear-gradient(135deg,#16a34a,#22c55e)" : `linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontSize:14, fontWeight:700, borderRadius:12, border:"none", cursor:"pointer", transition:"background .35s", fontFamily:P.font }}>
              {pwSaved ? "✓ Password Changed!" : "Update Password"}
            </button>
          </div>
        </div>
      )}

      {/* ── Preferences ── */}
      {tab === "preferences" && (
        <div style={{ background:P.white, border:`1.5px solid ${P.mist}`, borderRadius:20, padding:28 }}>
          <h3 style={{ color:P.navy, fontWeight:800, fontSize:16, margin:"0 0 22px" }}>Notification Preferences</h3>
          {[
            { k:"emailNotifications", l:"Email Notifications",   sub:"Receive daily order summaries and updates via email."        },
            { k:"smsNotifications",   l:"SMS Alerts",            sub:"Get text messages for new orders and urgent issues."         },
            { k:"newOrders",          l:"New Order Alerts",      sub:"Be notified instantly whenever a new order is placed."       },
            { k:"promotions",         l:"Promotions & Deals",    sub:"Receive special platform offers and discount codes."         },
            { k:"twoFactorAuth",      l:"Two-Factor Authentication", sub:"Require a confirmation code to log in to your dashboard." },
          ].map(item => (
            <Toggle
              key={item.k}
              label={item.l}
              description={item.sub}
              checked={notifs[item.k]}
              onChange={() => setNotifs(n => ({ ...n, [item.k]: !n[item.k] }))}
            />
          ))}
        </div>
      )}

    </div>
  );
}