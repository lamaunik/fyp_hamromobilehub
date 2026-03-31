import { useState, useEffect } from "react";
import { P } from "./DashboardConstants";
import { Icon } from "./DashboardIcons";
import { Btn } from "./DashboardUI";
import { api } from "../../utils/api";

export default function DashboardCheckout({ cart, user, setTab, addOrder, clearCart, addNotif }) {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Khalti");

  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    postalCode: "",
    country: "Nepal"
  });

  const subtotal = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const shipping = subtotal > 500 ? 0 : 29;
  const tax = Math.round(subtotal * 0.08); 
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.address || !address.city) {
      addNotif({ title: "Validation Error", time: "Just now", type: "error" });
      alert("Please fill in all required shipping details.");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        orderItems: cart.map(item => ({
          product: item._id || item.id,
          name: item.name,
          qty: item.qty,
          image: item.images?.[0] || "",
          price: item.price
        })),
        shippingAddress: address,
        paymentMethod: paymentMethod,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total
      };

      const res = await api.post("/orders", orderData);
      
      if (res.success) {
        if (paymentMethod === "Khalti") {
          const khaltiRes = await api.post("/orders/khalti/initiate", { orderId: res.data._id || res.data.id });
          if (khaltiRes.success && khaltiRes.payment_url) {
             window.location.href = khaltiRes.payment_url;
             return; 
          } else {
             alert(khaltiRes.message || "Failed to contact Khalti servers.");
             setLoading(false);
          }
        } else {
          // Cash on Delivery
          clearCart();
          addOrder(res.data);
          addNotif({ title: "Order Placed Successfully!", time: "Just now" });
          setTab("home");
        }
      } else {
        alert(res.message || "Failed to create order.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during checkout.");
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ padding: "28px 32px", fontFamily: P.font }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <button onClick={() => setTab("cart")} style={{ background: "none", border: "none", color: P.muted, cursor: "pointer", display: "flex", alignItems: "center" }}>
          {Icon.back}
        </button>
        <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 22, margin: 0, letterSpacing: "-.02em" }}>Secure Checkout</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
        
        {/* Left: Forms */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* Shipping Form */}
          <div style={{ background: P.white, padding: 32, borderRadius: 24, border: `1px solid ${P.mist}`, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: P.mistBg, color: P.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: P.navy, margin: 0 }}>Shipping Information</h3>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: P.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Full Name</label>
                <input name="fullName" value={address.fullName} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${P.mist}`, background: P.mistBg, fontSize: 14, color: P.navy, transition: "all .2s" }} onFocus={e => e.target.style.borderColor = P.sky} onBlur={e => e.target.style.borderColor = P.mist} placeholder="John Doe" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: P.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Phone Number</label>
                <input name="phone" value={address.phone} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${P.mist}`, background: P.mistBg, fontSize: 14, color: P.navy, transition: "all .2s" }} onFocus={e => e.target.style.borderColor = P.sky} onBlur={e => e.target.style.borderColor = P.mist} placeholder="98XXXXXXX" />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: P.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Street Address</label>
              <input name="address" value={address.address} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${P.mist}`, background: P.mistBg, fontSize: 14, color: P.navy, transition: "all .2s" }} onFocus={e => e.target.style.borderColor = P.sky} onBlur={e => e.target.style.borderColor = P.mist} placeholder="Apartment, suite, etc." />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: P.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>City</label>
                <input name="city" value={address.city} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${P.mist}`, background: P.mistBg, fontSize: 14, color: P.navy, transition: "all .2s" }} onFocus={e => e.target.style.borderColor = P.sky} onBlur={e => e.target.style.borderColor = P.mist} placeholder="Kathmandu" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: P.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Postal Code</label>
                <input name="postalCode" value={address.postalCode} onChange={handleInputChange} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${P.mist}`, background: P.mistBg, fontSize: 14, color: P.navy, transition: "all .2s" }} onFocus={e => e.target.style.borderColor = P.sky} onBlur={e => e.target.style.borderColor = P.mist} placeholder="44600" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ background: P.white, padding: 32, borderRadius: 24, border: `1px solid ${P.mist}`, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: P.mistBg, color: P.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                 <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: P.navy, margin: 0 }}>Payment Selection</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", border: `2.5px solid ${paymentMethod === "Khalti" ? P.accent : P.mist}`, borderRadius: 16, cursor: "pointer", background: paymentMethod === "Khalti" ? "rgba(244,63,94,0.02)" : P.white, transition: "all .2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <input type="radio" checked={paymentMethod === "Khalti"} onChange={() => setPaymentMethod("Khalti")} style={{ width: 18, height: 18, accentColor: P.accent }} />
                  <div>
                    <span style={{ display: "block", fontWeight: 800, color: P.navy, fontSize: 14 }}>Khalti Digital Wallet</span>
                    <span style={{ display: "block", fontSize: 12, color: P.muted, marginTop: 2 }}>Secure instant payment</span>
                  </div>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/en/e/e0/Khalti_Digital_Wallet_Logo.png" alt="Khalti" style={{ height: 28, width: "auto" }} />
              </label>

              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", border: `2.5px solid ${paymentMethod === "COD" ? P.navy : P.mist}`, borderRadius: 16, cursor: "pointer", background: paymentMethod === "COD" ? P.mistBg : P.white, transition: "all .2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <input type="radio" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} style={{ width: 18, height: 18, accentColor: P.navy }} />
                  <div>
                    <span style={{ display: "block", fontWeight: 800, color: P.navy, fontSize: 14 }}>Cash on Delivery</span>
                    <span style={{ display: "block", fontSize: 12, color: P.muted, marginTop: 2 }}>Pay when you receive items</span>
                  </div>
                </div>

              </label>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div style={{ position: "sticky", top: 20 }}>
          <div style={{ background: P.white, padding: 32, borderRadius: 28, border: `1px solid ${P.mist}`, boxShadow: "0 12px 40px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: 17, fontWeight: 900, color: P.navy, margin: "0 0 24px" }}>Order Summary</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24, maxHeight: 180, overflowY: "auto", paddingRight: 8 }}>
              {cart.map(item => (
                <div key={item._id || item.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: P.mistBg, border: `1px solid ${P.mist}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                    {item.images?.[0] ? <img src={item.images[0].startsWith("http") ? item.images[0] : `http://localhost:5000${item.images[0]}`} style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : Icon.products}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: P.navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: 11, color: P.muted }}>Qty: {item.qty}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: P.navy }}>Rs. {item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "20px 0", borderTop: `1.5px solid ${P.mist}`, borderBottom: `1.5px solid ${P.mist}`, marginBottom: 24 }}>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                 <span style={{ color: P.muted, fontWeight: 600 }}>Subtotal</span>
                 <span style={{ color: P.navy, fontWeight: 700 }}>Rs. {subtotal}</span>
               </div>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                 <span style={{ color: P.muted, fontWeight: 600 }}>Shipping</span>
                 <span style={{ color: shipping === 0 ? "#16a34a" : P.navy, fontWeight: 700 }}>{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
               </div>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                 <span style={{ color: P.muted, fontWeight: 600 }}>Fees & Tax</span>
                 <span style={{ color: P.navy, fontWeight: 700 }}>Rs. {tax}</span>
               </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
               <span style={{ fontSize: 14, fontWeight: 800, color: P.navy, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total</span>
               <span style={{ fontSize: 28, fontWeight: 900, color: P.navy, letterSpacing: "-0.02em" }}>Rs. {total}</span>
            </div>

            <button onClick={handleCheckout} disabled={loading} style={{ 
              width: "100%", padding: "18px", borderRadius: 16, border: "none", 
              background: paymentMethod === "Khalti" ? "#5d2e8e" : P.navy,
              color: P.white, fontWeight: 900, fontSize: 15, cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)", transition: "all .2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              opacity: loading ? 0.7 : 1
            }}>
              {loading ? "Processing..." : paymentMethod === "Khalti" ? "Pay with Khalti Wallet" : "Confirm Order"}
            </button>
            <p style={{ textAlign: "center", fontSize: 11, color: P.muted, marginTop: 16 }}>Secure checkout powered by HamroMobileHub API</p>
          </div>
        </div>

      </div>
    </div>
  );
}
