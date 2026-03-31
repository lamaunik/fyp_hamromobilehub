import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const P = {
  navy:  "#18181b",
  royal: "#27272a",
  ocean: "#3f3f46",
  sky:   "#e4e4e7",
  mist:  "#f4f4f5",
  white: "#ffffff",
  muted: "#71717a",
  mistBg:"#fafafa",
  font:  "'DM Sans', 'Inter', sans-serif",
  fontHeading: "'Barlow Condensed', 'Inter', sans-serif",
  accent: "#f43f5e"
};

const inputStyle = {
  width:"100%", background:P.white, border:`1px solid ${P.sky}`,
  outline:"none", color:P.navy, fontSize:14, borderRadius:12,
  paddingLeft:44, paddingRight:16, paddingTop:12, paddingBottom:12,
  transition:"all 0.2s", boxSizing:"border-box",
  fontFamily:P.font,
};

const roles = [
  { id:"user",   label:"User",   icon:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> },
  { id:"vendor", label:"Vendor", icon:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
];

export default function SignUp() {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [policyModal, setPolicyModal] = useState(null);

  const { user, register, verifyEmail, resendVerification } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
      else if (user.role === "vendor") navigate("/vendor/dashboard", { replace: true });
      else navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = field => e => setForm(prev=>({ ...prev, [field]:e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.name||!form.email||!form.password||!form.confirm) { setError("Please fill in all fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (!acceptedTerms) { setError("You must agree to the Terms of Service and Privacy Policy."); return; }
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, role);
      
      if (user?.requiresEmailVerification) {
        setStep(2);
        return;
      }

      if (user?.pendingApproval) {
        // Just show an alert and navigate to login
        alert("Registration successful! Please wait for an Admin to approve your Vendor account before logging in.");
        navigate("/signin");
        return;
      }

      if (user.role==="admin") navigate("/admin/dashboard");
      else if (user.role==="vendor") navigate("/vendor/dashboard");
      else navigate("/dashboard");
    } catch(err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleVerify = async () => {
    setError("");
    if (!otp || otp.length !== 6) { setError("Please enter a valid 6-digit code."); return; }
    setLoading(true);
    try {
      const user = await verifyEmail(form.email, otp);
      if (user?.pendingApproval) {
        alert("Email verified! Please wait for an Admin to approve your Vendor account before logging in.");
        navigate("/signin");
        return;
      }
      if (user.role==="admin") navigate("/admin/dashboard");
      else if (user.role==="vendor") navigate("/vendor/dashboard");
      else navigate("/dashboard");
    } catch(err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleResend = async () => {
    setError("");
    setLoading(true);
    try {
      await resendVerification(form.email);
      alert("Verification code resent! Check your email.");
    } catch(err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const passwordsMatch = form.confirm && form.password === form.confirm;

  return (
    <div style={{ minHeight:"100vh", background:P.mistBg, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", position:"relative", overflow:"hidden", fontFamily:P.font }}>
      {/* bg blobs */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:80, left:40, width:288, height:288, borderRadius:"50%", background:"rgba(244, 63, 94, 0.05)", filter:"blur(64px)" }}/>
        <div style={{ position:"absolute", bottom:80, right:40, width:384, height:384, borderRadius:"50%", background:"rgba(24, 24, 27, 0.03)", filter:"blur(64px)" }}/>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:800, height:800, borderRadius:"50%", border:`1px solid ${P.sky}` }}/>
        <div style={{ position:"absolute", inset:0, opacity:1, backgroundImage:`radial-gradient(${P.sky} 1px, transparent 1px)`, backgroundSize:"40px 40px" }}/>
      </div>

      <div style={{ width:"100%", maxWidth:440, position:"relative", paddingTop:40, paddingBottom:40 }}>
        {/* Back */}
        <div style={{ marginBottom:24 }}>
          <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:8, color:P.muted, textDecoration:"none", fontSize:14, fontWeight:600 }}
            onMouseEnter={e=>e.currentTarget.style.color=P.navy} onMouseLeave={e=>e.currentTarget.style.color=P.muted}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:P.white, border:`1px solid ${P.sky}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
            </div>
            Back
          </Link>
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:32 }}>
          <img src="/logo.png" alt="Logo" style={{ height:42, width:"auto" }} />
          <span style={{ fontSize:24, fontWeight:900, color:P.navy, letterSpacing:"-0.02em", fontFamily:P.fontHeading }}>
            HamroMobile<span style={{ color:P.accent }}>Hub</span>
          </span>
        </div>

        {/* Card */}
        <div style={{ background:P.white, border:`1px solid ${P.sky}`, borderRadius:24, padding:32, boxShadow:"0 24px 64px rgba(0,0,0,0.04)" }}>

          {step === 1 ? (
            <>
              {/* Header */}
              <div style={{ textAlign:"center", marginBottom:28 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:P.white, border:`1px solid ${P.sky}`, borderRadius:999, padding:"5px 14px", marginBottom:14 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:P.accent, display:"inline-block" }}/>
                  <span style={{ color:P.navy, fontSize:11, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>Join HMH</span>
                </div>
                <h1 style={{ fontSize:28, fontWeight:900, color:P.navy, margin:"0 0 8px", letterSpacing:"-0.02em", fontFamily:P.fontHeading }}>Create Account</h1>
            <p style={{ color:P.muted, fontSize:14, margin:0 }}>
              Already have an account?{" "}
              <Link to="/signin" style={{ color:P.accent, fontWeight:700, textDecoration:"none" }}
                onMouseEnter={e=>e.target.style.opacity=0.8} onMouseLeave={e=>e.target.style.opacity=1}>Sign In</Link>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(220,38,38,0.12)", border:"1px solid rgba(220,38,38,0.3)", color:"#fca5a5", fontSize:13, fontWeight:600, padding:"10px 14px", borderRadius:12, marginBottom:20 }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {error}
            </div>
          )}

          {/* Google */}
          <button style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:10, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(212, 210, 195, 0.2)", color:P.white, fontWeight:600, fontSize:14, padding:"11px 0", borderRadius:14, cursor:"pointer", marginBottom:24, transition:"background 0.2s", fontFamily:P.font }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
            <div style={{ flex:1, height:1, background:"rgba(212, 210, 195, 0.15)" }}/>
            <span style={{ color:"rgba(212, 210, 195, 0.4)", fontSize:12, fontWeight:700 }}>OR</span>
            <div style={{ flex:1, height:1, background:"rgba(212, 210, 195, 0.15)" }}/>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Role Selector */}
            <div>
              <label style={{ display:"block", color:P.muted, fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>I Am A</label>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8 }}>
                {roles.map(r=>(
                  <button key={r.id} onClick={()=>setRole(r.id)} style={{
                    display:"flex", flexDirection:"column", alignItems:"center", gap:6, padding:"12px 0", borderRadius:12,
                    border: role===r.id ? `1px solid ${P.navy}` : `1px solid ${P.sky}`,
                    background: role===r.id ? P.navy : P.white,
                    color: role===r.id ? P.white : P.muted,
                    fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s", fontFamily:P.font,
                    boxShadow: role===r.id ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                  }}
                    onMouseEnter={e=>{ if(role!==r.id){ e.currentTarget.style.background=P.mist; }}}
                    onMouseLeave={e=>{ if(role!==r.id){ e.currentTarget.style.background=P.white; }}}
                  >
                    <span style={{ color: role===r.id ? P.accent : P.muted }}>{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label style={{ display:"block", color:P.muted, fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Full Name</label>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:P.muted, pointerEvents:"none" }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </div>
                <input type="text" value={form.name} onChange={handleChange("name")} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Your full name"
                  style={inputStyle}
                  onFocus={e=>{ e.target.style.borderColor=P.navy; e.target.style.background=P.white; }}
                  onBlur={e=>{ e.target.style.borderColor=P.sky; e.target.style.background=P.white; }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display:"block", color:P.muted, fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Email Address</label>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:P.muted, pointerEvents:"none" }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                </div>
                <input type="email" value={form.email} onChange={handleChange("email")} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="you@example.com"
                  style={inputStyle}
                  onFocus={e=>{ e.target.style.borderColor=P.navy; e.target.style.background=P.white; }}
                  onBlur={e=>{ e.target.style.borderColor=P.sky; e.target.style.background=P.white; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display:"block", color:P.muted, fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Password</label>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:P.muted, pointerEvents:"none" }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <input type={showPassword?"text":"password"} value={form.password} onChange={handleChange("password")} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Min. 8 characters"
                  style={{ ...inputStyle, paddingRight:44 }}
                  onFocus={e=>{ e.target.style.borderColor=P.navy; e.target.style.background=P.white; }}
                  onBlur={e=>{ e.target.style.borderColor=P.sky; e.target.style.background=P.white; }}
                />
                <button onClick={()=>setShowPassword(!showPassword)} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:P.muted, padding:0 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPassword ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ display:"block", color:P.muted, fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Confirm Password</label>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:P.muted, pointerEvents:"none" }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <input type={showConfirm?"text":"password"} value={form.confirm} onChange={handleChange("confirm")} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Repeat your password"
                  style={{ ...inputStyle, paddingRight:72,
                    borderColor: form.confirm ? (passwordsMatch ? "#10b981" : "#ef4444") : P.sky
                  }}
                  onFocus={e=>{ if(!form.confirm){ e.target.style.borderColor=P.navy; }}}
                  onBlur={e=>{ if(!form.confirm){ e.target.style.borderColor=P.sky; }}}
                />
                {form.confirm && (
                  <span style={{ position:"absolute", right:44, top:"50%", transform:"translateY(-50%)", fontSize:14, fontWeight:800, color: passwordsMatch ? "#4ade80" : "#f87171" }}>
                    {passwordsMatch ? "✓" : "✗"}
                  </span>
                )}
                <button onClick={()=>setShowConfirm(!showConfirm)} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:P.muted, padding:0 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showConfirm ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>

            {/* Terms */}
            <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
              <button 
                type="button"
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                style={{ 
                  width:18, height:18, borderRadius:4, border: acceptedTerms ? `1px solid ${P.sky}` : "1px solid rgba(212, 210, 195, 0.3)",
                  background: acceptedTerms ? P.sky : "rgba(40, 43, 74, 0.4)", 
                  flexShrink:0, marginTop:2, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0 
                }}
              >
                {acceptedTerms && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={P.navy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </button>
              <span style={{ color:"rgba(212, 210, 195, 0.5)", fontSize:12, lineHeight:1.6 }}>
                By creating an account, you agree to our{" "}
                <button type="button" onClick={() => setPolicyModal('terms')} style={{ background:'none', border:'none', padding:0, color:P.sky, fontWeight:700, cursor:"pointer", fontFamily:P.font }}>Terms of Service</button>
                {" "}and{" "}
                <button type="button" onClick={() => setPolicyModal('privacy')} style={{ background:'none', border:'none', padding:0, color:P.sky, fontWeight:700, cursor:"pointer", fontFamily:P.font }}>Privacy Policy</button>
              </span>
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} disabled={loading}
              style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:P.navy, color:P.white, fontWeight:700, fontSize:15, padding:"13px 0", borderRadius:12, border:"none", cursor:loading?"not-allowed":"pointer", boxShadow:"0 8px 16px rgba(24, 24, 27, 0.1)", transition:"all 0.2s", opacity:loading?0.65:1, marginTop:4, fontFamily:P.font }}
              onMouseEnter={e=>{ if(!loading) { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 20px rgba(24, 24, 27, 0.15)"; } }}
              onMouseLeave={e=>{ if(!loading) { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 16px rgba(24, 24, 27, 0.1)"; } }}>
              {loading ? (
                <>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ animation:"spin 1s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75"/>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </>
              )}
            </button>
          </div>
            </>
          ) : (
            <>
              <div style={{ textAlign:"center", marginBottom:28 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(40, 43, 74, 0.18)", border:"1px solid rgba(40, 43, 74, 0.35)", borderRadius:999, padding:"5px 14px", marginBottom:14 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:P.sky, display:"inline-block" }}/>
                  <span style={{ color:P.sky, fontSize:11, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>Step 4: Verify Your Email</span>
                </div>
                <h1 style={{ fontSize:28, fontWeight:900, color:P.white, margin:"0 0 8px", letterSpacing:"-0.02em" }}>Verify Email</h1>
                <p style={{ color:"rgba(212, 210, 195, 0.6)", fontSize:14, margin:0 }}>
                  We've sent a 6-digit code to <strong>{form.email}</strong>.
                </p>
              </div>

              {error && (
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(220,38,38,0.12)", border:"1px solid rgba(220,38,38,0.3)", color:"#fca5a5", fontSize:13, fontWeight:600, padding:"10px 14px", borderRadius:12, marginBottom:20 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {error}
                </div>
              )}

              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div>
                  <label style={{ display:"block", color:"rgba(212, 210, 195, 0.7)", fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Verification Code</label>
                  <input type="text" value={otp} onChange={e=>setOtp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleVerify()} placeholder="Enter 6-digit code" maxLength={6}
                    style={{ ...inputStyle, textAlign:"center", fontSize:20, letterSpacing:"0.2em", paddingLeft:16 }}
                    onFocus={e=>{ e.target.style.borderColor="rgba(40, 43, 74, 0.6)"; e.target.style.background="rgba(40, 43, 74, 0.1)"; }}
                    onBlur={e=>{ e.target.style.borderColor="rgba(212, 210, 195, 0.2)"; e.target.style.background="rgba(40, 43, 74, 0.35)"; }}
                  />
                </div>

                <button onClick={handleVerify} disabled={loading}
                  style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontWeight:700, fontSize:15, padding:"13px 0", borderRadius:14, border:"none", cursor:loading?"not-allowed":"pointer", boxShadow:"0 8px 24px rgba(40, 43, 74, 0.35)", transition:"transform 0.15s, opacity 0.15s", opacity:loading?0.65:1, marginTop:4, fontFamily:P.font }}
                  onMouseEnter={e=>{ if(!loading) e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                  {loading ? (
                    <>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ animation:"spin 1s linear infinite" }}>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75"/>
                      </svg>
                      Verifying...
                    </>
                  ) : "Verify Email"}
                </button>

                <div style={{ textAlign:"center", marginTop:12 }}>
                  <button onClick={handleResend} disabled={loading} style={{ background:"none", border:"none", color:P.sky, fontSize:14, fontWeight:600, cursor:loading?"not-allowed":"pointer", textDecoration:"underline", fontFamily:P.font }}>
                    Resend Code
                  </button>
                </div>
              </div>
            </>
          )}

        </div>

        <div style={{ textAlign:"center", marginTop:16 }}>
          <Link to="/" style={{ color:P.muted, fontSize:12, fontWeight:600, textDecoration:"none" }}
            onMouseEnter={e=>e.target.style.color=P.navy} onMouseLeave={e=>e.target.style.color=P.muted}>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Policy Modal */}
      {policyModal && (
        <div style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(0,11,28,0.8)", backdropFilter:"blur(5px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div style={{ background:P.navy, border:"1px solid rgba(212, 210, 195, 0.2)", borderRadius:16, width:"100%", maxWidth:500, maxHeight:"80vh", display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 20px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ padding:"20px 24px", borderBottom:"1px solid rgba(212, 210, 195, 0.1)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <h2 style={{ margin:0, color:P.white, fontSize:18, fontWeight:700, fontFamily:P.font }}>
                {policyModal === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h2>
              <button type="button" onClick={() => setPolicyModal(null)} style={{ background:"none", border:"none", color:P.muted, cursor:"pointer", padding:4 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div style={{ padding:"24px", overflowY:"auto", color:"rgba(212, 210, 195, 0.8)", fontSize:14, lineHeight:1.6, fontFamily:P.font }}>
              {policyModal === 'terms' ? (
                <>
                  <p><strong>1. Acceptance of Terms:</strong> By accessing and using HamroMobileHub, you accept and agree to be bound by the terms and provision of this agreement.</p>
                  <p><strong>2. Description of Service:</strong> HamroMobileHub provides users with access to a rich collection of resources, including various communications tools, forums, shopping services, and personalized content.</p>
                  <p><strong>3. User Conduct:</strong> You agree to not use the Service to upload, post, email, transmit or otherwise make available any content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable.</p>
                  <p><strong>4. Vendor Responsibilities:</strong> Vendors must ensure all listings are accurate and up-to-date. Misrepresentation of products may lead to account suspension.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Information Collection:</strong> We collect information from you when you register on our site, place an order, subscribe to our newsletter or fill out a form.</p>
                  <p><strong>2. Information Usage:</strong> Any of the information we collect from you may be used in one of the following ways: To personalize your experience, to improve our website, to improve customer service, to process transactions, or to send periodic emails.</p>
                  <p><strong>3. Information Protection:</strong> We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p>
                  <p><strong>4. Cookies:</strong> We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction.</p>
                </>
              )}
            </div>
            <div style={{ padding:"16px 24px", borderTop:"1px solid rgba(212, 210, 195, 0.1)", textAlign:"right", background:"rgba(0,0,0,0.1)" }}>
              <button type="button" onClick={() => { setPolicyModal(null); setAcceptedTerms(true); }} style={{ background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, border:"none", padding:"10px 24px", borderRadius:8, fontWeight:700, cursor:"pointer", fontFamily:P.font }}>
                I Understand & Agree
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}