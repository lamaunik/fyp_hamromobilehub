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

const team = [
  { name:"Richard Smith",    role:"Founder & CEO",   bio:"Serial entrepreneur with 10+ years in mobile tech and e-commerce platforms.",         initials:"RS" },
  { name:"Samara Kane",      role:"CTO",              bio:"Full-stack engineer passionate about building scalable marketplace infrastructure.",    initials:"SK" },
  { name:"Elizabeth Monroe", role:"Head of Vendors",  bio:"Specialist in vendor relations and marketplace growth strategies.",                    initials:"EM" },
  { name:"James Tate",       role:"Lead Designer",    bio:"UI/UX designer crafting seamless buying and selling experiences.",                    initials:"JT" },
];

export default function Team() {
  return (
    <section id="vendors" style={{ background:P.white,padding:"96px 24px",fontFamily:P.font }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <span style={{ display:"inline-block",background:P.white,color:P.navy,fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",padding:"6px 16px",borderRadius:999,border:`1px solid ${P.sky}`,marginBottom:16,boxShadow:"0 2px 8px rgba(0,0,0,0.02)" }}>
            Meet Our Team
          </span>
          <h2 style={{ fontFamily:P.fontHeading,fontSize:42,fontWeight:800,color:P.navy,margin:"0 0 16px",letterSpacing:"0.5px" }}>
            The People Behind{" "}
            <span style={{ color:P.accent }}>HamroMobileHub</span>
          </h2>
          <p style={{ color:P.muted,fontSize:17,maxWidth:440,margin:"0 auto",lineHeight:1.7 }}>Passionate experts building the future of mobile commerce.</p>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24 }}>
          {team.map((member,i)=>(
            <div key={i} style={{ background:P.white,borderRadius:20,overflow:"hidden",border:`1px solid ${P.sky}`,transition:"all 0.2s",boxShadow:"0 4px 12px rgba(24, 24, 27, 0.02)" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(24, 24, 27, 0.08)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 12px rgba(24, 24, 27, 0.02)"; }}
            >
              <div style={{ height:160,background:P.mist,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",borderBottom:`1px solid ${P.sky}` }}>
                <div style={{ width:80,height:80,borderRadius:"50%",background:P.white,border:`1px solid ${P.sky}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,0,0,0.05)" }}>
                  <span style={{ color:P.navy,fontFamily:P.fontHeading,fontWeight:900,fontSize:26,letterSpacing:"1px" }}>{member.initials}</span>
                </div>
              </div>
              <div style={{ padding:24 }}>
                <h3 style={{ color:P.navy,fontWeight:700,fontSize:16,margin:"0 0 2px" }}>{member.name}</h3>
                <p style={{ color:P.accent,fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",margin:"0 0 12px" }}>{member.role}</p>
                <p style={{ color:P.muted,fontSize:13,lineHeight:1.7,margin:"0 0 16px" }}>{member.bio}</p>
                <div style={{ display:"flex",gap:8 }}>
                  {[
                    { s: "in", url: `https://linkedin.com/in/${member.name.replace(' ', '')}` },
                    { s: "tw", url: `https://twitter.com/${member.name.replace(' ', '')}` },
                    { s: "gh", url: `https://github.com/${member.name.replace(' ', '')}` }
                  ].map(({s, url})=>(
                    <a key={s} href={url} target="_blank" rel="noopener noreferrer" style={{ width:28,height:28,borderRadius:"50%",background:P.mistBg,display:"flex",alignItems:"center",justifyContent:"center",color:P.muted,fontSize:11,fontWeight:700,textDecoration:"none",transition:"all 0.2s",border:`1px solid ${P.sky}` }}
                      onMouseEnter={e=>{ e.currentTarget.style.background=P.navy;e.currentTarget.style.color=P.white; }}
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