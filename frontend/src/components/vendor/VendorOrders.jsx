import { useState } from "react";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", mistBg:"#f0f6f9",
  font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const ORDERS = [
  { id:"#ORD-201", product:"iPhone 14 Pro",       buyer:"Arun K.", price:"$899",  status:"Delivered", date:"Mar 1, 2026"  },
  { id:"#ORD-202", product:"Samsung Galaxy S23",  buyer:"Sita M.", price:"$749",  status:"Shipped",   date:"Mar 2, 2026"  },
  { id:"#ORD-203", product:"Google Pixel 7",      buyer:"Ram P.",  price:"$549",  status:"Pending",   date:"Mar 3, 2026"  },
  { id:"#ORD-204", product:"MacBook Air M2",      buyer:"Gita R.", price:"$1099", status:"Delivered", date:"Feb 28, 2026" },
];

const STATUS_STYLE = {
  Delivered: { bg:"rgba(34,197,94,0.1)",   border:"rgba(34,197,94,0.25)",   text:"#16a34a" },
  Shipped:   { bg:"rgba(1,138,190,0.1)",   border:"rgba(1,138,190,0.25)",   text:P.ocean   },
  Pending:   { bg:"rgba(234,179,8,0.1)",   border:"rgba(234,179,8,0.25)",   text:"#b45309" },
  Cancelled: { bg:"rgba(220,38,38,0.1)",   border:"rgba(220,38,38,0.25)",   text:"#dc2626" },
};

const STATUS_ICONS = {
  Delivered: <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>,
  Shipped:   <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>,
  Pending:   <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  Cancelled: <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>,
};

const TABS = ["All","Pending","Shipped","Delivered"];

const PhoneIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
  </svg>
);

export default function VendorOrders() {
  const [tab, setTab] = useState("All");
  const visible = tab==="All" ? ORDERS : ORDERS.filter(o=>o.status===tab);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20, fontFamily:P.font }}>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ color:P.navy, fontWeight:900, fontSize:20, margin:"0 0 4px" }}>My Orders</h2>
          <p style={{ color:P.muted, fontSize:14, margin:0 }}>Track orders received from buyers</p>
        </div>
        {/* Tab filters */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {TABS.map(t=>{
            const active = tab===t;
            return (
              <button key={t} onClick={()=>setTab(t)} style={{
                padding:"6px 16px", borderRadius:999, fontSize:12, fontWeight:700, cursor:"pointer",
                fontFamily:P.font, transition:"all 0.15s",
                background: active ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.white,
                color: active ? P.white : P.muted,
                border: active ? "none" : `1px solid ${P.mist}`,
                boxShadow: active ? "0 4px 12px rgba(1,138,190,0.25)" : "none",
              }}>{t}</button>
            );
          })}
        </div>
      </div>

      {/* Order cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {visible.map((o,i)=>{
          const ss = STATUS_STYLE[o.status];
          return (
            <div key={i} style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:16, padding:"16px 20px", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap", transition:"all 0.15s", boxShadow:"0 2px 8px rgba(0,27,72,0.04)" }}
              onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 6px 20px rgba(1,138,190,0.1)"; e.currentTarget.style.borderColor=P.sky; }}
              onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 2px 8px rgba(0,27,72,0.04)"; e.currentTarget.style.borderColor=P.mist; }}>

              {/* Product icon */}
              <div style={{ width:44, height:44, background:`linear-gradient(135deg,${P.mist},${P.sky})`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:P.royal }}>
                <PhoneIcon/>
              </div>

              {/* Info */}
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ color:P.navy, fontWeight:700, fontSize:14, margin:"0 0 4px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{o.product}</p>
                <p style={{ color:P.muted, fontSize:12, margin:0 }}>
                  <span style={{ color:P.ocean, fontWeight:600 }}>{o.id}</span> · Buyer: {o.buyer} · {o.date}
                </p>
              </div>

              {/* Right */}
              <div style={{ display:"flex", alignItems:"center", gap:14, flexShrink:0 }}>
                <p style={{ color:P.navy, fontWeight:900, fontSize:15, margin:0 }}>{o.price}</p>
                <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:12, fontWeight:700, padding:"5px 12px", borderRadius:999, background:ss.bg, border:`1px solid ${ss.border}`, color:ss.text }}>
                  <span style={{ color:ss.text }}>{STATUS_ICONS[o.status]}</span>
                  {o.status}
                </span>
                <button style={{ background:"none", border:"none", color:P.ocean, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:P.font, padding:0, transition:"color 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.color=P.royal}
                  onMouseLeave={e=>e.currentTarget.style.color=P.ocean}>
                  Details →
                </button>
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <div style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:16, padding:"48px 0", textAlign:"center" }}>
            <p style={{ color:P.muted, fontSize:14, margin:0 }}>No orders in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}