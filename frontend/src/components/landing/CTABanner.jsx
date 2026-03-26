import { Link } from 'react-router-dom';

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

export default function CTABanner() {
  return (
    <section style={{ background:P.white,padding:"96px 24px",position:"relative",overflow:"hidden",fontFamily:P.font }}>
      <div style={{ position:"absolute",top:0,left:"25%",width:384,height:384,borderRadius:"50%",background:"rgba(244, 63, 94, 0.05)",filter:"blur(80px)" }}/>
      <div style={{ position:"absolute",bottom:0,right:"25%",width:384,height:384,borderRadius:"50%",background:"rgba(24, 24, 27, 0.03)",filter:"blur(80px)" }}/>

      <div style={{ maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",position:"relative" }}>
        <div>
          <span style={{ display:"inline-block",background:P.white,color:P.navy,fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",padding:"6px 16px",borderRadius:999,border:`1px solid ${P.sky}`,marginBottom:24,boxShadow:"0 2px 8px rgba(0,0,0,0.02)" }}>
            Start Today
          </span>
          <h2 style={{ fontFamily:P.fontHeading,fontSize:42,fontWeight:800,color:P.navy,lineHeight:1.15,margin:"0 0 20px",letterSpacing:"0.5px" }}>
            Reach Your{" "}
            <span style={{ color:P.accent }}>Destination</span>
            {" "}100% Sure And Safe
          </h2>
          <p style={{ color:P.muted,fontSize:16,lineHeight:1.7,margin:"0 0 36px",maxWidth:440 }}>
            Whether you're a buyer looking for the best deal or a vendor growing your business, HamroMobile Hub is the platform that gets you there — safely and reliably.
          </p>
          <div style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
            <Link to="/signup" style={{ display:"inline-flex",alignItems:"center",gap:8,background:P.navy,color:P.white,fontWeight:700,fontSize:15,padding:"14px 32px",borderRadius:12,textDecoration:"none",boxShadow:"0 8px 16px rgba(24, 24, 27, 0.15)",transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 12px 20px rgba(24, 24, 27, 0.2)"}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 8px 16px rgba(24, 24, 27, 0.15)"}}>
              Start for Free
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
            <a href="#about" style={{ display:"inline-flex",alignItems:"center",border:`1px solid ${P.sky}`,background:P.white,color:P.navy,fontWeight:700,fontSize:15,padding:"14px 32px",borderRadius:12,textDecoration:"none",transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.background=P.mist;e.currentTarget.style.borderColor=P.mist}} onMouseLeave={e=>{e.currentTarget.style.background=P.white;e.currentTarget.style.borderColor=P.sky}}>
              Learn More
            </a>
          </div>
        </div>

        {/* Right graphic — location pin + package boxes in palette colors */}
        <div style={{ display:"flex",justifyContent:"center",alignItems:"center" }}>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute",top:-32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",zIndex:10 }}>
              <div style={{ width:48,height:48,borderRadius:"50%",background:P.accent,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(244, 63, 94, 0.3)" }}>
                <svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
              </div>
              <div style={{ width:2,height:32,background:`linear-gradient(to bottom,${P.accent},transparent)` }}/>
            </div>

            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:48 }}>
              {[1,2,3,4,5,6].map((_,i)=>(
                <div key={i} style={{ width:80,height:80,borderRadius:12,background:P.mist,border:`1px solid ${P.sky}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(24, 24, 27, 0.04)",transform:`rotate(${(i%3-1)*3}deg)` }}>
                  <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}