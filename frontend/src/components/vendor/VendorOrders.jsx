import { useState, useEffect } from "react";

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

const STATUS_STYLE = {
  Delivered: { bg:"rgba(34,197,94,0.1)",  border:"rgba(34,197,94,0.25)",  text:"#16a34a" },
  Shipped:   { bg:"rgba(40, 43, 74, 0.1)",  border:"rgba(40, 43, 74, 0.25)",  text:P.ocean   },
  Pending:   { bg:"rgba(234,179,8,0.1)",  border:"rgba(234,179,8,0.25)",  text:"#b45309" },
  Cancelled: { bg:"rgba(220,38,38,0.1)",  border:"rgba(220,38,38,0.25)",  text:"#dc2626" },
  Paid:      { bg:"rgba(34,197,94,0.1)",  border:"rgba(34,197,94,0.25)",  text:"#16a34a" },
};

const STATUS_ICONS = {
  Delivered: <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>,
  Shipped:   <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>,
  Pending:   <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  Cancelled: <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>,
  Paid:      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>,
};

const TABS = ["All", "Pending", "Paid", "Delivered", "Cancelled"];

// ── Confirm Delivery Modal ────────────────────────────────────────────────────
function ConfirmModal({ order, onConfirm, onCancel, loading }) {
  if (!order) return null;
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(0,15,40,0.6)", backdropFilter:"blur(4px)",
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <div style={{
        background:P.white, borderRadius:22, padding:"32px 36px",
        maxWidth:440, width:"90%", boxShadow:"0 24px 60px rgba(40, 43, 74, 0.22)",
      }}>
        {/* Icon */}
        <div style={{ width:56, height:56, borderRadius:16, background:"rgba(40, 43, 74, 0.1)", border:"1.5px solid rgba(40, 43, 74, 0.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke={P.ocean} strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
          </svg>
        </div>

        <h3 style={{ color:P.navy, fontWeight:900, fontSize:18, margin:"0 0 8px", textAlign:"center" }}>Confirm Delivery</h3>
        <p style={{ color:P.muted, fontSize:14, margin:"0 0 24px", textAlign:"center", lineHeight:1.6 }}>
          Are you sure you want to mark this order as&nbsp;
          <strong style={{ color:P.navy }}>Delivered</strong>?
          This action cannot be undone.
        </p>

        {/* Order summary */}
        <div style={{ background:P.mistBg, border:`1.5px solid ${P.mist}`, borderRadius:14, padding:"14px 18px", marginBottom:24 }}>
          {[
            { l:"Order ID", v: order.id,      vStyle:{ color:P.ocean, fontWeight:700 } },
            { l:"Buyer",    v: order.buyer,    vStyle:{ color:P.navy,  fontWeight:600 } },
            { l:"Items",    v: order.product,  vStyle:{ color:P.navy,  fontWeight:600 } },
          ].map((r,i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:P.muted, fontSize:13 }}>{r.l}</span>
              <span style={{ fontSize:13, ...r.vStyle }}>{r.v}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", paddingTop:8, borderTop:`1px solid ${P.mist}` }}>
            <span style={{ color:P.muted, fontSize:13, fontWeight:700 }}>Total</span>
            <span style={{ color:P.navy, fontWeight:900, fontSize:15 }}>{order.price}</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={onCancel} disabled={loading}
            style={{ flex:1, padding:"12px 0", background:P.mistBg, border:`1.5px solid ${P.mist}`, borderRadius:12, fontSize:14, fontWeight:700, color:P.muted, cursor:"pointer", fontFamily:P.font }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=P.sky; e.currentTarget.style.color=P.navy; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor=P.mist; e.currentTarget.style.color=P.muted; }}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            style={{ flex:1, padding:"12px 0", background:`linear-gradient(135deg,${P.royal},${P.ocean})`, border:"none", borderRadius:12, fontSize:14, fontWeight:700, color:P.white, cursor:loading?"not-allowed":"pointer", fontFamily:P.font, opacity:loading?0.75:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            {loading ? (
              <>
                <span style={{ width:14, height:14, border:"2px solid rgba(255,255,255,.35)", borderTopColor:P.white, borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }} />
                Processing…
              </>
            ) : (
              <>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                Confirm Delivery
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function VendorOrders() {
  const [tab,          setTab]         = useState("All");
  const [orders,       setOrders]      = useState([]);
  const [loading,      setLoading]     = useState(true);
  const [confirmOrder, setConfirmOrder]= useState(null);
  const [delivering,   setDelivering]  = useState(false);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { api } = await import("../../utils/api");
      const res = await api.get("/orders/vendor/myorders");
      if (res.success && res.data) {
        const mapped = res.data.map(o => ({
          _id:     o._id,
          id:      `#${o._id.substring(o._id.length - 6).toUpperCase()}`,
          product: o.orderItems.map(i => i.name).join(", ") || `${o.orderItems.length} item(s)`,
          buyer:   o.user?.name  || "Unknown",
          email:   o.user?.email || "",
          price:   `Rs. ${o.totalPrice.toFixed(2)}`,
          date:    new Date(o.createdAt).toLocaleDateString(undefined, { day:"numeric", month:"short", year:"numeric" }),
          status:  o.paymentStatus === "Cancelled" ? "Cancelled"
                 : o.isDelivered                   ? "Delivered"
                 : o.isPaid                        ? "Paid"
                 :                                   "Pending",
          items:   o.orderItems,
          address: o.shippingAddress,
        }));
        setOrders(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch vendor orders", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeliver = async () => {
    if (!confirmOrder) return;
    setDelivering(true);
    try {
      const { api } = await import("../../utils/api");
      const res = await api.put(`/orders/${confirmOrder._id}/deliver`, {});
      if (res.success) {
        setOrders(prev => prev.map(o =>
          o._id === confirmOrder._id ? { ...o, status:"Delivered" } : o
        ));
        setConfirmOrder(null);
      } else {
        alert(res.message || "Failed to mark as delivered.");
      }
    } catch (err) {
      alert(err.message || "Failed to mark as delivered.");
    } finally {
      setDelivering(false);
    }
  };

  const visible = tab === "All" ? orders : orders.filter(o => o.status === tab);
  const pendingCount = orders.filter(o => o.status === "Pending" || o.status === "Paid").length;

  return (
    <>
      <ConfirmModal order={confirmOrder} onConfirm={handleDeliver} onCancel={() => setConfirmOrder(null)} loading={delivering} />

      <div style={{ display:"flex", flexDirection:"column", gap:20, fontFamily:P.font }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <h2 style={{ color:P.navy, fontWeight:900, fontSize:20, margin:"0 0 4px" }}>My Orders</h2>
            <p style={{ color:P.muted, fontSize:14, margin:0 }}>
              {orders.length} total ·{" "}
              <span style={{ color: pendingCount > 0 ? "#b45309" : P.muted, fontWeight: pendingCount > 0 ? 700 : 400 }}>
                {pendingCount} awaiting delivery
              </span>
            </p>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
            {TABS.map(t => {
              const active = tab === t;
              const count = t === "All" ? orders.length : orders.filter(o => o.status === t).length;
              return (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding:"6px 14px", borderRadius:999, fontSize:12, fontWeight:700, cursor:"pointer",
                  fontFamily:P.font, transition:"all 0.15s", display:"flex", alignItems:"center", gap:5,
                  background: active ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.white,
                  color:  active ? P.white : P.muted,
                  border: active ? "none" : `1px solid ${P.mist}`,
                  boxShadow: active ? "0 4px 12px rgba(40, 43, 74, 0.25)" : "none",
                }}>
                  {t}
                  {count > 0 && (
                    <span style={{ background: active ? "rgba(255,255,255,0.25)" : P.mistBg, color: active ? P.white : P.muted, fontSize:10, fontWeight:800, padding:"1px 6px", borderRadius:999, minWidth:16, textAlign:"center" }}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
            <button onClick={fetchOrders} title="Refresh" style={{ width:34, height:34, borderRadius:10, background:P.mistBg, border:`1px solid ${P.mist}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:P.ocean }}
              onMouseEnter={e=>{ e.currentTarget.style.background=P.white; e.currentTarget.style.borderColor=P.sky; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=P.mistBg; e.currentTarget.style.borderColor=P.mist; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:16, height:76, opacity:0.5 }} />
            ))}
          </div>
        )}

        {/* Order cards */}
        {!loading && (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {visible.map((o, i) => {
              const ss = STATUS_STYLE[o.status] || STATUS_STYLE.Pending;
              const canDeliver = o.status === "Pending" || o.status === "Paid";

              return (
                <div key={o._id || i} style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:16, overflow:"hidden", boxShadow:"0 2px 8px rgba(40, 43, 74, 0.04)", transition:"border-color .15s, box-shadow .15s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 6px 20px rgba(40, 43, 74, 0.1)"; e.currentTarget.style.borderColor=P.sky; }}
                  onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 2px 8px rgba(40, 43, 74, 0.04)"; e.currentTarget.style.borderColor=P.mist; }}>

                  <div style={{ padding:"16px 20px", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>

                    {/* Icon */}
                    <div style={{ width:48, height:48, background:`linear-gradient(135deg,${P.mist},${P.sky})`, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:P.royal }}>
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                      </svg>
                    </div>

                    {/* Info */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ color:P.navy, fontWeight:700, fontSize:14, margin:"0 0 3px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{o.product}</p>
                      <p style={{ color:P.muted, fontSize:12, margin:"0 0 2px" }}>
                        <span style={{ color:P.ocean, fontWeight:700 }}>{o.id}</span>
                        {" · "}Buyer: <strong style={{ color:P.navy }}>{o.buyer}</strong>
                        {" · "}{o.date}
                      </p>
                      {o.address && (
                        <p style={{ color:P.muted, fontSize:11, margin:0 }}>
                          📍 {[o.address.address, o.address.city, o.address.country].filter(Boolean).join(", ")}
                        </p>
                      )}
                    </div>

                    {/* Right */}
                    <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
                      <p style={{ color:P.navy, fontWeight:900, fontSize:15, margin:0 }}>{o.price}</p>

                      <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:12, fontWeight:700, padding:"5px 12px", borderRadius:999, background:ss.bg, border:`1px solid ${ss.border}`, color:ss.text }}>
                        {STATUS_ICONS[o.status]}
                        {o.status}
                      </span>

                      {/* ── Mark Delivered button ── */}
                      {canDeliver && (
                        <button
                          onClick={() => setConfirmOrder(o)}
                          style={{
                            padding:"7px 16px",
                            background:`linear-gradient(135deg,${P.royal},${P.ocean})`,
                            color:P.white, border:"none", borderRadius:10,
                            fontSize:12, fontWeight:700, cursor:"pointer",
                            fontFamily:P.font, display:"flex", alignItems:"center", gap:6,
                            boxShadow:"0 3px 10px rgba(40, 43, 74, 0.3)", transition:"all .15s",
                          }}
                          onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 6px 16px rgba(40, 43, 74, 0.4)"; }}
                          onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 3px 10px rgba(40, 43, 74, 0.3)"; }}
                        >
                          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                          </svg>
                          Mark Delivered
                        </button>
                      )}

                      {o.status === "Delivered" && (
                        <span style={{ fontSize:11, color:"#16a34a", fontWeight:700, display:"flex", alignItems:"center", gap:4 }}>
                          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                          Delivered
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item strip */}
                  {o.items && o.items.length > 0 && (
                    <div style={{ borderTop:`1px solid ${P.mist}`, padding:"10px 20px", background:P.mistBg, display:"flex", gap:16, overflowX:"auto" }}>
                      {o.items.map((item, idx) => (
                        <div key={idx} style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                          <div style={{ width:32, height:32, borderRadius:8, background:P.white, border:`1px solid ${P.mist}`, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            {item.image
                              ? <img src={item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                              : <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                            }
                          </div>
                          <div>
                            <p style={{ color:P.navy, fontWeight:600, fontSize:12, margin:0, maxWidth:120, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</p>
                            <p style={{ color:P.muted, fontSize:11, margin:0 }}>Qty: {item.qty} · Rs. {item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {visible.length === 0 && (
              <div style={{ background:P.white, border:`1px solid ${P.mist}`, borderRadius:16, padding:"56px 0", textAlign:"center" }}>
                <div style={{ width:52, height:52, borderRadius:14, background:P.mistBg, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", color:P.muted }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                </div>
                <p style={{ color:P.navy, fontWeight:700, fontSize:15, margin:"0 0 4px" }}>No orders found</p>
                <p style={{ color:P.muted, fontSize:13, margin:0 }}>No "{tab}" orders yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}