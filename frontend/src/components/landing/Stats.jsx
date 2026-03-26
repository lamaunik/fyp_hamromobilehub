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

const stats = [
  { value:"450+", label:"Products Listed", icon:<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
  { value:"150+", label:"Active Vendors",  icon:<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
  { value:"120+", label:"Cities Covered",  icon:<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  { value:"20+",  label:"Brand Partners",  icon:<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
];

export default function Stats() {
  return (
    <section style={{ background:P.mistBg,padding:"0 24px 64px",fontFamily:P.font }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <div style={{ background:P.white,border:`1px solid ${P.sky}`,borderRadius:24,padding:"56px 48px",position:"relative",overflow:"hidden",boxShadow:"0 12px 32px rgba(24, 24, 27, 0.04)" }}>
          <div style={{ position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:P.mistBg }}/>
          <div style={{ position:"absolute",bottom:-40,left:-40,width:160,height:160,borderRadius:"50%",background:P.mistBg }}/>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:32,position:"relative",textAlign:"center" }}>
            {stats.map((s,i)=>(
              <div key={i}>
                <div style={{ display:"flex",justifyContent:"center",marginBottom:14 }}>{s.icon}</div>
                <div style={{ fontFamily:P.fontHeading,fontSize:44,fontWeight:800,color:P.navy,lineHeight:1,marginBottom:6 }}>{s.value}</div>
                <div style={{ color:P.muted,fontSize:14,fontWeight:600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <p style={{ position:"relative",textAlign:"center",color:P.muted,fontSize:14,marginTop:40,fontWeight:600 }}>
            Impressed? Choose MobiHub to handle your complete mobile buying and selling needs.{" "}
            <a href="#" style={{ color:P.accent,fontWeight:700,textDecoration:"none" }}>Get Started &rarr;</a>
          </p>
        </div>
      </div>
    </section>
  );
}