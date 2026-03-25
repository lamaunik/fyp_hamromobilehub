import { Link } from 'react-router-dom';

const P = {
  navy:"#001B48",royal:"#02457A",ocean:"#018ABE",
  sky:"#97CADB",mist:"#D6E8EE",white:"#ffffff",
  muted:"#6b99b5",font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

export default function CTABanner() {
  return (
    <section style={{ background:P.navy,padding:"96px 24px",position:"relative",overflow:"hidden",fontFamily:P.font }}>
      <div style={{ position:"absolute",top:0,left:"25%",width:384,height:384,borderRadius:"50%",background:"rgba(1,138,190,0.12)",filter:"blur(80px)" }}/>
      <div style={{ position:"absolute",bottom:0,right:"25%",width:384,height:384,borderRadius:"50%",background:"rgba(151,202,219,0.08)",filter:"blur(80px)" }}/>

      <div style={{ maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",position:"relative" }}>
        <div>
          <span style={{ display:"inline-block",background:"rgba(1,138,190,0.18)",color:P.sky,fontSize:11,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"6px 16px",borderRadius:999,border:"1px solid rgba(1,138,190,0.35)",marginBottom:24 }}>
            Start Today
          </span>
          <h2 style={{ fontSize:42,fontWeight:900,color:P.white,lineHeight:1.15,margin:"0 0 20px",letterSpacing:"-0.02em" }}>
            Reach Your{" "}
            <span style={{ background:`linear-gradient(to right,${P.sky},${P.mist})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>Destination</span>
            {" "}100% Sure And Safe
          </h2>
          <p style={{ color:"rgba(151,202,219,0.65)",fontSize:16,lineHeight:1.7,margin:"0 0 36px",maxWidth:440 }}>
            Whether you're a buyer looking for the best deal or a vendor growing your business, HamroMobile Hub is the platform that gets you there — safely and reliably.
          </p>
          <div style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
            <Link to="/signup" style={{ display:"inline-flex",alignItems:"center",gap:8,background:`linear-gradient(135deg,${P.ocean},#0aa8e0)`,color:P.white,fontWeight:700,fontSize:15,padding:"14px 32px",borderRadius:999,textDecoration:"none",boxShadow:"0 8px 28px rgba(1,138,190,0.4)",transition:"transform 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              Start for Free
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
            <a href="#about" style={{ display:"inline-flex",alignItems:"center",border:"2px solid rgba(255,255,255,0.2)",color:P.white,fontWeight:700,fontSize:15,padding:"14px 32px",borderRadius:999,textDecoration:"none",transition:"background 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              Learn More
            </a>
          </div>
        </div>

        {/* Right graphic — location pin + package boxes in palette colors */}
        <div style={{ display:"flex",justifyContent:"center",alignItems:"center" }}>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute",top:-32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",zIndex:10 }}>
              <div style={{ width:48,height:48,borderRadius:"50%",background:`linear-gradient(135deg,${P.royal},${P.ocean})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(1,138,190,0.4)" }}>
                <svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
              </div>
              <div style={{ width:2,height:32,background:`linear-gradient(to bottom,${P.ocean},transparent)` }}/>
            </div>

            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:48 }}>
              {[P.navy,P.royal,P.ocean,P.royal,P.ocean,P.sky].map((col,i)=>(
                <div key={i} style={{ width:80,height:80,borderRadius:14,background:`linear-gradient(135deg,${col},${col}cc)`,border:`2px solid rgba(214,232,238,0.25)`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(0,27,72,0.3)",transform:`rotate(${(i%3-1)*3}deg)` }}>
                  <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="rgba(214,232,238,0.7)" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}