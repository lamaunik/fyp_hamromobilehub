const stats = [
  { value: "450+", label: "Products Listed", icon: "📱" },
  { value: "150+", label: "Active Vendors", icon: "🏪" },
  { value: "120+", label: "Cities Covered", icon: "🌍" },
  { value: "20+", label: "Brand Partners", icon: "🤝" },
];

export default function Stats() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl px-8 py-12 relative overflow-hidden">
          {/* Decorations */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="group">
                <div className="text-4xl mb-2">{s.icon}</div>
                <div className="text-4xl md:text-5xl font-black text-white mb-1">{s.value}</div>
                <div className="text-white/70 text-sm font-semibold tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="relative text-center text-white/70 text-sm mt-8 max-w-xl mx-auto">
            Impressed? Choose MobiHub to handle your complete mobile buying and selling needs.{" "}
            <a href="#" className="text-white font-bold underline underline-offset-2 hover:no-underline">
              Get Started →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
