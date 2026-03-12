// src/components/vendor/VendorProducts.jsx

const SAMPLE = [
  { name: "iPhone 14 Pro",      price: "$899",  status: "Active",  stock: 3, views: 120 },
  { name: "Samsung Galaxy S23", price: "$749",  status: "Active",  stock: 5, views: 88  },
  { name: "Google Pixel 7",     price: "$549",  status: "Paused",  stock: 0, views: 45  },
];

const STATUS_COLOR = {
  Active: "text-green-400 bg-green-400/10 border-green-400/20",
  Paused: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Sold:   "text-blue-400  bg-blue-400/10  border-blue-400/20",
};

export default function VendorProducts() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-black text-2xl">My Products</h2>
          <p className="text-blue-200/50 text-sm mt-0.5">Manage your active listings</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 transition-all">
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["All", "Active", "Paused", "Sold Out"].map((f) => (
          <button
            key={f}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              f === "All"
                ? "bg-gradient-to-r from-blue-600/40 to-cyan-500/20 border border-blue-500/40 text-white"
                : "bg-white/5 border border-white/10 text-blue-200/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-5 text-xs font-bold uppercase tracking-widest text-blue-200/40 px-6 py-3 border-b border-white/10"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}>
          <span>Product</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Views</span>
          <span>Status</span>
        </div>
        {SAMPLE.map((p, i) => (
          <div
            key={i}
            className="grid items-center px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-all"
            style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-lg flex-shrink-0">📱</div>
              <p className="text-white font-bold text-sm">{p.name}</p>
            </div>
            <p className="text-cyan-400 font-black text-sm">{p.price}</p>
            <p className="text-white font-semibold text-sm">{p.stock}</p>
            <p className="text-blue-200/60 text-sm">{p.views}</p>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border w-fit ${STATUS_COLOR[p.status]}`}>
              {p.status}
            </span>
          </div>
        ))}
      </div>

      {/* Empty CTA */}
      <div className="bg-white/5 border border-dashed border-white/20 rounded-3xl p-8 text-center">
        <p className="text-white font-black mb-1">Want to list more?</p>
        <p className="text-blue-200/50 text-sm mb-4">Add new devices in minutes and start selling today.</p>
        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-7 py-2.5 rounded-full shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 transition-all text-sm">
          + Add New Listing
        </button>
      </div>
    </div>
  );
}