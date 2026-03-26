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

const links = {
  Company:     ["About Us","Careers","Press","Blog"],
  Support:     ["Help Center","How It Works","Privacy Policy","Terms of Service"],
  Marketplace: ["Browse Phones","Sell a Phone","Vendor Portal","Admin Login"],
};

export default function Footer() {
  return (
    <footer id="contact" style={{ background:P.navy,color:P.white,padding:"64px 24px 32px",fontFamily:P.font }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr",gap:48,marginBottom:48 }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
              <div style={{ width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${P.royal},${P.ocean})`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ color:P.white,fontWeight:900,fontSize:16 }}>M</span>
              </div>
              <span style={{ fontSize:18,fontWeight:900,color:P.white }}>
                HamroMobile<span style={{ color:P.sky }}>Hub</span>
              </span>
            </div>
            <p style={{ color:"rgba(212, 210, 195, 0.6)",fontSize:14,lineHeight:1.7,margin:"0 0 24px",maxWidth:260 }}>
              The trusted marketplace for buying, selling, and trading smartphones. Join thousands of happy customers.
            </p>
            <div style={{ display:"flex",gap:10 }}>
              {["f","t","in","yt"].map(s=>(
                <a key={s} href="#" style={{ width:34,height:34,borderRadius:"50%",background:"rgba(40, 43, 74, 0.18)",display:"flex",alignItems:"center",justifyContent:"center",color:P.sky,fontSize:11,fontWeight:700,textDecoration:"none",transition:"all 0.2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=P.ocean;e.currentTarget.style.color=P.white; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(40, 43, 74, 0.18)";e.currentTarget.style.color=P.sky; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title,items])=>(
            <div key={title}>
              <h4 style={{ color:P.mist,fontWeight:800,fontSize:12,letterSpacing:"0.08em",textTransform:"uppercase",margin:"0 0 20px" }}>{title}</h4>
              <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:12 }}>
                {items.map(item=>(
                  <li key={item}>
                    <a href="#" style={{ color:"rgba(212, 210, 195, 0.6)",fontSize:14,textDecoration:"none",transition:"color 0.2s" }}
                      onMouseEnter={e=>e.target.style.color=P.sky} onMouseLeave={e=>e.target.style.color="rgba(212, 210, 195, 0.6)"}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop:`1px solid rgba(40, 43, 74, 0.2)`,paddingTop:28,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <p style={{ color:"rgba(212, 210, 195, 0.5)",fontSize:13,margin:0 }}>© {new Date().getFullYear()} MobiHub. All rights reserved.</p>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:"#22c55e" }}/>
            <span style={{ color:"rgba(212, 210, 195, 0.5)",fontSize:12 }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}