import { useState } from "react";

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">
            <span className="text-white font-black text-lg">M</span>
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">Hamromobile<span className="text-blue-600">Hub</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Home","Products","Vendors","About","Contact"].map(item => (
            <a key={item} href="#" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">{item}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">Sign In</a>
          <a href="#" className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2.5 rounded-full shadow-md shadow-blue-200">Get Started</a>
        </div>
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {["Home","Products","Vendors","About","Contact"].map(item => (
            <a key={item} href="#" className="text-sm font-semibold text-gray-700">{item}</a>
          ))}
          <a href="#" className="text-sm font-bold text-white bg-blue-600 px-5 py-2.5 rounded-full text-center mt-2">Get Started</a>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden flex items-center pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:"linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)",backgroundSize:"60px 60px"}} />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center relative">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs font-bold tracking-widest uppercase">#1 Mobile Reseller Platform</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
            Buy & Sell{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Mobiles</span>
            <br />With Confidence
          </h1>
          <p className="text-blue-200/70 text-lg leading-relaxed mb-10 max-w-md">
            The ultimate marketplace for buying, selling, and trading smartphones. Connect with verified vendors and get the best deals — fast and secure.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all">
              Browse Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="#" className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/15 transition-all">Become a Vendor</a>
          </div>
          <div className="flex items-center gap-6 mt-12">
            {[{label:"Verified Sellers",icon:"✓"},{label:"Secure Payments",icon:"🔒"},{label:"Easy Returns",icon:"↩"}].map(b => (
              <div key={b.label} className="flex items-center gap-1.5">
                <span className="text-cyan-400 text-sm font-bold">{b.icon}</span>
                <span className="text-blue-200/60 text-xs font-semibold">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="absolute w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative z-10 w-56 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] border-4 border-gray-700 shadow-2xl overflow-hidden">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
            <div className="bg-gradient-to-br from-blue-600 to-cyan-400 h-72 flex flex-col items-center justify-center pt-8">
              <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-3">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-white font-black text-xl">MobiHub</span>
              <span className="text-white/70 text-xs mt-1">Your Marketplace</span>
            </div>
            <div className="p-4 space-y-2">
              {["iPhone 15 Pro","Samsung S24","Pixel 8 Pro"].map(phone => (
                <div key={phone} className="flex items-center justify-between bg-gray-800 rounded-xl px-3 py-2">
                  <span className="text-white text-xs font-semibold">{phone}</span>
                  <span className="text-cyan-400 text-xs font-bold">View →</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-10 -left-6 bg-white rounded-2xl p-3 shadow-xl w-36 z-20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><span className="text-green-600 text-xs">✓</span></div>
              <span className="text-gray-800 text-xs font-bold">Sale Complete</span>
            </div>
            <p className="text-gray-500 text-xs">iPhone 14 Pro</p>
            <p className="text-green-600 font-black text-sm mt-0.5">+$849</p>
          </div>
          <div className="absolute bottom-10 -right-6 bg-white rounded-2xl p-3 shadow-xl w-40 z-20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"><span className="text-blue-600 text-xs">★</span></div>
              <span className="text-gray-800 text-xs font-bold">New Listing</span>
            </div>
            <p className="text-gray-500 text-xs">Samsung S24 Ultra</p>
            <p className="text-blue-600 font-black text-sm mt-0.5">$1,199</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20Q1080 60 720 20Q360 -20 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────
const featuresData = [
  { icon:"🛒", title:"Buy With Ease", desc:"Browse thousands of verified mobile listings. Compare specs, prices, and seller ratings all in one place.", color:"from-blue-500 to-blue-600", bg:"bg-blue-50", border:"border-blue-100" },
  { icon:"🏷️", title:"Sell Fast", desc:"List your device in minutes. Reach thousands of buyers instantly with smart pricing suggestions.", color:"from-cyan-500 to-teal-500", bg:"bg-cyan-50", border:"border-cyan-100" },
  { icon:"🏪", title:"Vendor Dashboard", desc:"Manage your inventory, track sales, and analyze performance with a powerful vendor control panel.", color:"from-violet-500 to-purple-600", bg:"bg-violet-50", border:"border-violet-100" },
  { icon:"🔐", title:"Secure Transactions", desc:"Every transaction is protected with escrow payment and buyer/seller protection guarantees.", color:"from-green-500 to-emerald-600", bg:"bg-green-50", border:"border-green-100" },
  { icon:"⚙️", title:"Admin Control", desc:"Comprehensive admin panel to monitor all activities, users, vendors and transactions in real time.", color:"from-orange-500 to-red-500", bg:"bg-orange-50", border:"border-orange-100" },
  { icon:"🔔", title:"Instant Notifications", desc:"Real-time alerts for new listings, offers, messages, and sale confirmations across all devices.", color:"from-pink-500 to-rose-500", bg:"bg-pink-50", border:"border-pink-100" },
];

function Features() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">⚡ Integrated Solutions</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Trade Mobiles</span></h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Our platform connects buyers, sellers, and vendors with powerful tools designed for the mobile reselling ecosystem.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((f, i) => (
            <div key={i} className={`group relative ${f.bg} border ${f.border} rounded-3xl p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden`}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-5 shadow-lg`}>{f.icon}</div>
              <h3 className="text-gray-900 font-black text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
                Learn more
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
              <div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${f.color} opacity-10`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value:"450+", label:"Products Listed", icon:"📱" },
    { value:"150+", label:"Active Vendors", icon:"🏪" },
    { value:"120+", label:"Cities Covered", icon:"🌍" },
    { value:"20+",  label:"Brand Partners",  icon:"🤝" },
  ];
  return (
    <section className="bg-white py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl px-8 py-12 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s,i) => (
              <div key={i}>
                <div className="text-4xl mb-2">{s.icon}</div>
                <div className="text-4xl md:text-5xl font-black text-white mb-1">{s.value}</div>
                <div className="text-white/70 text-sm font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="relative text-center text-white/70 text-sm mt-8">
            Impressed? Choose MobiHub to handle your complete mobile buying and selling needs.{" "}
            <a href="#" className="text-white font-bold underline underline-offset-2">Get Started →</a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { step:"01", title:"Create Your Account", desc:"Sign up as a buyer, seller, or vendor in under 2 minutes. Verify your identity for a trusted profile.", icon:"👤" },
    { step:"02", title:"List or Browse", desc:"Sellers list their devices with photos and details. Buyers browse curated listings with filters.", icon:"🔍" },
    { step:"03", title:"Make a Deal", desc:"Negotiate, offer, or buy instantly. Our escrow system keeps both parties safe throughout.", icon:"💳" },
    { step:"04", title:"Receive & Review", desc:"Get your device delivered safely. Leave a review to build the community's trust ecosystem.", icon:"⭐" },
  ];
  return (
    <section className="bg-gradient-to-br from-slate-900 to-blue-950 py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-600/20 text-cyan-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-blue-500/30">🔄 How It Works</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Simple as <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">1, 2, 3, 4</span></h2>
          <p className="text-blue-200/60 text-lg max-w-xl mx-auto">Trading phones has never been easier. Our streamlined process gets you buying or selling in minutes.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s,i) => (
            <div key={i} className="relative bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white text-xs font-black">{s.step}</span>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center text-3xl mb-5">{s.icon}</div>
              <h3 className="text-white font-black text-lg mb-2">{s.title}</h3>
              <p className="text-blue-200/60 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TEAM ─────────────────────────────────────────────────────────────────────
function Team() {
  const team = [
    { name:"Richard Smith", role:"Founder & CEO", bio:"Serial entrepreneur with 10+ years in mobile tech and e-commerce platforms.", color:"from-blue-400 to-blue-600", initials:"RS" },
    { name:"Samara Kane", role:"CTO", bio:"Full-stack engineer passionate about building scalable marketplace infrastructure.", color:"from-violet-400 to-purple-600", initials:"SK" },
    { name:"Elizabeth Monroe", role:"Head of Vendors", bio:"Specialist in vendor relations and marketplace growth strategies.", color:"from-cyan-400 to-teal-600", initials:"EM" },
    { name:"James Tate", role:"Lead Designer", bio:"UI/UX designer crafting seamless buying and selling experiences.", color:"from-pink-400 to-rose-600", initials:"JT" },
  ];
  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">👥 Meet Our Team</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">The People Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">MobiHub</span></h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Passionate experts building the future of mobile commerce.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`h-40 bg-gradient-to-br ${member.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 70% 20%, white 1px, transparent 1px)",backgroundSize:"20px 20px"}} />
                <div className="w-20 h-20 rounded-full bg-white/25 backdrop-blur border-2 border-white/40 flex items-center justify-center">
                  <span className="text-white font-black text-2xl">{member.initials}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-gray-900 font-black text-lg mb-0.5">{member.name}</h3>
                <p className="text-blue-600 text-xs font-bold tracking-wide uppercase mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                <div className="flex gap-2 mt-4">
                  {["in","tw","gh"].map(s => (
                    <a key={s} href="#" className="w-7 h-7 rounded-full bg-gray-100 hover:bg-blue-600 flex items-center justify-center text-gray-500 hover:text-white transition-all text-xs font-bold">{s}</a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="bg-slate-900 py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
        <div>
          <span className="inline-block bg-blue-600/20 text-cyan-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-blue-500/30">🚀 Start Today</span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
            Reach Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Destination</span> 100% Sure And Safe
          </h2>
          <p className="text-blue-200/60 text-base leading-relaxed mb-8 max-w-md">Whether you're a buyer looking for the best deal or a vendor growing your business, MobiHub is the platform that gets you there — safely and reliably.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:-translate-y-0.5 transition-all">
              Start for Free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="#" className="flex items-center border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all">Learn More</a>
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">📍</span>
            </div>
            <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-transparent" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-12">
            {Array.from({length:6}).map((_,i) => (
              <div key={i} className="w-20 h-20 rounded-xl border-2 border-amber-300/50 bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center shadow-lg text-3xl" style={{transform:`rotate(${(i%3-1)*3}deg)`}}>📦</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const links = {
    Company: ["About Us","Careers","Press","Blog"],
    Support: ["Help Center","How It Works","Privacy Policy","Terms of Service"],
    Marketplace: ["Browse Phones","Sell a Phone","Vendor Portal","Admin Login"],
  };
  return (
    <footer className="bg-slate-950 text-white px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center"><span className="text-white font-black text-lg">M</span></div>
              <span className="text-xl font-black">Mobi<span className="text-blue-400">Hub</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">The trusted marketplace for buying, selling, and trading smartphones.</p>
            <div className="flex gap-3">
              {["f","t","in","yt"].map(s => (
                <a key={s} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center text-gray-300 hover:text-white transition-all text-xs font-bold">{s}</a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title,items]) => (
            <div key={title}>
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-5">{title}</h4>
              <ul className="space-y-3">
                {items.map(item => <li key={item}><a href="#" className="text-gray-400 text-sm hover:text-blue-400 transition-colors">{item}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 MobiHub. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-500 text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Team />
      <CTABanner />
      <Footer />
    </div>
  );
}
