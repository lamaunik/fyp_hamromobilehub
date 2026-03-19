// src/components/vendor/VendorHome.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/api";

const CATEGORIES = [
  { label: "Smartphones", icon: "📱" },
  { label: "Laptops",     icon: "💻" },
  { label: "Tablets",     icon: "📟" },
  { label: "Accessories", icon: "🎧" },
  { label: "Cameras",     icon: "📷" },
];

const BRANDS = ["SAMSUNG", "Apple", "Microsoft", "LG", "SONY", "OnePlus"];

export default function VendorHome() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/vendor/myproducts");
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch vendor products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8">

      {/* ── Blue → cyan gradient hero banner — exact match to screenshot ── */}
      <div
        className="relative rounded-2xl overflow-hidden px-8 py-8 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #2563eb 0%, #0891b2 60%, #06b6d4 100%)" }}
      >
        {/* subtle glow spots matching screenshot */}
        <div className="absolute top-0 right-0 w-64 h-full opacity-20"
          style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.4) 0%, transparent 70%)" }} />
        <div className="relative z-10">
          <p className="text-blue-100 text-sm font-semibold mb-1">🔥 Limited Time Offer</p>
          <h2 className="text-white font-black text-2xl md:text-3xl mb-2">
            {user?.name ? `Welcome, ${user.name.split(" ")[0]}!` : "Manage Your Store"}
          </h2>
          <p className="text-blue-100 text-sm mb-5 max-w-sm">
            Discover the best deals on top-rated laptops and smartphones.
          </p>
          <button className="bg-white text-blue-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
            Shop Now →
          </button>
        </div>
        {/* Decorative laptop icon matching screenshot */}
        <div className="hidden md:flex opacity-20 relative z-10">
          <svg className="w-32 h-32 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {/* ── Shop by Category ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-800 font-bold text-base">Shop by Category</h3>
          <button className="text-blue-600 text-sm font-semibold hover:text-blue-800 transition-colors">View All</button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              className="flex flex-col items-center gap-2.5 bg-white border border-gray-200 rounded-2xl p-4 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="text-3xl">{cat.icon}</div>
              <span className="text-gray-600 text-xs font-semibold group-hover:text-blue-600 transition-colors">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Top Brands ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-800 font-bold text-base">Top Brands</h3>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {BRANDS.map((brand) => (
            <button
              key={brand}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:shadow-sm transition-all"
            >
              {brand}
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-800 font-bold text-base">My Products</h3>
          <button className="text-blue-600 text-sm font-semibold hover:text-blue-800 transition-colors">View All</button>
        </div>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-sm">No products listed yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.slice(0, 5).map((p, i) => (
              <div
                key={p._id || i}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer"
              >
                {/* Image/Badge */}
                <div className="relative">
                  <div className="h-28 bg-gray-50 flex items-center justify-center overflow-hidden">
                    {p.images && p.images.length > 0 ? (
                      <img src={p.images[0].startsWith("http") ? p.images[0] : `http://localhost:5000${p.images[0]}`} alt={p.name} className="w-full h-full object-contain p-2" />
                    ) : (
                      <span className="text-5xl">📱</span>
                    )}
                  </div>
                  {i === 0 && (
                    <span className={`absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md`}>
                      Hot
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-gray-800 font-semibold text-xs mb-1 truncate">{p.name}</p>
                  <p className="text-blue-600 font-black text-sm">Rs. {p.price}</p>
                  <button className="mt-2 w-full bg-blue-600 text-white text-[11px] font-bold py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Vendor quick stats ── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "My Listings",   value: products.length || "0",   color: "bg-blue-50",   text: "text-blue-600"  },
          { label: "Orders",        value: "0",   color: "bg-orange-50", text: "text-orange-600"},
          { label: "Revenue",       value: "Rs. 0",  color: "bg-green-50",  text: "text-green-600" },
          { label: "Reviews",       value: "0",   color: "bg-purple-50", text: "text-purple-600"},
        ].map((s, i) => (
          <div key={i} className={`${s.color} rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer`}>
            <p className={`font-black text-2xl ${s.text} mb-1`}>{s.value}</p>
            <p className="text-gray-500 text-xs font-semibold">{s.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}