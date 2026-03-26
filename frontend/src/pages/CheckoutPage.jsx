import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { P } from "../components/dashboard/DashboardConstants";
import { Icon } from "../components/dashboard/DashboardIcons";

// Helper to safely parse cart/wishlist
const readLS = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };

export default function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => readLS("hmh_cart", []));
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
  const tax = Math.round(subtotal * 0.08); // 8% flat tax example
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      navigate("/dashboard");
    }
  }, [cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.address || !address.city) {
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
          // Khalti Flow
          const khaltiRes = await api.post("/orders/khalti/initiate", { orderId: res.data._id || res.data.id });
          if (khaltiRes.success && khaltiRes.payment_url) {
             window.location.href = khaltiRes.payment_url;
             return; // Leave loading true as we redirect
          } else {
             alert(khaltiRes.message || "Failed to contact Khalti servers.");
             setLoading(false);
             return;
          }
        } else {
          // Cash on Delivery Flow
          localStorage.setItem("hmh_cart", "[]");
          navigate("/success?method=COD");
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

  if (cart.length === 0) return null;

  return (
    <div style={{ minHeight: "100vh", background: P.mistBg, display: "flex", flexDirection: "column", fontFamily: P.font }}>
      {/* Topbar Light */}
      <header style={{ background: P.white, padding: "20px 32px", borderBottom: `1px solid ${P.mist}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor:"pointer" }} onClick={() => navigate("/dashboard")}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: P.royal, display: "flex", alignItems: "center", justifyContent: "center", color: P.white, fontWeight: 900 }}>M</div>
          <span style={{ fontSize: 18, fontWeight: 900, color: P.navy }}>HamroMobile<span style={{ color: P.ocean }}>Hub</span> Checkout</span>
        </div>
        <button onClick={() => navigate("/dashboard")} style={{ background:"none", border:"none", color:P.muted, fontSize:14, fontWeight:600, cursor:"pointer" }}>Cancel</button>
      </header>

      <div style={{ flex: 1, padding: "40px 32px", display:"flex", justifyContent:"center" }}>
        <div style={{ width:"100%", maxWidth:1000, display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:40, alignItems:"start" }}>
          
          {/* Left Column: Form */}
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            
            {/* Shipping Card */}
            <div style={{ background: P.white, padding: 32, borderRadius: 20, border: `1px solid ${P.mist}`, boxShadow: "0 4px 14px rgba(40,43,74,0.03)" }}>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: P.navy, margin: "0 0 24px" }}>Shipping Details</h2>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                <div>
                  <label style={{ display:"block", fontSize:12, fontWeight:700, color:P.navy, marginBottom:8 }}>Full Name *</label>
                  <input type="text" name="fullName" value={address.fullName} onChange={handleInputChange} style={{ width:"100%", boxSizing:"border-box", padding:"12px 14px", borderRadius:12, border:`1.5px solid ${P.mist}`, outline:"none", fontFamily:P.font, fontSize:14, color:P.navy }} placeholder="John Doe" />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:12, fontWeight:700, color:P.navy, marginBottom:8 }}>Phone Number *</label>
                  <input type="tel" name="phone" value={address.phone} onChange={handleInputChange} style={{ width:"100%", boxSizing:"border-box", padding:"12px 14px", borderRadius:12, border:`1.5px solid ${P.mist}`, outline:"none", fontFamily:P.font, fontSize:14, color:P.navy }} placeholder="9800000000" />
                </div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:12, fontWeight:700, color:P.navy, marginBottom:8 }}>Street Address *</label>
                <input type="text" name="address" value={address.address} onChange={handleInputChange} style={{ width:"100%", boxSizing:"border-box", padding:"12px 14px", borderRadius:12, border:`1.5px solid ${P.mist}`, outline:"none", fontFamily:P.font, fontSize:14, color:P.navy }} placeholder="123 Main St" />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div>
                  <label style={{ display:"block", fontSize:12, fontWeight:700, color:P.navy, marginBottom:8 }}>City *</label>
                  <input type="text" name="city" value={address.city} onChange={handleInputChange} style={{ width:"100%", boxSizing:"border-box", padding:"12px 14px", borderRadius:12, border:`1.5px solid ${P.mist}`, outline:"none", fontFamily:P.font, fontSize:14, color:P.navy }} placeholder="Kathmandu" />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:12, fontWeight:700, color:P.navy, marginBottom:8 }}>Postal Code</label>
                  <input type="text" name="postalCode" value={address.postalCode} onChange={handleInputChange} style={{ width:"100%", boxSizing:"border-box", padding:"12px 14px", borderRadius:12, border:`1.5px solid ${P.mist}`, outline:"none", fontFamily:P.font, fontSize:14, color:P.navy }} placeholder="44600" />
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div style={{ background: P.white, padding: 32, borderRadius: 20, border: `1px solid ${P.mist}`, boxShadow: "0 4px 14px rgba(40,43,74,0.03)" }}>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: P.navy, margin: "0 0 24px" }}>Payment Method</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <label style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", border:`2px solid ${paymentMethod === "Khalti" ? P.royal : P.mist}`, borderRadius:14, cursor:"pointer", background: paymentMethod === "Khalti" ? "rgba(40,43,74,0.03)" : P.white, transition:"all .2s" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                     <input type="radio" name="payment" checked={paymentMethod === "Khalti"} onChange={() => setPaymentMethod("Khalti")} style={{ width:18, height:18, accentColor:P.royal }} />
                     <div>
                       <span style={{ display:"block", fontWeight:800, color:P.navy, fontSize:15, marginBottom:2 }}>Khalti ePayment</span>
                       <span style={{ display:"block", fontSize:12, color:P.muted }}>Pay securely using your Khalti digital wallet</span>
                     </div>
                  </div>
                  <div style={{ width: 50, height: 50, borderRadius:8, background: P.white, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", border:`1px solid ${P.mist}` }}>
                     <img src="https://upload.wikimedia.org/wikipedia/en/e/e0/Khalti_Digital_Wallet_Logo.png" alt="Khalti Logo" style={{ width: "90%", height: "90%", objectFit: "contain" }} />
                  </div>
                </label>

                <label style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", border:`2px solid ${paymentMethod === "Cash On Delivery" ? P.royal : P.mist}`, borderRadius:14, cursor:"pointer", background: paymentMethod === "Cash On Delivery" ? "rgba(40,43,74,0.03)" : P.white, transition:"all .2s" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                     <input type="radio" name="payment" checked={paymentMethod === "Cash On Delivery"} onChange={() => setPaymentMethod("Cash On Delivery")} style={{ width:18, height:18, accentColor:P.royal }} />
                     <div>
                       <span style={{ display:"block", fontWeight:800, color:P.navy, fontSize:15, marginBottom:2 }}>Cash on Delivery</span>
                       <span style={{ display:"block", fontSize:12, color:P.muted }}>Pay when your package arrives</span>
                     </div>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius:10, background: P.mist, color:P.navy, display:"flex", alignItems:"center", justifyContent:"center" }}>🚚</div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div style={{ background: P.white, padding: 32, borderRadius: 20, border: `1px solid ${P.mist}`, boxShadow: "0 8px 32px rgba(40,43,74,0.08)", position: "sticky", top: 40 }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: P.navy, margin: "0 0 24px" }}>Order Summary</h3>
            
            <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:24, maxHeight:200, overflowY:"auto", paddingRight:8 }}>
              {cart.map(item => (
                <div key={item._id || item.id} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:50, height:50, borderRadius:10, background:P.mistBg, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", border:`1px solid ${P.mist}` }}>
                     {item.images?.[0] ? <img src={item.images[0].startsWith("http") ? item.images[0] : `http://localhost:5000${item.images[0]}`} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"contain" }} /> : <span style={{fontSize:10}}>No Img</span>}
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:"0 0 4px", fontSize:14, fontWeight:700, color:P.navy, whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden" }}>{item.name}</p>
                    <p style={{ margin:0, fontSize:12, color:P.muted }}>Qty: {item.qty} × Rs. {item.price}</p>
                  </div>
                  <div style={{ fontWeight:800, color:P.navy, fontSize:14 }}>
                    Rs. {item.qty * item.price}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop:`1.5px solid ${P.mist}`, borderBottom:`1.5px solid ${P.mist}`, padding:"20px 0", display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: P.muted, fontSize: 13, fontWeight: 600 }}>Subtotal</span>
                <span style={{ color: P.navy, fontWeight: 700, fontSize: 13 }}>Rs. {subtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: P.muted, fontSize: 13, fontWeight: 600 }}>Shipping</span>
                <span style={{ color: shipping === 0 ? "#16a34a" : P.navy, fontWeight: 700, fontSize: 13 }}>{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: P.muted, fontSize: 13, fontWeight: 600 }}>Tax (8%)</span>
                <span style={{ color: P.navy, fontWeight: 700, fontSize: 13 }}>Rs. {tax}</span>
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <span style={{ color: P.navy, fontWeight: 900, fontSize: 16 }}>Total</span>
              <span style={{ color: P.navy, fontWeight: 900, fontSize: 26, letterSpacing: "-.02em" }}>Rs. {total}</span>
            </div>

            <button onClick={handleCheckout} disabled={loading} style={{ 
              width: "100%", padding: "16px 0", background: P.royal, color: P.white, 
              fontWeight: 900, fontSize: 15, borderRadius: 14, border: "none", cursor: loading ? "not-allowed" : "pointer", 
              boxShadow: "0 6px 20px rgba(40,43,74,0.3)", transition: "all .2s", 
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              opacity: loading ? 0.7 : 1
            }}>
              {loading ? (
                <><span style={{ display:"inline-block", width:16, height:16, border:`2px solid ${P.muted}`, borderTopColor:"transparent", borderRadius:"50%", animation:"spin 1s linear infinite" }} /> Processing...</>
              ) : paymentMethod === "Khalti" ? "Pay with Khalti 💜" : "Place Order 🚚"}
            </button>
            <p style={{ textAlign:"center", fontSize:11, color:P.muted, margin:"16px 0 0" }}>Your personal data will be used to process your order.</p>

          </div>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
