import { Link } from "react-router-dom";

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

export default function Hero() {
  return (
    <section id="home" style={{
      position: "relative", minHeight: "100vh",
      background: `linear-gradient(135deg, ${P.navy} 0%, ${P.royal} 55%, #282B4A 100%)`,
      overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 80,
      fontFamily: P.font,
    }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 80, left: 40, width: 288, height: 288, borderRadius: "50%", background: "rgba(40, 43, 74, 0.18)", filter: "blur(64px)" }} />
        <div style={{ position: "absolute", bottom: 80, right: 40, width: 384, height: 384, borderRadius: "50%", background: "rgba(212, 210, 195, 0.1)", filter: "blur(64px)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", border: "1px solid rgba(40, 43, 74, 0.12)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(rgba(212, 210, 195, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 210, 195, 0.4) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", width: "100%" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(40, 43, 74, 0.18)", border: "1px solid rgba(40, 43, 74, 0.35)", borderRadius: 999, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: P.sky, display: "inline-block" }} />
            <span style={{ color: P.sky, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>#1 Mobile Reseller Platform</span>
          </div>

          <h1 style={{ fontSize: 60, fontWeight: 900, color: P.white, lineHeight: 1.05, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
            Buy &amp; Sell{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ background: `linear-gradient(to right, ${P.sky}, ${P.mist})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mobiles</span>
              <svg style={{ position: "absolute", bottom: -6, left: 0, width: "100%" }} viewBox="0 0 200 10" fill="none">
                <path d="M2 8 Q100 2 198 8" stroke={P.sky} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
              </svg>
            </span>{" "}
            <br />With Confidence
          </h1>

          <p style={{ color: "rgba(212, 210, 195, 0.75)", fontSize: 17, lineHeight: 1.7, margin: "0 0 40px", maxWidth: 440 }}>
            The ultimate marketplace for buying, selling, and trading smartphones. Connect with verified vendors and get the best deals — fast and secure.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link to="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${P.ocean}, #0aa8e0)`, color: P.white, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 999, textDecoration: "none", boxShadow: "0 8px 28px rgba(40, 43, 74, 0.4)", transition: "transform 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Browse Products
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.2)", color: P.white, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 999, textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.16)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >Become a Vendor</Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 48 }}>
            {[
              { label: "Verified Sellers", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> },
              { label: "Secure Payments", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
              { label: "Easy Returns", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> },
            ].map(b => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {b.icon}
                <span style={{ color: "rgba(212, 210, 195, 0.7)", fontSize: 12, fontWeight: 600 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "rgba(40, 43, 74, 0.18)", filter: "blur(48px)" }} />
          <div style={{ position: "relative", zIndex: 10, width: 220, background: "linear-gradient(180deg, #1a2332, #0f1520)", borderRadius: 40, border: "4px solid #2a3444", boxShadow: "0 32px 80px rgba(0,0,0,0.5)", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 80, height: 20, background: "#000", borderRadius: 999, zIndex: 10 }} />
            <div style={{ background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`, height: 280, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 32 }}>
              <div style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", borderRadius: 16, padding: 16, marginBottom: 12 }}>
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <span style={{ color: P.white, fontWeight: 900, fontSize: 20 }}>HMH</span>
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

          <div style={{ position: "absolute", top: 40, left: -24, zIndex: 20, background: P.white, borderRadius: 16, padding: "12px 14px", boxShadow: "0 8px 32px rgba(40, 43, 74, 0.18)", width: 144 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(34,197,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span style={{ color: P.navy, fontSize: 12, fontWeight: 700 }}>Sale Complete</span>
            </div>
            <p style={{ color: P.muted, fontSize: 11, margin: 0 }}>iPhone 14 Pro</p>
            <p style={{ color: "#16a34a", fontWeight: 900, fontSize: 14, margin: "2px 0 0" }}>+$849</p>
          </div>

          <div style={{ position: "absolute", bottom: 40, right: -24, zIndex: 20, background: P.white, borderRadius: 16, padding: "12px 14px", boxShadow: "0 8px 32px rgba(40, 43, 74, 0.18)", width: 160 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(40, 43, 74, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={P.ocean} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              </div>
              <span style={{ color: P.navy, fontSize: 12, fontWeight: 700 }}>New Listing</span>
            </div>
            <p style={{ color: P.muted, fontSize: 11, margin: 0 }}>Samsung S24 Ultra</p>
            <p style={{ color: P.ocean, fontWeight: 900, fontSize: 14, margin: "2px 0 0" }}>$1,199</p>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20Q1080 60 720 20Q360 -20 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}