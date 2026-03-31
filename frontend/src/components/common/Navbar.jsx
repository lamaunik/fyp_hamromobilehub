import { useState } from "react";
import { Link } from "react-router-dom";

const P = {
  navy:  "#18181b",
  royal: "#27272a",
  ocean: "#3f3f46",
  sky:   "#e4e4e7",
  mist:  "#f4f4f5",
  white: "#ffffff",
  muted: "#71717a",
  mistBg:"#fafafa",
  font:  "'DM Sans', 'Inter', sans-serif",
  fontHeading: "'Barlow Condensed', 'Inter', sans-serif",
  accent: "#f43f5e"
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:50,background:"rgba(255,255,255,0.9)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${P.mist}`,fontFamily:P.font }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.png" alt="Logo icon" style={{ height: 38, width: "auto" }} />
          <span style={{ fontSize: 22, fontWeight: 900, color: "#18181b", letterSpacing: "-0.02em", fontFamily: "'Barlow Condensed', sans-serif" }}>
            HamroMobile<span style={{ color: "#f43f5e" }}>Hub</span>
          </span>
        </div>

        <div style={{ display:"flex",alignItems:"center",gap:32 }}>
          {[{l:"Home",h:"#home"},{l:"Products",h:"#products"},{l:"Vendors",h:"#vendors"},{l:"About",h:"#about"},{l:"Contact",h:"#contact"}].map(item => (
            <a key={item.l} href={item.h} style={{ fontSize:14,fontWeight:600,color:P.muted,textDecoration:"none",transition:"color 0.2s" }}
              onMouseEnter={e=>e.target.style.color=P.navy} onMouseLeave={e=>e.target.style.color=P.muted}
            >{item.l}</a>
          ))}
        </div>

        <div style={{ display:"flex",alignItems:"center",gap:16 }}>
          <Link to="/signin" style={{ fontSize:14,fontWeight:700,color:P.navy,textDecoration:"none",padding:"8px 12px",transition:"opacity 0.2s" }}
            onMouseEnter={e=>e.target.style.opacity=0.7} onMouseLeave={e=>e.target.style.opacity=1}
          >Sign In</Link>
          <Link to="/signup" style={{ fontSize:14,fontWeight:700,color:P.white,background:P.navy,textDecoration:"none",padding:"10px 24px",borderRadius:12,transition:"opacity 0.2s" }}
            onMouseEnter={e=>e.target.style.opacity=0.8} onMouseLeave={e=>e.target.style.opacity=1}
          >
            Get Started
          </Link>
        </div>

        <button onClick={()=>setMenuOpen(!menuOpen)} style={{ background:"none",border:"none",cursor:"pointer",color:P.navy,padding:4 }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div style={{ background:P.white,borderTop:`1px solid ${P.mist}`,padding:"16px 24px",display:"flex",flexDirection:"column",gap:14 }}>
          {[{l:"Home",h:"#home"},{l:"Products",h:"#products"},{l:"Vendors",h:"#vendors"},{l:"About",h:"#about"},{l:"Contact",h:"#contact"}].map(item => (
            <a key={item.l} href={item.h} onClick={()=>setMenuOpen(false)} style={{ fontSize:14,fontWeight:600,color:P.navy,textDecoration:"none" }}>{item.l}</a>
          ))}
          <Link to="/signin" onClick={()=>setMenuOpen(false)} style={{ fontSize:14,fontWeight:600,color:P.navy,textDecoration:"none" }}>Sign In</Link>
          <Link to="/signup" onClick={()=>setMenuOpen(false)} style={{ fontSize:14,fontWeight:700,color:P.white,background:`linear-gradient(135deg,${P.royal},${P.ocean})`,textDecoration:"none",padding:"10px 22px",borderRadius:999,textAlign:"center" }}>Get Started</Link>
        </div>
      )}
    </nav>
  );
}