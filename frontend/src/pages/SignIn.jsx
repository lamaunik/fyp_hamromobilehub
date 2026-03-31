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

export default function SignIn() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login, verifyEmail, resendVerification, forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin/dashboard", { replace: true });
      else if (user.role === "vendor") navigate("/vendor/dashboard", { replace: true });
      else navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleLoginSubmit = async () => {
    setError("");
    setMessage("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    try {
      const user = await login(email, password);
      // login can return an object with requiresEmailVerification if previously caught
      if (user?.requiresEmailVerification) {
        setStep(2);
        return;
      }
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "vendor") navigate("/vendor/dashboard");
      else navigate("/dashboard");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleVerify = async () => {
    setError("");
    setMessage("");
    if (!otp || otp.length !== 6) { setError("Please enter a valid 6-digit code."); return; }
    setLoading(true);
    try {
      const user = await verifyEmail(email, otp);
      if (user?.pendingApproval) {
        alert("Email verified! Please wait for an Admin to approve your Vendor account before logging in.");
        setStep(1);
        return;
      }
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "vendor") navigate("/vendor/dashboard");
      else navigate("/dashboard");
    } catch(err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await resendVerification(email);
      setMessage("Verification code resent! Check your email.");
    } catch(err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleForgotPasswordRequest = async () => {
    setError("");
    setMessage("");
    if (!email) { setError("Please provide your email address."); return; }
    setLoading(true);
    try {
      await forgotPassword(email);
      setMessage("Password reset code sent! Check your email.");
      setStep(4);
    } catch(err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");
    if (!otp || otp.length !== 6) { setError("Please enter a valid 6-digit code."); return; }
    if (!newPassword || newPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
    
    setLoading(true);
    try {
      const user = await resetPassword(email, otp, newPassword);
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "vendor") navigate("/vendor/dashboard");
      else navigate("/dashboard");
    } catch(err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"100vh", background:P.mistBg, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", position:"relative", overflow:"hidden", fontFamily:P.font }}>
      {/* bg blobs */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:80, left:40, width:288, height:288, borderRadius:"50%", background:"rgba(244, 63, 94, 0.05)", filter:"blur(64px)" }}/>
        <div style={{ position:"absolute", bottom:80, right:40, width:384, height:384, borderRadius:"50%", background:"rgba(24, 24, 27, 0.03)", filter:"blur(64px)" }}/>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:800, height:800, borderRadius:"50%", border:`1px solid ${P.sky}` }}/>
        <div style={{ position:"absolute", inset:0, opacity:1, backgroundImage:`radial-gradient(${P.sky} 1px, transparent 1px)`, backgroundSize:"40px 40px" }}/>
      </div>

      <div style={{ width:"100%", maxWidth:440, position:"relative" }}>
        {/* Back button */}
        <div style={{ marginBottom:24 }}>
          {step === 1 ? (
            <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:8, color:P.muted, textDecoration:"none", fontSize:14, fontWeight:600, transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color=P.navy} onMouseLeave={e=>e.currentTarget.style.color=P.muted}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:P.white, border:`1px solid ${P.sky}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
              </div>
              Back
            </Link>
          ) : (
            <button onClick={()=>{setStep(1); setError(""); setMessage(""); setOtp(""); setNewPassword("");}} 
              style={{ display:"inline-flex", alignItems:"center", gap:8, color:P.muted, background:"none", border:"none", cursor:"pointer", fontSize:14, fontWeight:600, padding:0, fontFamily:P.font, transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color=P.navy} onMouseLeave={e=>e.currentTarget.style.color=P.muted}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:P.white, border:`1px solid ${P.sky}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
              </div>
              Back to Login
            </button>
          )}
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:32 }}>
          <img src="/logo.png" alt="Logo" style={{ height:42, width:"auto" }} />
          <span style={{ fontSize:24, fontWeight:900, color:P.navy, letterSpacing:"-0.02em", fontFamily:P.fontHeading }}>
            HamroMobile<span style={{ color:P.accent }}>Hub</span>
          </span>
        </div>

        {/* Card */}
        <div style={{ background:P.white, border:`1px solid ${P.sky}`, borderRadius:24, padding:32, boxShadow:"0 24px 64px rgba(0,0,0,0.04)" }}>

          {step === 1 && (
            <>
              {/* Header */}
              <div style={{ textAlign:"center", marginBottom:32 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:P.white, border:`1px solid ${P.sky}`, borderRadius:999, padding:"5px 14px", marginBottom:14 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:P.accent, display:"inline-block" }}/>
                  <span style={{ color:P.navy, fontSize:11, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>Welcome Back</span>
                </div>
                <h1 style={{ fontSize:28, fontWeight:900, color:P.navy, margin:"0 0 8px", letterSpacing:"-0.02em", fontFamily:P.fontHeading }}>Sign In</h1>
                <p style={{ color:P.muted, fontSize:14, margin:0 }}>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color:P.accent, fontWeight:700, textDecoration:"none" }}
                    onMouseEnter={e=>e.target.style.opacity=0.8} onMouseLeave={e=>e.target.style.opacity=1}>Get Started</Link>
                </p>
              </div>

              {/* Error/Message */}
              {error && (
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(220,38,38,0.12)", border:"1px solid rgba(220,38,38,0.3)", color:"#fca5a5", fontSize:13, fontWeight:600, padding:"10px 14px", borderRadius:12, marginBottom:20 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {error}
                </div>
              )}
              {message && (
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)", color:"#a7f3d0", fontSize:13, fontWeight:600, padding:"10px 14px", borderRadius:12, marginBottom:20 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                  {message}
                </div>
              )}

              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {/* Email */}
                <div>
                  <label style={{ display:"block", color:P.muted, fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Email Address</label>
                  <div style={{ position:"relative" }}>
                    <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:P.muted, pointerEvents:"none" }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                    </div>
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLoginSubmit()} placeholder="you@example.com"
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
                    <input type={showPassword?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLoginSubmit()} placeholder="Enter your password"
                      style={{ ...inputStyle, paddingRight:44 }}
                      onFocus={e=>{ e.target.style.borderColor=P.navy; e.target.style.background=P.white; }}
                      onBlur={e=>{ e.target.style.borderColor=P.sky; e.target.style.background=P.white; }}
                    />
                    <button onClick={()=>setShowPassword(!showPassword)} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:P.muted, padding:0 }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {showPassword
                          ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                          : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></>
                        }
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                    <div style={{ width:16, height:16, borderRadius:4, border:`1px solid ${P.sky}`, background:P.white }}/>
                    <span style={{ color:P.muted, fontSize:12, fontWeight:600 }}>Remember me</span>
                  </label>
                  <button onClick={()=>{setStep(3); setError(""); setMessage("");}} style={{ color:P.navy, fontSize:12, fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:0, fontFamily:P.font, transition:"color 0.2s" }}
                    onMouseEnter={e=>e.currentTarget.style.color=P.accent} onMouseLeave={e=>e.currentTarget.style.color=P.navy}>Forgot password?</button>
                </div>

                {/* Submit */}
                <button onClick={handleLoginSubmit} disabled={loading}
                  style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:P.navy, color:P.white, fontWeight:700, fontSize:15, padding:"13px 0", borderRadius:12, border:"none", cursor:loading?"not-allowed":"pointer", boxShadow:"0 8px 16px rgba(24, 24, 27, 0.1)", transition:"all 0.2s", opacity:loading?0.65:1, marginTop:4, fontFamily:P.font }}
                  onMouseEnter={e=>{ if(!loading) { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 20px rgba(24, 24, 27, 0.15)"; } }}
                  onMouseLeave={e=>{ if(!loading) { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 16px rgba(24, 24, 27, 0.1)"; } }}>
                  {loading ? (
                    <>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ animation:"spin 1s linear infinite" }}>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75"/>
                      </svg>
                      Signing In...
                    </>
                  ) : "Sign In"}
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ textAlign:"center", marginBottom:28 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(40, 43, 74, 0.18)", border:"1px solid rgba(40, 43, 74, 0.35)", borderRadius:999, padding:"5px 14px", marginBottom:14 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:P.sky, display:"inline-block" }}/>
                  <span style={{ color:P.sky, fontSize:11, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>Action Required</span>
                </div>
                <h1 style={{ fontSize:28, fontWeight:900, color:P.white, margin:"0 0 8px", letterSpacing:"-0.02em" }}>Verify Your Email</h1>
                <p style={{ color:"rgba(212, 210, 195, 0.6)", fontSize:14, margin:0 }}>
                  We've sent a 6-digit verification code to <strong>{email}</strong>.
                </p>
              </div>

              {error && (
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(220,38,38,0.12)", border:"1px solid rgba(220,38,38,0.3)", color:"#fca5a5", fontSize:13, fontWeight:600, padding:"10px 14px", borderRadius:12, marginBottom:20 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {error}
                </div>
              )}
              {message && (
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)", color:"#a7f3d0", fontSize:13, fontWeight:600, padding:"10px 14px", borderRadius:12, marginBottom:20 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                  {message}
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
                  {loading ? "Verifying..." : "Verify"}
                </button>

                <div style={{ textAlign:"center", marginTop:12 }}>
                  <button onClick={handleResend} disabled={loading} style={{ background:"none", border:"none", color:P.sky, fontSize:14, fontWeight:600, cursor:loading?"not-allowed":"pointer", textDecoration:"underline", fontFamily:P.font }}>
                    Resend Code
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{ textAlign:"center", marginBottom:28 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(40, 43, 74, 0.18)", border:"1px solid rgba(40, 43, 74, 0.35)", borderRadius:999, padding:"5px 14px", marginBottom:14 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:P.sky, display:"inline-block" }}/>
                  <span style={{ color:P.sky, fontSize:11, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>Reset Password</span>
                </div>
                <h1 style={{ fontSize:28, fontWeight:900, color:P.white, margin:"0 0 8px", letterSpacing:"-0.02em" }}>Forgot Password</h1>
                <p style={{ color:"rgba(212, 210, 195, 0.6)", fontSize:14, margin:0 }}>
                  Enter your registered email address to receive a password reset code.
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
                  <label style={{ display:"block", color:"rgba(212, 210, 195, 0.7)", fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Email Address</label>
                  <div style={{ position:"relative" }}>
                    <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:P.muted, pointerEvents:"none" }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                    </div>
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleForgotPasswordRequest()} placeholder="you@example.com"
                      style={inputStyle}
                      onFocus={e=>{ e.target.style.borderColor=`rgba(40, 43, 74, 0.6)`; e.target.style.background="rgba(40, 43, 74, 0.1)"; }}
                      onBlur={e=>{ e.target.style.borderColor="rgba(212, 210, 195, 0.2)"; e.target.style.background="rgba(40, 43, 74, 0.35)"; }}
                    />
                  </div>
                </div>

                <button onClick={handleForgotPasswordRequest} disabled={loading}
                  style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontWeight:700, fontSize:15, padding:"13px 0", borderRadius:14, border:"none", cursor:loading?"not-allowed":"pointer", boxShadow:"0 8px 24px rgba(40, 43, 74, 0.35)", transition:"transform 0.15s, opacity 0.15s", opacity:loading?0.65:1, marginTop:4, fontFamily:P.font }}
                  onMouseEnter={e=>{ if(!loading) e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                  {loading ? "Sending..." : "Send Reset Code"}
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div style={{ textAlign:"center", marginBottom:28 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(40, 43, 74, 0.18)", border:"1px solid rgba(40, 43, 74, 0.35)", borderRadius:999, padding:"5px 14px", marginBottom:14 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:P.sky, display:"inline-block" }}/>
                  <span style={{ color:P.sky, fontSize:11, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>Set New Password</span>
                </div>
                <h1 style={{ fontSize:28, fontWeight:900, color:P.white, margin:"0 0 8px", letterSpacing:"-0.02em" }}>Reset Password</h1>
                <p style={{ color:"rgba(212, 210, 195, 0.6)", fontSize:14, margin:0 }}>
                  Enter the code sent to <strong>{email}</strong> and your new password.
                </p>
              </div>

              {error && (
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(220,38,38,0.12)", border:"1px solid rgba(220,38,38,0.3)", color:"#fca5a5", fontSize:13, fontWeight:600, padding:"10px 14px", borderRadius:12, marginBottom:20 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {error}
                </div>
              )}
              {message && (
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)", color:"#a7f3d0", fontSize:13, fontWeight:600, padding:"10px 14px", borderRadius:12, marginBottom:20 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                  {message}
                </div>
              )}

              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div>
                  <label style={{ display:"block", color:"rgba(212, 210, 195, 0.7)", fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Reset Code</label>
                  <input type="text" value={otp} onChange={e=>setOtp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleResetPassword()} placeholder="Enter 6-digit code" maxLength={6}
                    style={{ ...inputStyle, textAlign:"center", fontSize:20, letterSpacing:"0.2em", paddingLeft:16 }}
                    onFocus={e=>{ e.target.style.borderColor="rgba(40, 43, 74, 0.6)"; e.target.style.background="rgba(40, 43, 74, 0.1)"; }}
                    onBlur={e=>{ e.target.style.borderColor="rgba(212, 210, 195, 0.2)"; e.target.style.background="rgba(40, 43, 74, 0.35)"; }}
                  />
                </div>

                <div>
                  <label style={{ display:"block", color:"rgba(212, 210, 195, 0.7)", fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>New Password</label>
                  <div style={{ position:"relative" }}>
                    <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:P.muted, pointerEvents:"none" }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    </div>
                    <input type={showPassword?"text":"password"} value={newPassword} onChange={e=>setNewPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleResetPassword()} placeholder="New password (min 8 char)"
                      style={{ ...inputStyle, paddingRight:44 }}
                      onFocus={e=>{ e.target.style.borderColor="rgba(40, 43, 74, 0.6)"; e.target.style.background="rgba(40, 43, 74, 0.1)"; }}
                      onBlur={e=>{ e.target.style.borderColor="rgba(212, 210, 195, 0.2)"; e.target.style.background="rgba(40, 43, 74, 0.35)"; }}
                    />
                    <button onClick={()=>setShowPassword(!showPassword)} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:P.muted, padding:0 }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {showPassword
                          ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                          : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></>
                        }
                      </svg>
                    </button>
                  </div>
                </div>

                <button onClick={handleResetPassword} disabled={loading}
                  style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontWeight:700, fontSize:15, padding:"13px 0", borderRadius:14, border:"none", cursor:loading?"not-allowed":"pointer", boxShadow:"0 8px 24px rgba(40, 43, 74, 0.35)", transition:"transform 0.15s, opacity 0.15s", opacity:loading?0.65:1, marginTop:4, fontFamily:P.font }}
                  onMouseEnter={e=>{ if(!loading) e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </>
          )}

        </div>

        {/* Trust badges */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:24, marginTop:24 }}>
          {[
            { label:"Verified Secure", icon:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> },
            { label:"256-bit SSL", icon:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> },
            { label:"Trusted Platform", icon:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={P.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> },
          ].map(b=>(
            <div key={b.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
              {b.icon}
              <span style={{ color:P.muted, fontSize:12, fontWeight:600 }}>{b.label}</span>
            </div>
          ))}
        </div>

      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}