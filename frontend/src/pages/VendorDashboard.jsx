import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import { P } from "../components/dashboard/DashboardConstants";
import VendorSidebar   from "../components/vendor/VendorSidebar";
import VendorTopbar    from "../components/vendor/VendorTopbar";
import VendorOverview  from "../components/vendor/VendorOverview";
import VendorListings  from "../components/vendor/VendorListings";
import VendorOrders    from "../components/vendor/VendorOrders";
import VendorAnalytics from "../components/vendor/VendorAnalytics";
import VendorSettings  from "../components/vendor/VendorSettings";
import VendorReviews   from "../components/vendor/VendorReviews";
import VendorAddProduct from "../components/vendor/VendorAddProduct";

function ComingSoon({ label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "60vh", textAlign: "center",
      fontFamily: P.font, padding: 40, background: P.white,
      borderRadius: 32, border: `1px dashed ${P.mist}`,
      boxShadow: "0 10px 40px rgba(0,0,0,0.02)"
    }}>
      <div style={{
        width: 100, height: 100, borderRadius: 28, marginBottom: 24,
        background: P.mistBg, border: `1px solid ${P.mist}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: P.navy, boxShadow: "0 8px 24px rgba(0,0,0,0.04)"
      }}>
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 002 2h1a2 2 0 110 4h-1a2 2 0 00-2 2v1a2 2 0 11-4 0V14a2 2 0 00-2-2H9a2 2 0 110-4h1a2 2 0 002-2V4z" />
        </svg>
      </div>
      <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 28, margin: "0 0 10px", fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>{label} Module</h2>
      <p style={{ color: P.muted, fontSize: 16, fontWeight: 500, maxWidth: 300, lineHeight: 1.6, marginInline: "auto" }}>We are currently architecting this feature for a premium experience. Expected release in Q2.</p>
      <div style={{ marginTop: 32, padding: "8px 20px", background: P.mistBg, borderRadius: 12, color: P.navy, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
         Status: In Development
      </div>
    </div>
  );
}

export default function VendorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab]   = useState("overview");
  const [open, setOpen] = useState(false);
  const [unreadChat, setUnreadChat] = useState(false);

  // Redirect to KYC if not approved
  useEffect(() => {
    if (user && user.role === "vendor" && !user.isApproved) {
      navigate("/vendor/kyc", { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: P.mistBg, color: P.navy, fontWeight: 800, fontFamily: P.font }}>Authenticating Hub Access...</div>;
  }

  // Global socket for vendor notifications
  useEffect(() => {
    if (user) {
      socket.io.opts.query = { userId: user._id || user.id };
      socket.connect();
      
      const handleRecv = (msg) => {
        if (!window.location.pathname.includes("/messages") && msg.sender !== user._id && msg.sender !== user.id) {
          setUnreadChat(true);
        }
      };
      
      socket.on("receive_message", handleRecv);
      return () => {
        socket.off("receive_message", handleRecv);
        socket.disconnect();
      };
    }
  }, [user]);

  const content = () => {
    switch (tab) {
      case "overview":   return <VendorOverview   setTab={setTab} />;
      case "listings":   return <VendorListings   setTab={setTab} />;
      case "add-product":return <VendorAddProduct setTab={setTab} />;
      case "orders":     return <VendorOrders />;
      case "analytics":  return <VendorAnalytics />;
      case "payouts":    return <ComingSoon label="Payouts" />;
      case "reviews":    return <VendorReviews />;
      case "settings":   return <VendorSettings />;
      default:           return <VendorOverview   setTab={setTab} />;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: P.mistBg,
      fontFamily: P.font,
    }}>
      <VendorSidebar tab={tab} setTab={setTab} open={open} setOpen={setOpen} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <VendorTopbar tab={tab} onMenu={() => setOpen(o => !o)} unreadChat={unreadChat} />
        <main style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
          <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            {content()}
          </div>
        </main>
      </div>
    </div>
  );
}