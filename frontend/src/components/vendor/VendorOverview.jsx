import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const P = {
  navy:  "#282B4A",
  royal: "#282B4A",
  ocean: "#282B4A",
  sky:   "#D4D2C3",
  mist:  "#E5E3D5",
  white: "#FFFFFF",
  muted: "#7A7C8E",
  mistBg:"#EEEBDA",
  font:  "'Inter', 'Helvetica Neue', Helvetica, sans-serif",
  purple:"#282B4A",
  purpleLight:"#E5E3D5"
};

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
          activeSales = ordersRes.data.length; // Simply total orders involving this vendor
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
      label: "Total Listings", value: stats.totalListings, change: "Start listing",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11" />
        </svg>
      ),
    },
    {
      label: "Active Sales", value: stats.activeSales, change: "No sales yet",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: "Total Revenue", value: `Rs. ${stats.totalRevenue.toLocaleString()}`, change: "Earn today",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Avg. Rating", value: "—", change: "Get reviews",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: P.font }}>

      {/* Welcome banner */}
      <div style={{
        background: `linear-gradient(135deg, ${P.royal} 0%, ${P.ocean} 100%)`,
        borderRadius: 20, padding: "28px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 24px rgba(40, 43, 74, 0.2)",
      }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 999, padding: "4px 12px", marginBottom: 14,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: P.mist, display: "inline-block" }} />
            <span style={{ color: P.mist, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: P.font }}>
              Vendor Dashboard
            </span>
          </div>
          <h2 style={{ color: P.white, fontWeight: 900, fontSize: 28, margin: "0 0 8px", fontFamily: P.font }}>
            Hey, {user?.name?.split(" ")[0] || "Vendor"}
          </h2>
          <p style={{ color: "rgba(229, 227, 213, 0.85)", fontSize: 14, maxWidth: 420, margin: 0, fontFamily: P.font, lineHeight: 1.6 }}>
            Manage your listings, track orders and grow your business on HamroHub.
          </p>
        </div>
        <div style={{
          width: 72, height: 72, borderRadius: 20, flexShrink: 0,
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {DYNAMIC_STATS.map((s, i) => (
          <div key={i} style={{
            background: P.white, border: `1px solid ${P.border}`,
            borderRadius: 16, padding: "20px 22px", cursor: "pointer",
            boxShadow: "0 2px 12px rgba(40, 43, 74, 0.06)",
            transition: "all 0.2s",
          }}
            onClick={() => {
                if (s.label === "Total Listings") setTab("listings");
                else if (s.label === "Active Sales") setTab("orders");
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(40, 43, 74, 0.15)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(40, 43, 74, 0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 16, boxShadow: "0 4px 12px rgba(40, 43, 74, 0.25)",
            }}>
              {s.icon}
            </div>
            <p style={{ color: P.navy, fontWeight: 900, fontSize: 28, margin: "0 0 4px", fontFamily: P.font }}>{s.value}</p>
            <p style={{ color: P.muted, fontSize: 12, fontWeight: 600, margin: "0 0 6px", fontFamily: P.font }}>{s.label}</p>
            <p style={{ color: P.ocean, fontSize: 12, fontWeight: 700, margin: 0, fontFamily: P.font }}>{s.change} →</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: P.white, border: `1px solid ${P.border}`,
        borderRadius: 16, padding: "22px 24px",
        boxShadow: "0 2px 12px rgba(40, 43, 74, 0.06)",
      }}>
        <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 16, margin: "0 0 16px", fontFamily: P.font }}>Quick Actions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {QUICK.map((q, i) => (
            <button key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "13px 18px", borderRadius: 12,
              background: P.mistBg, border: `1px solid ${P.border}`,
              fontSize: 13, fontWeight: 600, fontFamily: P.font,
              color: P.royal, cursor: "pointer", transition: "all 0.2s",
              textAlign: "left",
            }}
              onClick={() => {
                  if (q.label === "Add New Product") setTab("add-product");
                  else if (q.label === "View My Listings") setTab("listings");
                  else if (q.label === "Check Orders") setTab("orders");
                  else if (q.label === "Edit Profile") setTab("settings");
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(40, 43, 74, 0.08)"; e.currentTarget.style.borderColor = P.sky; e.currentTarget.style.color = P.navy; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.borderColor = P.border; e.currentTarget.style.color = P.royal; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty listings notice */}
      {stats.totalListings === 0 && (
          <div style={{
            background: P.white, border: `1px dashed ${P.sky}`,
            borderRadius: 16, padding: "36px 24px", textAlign: "center",
            boxShadow: "0 2px 12px rgba(40, 43, 74, 0.04)",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: "rgba(40, 43, 74, 0.08)", border: `1px solid ${P.sky}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}>
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={P.ocean} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11" />
              </svg>
            </div>
            <p style={{ color: P.navy, fontWeight: 800, fontSize: 17, margin: "0 0 6px", fontFamily: P.font }}>No products listed yet</p>
            <p style={{ color: P.muted, fontSize: 13, margin: "0 0 20px", lineHeight: 1.6, fontFamily: P.font }}>
              Start selling by adding your first product. It only takes a few minutes!
            </p>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `linear-gradient(135deg, ${P.royal}, ${P.ocean})`,
              color: P.white, fontWeight: 700, fontSize: 14, fontFamily: P.font,
              padding: "11px 28px", borderRadius: 999, border: "none", cursor: "pointer",
              boxShadow: "0 4px 16px rgba(40, 43, 74, 0.3)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onClick={() => setTab("add-product")}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(40, 43, 74, 0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(40, 43, 74, 0.3)"; }}
            >
              + Add Your First Product
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
      )}
    </div>
  );
}