import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">
            <span className="text-white font-black text-lg">M</span>
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">
            HamroMobile<span className="text-blue-600">Hub</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Products", "Vendors", "About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/signin"
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2.5 rounded-full shadow-md shadow-blue-200"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {["Home", "Products", "Vendors", "About", "Contact"].map((item) => (
            <a key={item} href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-600">
              {item}
            </a>
          ))}
          <Link
            to="/signin"
            className="text-sm font-semibold text-gray-700 hover:text-blue-600"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-sm font-bold text-white bg-blue-600 px-5 py-2.5 rounded-full text-center mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}