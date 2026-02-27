const links = {
  Company: ["About Us", "Careers", "Press", "Blog"],
  Support: ["Help Center", "How It Works", "Privacy Policy", "Terms of Service"],
  Marketplace: ["Browse Phones", "Sell a Phone", "Vendor Portal", "Admin Login"],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-black text-lg">M</span>
              </div>
              <span className="text-xl font-black">
                HamroMobile<span className="text-blue-400">Hub</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The trusted marketplace for buying, selling, and trading smartphones. Join thousands of happy customers today.
            </p>
            <div className="flex gap-3">
              {["f", "t", "in", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center text-gray-300 hover:text-white transition-all text-xs font-bold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-5">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 text-sm hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MobiHub. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-500 text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
