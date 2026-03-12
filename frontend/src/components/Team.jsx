const P = {
  navy:"#001B48",royal:"#02457A",ocean:"#018ABE",
  sky:"#97CADB",mist:"#D6E8EE",white:"#ffffff",
  muted:"#6b99b5",mistBg:"#f0f6f9",font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const team = [
  { name:"Richard Smith",    role:"Founder & CEO",   bio:"Serial entrepreneur with 10+ years in mobile tech and e-commerce platforms.",         initials:"RS" },
  { name:"Samara Kane",      role:"CTO",              bio:"Full-stack engineer passionate about building scalable marketplace infrastructure.",    initials:"SK" },
  { name:"Elizabeth Monroe", role:"Head of Vendors",  bio:"Specialist in vendor relations and marketplace growth strategies.",                    initials:"EM" },
  { name:"James Tate",       role:"Lead Designer",    bio:"UI/UX designer crafting seamless buying and selling experiences.",                    initials:"JT" },
];

export default function Team() {
  return (
    <section style={{ background:P.mistBg,padding:"96px 24px",fontFamily:P.font }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <span style={{ display:"inline-block",background:"rgba(1,138,190,0.08)",color:P.ocean,fontSize:11,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"6px 16px",borderRadius:999,border:`1px solid ${P.sky}`,marginBottom:16 }}>
            Meet Our Team
          </span>
          <h2 style={{ fontSize:42,fontWeight:900,color:P.navy,margin:"0 0 16px",letterSpacing:"-0.02em" }}>
            The People Behind{" "}
            <span style={{ background:`linear-gradient(to right,${P.royal},${P.ocean})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>MobiHub</span>
          </h2>
          <p style={{ color:P.muted,fontSize:17,maxWidth:440,margin:"0 auto",lineHeight:1.7 }}>Passionate experts building the future of mobile commerce.</p>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24 }}>
          {team.map((member,i)=>(
            <div key={i} style={{ background:P.white,borderRadius:20,overflow:"hidden",border:`1px solid ${P.mist}`,transition:"all 0.2s",boxShadow:"0 2px 12px rgba(0,27,72,0.06)" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 48px rgba(1,138,190,0.14)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,27,72,0.06)"; }}
            >
              <div style={{ height:160,background:`linear-gradient(135deg,${P.royal},${P.ocean})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",inset:0,opacity:0.15,backgroundImage:"radial-gradient(circle at 70% 20%, white 1px, transparent 1px)",backgroundSize:"20px 20px" }}/>
                <div style={{ width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.22)",backdropFilter:"blur(8px)",border:"2px solid rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <span style={{ color:P.white,fontWeight:900,fontSize:26 }}>{member.initials}</span>
                </div>
              </div>
              <div style={{ padding:24 }}>
                <h3 style={{ color:P.navy,fontWeight:800,fontSize:16,margin:"0 0 2px" }}>{member.name}</h3>
                <p style={{ color:P.ocean,fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",margin:"0 0 12px" }}>{member.role}</p>
                <p style={{ color:P.muted,fontSize:13,lineHeight:1.7,margin:"0 0 16px" }}>{member.bio}</p>
                <div style={{ display:"flex",gap:8 }}>
                  {["in","tw","gh"].map(s=>(
                    <a key={s} href="#" style={{ width:28,height:28,borderRadius:"50%",background:P.mistBg,display:"flex",alignItems:"center",justifyContent:"center",color:P.muted,fontSize:11,fontWeight:700,textDecoration:"none",transition:"all 0.2s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background=P.ocean;e.currentTarget.style.color=P.white; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background=P.mistBg;e.currentTarget.style.color=P.muted; }}
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