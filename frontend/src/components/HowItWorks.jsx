const steps = [
  {
    step: "01",
    title: "Create Your Account",
    desc: "Sign up as a buyer, seller, or vendor in under 2 minutes. Verify your identity for a trusted profile.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "List or Browse",
    desc: "Sellers list their devices with photos and details. Buyers browse curated listings with filters.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Make a Deal",
    desc: "Negotiate, offer, or buy instantly. Our escrow system keeps both parties safe throughout.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Receive & Review",
    desc: "Get your device delivered safely. Leave a review to build the community's trust ecosystem.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-blue-950 py-24 px-6 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400" />
      <div className="absolute -left-20 top-20 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute -right-20 bottom-20 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-600/20 text-cyan-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-blue-500/30">
            🔄 How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Simple as{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              1, 2, 3, 4
            </span>
          </h2>
          <p className="text-blue-200/60 text-lg max-w-xl mx-auto">
            Trading phones has never been easier. Our streamlined process gets you buying or selling in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="relative group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%-12px)] w-full h-0.5 bg-gradient-to-r from-blue-600/50 to-transparent z-0" />
              )}

              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <span className="text-white text-xs font-black">{s.step}</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center text-cyan-300 mb-5">
                  {s.icon}
                </div>

                <h3 className="text-white font-black text-lg mb-2">{s.title}</h3>
                <p className="text-blue-200/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
