export default function CTABanner() {
  return (
    <section className="bg-slate-900 py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
        {/* Left */}
        <div>
          <span className="inline-block bg-blue-600/20 text-cyan-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-blue-500/30">
            🚀 Start Today
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
            Reach Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Destination
            </span>{" "}
            100% Sure And Safe
          </h2>
          <p className="text-blue-200/60 text-base leading-relaxed mb-8 max-w-md">
            Whether you're a buyer looking for the best deal or a vendor growing your business, MobiHub is the platform that gets you there — safely, quickly, and reliably.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 hover:shadow-blue-500/50 transition-all"
            >
              Start for Free
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right — Illustration */}
        <div className="relative flex justify-center items-center">
          {/* Packages illustration (SVG) */}
          <div className="relative">
            {/* Location pin */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/40">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
              </div>
              <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-transparent" />
            </div>

            {/* Box stack */}
            <div className="grid grid-cols-3 gap-3 mt-12">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-xl border-2 border-amber-300/50 bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center shadow-lg"
                  style={{ transform: `rotate(${(i % 3 - 1) * 3}deg)` }}
                >
                  <svg className="w-8 h-8 text-amber-600/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
