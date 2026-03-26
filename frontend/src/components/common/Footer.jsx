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

const links = {
  Company:     ["About Us","Careers","Press","Blog"],
  Support:     ["Help Center","How It Works","Privacy Policy","Terms of Service"],
  Marketplace: ["Browse Phones","Sell a Phone","Vendor Portal","Admin Login"],
};

export default function Footer() {
  return (
    <footer id="contact" style={{ background:P.mistBg,color:P.navy,padding:"64px 24px 32px",fontFamily:P.font,borderTop:`1px solid ${P.mist}` }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr",gap:48,marginBottom:48 }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",height:64,overflow:"hidden",marginBottom:12 }}>
              <img src="/logo.png" alt="HamroMobile Hub" style={{ width:190,height:190,minWidth:190,minHeight:190,objectFit:"contain",marginLeft:-14,filter:"hue-rotate(225deg) saturate(1.6) brightness(1.1)" }} />
            </div>
            <p style={{ color:P.muted,fontSize:14,lineHeight:1.7,margin:"0 0 24px",maxWidth:260 }}>
              The trusted marketplace for buying, selling, and trading smartphones. Join thousands of happy customers.
            </p>
            <div style={{ display:"flex",gap:10 }}>
              {["f","t","in","yt"].map(s=>(
                <a key={s} href="#" style={{ width:34,height:34,borderRadius:"50%",background:P.mist,display:"flex",alignItems:"center",justifyContent:"center",color:P.navy,fontSize:11,fontWeight:700,textDecoration:"none",transition:"all 0.2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=P.navy;e.currentTarget.style.color=P.white; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background=P.mist;e.currentTarget.style.color=P.navy; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title,items])=>(
            <div key={title}>
              <h4 style={{ color:P.navy,fontWeight:800,fontSize:13,letterSpacing:"0.5px",textTransform:"uppercase",margin:"0 0 20px" }}>{title}</h4>
              <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:12 }}>
                {items.map(item=>(
                  <li key={item}>
                    <a href="#" style={{ color:P.muted,fontSize:14,textDecoration:"none",transition:"color 0.2s" }}
                      onMouseEnter={e=>e.target.style.color=P.navy} onMouseLeave={e=>e.target.style.color=P.muted}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop:`1px solid ${P.sky}`,paddingTop:28,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <p style={{ color:P.muted,fontSize:13,margin:0 }}>© {new Date().getFullYear()} MobiHub. All rights reserved.</p>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:"#10b981" }}/>
            <span style={{ color:P.muted,fontSize:12 }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}