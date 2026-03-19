import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const P = {
  navy:"#001B48", royal:"#02457A", ocean:"#018ABE",
  sky:"#97CADB", mist:"#D6E8EE", white:"#ffffff",
  muted:"#6b99b5", font:"'Helvetica Neue',Helvetica,Arial,'Segoe UI',sans-serif",
};

const inputStyle = {
  width:"100%", background:"rgba(0,27,72,0.35)", border:`1px solid rgba(151,202,219,0.2)`,
  outline:"none", color:P.white, fontSize:14, borderRadius:14,
  paddingLeft:44, paddingRight:16, paddingTop:12, paddingBottom:12,
  transition:"border-color 0.2s, background 0.2s", boxSizing:"border-box",
  fontFamily:P.font,
};

const roles = [
  { id:"user",   label:"User",   icon:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> },
  { id:"vendor", label:"Vendor", icon:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
  { id:"admin",  label:"Admin",  icon:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> },
];

export default function SignUp() {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = field => e => setForm(prev=>({ ...prev, [field]:e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.name||!form.email||!form.password||!form.confirm) { setError("Please fill in all fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, role);
      
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

  const passwordsMatch = form.confirm && form.password === form.confirm;

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg,${P.navy} 0%,${P.royal} 55%,#013d6e 100%)`, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", position:"relative", overflow:"hidden", fontFamily:P.font }}>
      {/* bg blobs */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:80, left:40, width:288, height:288, borderRadius:"50%", background:"rgba(1,138,190,0.18)", filter:"blur(64px)" }}/>
        <div style={{ position:"absolute", bottom:80, right:40, width:384, height:384, borderRadius:"50%", background:"rgba(151,202,219,0.1)", filter:"blur(64px)" }}/>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:800, height:800, borderRadius:"50%", border:"1px solid rgba(1,138,190,0.12)" }}/>
        <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:`linear-gradient(rgba(151,202,219,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(151,202,219,0.4) 1px,transparent 1px)`, backgroundSize:"60px 60px" }}/>
      </div>

      <div style={{ width:"100%", maxWidth:440, position:"relative", paddingTop:40, paddingBottom:40 }}>
        {/* Back */}
        <div style={{ marginBottom:24 }}>
          <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:8, color:"rgba(151,202,219,0.6)", textDecoration:"none", fontSize:14, fontWeight:600 }}
            onMouseEnter={e=>e.currentTarget.style.color=P.white} onMouseLeave={e=>e.currentTarget.style.color="rgba(151,202,219,0.6)"}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(151,202,219,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
            </div>
            Back
          </Link>
        </div>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:32 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 20px rgba(1,138,190,0.35)" }}>
            <span style={{ color:P.white, fontWeight:900, fontSize:20 }}>M</span>
          </div>
          <span style={{ fontSize:22, fontWeight:900, color:P.white, letterSpacing:"-0.02em" }}>
            HamroMobile<span style={{ color:P.sky }}>Hub</span>
          </span>
        </div>

        {/* Card */}
        <div style={{ background:"rgba(0,27,72,0.5)", backdropFilter:"blur(20px)", border:"1px solid rgba(151,202,219,0.15)", borderRadius:24, padding:32, boxShadow:"0 24px 64px rgba(0,0,0,0.35)" }}>

          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(1,138,190,0.18)", border:"1px solid rgba(1,138,190,0.35)", borderRadius:999, padding:"5px 14px", marginBottom:14 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:P.sky, display:"inline-block" }}/>
              <span style={{ color:P.sky, fontSize:11, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>Join HMH</span>
            </div>
            <h1 style={{ fontSize:28, fontWeight:900, color:P.white, margin:"0 0 8px", letterSpacing:"-0.02em" }}>Create Account</h1>
            <p style={{ color:"rgba(151,202,219,0.6)", fontSize:14, margin:0 }}>
              Already have an account?{" "}
              <Link to="/signin" style={{ color:P.sky, fontWeight:700, textDecoration:"none" }}
                onMouseEnter={e=>e.target.style.color=P.mist} onMouseLeave={e=>e.target.style.color=P.sky}>Sign In</Link>
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
          <button style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:10, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(151,202,219,0.2)", color:P.white, fontWeight:600, fontSize:14, padding:"11px 0", borderRadius:14, cursor:"pointer", marginBottom:24, transition:"background 0.2s", fontFamily:P.font }}
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
            <div style={{ flex:1, height:1, background:"rgba(151,202,219,0.15)" }}/>
            <span style={{ color:"rgba(151,202,219,0.4)", fontSize:12, fontWeight:700 }}>OR</span>
            <div style={{ flex:1, height:1, background:"rgba(151,202,219,0.15)" }}/>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Role Selector */}
            <div>
              <label style={{ display:"block", color:"rgba(151,202,219,0.7)", fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>I Am A</label>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                {roles.map(r=>(
                  <button key={r.id} onClick={()=>setRole(r.id)} style={{
                    display:"flex", flexDirection:"column", alignItems:"center", gap:6, padding:"12px 0", borderRadius:14,
                    border: role===r.id ? `1px solid rgba(1,138,190,0.6)` : "1px solid rgba(151,202,219,0.15)",
                    background: role===r.id ? "rgba(1,138,190,0.2)" : "rgba(0,27,72,0.3)",
                    color: role===r.id ? P.white : "rgba(151,202,219,0.5)",
                    fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s", fontFamily:P.font,
                    boxShadow: role===r.id ? "0 0 0 1px rgba(1,138,190,0.3)" : "none",
                  }}
                    onMouseEnter={e=>{ if(role!==r.id){ e.currentTarget.style.background="rgba(1,138,190,0.1)"; e.currentTarget.style.color=P.white; }}}
                    onMouseLeave={e=>{ if(role!==r.id){ e.currentTarget.style.background="rgba(0,27,72,0.3)"; e.currentTarget.style.color="rgba(151,202,219,0.5)"; }}}
                  >
                    <span style={{ color: role===r.id ? P.sky : P.muted }}>{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label style={{ display:"block", color:"rgba(151,202,219,0.7)", fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Full Name</label>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:P.muted, pointerEvents:"none" }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </div>
                <input type="text" value={form.name} onChange={handleChange("name")} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Your full name"
                  style={inputStyle}
                  onFocus={e=>{ e.target.style.borderColor="rgba(1,138,190,0.6)"; e.target.style.background="rgba(1,138,190,0.1)"; }}
                  onBlur={e=>{ e.target.style.borderColor="rgba(151,202,219,0.2)"; e.target.style.background="rgba(0,27,72,0.35)"; }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display:"block", color:"rgba(151,202,219,0.7)", fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Email Address</label>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:P.muted, pointerEvents:"none" }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                </div>
                <input type="email" value={form.email} onChange={handleChange("email")} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="you@example.com"
                  style={inputStyle}
                  onFocus={e=>{ e.target.style.borderColor="rgba(1,138,190,0.6)"; e.target.style.background="rgba(1,138,190,0.1)"; }}
                  onBlur={e=>{ e.target.style.borderColor="rgba(151,202,219,0.2)"; e.target.style.background="rgba(0,27,72,0.35)"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display:"block", color:"rgba(151,202,219,0.7)", fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Password</label>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:P.muted, pointerEvents:"none" }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <input type={showPassword?"text":"password"} value={form.password} onChange={handleChange("password")} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Min. 8 characters"
                  style={{ ...inputStyle, paddingRight:44 }}
                  onFocus={e=>{ e.target.style.borderColor="rgba(1,138,190,0.6)"; e.target.style.background="rgba(1,138,190,0.1)"; }}
                  onBlur={e=>{ e.target.style.borderColor="rgba(151,202,219,0.2)"; e.target.style.background="rgba(0,27,72,0.35)"; }}
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
              <label style={{ display:"block", color:"rgba(151,202,219,0.7)", fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Confirm Password</label>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:P.muted, pointerEvents:"none" }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <input type={showConfirm?"text":"password"} value={form.confirm} onChange={handleChange("confirm")} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Repeat your password"
                  style={{ ...inputStyle, paddingRight:72,
                    borderColor: form.confirm ? (passwordsMatch ? "rgba(34,197,94,0.6)" : "rgba(220,38,38,0.5)") : "rgba(151,202,219,0.2)"
                  }}
                  onFocus={e=>{ if(!form.confirm){ e.target.style.borderColor="rgba(1,138,190,0.6)"; e.target.style.background="rgba(1,138,190,0.1)"; }}}
                  onBlur={e=>{ if(!form.confirm){ e.target.style.borderColor="rgba(151,202,219,0.2)"; e.target.style.background="rgba(0,27,72,0.35)"; }}}
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
              <div style={{ width:16, height:16, borderRadius:4, border:"1px solid rgba(151,202,219,0.3)", background:"rgba(0,27,72,0.4)", flexShrink:0, marginTop:2 }}/>
              <span style={{ color:"rgba(151,202,219,0.5)", fontSize:12, lineHeight:1.6 }}>
                By creating an account, you agree to our{" "}
                <a href="#" style={{ color:P.sky, fontWeight:700, textDecoration:"none" }}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" style={{ color:P.sky, fontWeight:700, textDecoration:"none" }}>Privacy Policy</a>
              </span>
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} disabled={loading}
              style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:`linear-gradient(135deg,${P.royal},${P.ocean})`, color:P.white, fontWeight:700, fontSize:15, padding:"13px 0", borderRadius:14, border:"none", cursor:loading?"not-allowed":"pointer", boxShadow:"0 8px 24px rgba(1,138,190,0.35)", transition:"transform 0.15s, opacity 0.15s", opacity:loading?0.65:1, marginTop:4, fontFamily:P.font }}
              onMouseEnter={e=>{ if(!loading) e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
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
        </div>

        <div style={{ textAlign:"center", marginTop:16 }}>
          <Link to="/" style={{ color:"rgba(151,202,219,0.4)", fontSize:12, fontWeight:600, textDecoration:"none" }}
            onMouseEnter={e=>e.target.style.color=P.sky} onMouseLeave={e=>e.target.style.color="rgba(151,202,219,0.4)"}>
            Back to Home
          </Link>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}