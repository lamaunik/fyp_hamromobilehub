import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { P } from "../dashboard/DashboardConstants";

const QUICK = [
  { label: "Add New Product" },
  { label: "View My Listings" },
  { label: "Check Orders" },
  { label: "Withdraw Earnings" },
  { label: "Read Reviews" },
  { label: "Edit Profile" },
];

export default function VendorOverview({ setTab }) {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalListings: 0, activeSales: 0, totalRevenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { api } = await import("../../utils/api");
        const [productsRes, ordersRes] = await Promise.all([
          api.get("/products/vendor/myproducts"),
          api.get("/orders/vendor/myorders")
        ]);

        let totalListings = 0;
        if (productsRes.success) {
          totalListings = productsRes.data.length;
        }

        let activeSales = 0;
        let totalRevenue = 0;
        if (ordersRes.success) {
          activeSales = ordersRes.data.length;
          totalRevenue = ordersRes.data.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
        }

        setStats({ totalListings, activeSales, totalRevenue });

      } catch (err) {
        console.error("Failed to fetch vendor overview stats", err);
      }
    };
    fetchStats();
  }, []);

  const DYNAMIC_STATS = [
    {
      label: "Active Skus", value: stats.totalListings, sub: "Total Listings",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11" />
        </svg>
      ),
    },
    {
      label: "Success Rate", value: stats.activeSales > 0 ? "98%" : "0%", sub: "Order Fulfillment",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: "Growth Rate", value: `+12%`, sub: "Weekly Revenue",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Avg. Rating", value: "4.8", sub: "User Feedback",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, fontFamily: P.font, paddingBottom: 40 }}>

      {/* Hero Welcome Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${P.navy}, #3f3f46)`,
        borderRadius: 32, padding: "48px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -40, right: -20, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.03)", filter: "blur(60px)" }} />
        
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 12, padding: "6px 14px", marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: P.accent }} />
            <span style={{ color: P.white, fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              OPERATIONAL OVERVIEW
            </span>
          </div>
          <h2 style={{ color: P.white, fontWeight: 900, fontSize: 40, margin: "0 0 12px", fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>
            Welcome back, {user?.name?.split(" ")[0] || "Partner"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, maxWidth: 520, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
            Your inventory is synchronized. We've detected high traction in the <span style={{ color: P.accent, fontWeight: 800 }}>Smartphones</span> category this morning.
          </p>
        </div>
        
        <div style={{
          width: 100, height: 100, borderRadius: 28, flexShrink: 0,
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}>
          <svg width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {DYNAMIC_STATS.map((s, i) => (
          <div key={i} style={{
            background: P.white, border: `1px solid ${P.mist}`,
            borderRadius: 28, padding: 32, cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
            onClick={() => {
                if (s.label === "Active Skus") setTab("listings");
                else if (s.sub === "Order Fulfillment") setTab("orders");
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = P.accent; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.02)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = P.mist; }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 16,
              background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 24, color: P.navy
            }}>
              {s.icon}
            </div>
            <p style={{ color: P.navy, fontWeight: 900, fontSize: 36, margin: "0 0 4px", fontFamily: P.fontHeading, letterSpacing: "-1px" }}>{s.value}</p>
            <p style={{ color: P.muted, fontSize: 13, fontWeight: 800, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
            <div style={{ width: 32, height: 2, background: P.accent, borderRadius: 1 }}></div>
          </div>
        ))}
      </div>

      {/* Tactical Hub */}
      <div style={{
        background: P.white, border: `1px solid ${P.mist}`,
        borderRadius: 32, padding: 40,
        boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
      }}>
        <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 20, margin: "0 0 28px", fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>Control Center</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {QUICK.map((q, i) => (
            <button key={i} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "18px 24px", borderRadius: 20,
              background: P.mistBg, border: `1px solid ${P.mist}`,
              fontSize: 14, fontWeight: 800, fontFamily: P.font,
              color: P.navy, cursor: "pointer", transition: "all 0.2s",
              textAlign: "left",
            }}
              onClick={() => {
                  if (q.label === "Add New Product") setTab("add-product");
                  else if (q.label === "View My Listings") setTab("listings");
                  else if (q.label === "Check Orders") setTab("orders");
                  else if (q.label === "Edit Profile") setTab("settings");
              }}
              onMouseEnter={e => { e.currentTarget.style.background = P.white; e.currentTarget.style.borderColor = P.accent; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.borderColor = P.mist; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: P.accent }}></div>
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Onboarding State */}
      {stats.totalListings === 0 && (
          <div style={{
            background: P.white, border: `2px dashed ${P.mist}`,
            borderRadius: 32, padding: "80px 40px", textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.02)",
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: 24,
              background: P.mistBg, border: `1px solid ${P.mist}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px", color: P.navy
            }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11" />
              </svg>
            </div>
            <p style={{ color: P.navy, fontWeight: 900, fontSize: 24, margin: "0 0 10px", fontFamily: P.fontHeading }}>Marketplace Entry Required</p>
            <p style={{ color: P.muted, fontSize: 14, margin: "0 0 32px", lineHeight: 1.6, fontWeight: 500, maxWidth: 380, marginInline: "auto" }}>
              Your digital storefront is currently dormant. Initialize your presence by publishing your first luxury listing.
            </p>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: P.navy,
              color: P.white, fontWeight: 900, fontSize: 14,
              padding: "16px 44px", borderRadius: 16, border: "none", cursor: "pointer",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              transition: "all 0.3s",
            }}
              onClick={() => setTab("add-product")}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Initialize Luxury Listing
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
      )}
    </div>
  );
}