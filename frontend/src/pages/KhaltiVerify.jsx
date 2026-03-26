import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { api } from "../utils/api";
import { P } from "../components/dashboard/DashboardConstants";

export default function KhaltiVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("Please wait while we confirm your payment securely with Khalti.");

  useEffect(() => {
    const pidx = searchParams.get("pidx");
    const orderId = searchParams.get("purchase_order_id");
    const khaltiStatus = searchParams.get("status");

    if (!pidx || !orderId) {
      setStatus("error");
      setMessage("Invalid payment callback. Missing required parameters.");
      return;
    }

    if (khaltiStatus !== "Completed") {
      setStatus("error");
      setMessage(`Payment was not completed. Status: ${khaltiStatus}. Please try again.`);
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await api.post("/orders/khalti/verify", { pidx, orderId });
        if (res.success) {
          try { localStorage.setItem("hmh_cart", "[]"); } catch(e){}
          // Automatically redirect to the unified Payment Success page on success!
          navigate("/success?method=Khalti");
        } else {
          setStatus("error");
          setMessage(res.message || "Payment verification failed.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("An error occurred during verification.");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: P.mistBg, fontFamily: P.font, padding: 24 }}>
      <div style={{ background: P.white, padding: "40px 32px", borderRadius: 24, boxShadow: "0 12px 40px rgba(40,43,74,0.08)", width: "100%", maxWidth: 440, textAlign: "center" }}>
        
        {status === "verifying" && (
          <>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: P.mist, border: `2px solid ${P.white}`, boxShadow: `0 0 0 2px ${P.royal}`, color: P.royal, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }} stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h2 style={{ color: P.navy, fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Verifying Payment...</h2>
            <p style={{ color: P.muted, fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>Please wait while we confirm your payment securely with Khalti.</p>
          </>
        )}

        {status === "error" && (
          <>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#dc2626", color: P.white, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 8px 24px rgba(220,38,38,0.3)" }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 style={{ color: P.navy, fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Verification Failed</h2>
            <p style={{ color: P.muted, fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>{message}</p>
          </>
        )}

        {status === "error" && (
          <button onClick={() => navigate("/dashboard")} style={{
            width: "100%", padding: "14px 0", background: P.royal, color: P.white, fontSize: 15, fontWeight: 800,
            borderRadius: 14, border: "none", cursor: "pointer", boxShadow: "0 6px 20px rgba(40,43,74,0.3)",
            transition: "transform 0.15s"
          }}>
            Back to Dashboard
          </button>
        )}

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
