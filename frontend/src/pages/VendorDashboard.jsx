import { useState } from "react";
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
        background: "rgba(1,138,190,0.08)", border: "1px dashed rgba(1,138,190,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#018ABE" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h2 style={{ color: "#001B48", fontWeight: 800, fontSize: 22, margin: "0 0 8px", fontFamily: "inherit" }}>{label}</h2>
      <p style={{ color: "#6b99b5", fontSize: 14, fontFamily: "inherit" }}>Coming soon</p>
    </div>
  );
}

export default function VendorDashboard() {
  const [tab, setTab]   = useState("overview");
  const [open, setOpen] = useState(true);

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
      background: "#f0f6f9",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif",
    }}>
      <VendorSidebar tab={tab} setTab={setTab} open={open} setOpen={setOpen} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <VendorTopbar tab={tab} onMenu={() => setOpen(o => !o)} />
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px", background: "#f0f6f9" }}>
          {content()}
        </main>
      </div>
    </div>
  );
}