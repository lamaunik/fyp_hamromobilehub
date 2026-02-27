import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

const IconMail = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);
const IconLock = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const IconUser = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const IconPhone = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const IconBuilding = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const IconPin = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconKey = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);
const IconSpinner = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);
const IconCheck = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

function InputField({ label, type = "text", placeholder, icon, value, onChange, required, disabled }) {
  const [show, setShow] = useState(false);
  const isPwd = type === "password";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">{icon}</span>
        )}
        <input
          type={isPwd ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          style={{ paddingLeft: icon ? "2.75rem" : "1rem", paddingRight: isPwd ? "2.75rem" : "1rem" }}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all disabled:opacity-40"
        />
        {isPwd && (
          <button type="button" onClick={() => setShow(!show)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
            {show
              ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
          </button>
        )}
      </div>
    </div>
  );
}

function PasswordStrength({ password }) {
  if (!password) return null;
  const score = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length;
  const colors = ["", "bg-red-500", "bg-yellow-400", "bg-cyan-400", "bg-green-400"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const textColors = ["", "text-red-400", "text-yellow-400", "text-cyan-400", "text-green-400"];
  return (
    <div className="flex flex-col gap-1 -mt-1">
      <div className="flex gap-1">
        {[1,2,3,4].map((l) => (
          <div key={l} className={`flex-1 h-1 rounded-full transition-all duration-300 ${l <= score ? colors[score] : "bg-white/10"}`} />
        ))}
      </div>
      <p className={`text-[10px] font-semibold ${textColors[score]}`}>{labels[score]}</p>
    </div>
  );
}

function Checkbox({ checked, onChange, children }) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer" onClick={onChange}>
      <div className={`w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${checked ? "bg-gradient-to-br from-blue-500 to-cyan-500 border-transparent" : "border-white/20 bg-white/5"}`}>
        {checked && <IconCheck />}
      </div>
      <span className="text-xs text-gray-400 leading-relaxed select-none">{children}</span>
    </label>
  );
}

function AuthShell({ children, maxWidth = "max-w-md" }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage:"linear-gradient(rgba(99,179,237,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(99,179,237,0.5) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
      </div>
      <div className={`w-full ${maxWidth} relative z-10`}>
        <a href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-black text-xl">M</span>
          </div>
          <span className="text-2xl font-black text-white tracking-tight">HamroMobile<span className="text-blue-400">Hub</span></span>
        </a>
        {children}
      </div>
    </div>
  );
}

function Card({ children }) {
  return <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">{children}</div>;
}

function SubmitBtn({ loading, label, gradient = "from-blue-600 to-cyan-500", shadow = "shadow-blue-500/25" }) {
  return (
    <button type="submit" disabled={loading}
      className={`w-full py-3.5 rounded-xl font-black text-white text-sm bg-gradient-to-r ${gradient} shadow-lg ${shadow} hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0`}>
      {loading ? <span className="flex items-center justify-center gap-2"><IconSpinner />{label}…</span> : label}
    </button>
  );
}

const OAuthButtons = () => (
  <div className="grid grid-cols-2 gap-3">
    {[
      { name: "Google", icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3L16.04 18.013Z"/><path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/></svg> },
      { name: "Facebook", icon: <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    ].map(({ name, icon }) => (
      <button key={name} type="button"
        className="flex items-center justify-center gap-2 border border-white/10 rounded-xl py-2.5 text-gray-300 text-xs font-semibold hover:bg-white/5 hover:border-white/20 transition-all">
        {icon} {name}
      </button>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN — single unified page, role auto-detected by backend
// ─────────────────────────────────────────────────────────────────────────────

export function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    alert(`Signed in: ${form.email}`);
  };

  return (
    <AuthShell>
      <Card>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-1.5">Welcome back</h1>
          <p className="text-sm text-gray-400">Sign in to your HamroMobileHub account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <InputField label="Email address" type="email" placeholder="you@example.com"
            value={form.email} onChange={set("email")} required icon={<IconMail />} />
          <InputField label="Password" type="password" placeholder="Enter your password"
            value={form.password} onChange={set("password")} required icon={<IconLock />} />

          <div className="flex justify-end -mt-2">
            <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Forgot password?
            </a>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}

          <SubmitBtn loading={loading} label="Sign In" />
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-600">or continue with</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <OAuthButtons />

        {/* Role-based signup links */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-center text-xs text-gray-500 mb-4">Don't have an account? Choose your role:</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { href: "/signup/user", color: "blue", label: "Buyer /\nSeller", borderColor: "border-blue-500/25 hover:border-blue-500/50 hover:bg-blue-500/10", textColor: "text-blue-300", bgGrad: "from-blue-500 to-blue-600",
                icon: <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
              { href: "/signup/vendor", color: "violet", label: "Vendor", borderColor: "border-violet-500/25 hover:border-violet-500/50 hover:bg-violet-500/10", textColor: "text-violet-300", bgGrad: "from-violet-500 to-purple-600",
                icon: <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
              { href: "/signup/admin", color: "orange", label: "Admin", borderColor: "border-orange-500/25 hover:border-orange-500/50 hover:bg-orange-500/10", textColor: "text-orange-300", bgGrad: "from-orange-500 to-red-500",
                icon: <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
            ].map((r) => (
              <a key={r.href} href={r.href}
                className={`flex flex-col items-center gap-2 py-3.5 px-2 rounded-2xl border transition-all ${r.borderColor}`}>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${r.bgGrad} flex items-center justify-center shadow-sm`}>
                  {r.icon}
                </div>
                <span className={`text-[10px] font-bold ${r.textColor} text-center leading-tight whitespace-pre-line`}>{r.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Card>
    </AuthShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// USER SIGNUP — clean, minimal, fast for buyers & sellers
// ─────────────────────────────────────────────────────────────────────────────

export function UserSignup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return alert("Passwords do not match");
    if (!agreed) return alert("Please accept the terms to continue");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    alert(`Account created: ${form.email}`);
  };

  return (
    <AuthShell>
      <Card>
        {/* Role header */}
        <div className="flex items-center gap-4 mb-7">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">Buyer / Seller Account</span>
            <h1 className="text-2xl font-black text-white leading-tight">Create your account</h1>
            <p className="text-xs text-gray-500 mt-0.5">Free forever. No credit card needed.</p>
          </div>
        </div>

        {/* Quick perks */}
        <div className="grid grid-cols-3 gap-2 mb-7">
          {[{ icon: "🛍️", label: "Browse 450+ listings" }, { icon: "🔒", label: "Escrow protection" }, { icon: "⚡", label: "Instant alerts" }].map((p) => (
            <div key={p.label} className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-2.5 text-center">
              <div className="text-lg mb-1">{p.icon}</div>
              <p className="text-[10px] text-blue-300 font-semibold leading-tight">{p.label}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Full name *" placeholder="John Doe" value={form.name} onChange={set("name")} required icon={<IconUser />} />
            <InputField label="Phone" type="tel" placeholder="+977 98xxxxxxxx" value={form.phone} onChange={set("phone")} icon={<IconPhone />} />
          </div>
          <InputField label="Email address *" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} required icon={<IconMail />} />
          <InputField label="Password *" type="password" placeholder="Min. 8 characters" value={form.password} onChange={set("password")} required icon={<IconLock />} />
          <PasswordStrength password={form.password} />
          <InputField label="Confirm password *" type="password" placeholder="Re-enter password" value={form.confirm} onChange={set("confirm")} required icon={<IconLock />} />

          <Checkbox checked={agreed} onChange={() => setAgreed(!agreed)}>
            I agree to the <a href="#" className="text-cyan-400 hover:underline">Terms of Service</a> and <a href="#" className="text-cyan-400 hover:underline">Privacy Policy</a>
          </Checkbox>

          <SubmitBtn loading={loading} label="Create Free Account" gradient="from-blue-600 to-cyan-500" shadow="shadow-blue-500/25" />

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-600">or sign up with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <OAuthButtons />
        </form>

        <div className="flex items-center justify-center gap-4 mt-6 pt-5 border-t border-white/10 text-xs text-gray-500">
          <span>Already have an account? <a href="/login" className="text-cyan-400 font-bold hover:text-cyan-300">Sign in</a></span>
          <span className="text-white/20">|</span>
          <a href="/signup/vendor" className="text-violet-400 hover:text-violet-300 font-semibold">Vendor signup →</a>
        </div>
      </Card>
    </AuthShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VENDOR SIGNUP — 2-step wizard, business-focused
// ─────────────────────────────────────────────────────────────────────────────

export function VendorSignup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirm: "",
    businessName: "", businessType: "", city: "", address: "", taxId: "", description: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const goNext = () => {
    if (!form.name || !form.email || !form.password || !form.phone) return alert("Please fill all required fields");
    if (form.password !== form.confirm) return alert("Passwords don't match");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.businessName || !form.businessType) return alert("Business name and type are required");
    if (!agreed) return alert("Please accept the vendor terms");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    alert(`Vendor application submitted for: ${form.businessName}`);
  };

  const businessTypes = ["Mobile Retailer", "Wholesaler", "Repair Shop", "Authorized Dealer", "Import / Export", "Other"];

  return (
    <AuthShell maxWidth="max-w-lg">
      <Card>
        {/* Role header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/25">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-bold text-violet-400 tracking-widest uppercase">Vendor Registration</span>
            <h1 className="text-2xl font-black text-white leading-tight">Open your store</h1>
            <p className="text-xs text-gray-500 mt-0.5">Reviewed & approved within 24 hours.</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-7">
          {[{ n: 1, label: "Your Info" }, { n: 2, label: "Business Details" }].map(({ n, label }, i) => (
            <div key={n} className="flex items-center flex-1">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${step > n ? "bg-violet-600 text-white" : step === n ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md" : "bg-white/5 border border-white/20 text-gray-500"}`}>
                  {step > n ? <IconCheck /> : n}
                </div>
                <span className={`text-xs font-semibold whitespace-nowrap ${step >= n ? "text-gray-200" : "text-gray-600"}`}>{label}</span>
              </div>
              {i < 1 && <div className={`flex-1 h-px mx-3 ${step > n ? "bg-violet-500" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Full name *" placeholder="Your name" value={form.name} onChange={set("name")} required icon={<IconUser />} />
              <InputField label="Phone *" type="tel" placeholder="+977 98xxxxxxxx" value={form.phone} onChange={set("phone")} required icon={<IconPhone />} />
            </div>
            <InputField label="Email address *" type="email" placeholder="you@business.com" value={form.email} onChange={set("email")} required icon={<IconMail />} />
            <InputField label="Password *" type="password" placeholder="Min. 8 characters" value={form.password} onChange={set("password")} required icon={<IconLock />} />
            <PasswordStrength password={form.password} />
            <InputField label="Confirm password *" type="password" placeholder="Re-enter password" value={form.confirm} onChange={set("confirm")} required icon={<IconLock />} />
            <button type="button" onClick={goNext}
              className="w-full py-3.5 rounded-xl font-black text-white text-sm bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-1">
              Next: Business Details
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Business name *" placeholder="Your Shop Name" value={form.businessName} onChange={set("businessName")} required icon={<IconBuilding />} />
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Business type *</label>
                <select value={form.businessType} onChange={set("businessType")} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all appearance-none">
                  <option value="" disabled className="bg-slate-900">Select type…</option>
                  {businessTypes.map((t) => <option key={t} value={t} className="bg-slate-900">{t}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InputField label="City *" placeholder="Kathmandu" value={form.city} onChange={set("city")} required icon={<IconPin />} />
              <InputField label="PAN / Tax ID" placeholder="Optional" value={form.taxId} onChange={set("taxId")} icon={<IconKey />} />
            </div>
            <InputField label="Full address" placeholder="Street / Area / District" value={form.address} onChange={set("address")} icon={<IconPin />} />

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">About your store (optional)</label>
              <textarea value={form.description} onChange={set("description")} placeholder="Describe products, specialties, services…" rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none" />
            </div>

            {/* Vendor perks */}
            <div className="grid grid-cols-3 gap-2">
              {[{ icon: "📦", label: "Bulk listings" }, { icon: "📊", label: "Sales dashboard" }, { icon: "✅", label: "Verified badge" }].map((p) => (
                <div key={p.label} className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-2.5 text-center">
                  <div className="text-base mb-1">{p.icon}</div>
                  <p className="text-[10px] text-violet-300 font-semibold">{p.label}</p>
                </div>
              ))}
            </div>

            {/* Review notice */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex gap-2.5 text-xs text-blue-300 leading-relaxed">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Your application will be reviewed within 24 hours. A confirmation email will be sent once approved.
            </div>

            <Checkbox checked={agreed} onChange={() => setAgreed(!agreed)}>
              I agree to the <a href="#" className="text-cyan-400 hover:underline">Vendor Terms</a> and <a href="#" className="text-cyan-400 hover:underline">Marketplace Policy</a>
            </Checkbox>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl font-bold text-gray-300 text-sm border border-white/10 hover:bg-white/5 transition-all">
                ← Back
              </button>
              <div className="flex-[2]">
                <SubmitBtn loading={loading} label="Submit Application" gradient="from-violet-600 to-purple-600" shadow="shadow-violet-500/20" />
              </div>
            </div>
          </form>
        )}

        <p className="text-center text-xs text-gray-500 mt-6">
          Already a vendor? <a href="/login" className="text-cyan-400 font-bold hover:text-cyan-300">Sign in</a>
        </p>
      </Card>
    </AuthShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN SIGNUP — invite-code gated, security-forward
// ─────────────────────────────────────────────────────────────────────────────

export function AdminSignup() {
  const [code, setCode] = useState("");
  const [codeOk, setCodeOk] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", department: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const verifyCode = async () => {
    if (!code.trim()) return;
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 900));
    setVerifying(false);
    if (code.trim().toUpperCase() === "ADMIN2024") setCodeOk(true);
    else alert("Invalid invite code. Contact your super-administrator.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codeOk) return;
    if (form.password !== form.confirm) return alert("Passwords don't match");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    alert(`Admin account created: ${form.email}`);
  };

  const departments = ["Platform Management", "Vendor Relations", "Customer Support", "Finance & Compliance", "Security & Audit"];

  return (
    <AuthShell>
      <Card>
        {/* Role header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/25">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase">Admin Registration</span>
            <h1 className="text-2xl font-black text-white leading-tight">Admin access</h1>
            <p className="text-xs text-gray-500 mt-0.5">Restricted — invitation required.</p>
          </div>
        </div>

        {/* Security warning */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 mb-6 flex gap-2.5">
          <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-300/80 text-xs leading-relaxed">
            <span className="font-bold text-red-300">Restricted area.</span> An invite code from a super-administrator is required. All admin actions are logged and audited.
          </p>
        </div>

        {/* Invite code block */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-6">
          <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase block mb-2">Invite Code</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"><IconKey /></span>
              <input type="text" placeholder="e.g. ADMIN2024" value={code}
                onChange={(e) => setCode(e.target.value)} disabled={codeOk}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), verifyCode())}
                className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-sm font-mono tracking-[0.2em] uppercase transition-all focus:outline-none disabled:opacity-60 ${codeOk ? "border-green-500/40 bg-green-500/5 text-green-300" : "border-white/10 text-white focus:border-cyan-500/50"}`}
              />
            </div>
            <button type="button" onClick={verifyCode} disabled={codeOk || verifying}
              className={`px-4 rounded-xl text-xs font-black flex-shrink-0 flex items-center gap-1.5 transition-all border ${codeOk ? "bg-green-500/15 text-green-300 border-green-500/30" : "bg-orange-500/15 text-orange-300 border-orange-500/30 hover:bg-orange-500/25"}`}>
              {verifying ? <IconSpinner /> : codeOk ? <><IconCheck /> Verified</> : "Verify"}
            </button>
          </div>
          {codeOk
            ? <p className="text-green-400 text-xs flex items-center gap-1.5 mt-2 font-semibold"><IconCheck /> Code accepted — fill in your details below</p>
            : <p className="text-gray-600 text-[10px] mt-2">Demo: <span className="font-mono text-gray-500">ADMIN2024</span></p>}
        </div>

        {/* Form — locked until verified */}
        <form onSubmit={handleSubmit}>
          <div className={`flex flex-col gap-4 transition-all duration-300 ${codeOk ? "opacity-100" : "opacity-25 pointer-events-none select-none"}`}>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Full name *" placeholder="Admin name" value={form.name} onChange={set("name")} required icon={<IconUser />} disabled={!codeOk} />
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Department *</label>
                <select value={form.department} onChange={set("department")} required disabled={!codeOk}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all appearance-none disabled:opacity-40">
                  <option value="" disabled className="bg-slate-900">Select…</option>
                  {departments.map((d) => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
                </select>
              </div>
            </div>
            <InputField label="Admin email *" type="email" placeholder="admin@mobihub.com" value={form.email} onChange={set("email")} required icon={<IconMail />} disabled={!codeOk} />
            <InputField label="Password *" type="password" placeholder="Strong password" value={form.password} onChange={set("password")} required icon={<IconLock />} disabled={!codeOk} />
            <PasswordStrength password={form.password} />
            <InputField label="Confirm password *" type="password" placeholder="Re-enter password" value={form.confirm} onChange={set("confirm")} required icon={<IconLock />} disabled={!codeOk} />

            {/* Permissions */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Permissions granted upon approval</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {["View all users", "Manage vendors", "Moderate listings", "View transactions", "Send notifications", "Access reports"].map((p) => (
                  <div key={p} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span className="text-orange-400"><IconCheck /></span> {p}
                  </div>
                ))}
              </div>
            </div>

            <SubmitBtn loading={loading} label="Create Admin Account" gradient="from-orange-500 to-red-600" shadow="shadow-orange-500/20" />
          </div>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Already have an account? <a href="/login" className="text-cyan-400 font-bold hover:text-cyan-300">Sign in</a>
        </p>
      </Card>
    </AuthShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT EXPORT — combined preview with switcher tabs
// ─────────────────────────────────────────────────────────────────────────────

export default function AuthParts() {
  const [view, setView] = useState("login");
  const tabs = [
    { id: "login", label: "Login" },
    { id: "user", label: "User Signup" },
    { id: "vendor", label: "Vendor Signup" },
    { id: "admin", label: "Admin Signup" },
  ];
  return (
    <div>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex gap-1 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5 shadow-xl">
        {tabs.map(({ id, label }) => (
          <button key={id} onClick={() => setView(id)}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${view === id ? "bg-blue-600 text-white shadow-md" : "text-gray-400 hover:text-white"}`}>
            {label}
          </button>
        ))}
      </div>
      {view === "login"  && <Login />}
      {view === "user"   && <UserSignup />}
      {view === "vendor" && <VendorSignup />}
      {view === "admin"  && <AdminSignup />}
    </div>
  );
}