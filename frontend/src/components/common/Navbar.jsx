import { useState } from "react";
import { Link } from "react-router-dom";

const P = {
  navy: "#001B48", royal: "#02457A", ocean: "#018ABE",
  sky: "#97CADB", mist: "#D6E8EE", white: "#ffffff",
  muted: "#6b99b5", font: "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:50,background:"rgba(255,255,255,0.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${P.mist}`,boxShadow:"0 2px 16px rgba(0,27,72,0.07)",fontFamily:P.font }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <Link to="/" style={{ display:"flex",alignItems:"center",gap:10,textDecoration:"none" }}>
          <div style={{ width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${P.royal},${P.ocean})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(1,138,190,0.3)" }}>
            <span style={{ color:P.white,fontWeight:900,fontSize:16 }}>M</span>
          </div>
          <span style={{ fontSize:18,fontWeight:900,color:P.navy,letterSpacing:"-0.02em" }}>
            HamroMobile<span style={{ color:P.ocean }}>Hub</span>
          </span>
        </Link>

        <div style={{ display:"flex",alignItems:"center",gap:32 }}>
          {[{l:"Home",h:"#home"},{l:"Products",h:"#products"},{l:"Vendors",h:"#vendors"},{l:"About",h:"#about"},{l:"Contact",h:"#contact"}].map(item => (
            <a key={item.l} href={item.h} style={{ fontSize:14,fontWeight:600,color:P.royal,textDecoration:"none",transition:"color 0.2s" }}
              onMouseEnter={e=>e.target.style.color=P.ocean} onMouseLeave={e=>e.target.style.color=P.royal}
            >{item.l}</a>
          ))}
        </div>

        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <Link to="/signin" style={{ fontSize:14,fontWeight:600,color:P.navy,textDecoration:"none",padding:"8px 16px" }}
            onMouseEnter={e=>e.target.style.color=P.ocean} onMouseLeave={e=>e.target.style.color=P.navy}
          >Sign In</Link>
          <Link to="/signup" style={{ fontSize:14,fontWeight:700,color:P.white,background:`linear-gradient(135deg,${P.royal},${P.ocean})`,textDecoration:"none",padding:"9px 22px",borderRadius:999,boxShadow:"0 4px 14px rgba(1,138,190,0.3)" }}>
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