import { useState } from "react";

const P = {
  navy:   "#001B48",
  royal:  "#02457A",
  ocean:  "#018ABE",
  sky:    "#97CADB",
  mist:   "#D6E8EE",
  white:  "#ffffff",
  muted:  "#6b99b5",
  font:   "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif",
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${P.mist}`,
      boxShadow: "0 2px 16px rgba(0,27,72,0.07)",
      fontFamily: P.font,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 12px rgba(1,138,190,0.3)`,
          }}>
            <span style={{ color: P.white, fontWeight: 900, fontSize: 16 }}>M</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 900, color: P.navy, letterSpacing: "-0.02em" }}>
            Hamromobile<span style={{ color: P.ocean }}>Hub</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
          {["Home","Products","Vendors","About","Contact"].map(item => (
            <a key={item} href="#" style={{
              fontSize: 14, fontWeight: 600, color: P.royal,
              textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = P.ocean}
              onMouseLeave={e => e.target.style.color = P.royal}
            >{item}</a>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hidden-mobile">
          <a href="#" style={{
            fontSize: 14, fontWeight: 600, color: P.navy,
            textDecoration: "none", padding: "8px 16px",
          }}
            onMouseEnter={e => e.target.style.color = P.ocean}
            onMouseLeave={e => e.target.style.color = P.navy}
          >Sign In</a>
          <a href="#" style={{
            fontSize: 14, fontWeight: 700, color: P.white,
            background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
            textDecoration: "none", padding: "9px 22px", borderRadius: 999,
            boxShadow: "0 4px 14px rgba(1,138,190,0.3)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 20px rgba(1,138,190,0.4)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 14px rgba(1,138,190,0.3)"; }}
          >Get Started</a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", cursor: "pointer", color: P.navy, padding: 4,
        }} className="show-mobile">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: P.white, borderTop: `1px solid ${P.mist}`,
          padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14,
        }}>
          {["Home","Products","Vendors","About","Contact"].map(item => (
            <a key={item} href="#" style={{ fontSize: 14, fontWeight: 600, color: P.navy, textDecoration: "none" }}>{item}</a>
          ))}
          <a href="#" style={{
            fontSize: 14, fontWeight: 700, color: P.white, textDecoration: "none",
            background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
            padding: "10px 22px", borderRadius: 999, textAlign: "center", marginTop: 4,
          }}>Get Started</a>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      background: `linear-gradient(135deg, ${P.navy} 0%, ${P.royal} 55%, #013d6e 100%)`,
      overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 80,
      fontFamily: P.font,
    }}>
      {/* blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 80, left: 40, width: 288, height: 288, borderRadius: "50%", background: "rgba(1,138,190,0.18)", filter: "blur(64px)" }} />
        <div style={{ position: "absolute", bottom: 80, right: 40, width: 384, height: 384, borderRadius: "50%", background: "rgba(151,202,219,0.1)", filter: "blur(64px)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(rgba(151,202,219,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(151,202,219,0.4) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", width: "100%" }}>
        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(1,138,190,0.18)", border: "1px solid rgba(1,138,190,0.35)",
            borderRadius: 999, padding: "6px 16px", marginBottom: 24,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: P.sky, display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ color: P.sky, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>#1 Mobile Reseller Platform</span>
          </div>
          <h1 style={{ fontSize: 56, fontWeight: 900, color: P.white, lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
            Buy &amp; Sell{" "}
            <span style={{
              background: `linear-gradient(to right, ${P.sky}, ${P.mist})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Mobiles</span>
            <br />With Confidence
          </h1>
          <p style={{ color: "rgba(151,202,219,0.75)", fontSize: 17, lineHeight: 1.7, margin: "0 0 40px", maxWidth: 440 }}>
            The ultimate marketplace for buying, selling, and trading smartphones. Connect with verified vendors and get the best deals — fast and secure.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `linear-gradient(135deg, ${P.ocean}, #0aa8e0)`,
              color: P.white, fontWeight: 700, fontSize: 15, padding: "14px 32px",
              borderRadius: 999, textDecoration: "none",
              boxShadow: "0 8px 28px rgba(1,138,190,0.4)", transition: "transform 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Browse Products
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.2)",
              color: P.white, fontWeight: 700, fontSize: 15, padding: "14px 32px",
              borderRadius: 999, textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.16)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >Become a Vendor</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 48 }}>
            {[
              { label: "Verified Sellers", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> },
              { label: "Secure Payments", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> },
              { label: "Easy Returns", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> },
            ].map(b => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {b.icon}
                <span style={{ color: "rgba(151,202,219,0.7)", fontSize: 12, fontWeight: 600 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — phone mockup */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "rgba(1,138,190,0.18)", filter: "blur(48px)" }} />
          <div style={{
            position: "relative", zIndex: 10, width: 220,
            background: "linear-gradient(180deg, #1a2332, #0f1520)",
            borderRadius: 40, border: "4px solid #2a3444",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5)", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 80, height: 20, background: "#000", borderRadius: 999, zIndex: 10 }} />
            <div style={{
              background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
              height: 280, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 32,
            }}>
              <div style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", borderRadius: 16, padding: 16, marginBottom: 12 }}>
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              </div>
              <span style={{ color: P.white, fontWeight: 900, fontSize: 20 }}>MobiHub</span>
              <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 4 }}>Your Marketplace</span>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {["iPhone 15 Pro", "Samsung S24", "Pixel 8 Pro"].map(phone => (
                <div key={phone} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#1a2332", borderRadius: 12, padding: "8px 12px" }}>
                  <span style={{ color: P.white, fontSize: 12, fontWeight: 600 }}>{phone}</span>
                  <span style={{ color: P.sky, fontSize: 12, fontWeight: 700 }}>View</span>
                </div>
              ))}
            </div>
          </div>
          {/* Sale badge */}
          <div style={{
            position: "absolute", top: 40, left: -24, zIndex: 20,
            background: P.white, borderRadius: 16, padding: "12px 14px",
            boxShadow: "0 8px 32px rgba(0,27,72,0.18)", width: 144,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(34,197,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span style={{ color: P.navy, fontSize: 12, fontWeight: 700 }}>Sale Complete</span>
            </div>
            <p style={{ color: P.muted, fontSize: 11, margin: 0 }}>iPhone 14 Pro</p>
            <p style={{ color: "#16a34a", fontWeight: 900, fontSize: 14, margin: "2px 0 0" }}>+$849</p>
          </div>
          {/* New listing badge */}
          <div style={{
            position: "absolute", bottom: 40, right: -24, zIndex: 20,
            background: P.white, borderRadius: 16, padding: "12px 14px",
            boxShadow: "0 8px 32px rgba(0,27,72,0.18)", width: 160,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(1,138,190,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={P.ocean} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              </div>
              <span style={{ color: P.navy, fontSize: 12, fontWeight: 700 }}>New Listing</span>
            </div>
            <p style={{ color: P.muted, fontSize: 11, margin: 0 }}>Samsung S24 Ultra</p>
            <p style={{ color: P.ocean, fontWeight: 900, fontSize: 14, margin: "2px 0 0" }}>$1,199</p>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20Q1080 60 720 20Q360 -20 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────
const featuresData = [
  {
    title: "Buy With Ease", desc: "Browse thousands of verified mobile listings. Compare specs, prices, and seller ratings all in one place.",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  },
  {
    title: "Sell Fast", desc: "List your device in minutes. Reach thousands of buyers instantly with smart pricing suggestions.",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"/></svg>,
  },
  {
    title: "Vendor Dashboard", desc: "Manage your inventory, track sales, and analyze performance with a powerful vendor control panel.",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  },
  {
    title: "Secure Transactions", desc: "Every transaction is protected with escrow payment and buyer/seller protection guarantees.",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  },
  {
    title: "Admin Control", desc: "Comprehensive admin panel to monitor all activities, users, vendors and transactions in real time.",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    title: "Instant Notifications", desc: "Real-time alerts for new listings, offers, messages, and sale confirmations across all devices.",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>,
  },
];

function Features() {
  return (
    <section style={{ background: P.white, padding: "96px 24px", fontFamily: P.font }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            display: "inline-block", background: "rgba(1,138,190,0.08)",
            color: P.ocean, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "6px 16px", borderRadius: 999, marginBottom: 16,
            border: `1px solid ${P.sky}`,
          }}>Integrated Solutions</span>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: P.navy, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Everything You Need to{" "}
            <span style={{ background: `linear-gradient(to right, ${P.royal}, ${P.ocean})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Trade Mobiles
            </span>
          </h2>
          <p style={{ color: P.muted, fontSize: 17, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Our platform connects buyers, sellers, and vendors with powerful tools designed for the mobile reselling ecosystem.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {featuresData.map((f, i) => (
            <div key={i} style={{
              background: P.white, border: `1px solid ${P.mist}`,
              borderRadius: 20, padding: 28, cursor: "pointer",
              transition: "all 0.2s", boxShadow: "0 2px 12px rgba(0,27,72,0.05)",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(1,138,190,0.14)"; e.currentTarget.style.borderColor = P.sky; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,27,72,0.05)"; e.currentTarget.style.borderColor = P.mist; }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20, boxShadow: "0 6px 18px rgba(1,138,190,0.28)",
              }}>{f.icon}</div>
              <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 17, margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ color: P.muted, fontSize: 14, lineHeight: 1.7, margin: "0 0 20px" }}>{f.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 700, color: P.sky }}>
                Learn more
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </div>
              <div style={{ position: "absolute", bottom: -16, right: -16, width: 80, height: 80, borderRadius: "50%", background: "rgba(1,138,190,0.06)" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
const statsData = [
  { value: "450+", label: "Products Listed", icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
  { value: "150+", label: "Active Vendors",  icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
  { value: "120+", label: "Cities Covered",  icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  { value: "20+",  label: "Brand Partners",  icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
];

function Stats() {
  return (
    <section style={{ background: P.white, padding: "0 24px 40px", fontFamily: P.font }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          background: `linear-gradient(135deg, ${P.navy} 0%, ${P.royal} 50%, ${P.ocean} 100%)`,
          borderRadius: 24, padding: "56px 48px", position: "relative", overflow: "hidden",
          boxShadow: "0 16px 56px rgba(0,27,72,0.25)",
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, position: "relative", textAlign: "center" }}>
            {statsData.map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 44, fontWeight: 900, color: P.white, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
                <div style={{ color: "rgba(214,232,238,0.75)", fontSize: 14, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <p style={{ position: "relative", textAlign: "center", color: "rgba(214,232,238,0.65)", fontSize: 13, marginTop: 40 }}>
            Impressed? Choose MobiHub to handle your complete mobile buying and selling needs.{" "}
            <a href="#" style={{ color: P.white, fontWeight: 700 }}>Get Started</a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const stepsData = [
  { step: "01", title: "Create Your Account", desc: "Sign up as a buyer, seller, or vendor in under 2 minutes. Verify your identity for a trusted profile.", icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> },
  { step: "02", title: "List or Browse", desc: "Sellers list their devices with photos and details. Buyers browse curated listings with filters.", icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg> },
  { step: "03", title: "Make a Deal", desc: "Negotiate, offer, or buy instantly. Our escrow system keeps both parties safe throughout.", icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg> },
  { step: "04", title: "Receive & Review", desc: "Get your device delivered safely. Leave a review to build the community's trust ecosystem.", icon: <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg> },
];

function HowItWorks() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${P.navy} 0%, ${P.royal} 100%)`,
      padding: "96px 24px", position: "relative", overflow: "hidden", fontFamily: P.font,
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${P.royal}, ${P.ocean})` }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            display: "inline-block", background: "rgba(1,138,190,0.18)",
            color: P.sky, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "6px 16px", borderRadius: 999,
            border: "1px solid rgba(1,138,190,0.35)", marginBottom: 16,
          }}>How It Works</span>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: P.white, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Simple as{" "}
            <span style={{ background: `linear-gradient(to right, ${P.sky}, ${P.mist})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              1, 2, 3, 4
            </span>
          </h2>
          <p style={{ color: "rgba(151,202,219,0.65)", fontSize: 17, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Trading phones has never been easier. Our streamlined process gets you buying or selling in minutes.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {stepsData.map((s, i) => (
            <div key={i} style={{
              position: "relative", background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(151,202,219,0.15)", borderRadius: 20, padding: 28,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(1,138,190,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{
                position: "absolute", top: -12, right: -12, width: 32, height: 32,
                borderRadius: "50%", background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(1,138,190,0.35)",
              }}>
                <span style={{ color: P.white, fontSize: 11, fontWeight: 900 }}>{s.step}</span>
              </div>
              <div style={{
                width: 60, height: 60, borderRadius: 18,
                background: "rgba(1,138,190,0.15)", border: "1px solid rgba(1,138,190,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
              }}>{s.icon}</div>
              <h3 style={{ color: P.white, fontWeight: 800, fontSize: 16, margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ color: "rgba(151,202,219,0.65)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TEAM ─────────────────────────────────────────────────────────────────────
const teamData = [
  { name: "Richard Smith",    role: "Founder & CEO",      bio: "Serial entrepreneur with 10+ years in mobile tech and e-commerce platforms.",         initials: "RS" },
  { name: "Samara Kane",      role: "CTO",                bio: "Full-stack engineer passionate about building scalable marketplace infrastructure.",    initials: "SK" },
  { name: "Elizabeth Monroe", role: "Head of Vendors",    bio: "Specialist in vendor relations and marketplace growth strategies.",                    initials: "EM" },
  { name: "James Tate",       role: "Lead Designer",      bio: "UI/UX designer crafting seamless buying and selling experiences.",                    initials: "JT" },
];

function Team() {
  return (
    <section style={{ background: "#f4f8fb", padding: "96px 24px", fontFamily: P.font }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            display: "inline-block", background: "rgba(1,138,190,0.08)",
            color: P.ocean, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "6px 16px", borderRadius: 999,
            border: `1px solid ${P.sky}`, marginBottom: 16,
          }}>Meet Our Team</span>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: P.navy, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            The People Behind{" "}
            <span style={{ background: `linear-gradient(to right, ${P.royal}, ${P.ocean})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>MobiHub</span>
          </h2>
          <p style={{ color: P.muted, fontSize: 17, maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>Passionate experts building the future of mobile commerce.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {teamData.map((member, i) => (
            <div key={i} style={{
              background: P.white, borderRadius: 20, overflow: "hidden",
              border: `1px solid ${P.mist}`, transition: "all 0.2s",
              boxShadow: "0 2px 12px rgba(0,27,72,0.06)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(1,138,190,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,27,72,0.06)"; }}
            >
              <div style={{
                height: 160, background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
                display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "radial-gradient(circle at 70% 20%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)",
                  border: "2px solid rgba(255,255,255,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ color: P.white, fontWeight: 900, fontSize: 26 }}>{member.initials}</span>
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 16, margin: "0 0 2px" }}>{member.name}</h3>
                <p style={{ color: P.ocean, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", margin: "0 0 12px" }}>{member.role}</p>
                <p style={{ color: P.muted, fontSize: 13, lineHeight: 1.7, margin: "0 0 16px" }}>{member.bio}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["in","tw","gh"].map(s => (
                    <a key={s} href="#" style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "#f0f6f9", display: "flex", alignItems: "center", justifyContent: "center",
                      color: P.muted, fontSize: 11, fontWeight: 700, textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = P.ocean; e.currentTarget.style.color = P.white; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#f0f6f9"; e.currentTarget.style.color = P.muted; }}
                    >{s}</a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section style={{
      background: P.navy, padding: "96px 24px",
      position: "relative", overflow: "hidden", fontFamily: P.font,
    }}>
      <div style={{ position: "absolute", top: 0, left: "25%", width: 384, height: 384, borderRadius: "50%", background: "rgba(1,138,190,0.12)", filter: "blur(80px)" }} />
      <div style={{ position: "absolute", bottom: 0, right: "25%", width: 384, height: 384, borderRadius: "50%", background: "rgba(151,202,219,0.08)", filter: "blur(80px)" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative" }}>
        <div>
          <span style={{
            display: "inline-block", background: "rgba(1,138,190,0.18)",
            color: P.sky, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "6px 16px", borderRadius: 999,
            border: "1px solid rgba(1,138,190,0.35)", marginBottom: 24,
          }}>Start Today</span>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: P.white, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
            Reach Your{" "}
            <span style={{ background: `linear-gradient(to right, ${P.sky}, ${P.mist})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Destination</span>
            {" "}100% Sure And Safe
          </h2>
          <p style={{ color: "rgba(151,202,219,0.65)", fontSize: 16, lineHeight: 1.7, margin: "0 0 36px", maxWidth: 440 }}>
            Whether you're a buyer looking for the best deal or a vendor growing your business, MobiHub is the platform that gets you there — safely and reliably.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `linear-gradient(135deg, ${P.ocean}, #0aa8e0)`,
              color: P.white, fontWeight: 700, fontSize: 15, padding: "14px 32px",
              borderRadius: 999, textDecoration: "none", boxShadow: "0 8px 28px rgba(1,138,190,0.4)",
              transition: "transform 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Start for Free
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center",
              border: "2px solid rgba(255,255,255,0.2)", color: P.white,
              fontWeight: 700, fontSize: 15, padding: "14px 32px",
              borderRadius: 999, textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >Learn More</a>
          </div>
        </div>
        {/* Right graphic */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{
            width: 360, height: 300, borderRadius: 24,
            background: "rgba(1,138,190,0.08)", border: "1px solid rgba(1,138,190,0.2)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(1,138,190,0.4)",
            }}>
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <p style={{ color: P.white, fontWeight: 800, fontSize: 18, margin: 0, textAlign: "center" }}>Trusted by thousands</p>
            <p style={{ color: "rgba(151,202,219,0.6)", fontSize: 13, margin: 0, textAlign: "center", maxWidth: 240, lineHeight: 1.6 }}>Join a growing community of buyers and vendors across Nepal.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const links = {
    Company:     ["About Us","Careers","Press","Blog"],
    Support:     ["Help Center","How It Works","Privacy Policy","Terms of Service"],
    Marketplace: ["Browse Phones","Sell a Phone","Vendor Portal","Admin Login"],
  };
  return (
    <footer style={{ background: P.navy, color: P.white, padding: "64px 24px 32px", fontFamily: P.font }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: P.white, fontWeight: 900, fontSize: 16 }}>M</span>
              </div>
              <span style={{ fontSize: 18, fontWeight: 900, color: P.white }}>Mobi<span style={{ color: P.sky }}>Hub</span></span>
            </div>
            <p style={{ color: "rgba(151,202,219,0.6)", fontSize: 14, lineHeight: 1.7, margin: "0 0 24px", maxWidth: 260 }}>
              The trusted marketplace for buying, selling, and trading smartphones.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["f","t","in","yt"].map(s => (
                <a key={s} href="#" style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center",
                  color: P.sky, fontSize: 11, fontWeight: 700, textDecoration: "none",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = P.ocean; e.currentTarget.style.color = P.white; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = P.sky; }}
                >{s}</a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 style={{ color: P.white, fontWeight: 800, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 20px" }}>{title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" style={{
                      color: "rgba(151,202,219,0.6)", fontSize: 14, textDecoration: "none", transition: "color 0.2s",
                    }}
                      onMouseEnter={e => e.target.style.color = P.sky}
                      onMouseLeave={e => e.target.style.color = "rgba(151,202,219,0.6)"}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(1,138,190,0.2)", paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ color: "rgba(151,202,219,0.5)", fontSize: 13, margin: 0 }}>© 2026 MobiHub. All rights reserved.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ color: "rgba(151,202,219,0.5)", fontSize: 12 }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: P.font }}>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Team />
      <CTABanner />
      <Footer />
    </div>
  );
}