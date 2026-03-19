import { P } from "./DashboardConstants";
import { Icon } from "./DashboardIcons";
import { Btn } from "./DashboardUI";
import ProductCard from "../common/ProductCard";

export default function DashboardWishlist({ wishlist, toggleWish, addToCart, viewProduct, setTab, products }) {
  const items = products
    ? products.filter((p) => wishlist.includes(p._id || p.id))
    : [];

  if (items.length === 0) return (
    <div className="page" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", padding: 40, textAlign: "center", fontFamily: P.font }}>
      <div className="float" style={{ width: 100, height: 100, borderRadius: 28, background: `linear-gradient(135deg,${P.mist},${P.sky})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, color: P.royal, boxShadow: "0 12px 36px rgba(1,138,190,.16)" }}>
        {Icon.wishlist}
      </div>
      <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 24, margin: "0 0 10px" }}>Your wishlist is empty</h2>
      <p style={{ color: P.muted, fontSize: 14, margin: "0 0 28px", lineHeight: 1.6 }}>Save products you love by clicking the heart icon!</p>
      <Btn onClick={() => setTab("products")} cls="btn" style={{ background: `linear-gradient(135deg,${P.royal},${P.ocean})`, color: P.white, fontWeight: 800, fontSize: 14, padding: "12px 28px", borderRadius: 12, boxShadow: "0 4px 16px rgba(1,138,190,.3)" }}>Browse Products →</Btn>
    </div>
  );

  return (
    <div className="page" style={{ padding: "28px 32px", fontFamily: P.font }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 22, margin: 0 }}>My Wishlist</h2>
          <p style={{ color: P.muted, fontSize: 13, margin: "4px 0 0" }}>{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
        </div>
        <Btn cls="btn" onClick={() => items.forEach((p) => addToCart(p))} style={{ padding: "10px 22px", background: `linear-gradient(135deg,${P.royal},${P.ocean})`, color: P.white, fontSize: 13, fontWeight: 700, borderRadius: 12, boxShadow: "0 4px 14px rgba(1,138,190,.28)" }}>
          Add All to Cart
        </Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
        {items.map((p, i) => {
          const pId = p._id || p.id; // FIX: always use _id first (MongoDB)
          return (
            <ProductCard
              key={pId}                          // FIX: was p.id (undefined for MongoDB docs)
              product={p}
              onView={() => viewProduct(p)}
              onAddToCart={() => addToCart(p)}
              wishlisted={true}
              onToggleWish={() => toggleWish(pId)} // FIX: was p.id (undefined for MongoDB docs)
              delay={`${i * .06}s`}
            />
          );
        })}
      </div>
    </div>
  );
}