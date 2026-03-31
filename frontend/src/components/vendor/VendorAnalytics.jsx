import { useState, useEffect } from "react";
import { P } from "../dashboard/DashboardConstants";

const KPI_ICONS = [
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>,
];

export default function VendorAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { api } = await import("../../utils/api");
        const res = await api.get("/orders/vendor/stats");
        if (res.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch vendor stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: P.navy, fontWeight: 800, fontSize: 18, fontFamily: P.font }}>Syncing Store Analytics...</div>;
  }

  const data = stats || {
    totalRevenue: 0,
    totalOrders: 0,
    avgTicketSize: 0,
    revenueTrajectory: [],
    eliteInventory: [],
    marketReach: 0,
    conversionRate: "0%",
    productChurn: "0%"
  };

  const revenueValues = data.revenueTrajectory.map(r => r.revenue);
  const maxRevenue = Math.max(...revenueValues, 1000);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, fontFamily: P.font, paddingBottom: 40 }}>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 28, margin: "0 0 6px", fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>Business Intelligence</h2>
          <p style={{ color: P.muted, fontSize: 14, fontWeight: 500, margin: 0 }}>Detailed performance audit for your store ecosystem.</p>
        </div>
        <div style={{ display: "flex", background: P.white, border: `1px solid ${P.mist}`, borderRadius: 12, padding: 4 }}>
           {["7 Days", "30 Days", "Q1"].map((range, idx) => (
             <button key={range} style={{ padding: "6px 16px", borderRadius: 10, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", background: idx === 1 ? P.navy : "transparent", color: idx === 1 ? P.white : P.muted, transition: "all 0.2s" }}>{range}</button>
           ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {[
          { label: "Market Reach", value: Number(data.marketReach).toLocaleString(), sub: "+5.1% vs LW", growth: true },
          { label: "Conversion rate", value: data.conversionRate, sub: "Based on activity", growth: true },
          { label: "Avg Ticket Size", value: `NPR ${(data.avgTicketSize / 1000).toFixed(1)}k`, sub: "Store average", growth: true },
          { label: "Product Churn", value: data.productChurn, sub: "Health metric", growth: true },
        ].map((k, i) => (
          <div key={i} style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 24, padding: 24, cursor: "pointer", transition: "all 0.3s", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.06)`; e.currentTarget.style.borderColor = P.accent; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.02)"; e.currentTarget.style.borderColor = P.mist; }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: P.mistBg, display: "flex", alignItems: "center", justifyContent: "center", color: P.navy }}>
              {KPI_ICONS[i]}
            </div>
            <div>
              <p style={{ color: P.navy, fontWeight: 900, fontSize: 26, margin: "0 0 4px", fontFamily: P.fontHeading, letterSpacing: "-0.5px" }}>{k.value}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <p style={{ color: P.muted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>{k.label}</p>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: P.mist }}></div>
                <p style={{ color: k.growth ? "#16a34a" : "#dc2626", fontSize: 11, fontWeight: 800, margin: 0 }}>{k.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Stats Area */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 24 }}>
        
        {/* Revenue Chart */}
        <div style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 32, padding: 32, boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 18, margin: "0 0 4px", fontFamily: P.fontHeading }}>Revenue Trajectory</h3>
              <p style={{ color: P.muted, fontSize: 13, fontWeight: 500, margin: 0 }}>Projected earnings based on fiscal trends.</p>
            </div>
            <div style={{ textAlign: "right" }}>
               <p style={{ color: P.accent, fontWeight: 900, fontSize: 20, margin: 0 }}>NPR {(data.totalRevenue / 1000).toFixed(1)}k</p>
               <p style={{ color: P.muted, fontSize: 11, fontWeight: 700, margin: 0 }}>TOTAL PERIOD REVENUE</p>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 200, padding: "0 10px" }}>
            {data.revenueTrajectory.map((r, i) => {
              const h = (r.revenue / maxRevenue) * 100;
              return (
                <div key={r.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, height: "100%", position: "relative" }}>
                  <div style={{ position: "absolute", top: (100-h-15) + "%", width: "100%", textAlign: "center", opacity: 0, transition: "all 0.2s" }} className="chart-label">
                     <span style={{ background: P.navy, color: "white", padding: "4px 8px", borderRadius: 8, fontSize: 10, fontWeight: 800 }}>{(r.revenue/1000).toFixed(1)}k</span>
                  </div>
                  <div style={{ width: "100%", borderRadius: 12, transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", marginTop: "auto",
                    height: `${h}%`,
                    background: i === data.revenueTrajectory.length - 1 ? P.accent : P.navy,
                    opacity: 0.9,
                    cursor: "pointer",
                  }} onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.parentNode.querySelector(".chart-label").style.opacity = 1; }} onMouseLeave={e => { e.currentTarget.style.opacity = 0.9; e.currentTarget.parentNode.querySelector(".chart-label").style.opacity = 0; }} />
                  <p style={{ color: P.muted, fontSize: 12, fontWeight: 700, margin: 0 }}>{r.month}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Listings Sidebar */}
        <div style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 32, padding: 32, boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
          <h3 style={{ color: P.navy, fontWeight: 900, fontSize: 18, margin: "0 0 24px", fontFamily: P.fontHeading }}>Elite Inventory</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {data.eliteInventory.length > 0 ? data.eliteInventory.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: P.mistBg, borderRadius: 20, border: `1px solid ${P.mist}`, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = P.white; e.currentTarget.style.borderColor = P.accent; e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = P.mistBg; e.currentTarget.style.borderColor = P.mist; e.currentTarget.style.transform = "scale(1)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 36, height: 36, background: P.white, borderRadius: 10, border: `1px solid ${P.mist}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: P.navy }}>{i + 1}</div>
                  <div>
                    <span style={{ color: P.navy, fontWeight: 800, fontSize: 14, display: "block" }}>{p.name}</span>
                    <span style={{ color: P.muted, fontSize: 11, fontWeight: 600 }}>{p.sales} Units Sold</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: p.growth.startsWith("+") ? "#16a34a" : "#dc2626", fontWeight: 800, fontSize: 13, margin: 0 }}>{p.growth}</p>
                </div>
              </div>
            )) : (
               <div style={{ textAlign: "center", padding: "40px 20px", color: P.muted, fontSize: 14, fontWeight: 600 }}>No sales data yet.</div>
            )}
          </div>
        </div>

      </div>

      {/* Insights Banner */}
      <div style={{ background: `linear-gradient(135deg, ${P.navy}, #3f3f46)`, borderRadius: 32, padding: 32, display: "flex", alignItems: "center", gap: 32, color: P.white, boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}>
         <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
         </div>
         <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 4px", fontFamily: P.fontHeading }}>AI Optimization Insight</h4>
            <p style={{ fontSize: 14, fontWeight: 500, margin: 0, opacity: 0.9, lineHeight: 1.5 }}>Based on your Q1 data, increasing your stock for Apple Accessories on weekends could potentially boost your conversion rate by another <span style={{ color: P.accent, fontWeight: 900 }}>4.2%</span>. Consider running a flash promo on Saturdays.</p>
         </div>
         <button style={{ padding: "12px 24px", borderRadius: 14, background: P.white, color: P.navy, border: "none", fontSize: 13, fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>Apply Strategy</button>
      </div>

    </div>
  );
}