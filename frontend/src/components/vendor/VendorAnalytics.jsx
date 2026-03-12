const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const MONTHS  = ["Oct","Nov","Dec","Jan","Feb","Mar"];
const REVENUE = [0,0,0,0,0,0];
const MAX_R   = Math.max(...REVENUE, 1);

const KPI_ICONS = [
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>,
];

export default function VendorAnalytics() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24, fontFamily:P.font }}>

      <div>
        <h2 style={{ color:P.navy, fontWeight:900, fontSize:20, margin:"0 0 4px" }}>Analytics</h2>
        <p style={{ color:P.muted, fontSize:14, margin:0 }}>Your store performance overview</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
        {[
          { label:"Page Views",  value:"0",  sub:"0% this week"   },
          { label:"Conversion",  value:"0%", sub:"+0% last month" },
          { label:"Avg Order",   value:"$0", sub:"From 0 orders"  },
          { label:"Return Rate", value:"0%", sub:"No returns"     },
        ].map((k,i)=>(
          <div key={i} style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:16, padding:20, cursor:"pointer", transition:"all 0.2s", display:"flex", flexDirection:"column", gap:12 }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 10px 28px rgba(1,138,190,0.13)`; e.currentTarget.style.borderColor=P.sky; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor=P.mist; }}>
            <div style={{ width:40, height:40, borderRadius:12, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", color:P.white }}>
              {KPI_ICONS[i]}
            </div>
            <div>
              <p style={{ color:P.navy, fontWeight:900, fontSize:24, margin:"0 0 2px", letterSpacing:"-0.02em" }}>{k.value}</p>
              <p style={{ color:P.muted, fontSize:12, fontWeight:600, margin:"0 0 4px" }}>{k.label}</p>
              <p style={{ color:P.ocean, fontSize:12, fontWeight:600, margin:0 }}>{k.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:20, padding:24, boxShadow:"0 2px 12px rgba(0,27,72,0.05)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <h3 style={{ color:P.navy, fontWeight:800, fontSize:15, margin:0 }}>Monthly Revenue</h3>
          <span style={{ color:P.muted, fontSize:12, background:P.mistBg, border:`1px solid ${P.mist}`, padding:"4px 12px", borderRadius:999 }}>Last 6 months</span>
        </div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:160 }}>
          {MONTHS.map((m,i)=>(
            <div key={m} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6, height:"100%" }}>
              {REVENUE[i] > 0 && <p style={{ color:P.ocean, fontSize:10, fontWeight:700, margin:0 }}>${REVENUE[i]}</p>}
              <div style={{ width:"100%", borderRadius:"6px 6px 0 0", transition:"all 0.3s", marginTop:"auto",
                height:`${Math.max((REVENUE[i]/MAX_R)*100,5)}%`,
                background: REVENUE[i]>0 ? `linear-gradient(to top,${P.royal},${P.ocean})` : P.mist,
              }}/>
              <p style={{ color:P.muted, fontSize:12, margin:0 }}>{m}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Listings */}
      <div style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:20, padding:24, boxShadow:"0 2px 12px rgba(0,27,72,0.05)" }}>
        <h3 style={{ color:P.navy, fontWeight:800, fontSize:15, margin:"0 0 16px" }}>Top Listings Performance</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            { name:"Unknown", views:0, sales:0, revenue:"$0" },
            { name:"Unknown", views:0, sales:0, revenue:"$0" },
            { name:"Unknown", views:0, sales:0, revenue:"$0" },
          ].map((p,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", background:P.mistBg, borderRadius:12, border:`1px solid ${P.mist}`, transition:"all 0.15s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background=`rgba(1,138,190,0.06)`; e.currentTarget.style.borderColor=P.sky; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=P.mistBg; e.currentTarget.style.borderColor=P.mist; }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:34, height:34, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13 }}>{i+1}</div>
                <span style={{ color:P.navy, fontWeight:600, fontSize:14 }}>{p.name}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:24 }}>
                <div style={{ textAlign:"right" }}>
                  <p style={{ color:P.muted, fontSize:10, margin:"0 0 2px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Views</p>
                  <p style={{ color:P.navy, fontWeight:700, fontSize:14, margin:0 }}>{p.views}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ color:P.muted, fontSize:10, margin:"0 0 2px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Sales</p>
                  <p style={{ color:P.navy, fontWeight:700, fontSize:14, margin:0 }}>{p.sales}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ color:P.muted, fontSize:10, margin:"0 0 2px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Revenue</p>
                  <p style={{ color:P.ocean, fontWeight:900, fontSize:14, margin:0 }}>{p.revenue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}