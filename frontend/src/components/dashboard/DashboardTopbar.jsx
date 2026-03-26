import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { P } from "./DashboardConstants";
import { Icon } from "./DashboardIcons";
import { ProductThumb } from "./DashboardUI";

export default function DashboardTopbar({ open, setOpen, setTab, notifs, setNotifs, products = [], viewProduct }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (search.trim().length > 1) {
      setSearched(true);
      setSearchResults(
        products.filter(
          (p) =>
            p.name?.toLowerCase().includes(search.toLowerCase()) ||
            p.brand?.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 6)
      );
    } else {
      setSearched(false);
      setSearchResults([]);
    }
  }, [search, products]);

  const handleSelect = (p) => {
    setSearch("");
    setFocused(false);
    if (viewProduct) viewProduct(p);
  };

  return (
    <header
      style={{
        background: P.white,
        borderBottom: `1px solid ${P.mist}`,
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        boxShadow: "0 2px 14px rgba(0,27,72,.06)",
        fontFamily: P.font,
        zIndex: 20,
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          className="icon-btn"
          onClick={() => setOpen(!open)}
          style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${P.mist}`, display: "flex", alignItems: "center", justifyContent: "center", color: P.royal, background: P.mistBg }}
        >
          {open ? Icon.close : Icon.menu}
        </button>
        <div style={{ width: 1, height: 28, background: P.mist }} />
        <div>
          <div style={{ fontSize: 11, color: P.muted, fontWeight: 500 }}>Dashboard</div>
          <div style={{ fontSize: 14, color: P.navy, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.01em" }}>
            Welcome back, {user?.name?.split(" ")[0] || "User"}
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: focused ? P.ocean : P.muted, display: "flex", pointerEvents: "none", transition: "color .2s" }}>
            {Icon.search}
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Search phones, brands..."
            style={{
              paddingLeft: 34, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
              border: `1.5px solid ${focused ? P.sky : P.mist}`,
              borderRadius: 10, fontSize: 13, color: P.navy,
              background: focused ? P.white : P.mistBg,
              width: focused ? 260 : 210,
              boxShadow: focused ? "0 0 0 3px rgba(151,202,219,.2)" : "none",
              transition: "all .25s cubic-bezier(.4,0,.2,1)",
              fontFamily: P.font,
            }}
          />
          {focused && searched && (
            <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 14, boxShadow: "0 8px 32px rgba(0,27,72,.12)", zIndex: 99, overflow: "hidden" }}>
              {searchResults.length > 0 ? searchResults.map((p) => (
                <div
                  key={p._id || p.id}
                  onMouseDown={() => handleSelect(p)}
                  style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", borderBottom: `1px solid ${P.mist}`, transition: "background .15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = P.mistBg)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = P.white)}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", border: `1px solid ${P.mist}` }}>
                    {p.images && p.images.length > 0
                      ? <img src={p.images[0].startsWith("http") ? p.images[0] : `http://localhost:5000${p.images[0]}`} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 3 }} />
                      : <ProductThumb cat={p.category} size={18} />
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: P.navy, fontWeight: 700, fontSize: 12, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                    <p style={{ color: P.muted, fontSize: 11, margin: 0 }}>{p.brand} · Rs. {p.price}</p>
                  </div>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/></svg>
                </div>
              )) : (
                <div style={{ padding: "20px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={P.mist} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <p style={{ color: P.muted, fontSize: 13, fontWeight: 600, margin: 0 }}>No products found for</p>
                  <p style={{ color: P.navy, fontSize: 13, fontWeight: 800, margin: 0 }}>"{search}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Messages */}
        <div style={{ position: "relative" }}>
          <button
            className="icon-btn"
            onClick={() => navigate("/messages")}
            style={{ position: "relative", width: 36, height: 36, borderRadius: 10, border: `1px solid ${P.mist}`, display: "flex", alignItems: "center", justifyContent: "center", color: P.royal, background: P.mistBg }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </button>
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            className="icon-btn"
            onClick={() => setShowNotif(!showNotif)}
            style={{ position: "relative", width: 36, height: 36, borderRadius: 10, border: `1px solid ${P.mist}`, display: "flex", alignItems: "center", justifyContent: "center", color: P.royal, background: P.mistBg }}
          >
            {Icon.bell}
            {notifs.length > 0 && (
              <span className="pulse" style={{ position: "absolute", top: 7, right: 7, width: 8, height: 8, background: P.ocean, borderRadius: "50%", border: `2px solid ${P.white}` }} />
            )}
          </button>
          {showNotif && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 300, background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 16, boxShadow: "0 12px 40px rgba(0,27,72,.14)", zIndex: 99, overflow: "hidden", animation: "scaleIn .2s cubic-bezier(.4,0,.2,1)" }}>
              <div style={{ padding: "14px 16px", borderBottom: `1px solid ${P.mist}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: P.navy, fontWeight: 800, fontSize: 14 }}>Notifications</span>
                <button onClick={() => setNotifs([])} style={{ fontSize: 11, fontWeight: 700, color: P.ocean, background: "none", border: "none", cursor: "pointer" }}>Clear all</button>
              </div>
              {notifs.length === 0 ? (
                <div style={{ padding: 24, textAlign: "center", color: P.muted, fontSize: 13 }}>No new notifications</div>
              ) : (
                notifs.map((n, i) => (
                  <div key={i} style={{ padding: "12px 16px", borderBottom: `1px solid ${P.mist}`, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: P.ocean, marginTop: 5, flexShrink: 0 }} />
                    <div>
                      <p style={{ color: P.navy, fontSize: 13, fontWeight: 600, margin: 0 }}>{n.title}</p>
                      <p style={{ color: P.muted, fontSize: 11, margin: "2px 0 0" }}>{n.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div style={{ width: 1, height: 28, background: P.mist }} />

        {/* Avatar → Profile */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 9, padding: "5px 10px 5px 6px", borderRadius: 12, border: `1px solid ${P.mist}`, background: P.mistBg, cursor: "pointer", transition: "all .18s" }}
          onClick={() => setTab("profile")}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = P.sky; e.currentTarget.style.background = P.white; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = P.mist; e.currentTarget.style.background = P.mistBg; }}
        >
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${P.royal},${P.ocean})`, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${P.white}`, boxShadow: "0 2px 8px rgba(1,138,190,.28)", overflow: "hidden" }}>
            {user?.profilePicture ? (
              <img src={user.profilePicture.startsWith("http") ? user.profilePicture : `http://localhost:5000${user.profilePicture}`} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ color: P.white, fontWeight: 900, fontSize: 12 }}>{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
            )}
          </div>
          <div>
            <p style={{ color: P.navy, fontWeight: 700, fontSize: 13, margin: 0, lineHeight: 1.2 }}>{user?.name?.split(" ")[0]}</p>
            <p style={{ color: P.muted, fontSize: 10, margin: 0 }}>Customer</p>
          </div>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </header>
  );
}