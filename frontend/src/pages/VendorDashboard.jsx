import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { socket } from "../utils/socket";
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
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: 24, marginBottom: 20,
        background: "rgba(40, 43, 74, 0.08)", border: "1px dashed rgba(40, 43, 74, 0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#282B4A" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h2 style={{ color: "#282B4A", fontWeight: 800, fontSize: 22, margin: "0 0 8px", fontFamily: "inherit" }}>{label}</h2>
      <p style={{ color: "#6b99b5", fontSize: 14, fontFamily: "inherit" }}>Coming soon</p>
    </div>
  );
}

export default function VendorDashboard() {
  const { user } = useAuth();
  const [tab, setTab]   = useState("overview");
  const [open, setOpen] = useState(true);
  const [unreadChat, setUnreadChat] = useState(false);

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
      background: "#EEEBDA",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif",
    }}>
      <VendorSidebar tab={tab} setTab={setTab} open={open} setOpen={setOpen} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <VendorTopbar tab={tab} onMenu={() => setOpen(o => !o)} unreadChat={unreadChat} />
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px", background: "#EEEBDA" }}>
          {content()}
        </main>
      </div>
    </div>
  );
}