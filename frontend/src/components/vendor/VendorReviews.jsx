import { useState } from "react";
import { P } from "../dashboard/DashboardConstants";

const MOCK_REVIEWS = [
  {
    id: 1,
    customer: "Alex Johnson",
    product: "iPhone 15 Pro Max",
    rating: 5,
    date: "March 10, 2026",
    comment: "Excellent seller! The phone was in perfect condition exactly as described. Very fast shipping and great communication. Will definitely buy again.",
  },
  {
    id: 2,
    customer: "Sarah Williams",
    product: "Samsung Galaxy S24 Ultra",
    rating: 4,
    date: "March 8, 2026",
    comment: "Good condition, fast delivery. There was a tiny scratch on the back that wasn't mentioned but nothing major. Overall satisfied with the purchase.",
  },
  {
    id: 3,
    customer: "Michael Brown",
    product: "Google Pixel 8 Pro",
    rating: 5,
    date: "March 5, 2026",
    comment: "Best deal I could find online. Phone works perfectly. Customer service was outstanding when I had a question about the warranty.",
  },
  {
    id: 4,
    customer: "Emily Davis",
    product: "iPhone 14 Pro",
    rating: 5,
    date: "March 1, 2026",
    comment: "Arrived quickly and securely packaged. Battery health was exactly as advertised (100%). Highly recommend this vendor!",
  },
];

const renderStars = (rating) => {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= rating ? P.accent : "none"} stroke={star <= rating ? P.accent : P.mist} strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
};

export default function VendorReviews() {
  const [filter, setFilter] = useState("All Reviews");

  const averageRating = (MOCK_REVIEWS.reduce((acc, curr) => acc + curr.rating, 0) / MOCK_REVIEWS.length).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, fontFamily: P.font, paddingBottom: 40 }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 28, margin: "0 0 6px", fontFamily: P.fontHeading, letterSpacing: "0.5px" }}>Public Sentiment</h2>
          <p style={{ color: P.muted, fontSize: 14, fontWeight: 500, margin: 0 }}>Review analysis and customer feedback logs.</p>
        </div>
        <div style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 12, padding: "4px 16px", fontSize: 13, fontWeight: 800, color: P.navy }}>
           {MOCK_REVIEWS.length} TOTAL REVIEWS
        </div>
      </div>

      {/* Summary Matrix */}
      <div style={{
        background: `linear-gradient(135deg, ${P.navy}, #3f3f46)`, borderRadius: 32, padding: 48,
        display: "flex", alignItems: "center", gap: 60, color: P.white, boxShadow: "0 20px 50px rgba(0,0,0,0.12)"
      }}>
        <div style={{ textAlign: "center", minWidth: 140 }}>
          <p style={{ fontSize: 64, fontWeight: 900, margin: "0 0 8px", lineHeight: 1, fontFamily: P.fontHeading }}>{averageRating}</p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            {renderStars(Math.round(averageRating))}
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>Community Rating</p>
        </div>
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = MOCK_REVIEWS.filter(r => r.rating === star).length;
            const percentage = (count / MOCK_REVIEWS.length) * 100;
            return (
              <div key={star} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 800, width: 60, color: "rgba(255,255,255,0.7)" }}>{star} STARS</span>
                <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${percentage}%`, height: "100%", background: percentage > 0 ? P.white : "transparent", borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 800, width: 24, textAlign: "right" }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews Engine */}
      <div style={{ background: P.white, border: `1px solid ${P.mist}`, borderRadius: 32, overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
        {/* Navigation / Filter */}
        <div style={{ padding: "12px 24px", borderBottom: `1px solid ${P.mist}`, display: "flex", gap: 10, background: P.mistBg }}>
          {["All Reviews", "5 Stars", "4 Stars", "Critical"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? P.navy : "transparent",
              border: "none",
              color: filter === f ? P.white : P.muted,
              padding: "8px 20px", borderRadius: 12, fontSize: 13, fontWeight: 800,
              cursor: "pointer", transition: "all 0.2s", fontFamily: P.font,
            }}>
              {f}
            </button>
          ))}
        </div>

        {/* Review Log */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {MOCK_REVIEWS.map((review, index) => (
            <div key={review.id} style={{
              padding: 40, borderBottom: index !== MOCK_REVIEWS.length - 1 ? `1px solid ${P.mist}` : "none",
              transition: "all 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.01)"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, background: P.mistBg, color: P.navy, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, border: `1px solid ${P.mist}` }}>
                    {review.customer.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ color: P.navy, margin: "0 0 2px", fontSize: 16, fontWeight: 900, fontFamily: P.fontHeading }}>{review.customer}</h4>
                    <p style={{ color: P.muted, margin: 0, fontSize: 12, fontWeight: 600 }}>verified purchase · {review.date}</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                   {renderStars(review.rating)}
                   <span style={{ fontSize: 10, fontWeight: 800, color: P.accent }}>{review.rating}/5 RATING</span>
                </div>
              </div>
              <p style={{ color: P.navy, fontSize: 15, lineHeight: 1.7, fontWeight: 500, margin: "0 0 24px", maxWidth: 700 }}>
                "{review.comment}"
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: P.mistBg, padding: "8px 16px", borderRadius: 12, border: `1px solid ${P.mist}` }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.navy} strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span style={{ color: P.navy, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>{review.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
