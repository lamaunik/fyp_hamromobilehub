const P = {
  navy:"#001B48",royal:"#02457A",ocean:"#018ABE",
  sky:"#97CADB",mist:"#D6E8EE",white:"#ffffff",
  muted:"#6b99b5",font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const steps = [
  { step:"01", title:"Create Your Account", desc:"Sign up as a buyer, seller, or vendor in under 2 minutes. Verify your identity for a trusted profile.", icon:<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> },
  { step:"02", title:"List or Browse",       desc:"Sellers list their devices with photos and details. Buyers browse curated listings with filters.", icon:<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg> },
  { step:"03", title:"Make a Deal",           desc:"Negotiate, offer, or buy instantly. Our escrow system keeps both parties safe throughout.", icon:<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg> },
  { step:"04", title:"Receive & Review",      desc:"Get your device delivered safely. Leave a review to build the community's trust ecosystem.", icon:<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={P.sky} strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg> },
];

export default function HowItWorks() {
  return (
    <section id="about" style={{ background:`linear-gradient(135deg,${P.navy} 0%,${P.royal} 100%)`,padding:"96px 24px",position:"relative",overflow:"hidden",fontFamily:P.font }}>
      <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(to right,${P.royal},${P.ocean})` }}/>
      <div style={{ position:"absolute",left:-80,top:80,width:256,height:256,borderRadius:"50%",background:"rgba(1,138,190,0.1)",filter:"blur(48px)" }}/>
      <div style={{ position:"absolute",right:-80,bottom:80,width:256,height:256,borderRadius:"50%",background:"rgba(151,202,219,0.08)",filter:"blur(48px)" }}/>

      <div style={{ maxWidth:1280,margin:"0 auto",position:"relative" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <span style={{ display:"inline-block",background:"rgba(1,138,190,0.18)",color:P.sky,fontSize:11,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"6px 16px",borderRadius:999,border:"1px solid rgba(1,138,190,0.35)",marginBottom:16 }}>
            How It Works
          </span>
          <h2 style={{ fontSize:42,fontWeight:900,color:P.white,margin:"0 0 16px",letterSpacing:"-0.02em" }}>
            Simple as{" "}
            <span style={{ background:`linear-gradient(to right,${P.sky},${P.mist})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>1, 2, 3, 4</span>
          </h2>
          <p style={{ color:"rgba(151,202,219,0.65)",fontSize:17,maxWidth:480,margin:"0 auto",lineHeight:1.7 }}>
            Trading phones has never been easier. Our streamlined process gets you buying or selling in minutes.
          </p>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,position:"relative" }}>
          {steps.map((s,i)=>(
            <div key={i} style={{ position:"relative" }}>
              {i < steps.length-1 && (
                <div style={{ position:"absolute",top:40,left:"calc(100% - 10px)",width:"100%",height:1,background:`linear-gradient(to right,rgba(1,138,190,0.5),transparent)`,zIndex:0 }}/>
              )}
              <div style={{ position:"relative",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(151,202,219,0.15)",borderRadius:20,padding:28,transition:"all 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(1,138,190,0.1)";e.currentTarget.style.transform="translateY(-4px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.transform="translateY(0)"; }}
              >
                <div style={{ position:"absolute",top:-12,right:-12,width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${P.royal},${P.ocean})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(1,138,190,0.35)" }}>
                  <span style={{ color:P.white,fontSize:11,fontWeight:900 }}>{s.step}</span>
                </div>
                <div style={{ width:60,height:60,borderRadius:18,background:"rgba(1,138,190,0.15)",border:"1px solid rgba(1,138,190,0.25)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20 }}>
                  {s.icon}
                </div>
                <h3 style={{ color:P.white,fontWeight:800,fontSize:16,margin:"0 0 10px" }}>{s.title}</h3>
                <p style={{ color:"rgba(151,202,219,0.65)",fontSize:13,lineHeight:1.7,margin:0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}