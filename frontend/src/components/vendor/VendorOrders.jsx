import { useState, useEffect } from "react";
import { P } from "../dashboard/DashboardConstants";

const STATUS_STYLE = {
  Delivered: { bg: "#f0fdf4", border: "#bcf0da", text: "#16a34a" },
  Shipped:   { bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb" },
  Pending:   { bg: "#fffbeb", border: "#fde68a", text: "#d97706" },
  Cancelled: { bg: "#fef2f2", border: "#fecaca", text: "#dc2626" },
  Paid:      { bg: "#f0fdf4", border: "#bcf0da", text: "#16a34a" },
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
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(24, 24, 27, 0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: P.white, borderRadius: 28, padding: 40, maxWidth: 480, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.15)", border: `1px solid ${P.mist}` }}>
        {/* Icon */}
        <div style={{ width: 64, height: 64, borderRadius: 20, background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: P.navy }}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </div>

        <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 22, margin: "0 0 8px", textAlign: "center", fontFamily: P.fontHeading }}>Verify Delivery</h3>
        <p style={{ color: P.muted, fontSize: 14, margin: "0 0 32px", textAlign: "center", lineHeight: 1.6, fontWeight: 500 }}>
          You're about to mark order <span style={{ color: P.accent, fontWeight: 800 }}>{order.id}</span> as <strong style={{ color: P.navy }}>Delivered</strong>. 
          This will finalize the transaction for this shipment.
        </p>

        {/* Order Details Strip */}
        <div style={{ background: P.mistBg, borderRadius: 20, padding: 20, marginBottom: 32, border: `1px solid ${P.mist}` }}>
           {[
             { l: "Customer", v: order.buyer },
             { l: "Items", v: order.product },
             { l: "Total Value", v: order.price },
           ].map((r, i) => (
             <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 2 ? 10 : 0 }}>
               <span style={{ color: P.muted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.l}</span>
               <span style={{ color: P.navy, fontSize: 13, fontWeight: 800 }}>{r.v}</span>
             </div>
           ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 16 }}>
          <button onClick={onCancel} disabled={loading}
            style={{ flex: 1, padding: "14px 0", background: P.white, border: `1px solid ${P.mist}`, borderRadius: 14, fontSize: 14, fontWeight: 700, color: P.muted, cursor: "pointer", fontFamily: P.font, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = P.mistBg} onMouseLeave={e => e.currentTarget.style.background = P.white}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            style={{ flex: 1.5, padding: "14px 0", background: loading ? P.mist : P.navy, border: "none", borderRadius: 14, fontSize: 14, fontWeight: 800, color: P.white, cursor: loading ? "not-allowed" : "pointer", fontFamily: P.font, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s" }}>
            {loading ? (
              <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} /> Processing</>
            ) : "Confirm Delivery"}
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function VendorOrders() {
  const [tab, setTab] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOrder, setConfirmOrder] = useState(null);
  const [delivering, setDelivering] = useState(false);

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
          buyer:   o.user?.name  || "Guest Customer",
          email:   o.user?.email || "",
          price:   `NPR ${o.totalPrice.toLocaleString()}`,
          date:    new Date(o.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }),
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
          o._id === confirmOrder._id ? { ...o, status: "Delivered" } : o
        ));
        setConfirmOrder(null);
      } else {
        alert(res.message || "Action failed.");
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

      <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: P.font }}>

        {/* Header Section */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 24, margin: "0 0 6px", fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>Order Shipments</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: P.muted, fontSize: 13, fontWeight: 500 }}>{orders.length} total orders</span>
              {pendingCount > 0 && (
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: P.mist }}></div>
              )}
              {pendingCount > 0 && (
                <span style={{ color: "#d97706", fontSize: 13, fontWeight: 700 }}>{pendingCount} awaiting Fulfillment</span>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
             <button onClick={fetchOrders} title="Sync Data" style={{ width: 44, height: 44, borderRadius: 14, background: P.white, border: `1px solid ${P.mist}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: P.navy, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.transform = "rotate(180deg)"; }} onMouseLeave={e => { e.currentTarget.style.background = P.white; e.currentTarget.style.transform = "rotate(0)"; }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", background: P.white, padding: "6px", borderRadius: 16, border: `1px solid ${P.mist}`, alignSelf: "flex-start", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          {TABS.map(t => {
            const active = tab === t;
            const count = t === "All" ? orders.length : orders.filter(o => o.status === t).length;
            return (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "8px 18px", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer",
                fontFamily: P.font, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8,
                background: active ? P.navy : "transparent",
                color: active ? P.white : P.muted,
                border: "none",
              }}>
                {t}
                {count > 0 && (
                  <span style={{ background: active ? "rgba(255,255,255,0.2)" : P.mistBg, color: active ? P.white : P.navy, fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 8, minWidth: 20, textAlign: "center" }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 24, height: 100, opacity: 0.4, animation: "pulse 1.5s infinite ease-in-out" }} />
            ))}
          </div>
        )}

        {/* Order Feed */}
        {!loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {visible.map((o, i) => {
              const ss = STATUS_STYLE[o.status] || STATUS_STYLE.Pending;
              const canDeliver = o.status === "Pending" || o.status === "Paid";

              return (
                <div key={o._id || i} style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.02)", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = P.accent; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = P.mist; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.02)"; }}>

                  <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>

                    {/* Order Icon */}
                    <div style={{ width: 56, height: 56, background: P.mistBg, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: P.navy }}>
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 118 0m-4 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <span style={{ color: P.accent, fontWeight: 900, fontSize: 13, letterSpacing: "0.5px" }}>{o.id}</span>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: P.mist }}></div>
                        <span style={{ color: P.navy, fontWeight: 800, fontSize: 15 }}>{o.buyer}</span>
                      </div>
                      <p style={{ color: P.muted, fontSize: 13, fontWeight: 600, margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.product}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ color: P.muted, fontSize: 12, fontWeight: 500 }}>{o.date}</span>
                        {o.address && (
                          <span style={{ color: P.muted, fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {o.address.city || "Nepal"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats & Controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ color: P.navy, fontWeight: 900, fontSize: 17, margin: 0, fontFamily: P.fontHeading }}>{o.price}</p>
                        <p style={{ color: P.muted, fontSize: 11, fontWeight: 700, margin: 0 }}>TOTAL VALUE</p>
                      </div>

                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 800, padding: "6px 14px", borderRadius: 12, background: ss.bg, border: `1px solid ${ss.border}`, color: ss.text, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {STATUS_ICONS[o.status]}
                        {o.status}
                      </span>

                      {canDeliver && (
                        <button
                          onClick={() => setConfirmOrder(o)}
                          style={{
                            padding: "10px 18px",
                            background: P.navy,
                            color: P.white, border: "none", borderRadius: 12,
                            fontSize: 12, fontWeight: 800, cursor: "pointer",
                            fontFamily: P.font, display: "flex", alignItems: "center", gap: 8,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: "all 0.2s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                        >
                           Ship Order
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Order Inventory Strip */}
                  {o.items && o.items.length > 0 && (
                    <div style={{ borderTop: `1px solid ${P.mist}`, padding: "14px 24px", background: P.mistBg, display: "flex", gap: 24, overflowX: "auto" }}>
                      {o.items.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: P.white, border: `1px solid ${P.mist}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {item.image
                              ? <img src={item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                              : <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            }
                          </div>
                          <div>
                            <p style={{ color: P.navy, fontWeight: 800, fontSize: 12, margin: 0, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                            <p style={{ color: P.muted, fontSize: 11, fontWeight: 600, margin: 0 }}>Qty: {item.qty} · NPR {item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {visible.length === 0 && (
              <div style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 28, padding: "80px 0", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: 22, background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: P.muted }}>
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                </div>
                <p style={{ color: P.navy, fontWeight: 900, fontSize: 18, margin: "0 0 6px", fontFamily: P.fontHeading }}>Order Log Empty</p>
                <p style={{ color: P.muted, fontSize: 13, fontWeight: 500, margin: 0 }}>No orders match the "{tab}" criteria at this moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </>
  );
}