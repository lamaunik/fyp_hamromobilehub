import { useNavigate, useSearchParams } from "react-router-dom";
import { P } from "../components/dashboard/DashboardConstants";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const method = searchParams.get("method") || "Cash On Delivery";

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: P.mistBg, fontFamily: P.font, padding: 24 }}>
      <div style={{ background: P.white, padding: "48px 40px", borderRadius: 24, boxShadow: "0 12px 40px rgba(40,43,74,0.08)", width: "100%", maxWidth: 460, textAlign: "center", position: "relative", overflow: "hidden" }}>
        
        {/* Background confetti element */}
        <div style={{ position: "absolute", top: -70, right: -70, width: 200, height: 200, borderRadius: "50%", background: `linear-gradient(135deg, ${P.mist}, ${P.mistBg})`, opacity: 0.6, zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: -90, left: -60, width: 180, height: 180, borderRadius: "50%", background: `linear-gradient(135deg, rgba(22,163,74,0.1), transparent)`, zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#16a34a", color: P.white, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 12px 28px rgba(22,163,74,0.3)", animation: "popIn .5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 style={{ color: P.navy, fontSize: 26, fontWeight: 900, marginBottom: 8, letterSpacing: "-.02em" }}>Order Confirmed!</h2>
          <p style={{ color: P.muted, fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            Thank you for shopping with HamroMobileHub.<br/>
            Your order has been successfully placed.
          </p>

          <div style={{ background: P.mistBg, border: `1px solid ${P.mist}`, borderRadius: 16, padding: "16px 20px", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: P.muted, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>Payment Method</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8, color: P.navy, fontWeight: 800, fontSize: 14 }}>
              {method === "Khalti" ? " Khalti ePayment" : "Cash On Delivery"}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <button onClick={() => navigate("/dashboard")} style={{
              width: "100%", padding: "15px 0", background: P.royal, color: P.white, fontSize: 15, fontWeight: 900,
              borderRadius: 14, border: "none", cursor: "pointer", boxShadow: "0 6px 20px rgba(40,43,74,0.3)",
              transition: "transform 0.15s"
            }} onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
              Back to Home
            </button>
            <button onClick={() => navigate("/dashboard")} style={{
              width: "100%", padding: "15px 0", background: "transparent", color: P.navy, fontSize: 14, fontWeight: 800,
              borderRadius: 14, border: `2px solid ${P.mist}`, cursor: "pointer", transition: "background 0.2s"
            }} onMouseEnter={e => e.currentTarget.style.background=P.mistBg} onMouseLeave={e => e.currentTarget.style.background="transparent"}>
              Continue Shopping
            </button>
          </div>
        </div>

        <style>{`
          @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
