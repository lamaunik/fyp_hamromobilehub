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

const features = [
  { title:"Buy With Ease", desc:"Browse thousands of verified mobile listings. Compare specs, prices, and seller ratings all in one place.", icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg> },
  { title:"Sell Fast", desc:"List your device in minutes. Reach thousands of buyers instantly with smart pricing suggestions.", icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg> },
  { title:"Vendor Dashboard", desc:"Manage your inventory, track sales, and analyze performance with a powerful vendor control panel.", icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> },
  { title:"Secure Transactions", desc:"Every transaction is protected with escrow payment and buyer/seller protection guarantees.", icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> },
  { title:"Admin Control", desc:"Comprehensive admin panel to monitor all activities, users, vendors and transactions in real time.", icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
  { title:"Instant Notifications", desc:"Real-time alerts for new listings, offers, messages, and sale confirmations across all devices.", icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg> },
];

export default function Features() {
  return (
    <section id="products" style={{ background:P.mistBg,padding:"96px 24px",fontFamily:P.font }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <span style={{ display:"inline-block",background:P.white,color:P.navy,fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",padding:"6px 16px",borderRadius:999,marginBottom:16,border:`1px solid ${P.sky}` }}>
            Integrated Solutions
          </span>
          <h2 style={{ fontFamily:P.fontHeading,fontSize:42,fontWeight:800,color:P.navy,margin:"0 0 16px",letterSpacing:"0.5px" }}>
            Everything You Need to{" "}
            <span style={{ color: P.accent }}>Trade Mobiles</span>
          </h2>
          <p style={{ color:P.muted,fontSize:17,maxWidth:560,margin:"0 auto",lineHeight:1.7 }}>
            Our platform connects buyers, sellers, and vendors with powerful tools designed for the mobile reselling ecosystem.
          </p>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }}>
          {features.map((f,i)=>(
            <div key={i} style={{ background:P.white,border:`1px solid ${P.sky}`,borderRadius:20,padding:28,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 4px 12px rgba(24, 24, 27, 0.02)",position:"relative",overflow:"hidden" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(24, 24, 27, 0.08)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 12px rgba(24, 24, 27, 0.02)"; }}
            >
              <div style={{ width:52,height:52,borderRadius:16,background:P.mist,border:`1px solid ${P.sky}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20 }}>
                {f.icon}
              </div>
              <h3 style={{ color:P.navy,fontWeight:700,fontSize:17,margin:"0 0 8px" }}>{f.title}</h3>
              <p style={{ color:P.muted,fontSize:14,lineHeight:1.7,margin:"0 0 20px" }}>{f.desc}</p>
              <div style={{ display:"flex",alignItems:"center",gap:4,fontSize:13,fontWeight:700,color:P.accent }}>
                Learn more
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </div>
              <div style={{ position:"absolute",bottom:-16,right:-16,width:80,height:80,borderRadius:"50%",background:P.mistBg }}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}