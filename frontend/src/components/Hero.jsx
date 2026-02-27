export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden flex items-center pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-blue-800/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-blue-700/10" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center relative">
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs font-bold tracking-widest uppercase">
              #1 Mobile Reseller Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Buy & Sell{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Mobiles
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8 Q100 2 198 8"
                  stroke="url(#underlineGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            <br />
            With Confidence
          </h1>

          <p className="text-blue-200/70 text-lg leading-relaxed mb-10 max-w-md">
            The ultimate marketplace for buying, selling, and trading smartphones. Connect with verified vendors and get the best deals — fast and secure.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              Browse Products
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/15 transition-all duration-200"
            >
              Become a Vendor
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-12">
            {[
              { label: "Verified Sellers", icon: "✓" },
              { label: "Secure Payments", icon: "🔒" },
              { label: "Easy Returns", icon: "↩" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5">
                <span className="text-cyan-400 text-sm font-bold">{b.icon}</span>
                <span className="text-blue-200/60 text-xs font-semibold">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Phone Mockup Stack */}
        <div className="relative flex justify-center items-center">
          {/* Glow */}
          <div className="absolute w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />

          {/* Main phone */}
          <div className="relative z-10 w-56 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] border-4 border-gray-700 shadow-2xl shadow-blue-900/50 overflow-hidden">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
            <div className="bg-gradient-to-br from-blue-600 to-cyan-400 h-72 flex flex-col items-center justify-center pt-8">
              <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-3">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white font-black text-xl">MobiHub</span>
              <span className="text-white/70 text-xs mt-1">Your Marketplace</span>
            </div>
            <div className="p-4 space-y-2">
              {["iPhone 15 Pro", "Samsung S24", "Pixel 8 Pro"].map((phone) => (
                <div key={phone} className="flex items-center justify-between bg-gray-800 rounded-xl px-3 py-2">
                  <span className="text-white text-xs font-semibold">{phone}</span>
                  <span className="text-cyan-400 text-xs font-bold">View →</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating cards */}
          <div className="absolute top-10 -left-6 bg-white rounded-2xl p-3 shadow-xl w-36 z-20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-gray-800 text-xs font-bold">Sale Complete</span>
            </div>
            <p className="text-gray-500 text-xs">iPhone 14 Pro</p>
            <p className="text-green-600 font-black text-sm mt-0.5">+$849</p>
          </div>

          <div className="absolute bottom-10 -right-6 bg-white rounded-2xl p-3 shadow-xl w-40 z-20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xs">★</span>
              </div>
              <span className="text-gray-800 text-xs font-bold">New Listing</span>
            </div>
            <p className="text-gray-500 text-xs">Samsung S24 Ultra</p>
            <p className="text-blue-600 font-black text-sm mt-0.5">$1,199</p>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20Q1080 60 720 20Q360 -20 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
