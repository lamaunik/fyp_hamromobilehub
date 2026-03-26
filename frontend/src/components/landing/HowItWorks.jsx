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

const steps = [
  { step:"01", title:"Create Your Account", desc:"Sign up as a buyer, seller, or vendor in under 2 minutes. Verify your identity for a trusted profile.", icon:<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> },
  { step:"02", title:"List or Browse",       desc:"Sellers list their devices with photos and details. Buyers browse curated listings with filters.", icon:<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg> },
  { step:"03", title:"Make a Deal",           desc:"Negotiate, offer, or buy instantly. Our escrow system keeps both parties safe throughout.", icon:<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg> },
  { step:"04", title:"Receive & Review",      desc:"Get your device delivered safely. Leave a review to build the community's trust ecosystem.", icon:<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg> },
];

export default function HowItWorks() {
  return (
    <section id="about" style={{ background:P.white,padding:"96px 24px",position:"relative",overflow:"hidden",fontFamily:P.font }}>
      <div style={{ position:"absolute",left:-80,top:80,width:256,height:256,borderRadius:"50%",background:"rgba(244, 63, 94, 0.05)",filter:"blur(48px)" }}/>
      <div style={{ position:"absolute",right:-80,bottom:80,width:256,height:256,borderRadius:"50%",background:"rgba(24, 24, 27, 0.03)",filter:"blur(48px)" }}/>

      <div style={{ maxWidth:1280,margin:"0 auto",position:"relative" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <span style={{ display:"inline-block",background:P.white,color:P.navy,fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",padding:"6px 16px",borderRadius:999,border:`1px solid ${P.sky}`,marginBottom:16,boxShadow:"0 2px 8px rgba(0,0,0,0.02)" }}>
            How It Works
          </span>
          <h2 style={{ fontFamily:P.fontHeading,fontSize:42,fontWeight:800,color:P.navy,margin:"0 0 16px",letterSpacing:"0.5px" }}>
            Simple as{" "}
            <span style={{ color: P.accent }}>1, 2, 3, 4</span>
          </h2>
          <p style={{ color:P.muted,fontSize:17,maxWidth:480,margin:"0 auto",lineHeight:1.7 }}>
            Trading phones has never been easier. Our streamlined process gets you buying or selling in minutes.
          </p>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,position:"relative" }}>
          {steps.map((s,i)=>(
            <div key={i} style={{ position:"relative" }}>
              {i < steps.length-1 && (
                <div style={{ position:"absolute",top:40,left:"calc(100% - 10px)",width:"100%",height:1,background:`linear-gradient(to right,${P.sky},transparent)`,zIndex:0 }}/>
              )}
              <div style={{ position:"relative",background:P.white,border:`1px solid ${P.sky}`,borderRadius:20,padding:28,transition:"all 0.2s",boxShadow:"0 4px 12px rgba(24,24,27,0.02)" }}
                onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 12px 32px rgba(24,24,27,0.06)";e.currentTarget.style.transform="translateY(-4px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 4px 12px rgba(24,24,27,0.02)";e.currentTarget.style.transform="translateY(0)"; }}
              >
                <div style={{ position:"absolute",top:-12,right:-12,width:32,height:32,borderRadius:"50%",background:P.navy,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(24, 24, 27, 0.15)" }}>
                  <span style={{ color:P.white,fontSize:12,fontWeight:700 }}>{s.step}</span>
                </div>
                <div style={{ width:60,height:60,borderRadius:16,background:P.mist,border:`1px solid ${P.sky}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20 }}>
                  {s.icon}
                </div>
                <h3 style={{ color:P.navy,fontWeight:700,fontSize:16,margin:"0 0 10px" }}>{s.title}</h3>
                <p style={{ color:P.muted,fontSize:14,lineHeight:1.7,margin:0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}