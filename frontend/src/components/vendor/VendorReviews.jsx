import { useState } from "react";

const P = {
  navy:    "#001B48",
  royal:   "#02457A",
  ocean:   "#018ABE",
  sky:     "#97CADB",
  mist:    "#D6E8EE",
  mistBg:  "#f0f6f9",
  white:   "#ffffff",
  highlight: "#f59e0b", // Gold/yellow for stars
  muted:   "#6b99b5",
  border:  "#D6E8EE",
  font:    "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif",
};

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
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= rating ? P.highlight : "none"} stroke={star <= rating ? P.highlight : P.muted} strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
};

export default function VendorReviews() {
  const [filter, setFilter] = useState("all");

  const averageRating = (MOCK_REVIEWS.reduce((acc, curr) => acc + curr.rating, 0) / MOCK_REVIEWS.length).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: P.font }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 24, margin: "0 0 8px" }}>Customer Reviews</h2>
          <p style={{ color: P.muted, fontSize: 14, margin: 0 }}>See what your customers are saying about your products.</p>
        </div>
      </div>

      {/* Summary Card */}
      <div style={{
        background: `linear-gradient(135deg, ${P.royal} 0%, ${P.ocean} 100%)`, borderRadius: 16, padding: 32,
        display: "flex", alignItems: "center", gap: 40, color: P.white, boxShadow: "0 4px 24px rgba(1,138,190,0.2)"
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 48, fontWeight: 900, margin: "0 0 8px", lineHeight: 1 }}>{averageRating}</p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, transform: "scale(1.2)" }}>
            {renderStars(Math.round(averageRating))}
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", margin: 0 }}>Based on {MOCK_REVIEWS.length} reviews</p>
        </div>
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = MOCK_REVIEWS.filter(r => r.rating === star).length;
            const percentage = (count / MOCK_REVIEWS.length) * 100;
            return (
              <div key={star} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, width: 44 }}>{star} Stars</span>
                <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.2)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${percentage}%`, height: "100%", background: P.white, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, width: 20, textAlign: "right" }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div style={{ background: P.white, border: `1px solid ${P.border}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,27,72,0.04)" }}>
        {/* Filter Bar */}
        <div style={{ padding: "16px 24px", borderBottom: `1px solid ${P.mist}`, display: "flex", gap: 8 }}>
          {["All Reviews", "5 Stars", "4 Stars", "3 Stars & Below"].map((f, i) => (
            <button key={i} style={{
              background: filter === "all" && i === 0 ? P.mistBg : "none",
              border: filter === "all" && i === 0 ? `1px solid ${P.border}` : "1px solid transparent",
              color: filter === "all" && i === 0 ? P.navy : P.muted,
              padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s", fontFamily: P.font,
            }}>
              {f}
            </button>
          ))}
        </div>

        {/* Review Cards */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {MOCK_REVIEWS.map((review, index) => (
            <div key={review.id} style={{
              padding: 24, paddingBottom: 24, borderBottom: index !== MOCK_REVIEWS.length - 1 ? `1px solid ${P.mist}` : "none",
              transition: "background 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = P.mistBg}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${P.ocean}, ${P.sky})`, color: P.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>
                    {review.customer.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ color: P.navy, margin: "0 0 2px", fontSize: 15, fontWeight: 800 }}>{review.customer}</h4>
                    <p style={{ color: P.muted, margin: 0, fontSize: 13 }}>{review.date}</p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p style={{ color: P.navy, fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>
                "{review.comment}"
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(151,202,219,0.15)", padding: "4px 12px", borderRadius: 6 }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.ocean} strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span style={{ color: P.ocean, fontSize: 12, fontWeight: 700 }}>{review.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
