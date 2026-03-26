import { useState, useEffect } from "react";
import { P, STATUS_COLORS } from "./DashboardConstants";
import { Icon } from "./DashboardIcons";
import { Btn, ProductThumb } from "./DashboardUI";
import { api } from "../../utils/api";

// ─── Confirm Modal ────────────────────────────────────────────────────────────
function ConfirmModal({ open, type, onConfirm, onCancel: onClose, loading }) {
  if (!open) return null;

  const isDelete = type === "delete";
  const accentColor = isDelete ? P.royal : P.ocean;
  const accentBg    = isDelete ? "rgba(40, 43, 74, .08)"  : "rgba(40, 43, 74, .08)";
  const accentBorder= isDelete ? "rgba(40, 43, 74, .25)"  : "rgba(40, 43, 74, .25)";

  const icon = isDelete ? (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>
    </svg>
  ) : (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );

  const title   = isDelete ? "Delete Order" : "Cancel Order";
  const message = isDelete
    ? "This order will be permanently removed from your history. This action cannot be undone."
    : "Are you sure you want to cancel this order? This action cannot be reversed.";
  const confirmLabel = isDelete ? "Yes, Delete" : "Yes, Cancel Order";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99999,
        background: "rgba(0,0,0,0)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn .18s ease both",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: P.white,
          borderRadius: 24,
          padding: "36px 32px 28px",
          width: "100%", maxWidth: 420,
          boxShadow: "0 24px 64px rgba(40, 43, 74, 0.22)",
          animation: "scaleIn .22s cubic-bezier(.4,0,.2,1) both",
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center",
          fontFamily: P.font,
        }}
      >
        {/* Icon badge */}
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: accentBg, border: `1.5px solid ${accentBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
        }}>
          {icon}
        </div>

        <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 20, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
          {title}
        </h3>
        <p style={{ color: P.muted, fontSize: 14, lineHeight: 1.6, margin: "0 0 28px", maxWidth: 300 }}>
          {message}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, width: "100%" }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              flex: 1, padding: "12px 0", borderRadius: 12,
              background: P.mistBg, color: P.muted,
              border: `1.5px solid ${P.mist}`,
              fontWeight: 700, fontSize: 14, cursor: "pointer",
              fontFamily: P.font, transition: "all .18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = P.mist; e.currentTarget.style.color = P.navy; }}
            onMouseLeave={e => { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.color = P.muted; }}
          >
            Keep It
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              flex: 1, padding: "12px 0", borderRadius: 12,
              background: loading ? accentBg : `linear-gradient(135deg,${P.royal},${P.ocean})`,
              color: loading ? P.ocean : P.white,
              border: `1.5px solid ${accentColor}`,
              fontWeight: 700, fontSize: 14,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: P.font, transition: "all .18s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              opacity: loading ? 0.75 : 1,
              boxShadow: loading ? "none" : "0 4px 14px rgba(40, 43, 74, .3)",
            }}
          >
            {loading && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" style={{ animation: "spin .7s linear infinite" }}>
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
            )}
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardOrders({ setTab, viewProduct, orders: initialOrders, onDelete, onCancel }) {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [localOrders, setLocalOrders] = useState([]);
  const [cancelling, setCancelling] = useState(null);
  const [deleting,   setDeleting]   = useState(null);

  // Modal state
  const [modal, setModal] = useState({ open: false, type: null, orderId: null });

  useEffect(() => {
    setLocalOrders(initialOrders);
  }, [initialOrders]);

  const statuses = ["All", "Pending", "Paid", "Delivered", "Cancelled", "Failed"];
  const filtered = filter === "All" ? localOrders : localOrders.filter((o) => o.paymentStatus === filter);

  const openModal = (type, orderId, e) => {
    e.stopPropagation();
    setModal({ open: true, type, orderId });
  };
  const closeModal = () => setModal({ open: false, type: null, orderId: null });

  const handleConfirm = async () => {
    const { type, orderId } = modal;
    if (type === "cancel") await doCancel(orderId);
    if (type === "delete") await doDelete(orderId);
  };

  const doCancel = async (orderId) => {
    setCancelling(orderId);
    try {
      const res = await api.put(`/orders/${orderId}/cancel`, {});
      if (res.success) {
        setLocalOrders(prev => prev.map(o => o._id === orderId ? { ...o, paymentStatus: "Cancelled" } : o));
        if (onCancel) onCancel(orderId, { paymentStatus: "Cancelled" });
        closeModal();
      } else {
        alert(res.message || "Failed to cancel order");
      }
    } catch (err) {
      alert(err.message || "Error cancelling order");
      console.error(err);
    } finally {
      setCancelling(null);
    }
  };

  const doDelete = async (orderId) => {
    setDeleting(orderId);
    try {
      const res = await api.delete(`/orders/${orderId}`);
      if (res.success) {
        setLocalOrders(prev => prev.filter(o => o._id !== orderId));
        if (onDelete) onDelete(orderId);
        closeModal();
      } else {
        alert(res.message || "Failed to delete order");
      }
    } catch (err) {
      alert(err.message || "Error deleting order");
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
    <ConfirmModal
      open={modal.open}
      type={modal.type}
      loading={modal.type === "delete" ? deleting === modal.orderId : cancelling === modal.orderId}
      onConfirm={handleConfirm}
      onCancel={closeModal}
    />
    <div className="page" style={{ padding: "28px 32px", fontFamily: P.font, maxWidth: 1000, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 28, margin: 0, letterSpacing: "-0.02em" }}>My Orders</h2>
          <p style={{ color: P.muted, fontSize: 14, margin: "4px 0 0" }}>{localOrders.length} total orders</p>
        </div>
      </div>

      {/* Status filter pills */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, overflowX: "auto", paddingBottom: 8 }}>
        {statuses.map((s) => {
          const active = filter === s;
          return (
            <button 
              key={s} 
              onClick={() => setFilter(s)} 
              style={{ 
                padding: "8px 20px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer", 
                border: active ? `1.5px solid ${P.ocean}` : `1.5px solid ${P.mist}`, 
                background: active ? `linear-gradient(135deg,${P.royal},${P.ocean})` : P.white, 
                color: active ? P.white : P.muted, whiteSpace: "nowrap", fontFamily: P.font, 
                transition: "all .2s", boxShadow: active ? "0 4px 14px rgba(40, 43, 74, .25)" : "none" 
              }}
              className="btn"
            >
              {s}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 80, background: P.white, borderRadius: 20, border: `1.5px dashed ${P.mist}` }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: P.mistBg, color: P.muted, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            {Icon.box}
          </div>
          <h3 style={{ color: P.navy, fontSize: 18, fontWeight: 800, margin: "0 0 8px" }}>No Orders Found</h3>
          <p style={{ color: P.muted, fontSize: 14, margin: 0 }}>You don't have any orders with this status.</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map((order, i) => {
          const sc = STATUS_COLORS[order.paymentStatus] || { bg: "#f3f4f6", border: "#d1d5db", text: "#4b5563" };
          const isOpen = expanded === order._id;
          const items = order.orderItems || [];
          const firstItem = items[0];
          const hasMore = items.length > 1;
          const canCancel = order.paymentStatus === "Pending";
          const canDelete = order.paymentStatus === "Cancelled" || order.paymentStatus === "Failed";

          return (
            <div 
              key={order._id} 
              style={{ 
                background: P.white, border: `1.5px solid ${P.mist}`, borderRadius: 20, overflow: "hidden", 
                boxShadow: "0 4px 16px rgba(40, 43, 74, .04)", animationName: "fadeUp", animationDuration: ".4s", 
                animationTimingFunction: "cubic-bezier(.4,0,.2,1)", animationFillMode: "both", 
                animationDelay: `${i * .05}s`, transition: "border-color .2s" 
              }}
            >
              {/* Main Summary Row */}
              <div 
                style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 20, cursor: "pointer" }} 
                onClick={() => setExpanded(isOpen ? null : order._id)}
              >
                {/* Product Thumbnail Preview */}
                <div style={{ width: 64, height: 64, borderRadius: 14, background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${P.mist}`, flexShrink: 0, overflow: "hidden", position: "relative" }}>
                  {firstItem?.image ? (
                    <img src={firstItem.image.startsWith("http") ? firstItem.image : `http://localhost:5000${firstItem.image}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Product preview" />
                  ) : (
                    <ProductThumb cat="placeholder" size={32} />
                  )}
                  {hasMore && (
                    <div style={{ position: "absolute", bottom: 0, right: 0, background: "rgba(40, 43, 74, .8)", color: P.white, fontSize: 10, fontWeight: 800, padding: "2px 6px", borderTopLeftRadius: 8 }}>
                      +{items.length - 1}
                    </div>
                  )}
                </div>

                {/* Primary Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                    <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 16, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {firstItem?.name || "Order Items"} {hasMore && <span style={{ color: P.muted, fontWeight: 600, fontSize: 14 }}>& {items.length - 1} more</span>}
                    </h3>
                    <span style={{ fontSize: 12, fontWeight: 800, padding: "3px 12px", borderRadius: 999, background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, color: P.muted, fontSize: 13 }}>
                    <span>Order #{order._id.substring(order._id.length - 8)}</span>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: P.mist }} />
                    <span>{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: P.mist }} />
                    <span style={{ color: P.navy, fontWeight: 800 }}>Rs. {order.totalPrice?.toLocaleString() || 0}</span>
                  </div>
                </div>

                {/* Actions & Chevron */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  {canCancel && (
                    <button 
                      onClick={(e) => openModal("cancel", order._id, e)} 
                      disabled={cancelling === order._id}
                      style={{ 
                        padding: "8px 16px", background: "rgba(239,68,68,.1)", color: "#ef4444", 
                        border: "1px solid rgba(239,68,68,.25)", borderRadius: 10, fontSize: 13, 
                        fontWeight: 700, cursor: cancelling === order._id ? "not-allowed" : "pointer", 
                        opacity: cancelling === order._id ? 0.7 : 1, transition: "all .2s",
                        fontFamily: P.font,
                      }}
                      className="btn"
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#ef4444"; e.currentTarget.style.color = P.white; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,.1)"; e.currentTarget.style.color = "#ef4444"; }}
                    >
                      {cancelling === order._id ? "Cancelling..." : "Cancel Order"}
                    </button>
                  )}

                  {/* Delete button — only for Cancelled or Failed orders */}
                  {canDelete && (
                    <button
                      onClick={(e) => openModal("delete", order._id, e)}
                      disabled={deleting === order._id}
                      title="Delete from history"
                      style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: "rgba(220,38,38,.08)",
                        border: "1.5px solid rgba(220,38,38,.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: deleting === order._id ? "not-allowed" : "pointer",
                        opacity: deleting === order._id ? 0.5 : 1,
                        transition: "all .2s", flexShrink: 0,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#ef4444"; e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.querySelector("svg").style.stroke = P.white; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(220,38,38,.08)"; e.currentTarget.style.borderColor = "rgba(220,38,38,.2)"; e.currentTarget.querySelector("svg").style.stroke = "#ef4444"; }}
                    >
                      {deleting === order._id ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin .7s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                      )}
                    </button>
                  )}

                  <span style={{ color: P.muted, transition: "transform .3s cubic-bezier(.4,0,.2,1)", transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </span>
                </div>
              </div>

              {/* Expanded Detail View */}
              {isOpen && (
                <div style={{ padding: "0 24px 24px", borderTop: `1px solid ${P.mist}`, background: "#fafcff", animationName: "fadeUp", animationDuration: ".3s", animationFillMode: "both" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0 16px" }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: P.muted, letterSpacing: ".1em", textTransform: "uppercase", margin: 0 }}>Items in this order</p>
                    <Btn cls="btn" style={{ padding: "8px 16px", background: P.white, color: P.ocean, fontSize: 12, fontWeight: 800, borderRadius: 8, border: `1.5px solid ${P.mist}`, display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      View Invoice
                    </Btn>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {items.map((item, idx) => (
                      <div 
                        key={idx} 
                        style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", background: P.white, borderRadius: 14, border: `1.5px solid ${P.mist}`, cursor: "pointer", transition: "all .15s" }}
                        onClick={() => viewProduct(item.product)}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = P.sky; e.currentTarget.style.boxShadow = "0 4px 12px rgba(40, 43, 74, .05)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = P.mist; e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <div style={{ width: 56, height: 56, borderRadius: 10, background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${P.mist}`, flexShrink: 0, color: P.sky, overflow: "hidden" }}>
                           {item.image ? (
                             <img src={item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={item.name} />
                           ) : (
                             <ProductThumb cat="placeholder" size={28} />
                           )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ color: P.navy, fontWeight: 800, fontSize: 15, margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, color: P.muted, fontSize: 12 }}>
                            <span>Qty: <strong style={{ color: P.navy }}>{item.qty || 1}</strong></span>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: P.mist }} />
                            <span>Rs. {item.price?.toLocaleString() || 0} each</span>
                          </div>
                        </div>
                        <span style={{ color: P.navy, fontWeight: 900, fontSize: 16, flexShrink: 0 }}>
                          Rs. {((item.price || 0) * (item.qty || 1)).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Summary Footer */}
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px dashed ${P.mist}`, display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ width: 250, display: "flex", flexDirection: "column", gap: 8 }}>
                       <div style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 13 }}><span>Subtotal</span> <span style={{ color: P.navy, fontWeight: 700 }}>Rs. {order.itemsPrice || order.totalPrice}</span></div>
                       <div style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 13 }}><span>Shipping</span> <span style={{ color: P.navy, fontWeight: 700 }}>Rs. {order.shippingPrice || 0}</span></div>
                       <div style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 13 }}><span>Tax</span> <span style={{ color: P.navy, fontWeight: 700 }}>Rs. {order.taxPrice || 0}</span></div>
                       <div style={{ display: "flex", justifyContent: "space-between", color: P.navy, fontSize: 16, fontWeight: 900, marginTop: 4, paddingTop: 8, borderTop: `1.5px solid ${P.mist}` }}>
                         <span>Total</span> <span>Rs. {order.totalPrice?.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </>
  );
}