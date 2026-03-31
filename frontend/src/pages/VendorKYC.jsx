import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { P } from "../components/dashboard/DashboardConstants";

export default function VendorKYC() {
  const { user, login, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    storeName: user?.storeName || "",
    storePhone: user?.phone || "",
    storeLocation: user?.address || "",
    panNumber: "",
    panImage: "",
    licenseImage: "",
  });

  // Redirect if already approved
  useEffect(() => {
    if (user && user.isApproved && user.kycSubmitted) {
      navigate("/vendor/dashboard");
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.put("/users/kyc", formData);
      if (res.success) {
        setSuccess(true);
        // Update local auth context to reflect KYC submission
        updateUser({ kycSubmitted: true });
      } else {
        setError(res.message || "Failed to submit KYC");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during submission");
    } finally {
      setLoading(false);
    }
  };

  if (success || (user?.kycSubmitted && !user?.isApproved)) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: P.mistBg, fontFamily: P.font, padding: 20
      }}>
        <div style={{
          maxWidth: 500, width: "100%", background: P.white, borderRadius: 32, padding: 48,
          textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.05)", border: `1px solid ${P.mist}`
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%", background: "#fffbeb", color: "#d97706",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px"
          }}>
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2m9-6a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 style={{ color: P.navy, fontWeight: 900, fontSize: 32, marginBottom: 12, fontFamily: P.fontHeading }}>Verification Pending</h2>
          <p style={{ color: P.muted, fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
            Thank you for submitting your KYC! Your application is currently being reviewed by our administrative team. We will notify you once your store is approved for listing.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button 
                onClick={() => window.location.reload()}
                style={{
                width: "100%", padding: "16px", borderRadius: 16, background: P.navy, color: P.white,
                fontWeight: 800, border: "none", cursor: "pointer", transition: "transform 0.2s"
                }}
            >
                Check Status
            </button>
            <button 
                onClick={() => navigate("/")}
                style={{
                width: "100%", padding: "16px", borderRadius: 16, background: P.mistBg, color: P.navy,
                fontWeight: 800, border: `1px solid ${P.mist}`, cursor: "pointer", transition: "transform 0.2s"
                }}
            >
                Back to Home
            </button>
            <div style={{ marginTop: 12 }}>
              <button 
                  onClick={() => { logout(); navigate("/signin"); }}
                  style={{
                  background: "none", border: "none", color: P.accent,
                  fontWeight: 700, fontSize: 14, cursor: "pointer", textDecoration: "underline"
                  }}
              >
                  Sign in as a different user
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", background: P.mistBg, fontFamily: P.font, padding: "80px 24px"
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h1 style={{ color: P.navy, fontWeight: 900, fontSize: 48, marginBottom: 16, fontFamily: P.fontHeading, letterSpacing: "-1.5px" }}>
            Vendor Verification
          </h1>
          <p style={{ color: P.muted, fontSize: 20, fontWeight: 500, maxWidth: 600, margin: "0 auto" }}>
            Complete your KYC to represent your brand on HamroMobileHub.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: P.white, borderRadius: 24, padding: "48px 60px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)", border: `1px solid ${P.mist}`
        }}>
          {/* Store Information Section */}
          <div style={{ marginBottom: 48 }}>
            <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 22, marginBottom: 12, fontFamily: P.fontHeading }}>
              Store Information
            </h3>
            <div style={{ height: 1, background: P.mist, width: "100%", marginBottom: 32 }} />
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 900, color: P.navy, textTransform: "uppercase", letterSpacing: "0.5px" }}>Store Name</label>
                <input 
                  name="storeName" value={formData.storeName} onChange={handleInputChange} required
                  placeholder="Unique store name"
                  style={{
                    padding: "18px 24px", borderRadius: 12, background: "#f9fafb", border: "1px solid #f3f4f6",
                    fontSize: 15, fontWeight: 500, transition: "all 0.2s", color: P.navy
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 900, color: P.navy, textTransform: "uppercase", letterSpacing: "0.5px" }}>Store Contact Number</label>
                <input 
                  name="storePhone" value={formData.storePhone} onChange={handleInputChange} required
                  placeholder="+977 98XXXXXXXX"
                  style={{
                    padding: "18px 24px", borderRadius: 12, background: "#f9fafb", border: "1px solid #f3f4f6",
                    fontSize: 15, fontWeight: 500, color: P.navy
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 900, color: P.navy, textTransform: "uppercase", letterSpacing: "0.5px" }}>Store Location</label>
              <input 
                name="storeLocation" value={formData.storeLocation} onChange={handleInputChange} required
                placeholder="Full address of your physical store (if any)"
                style={{
                  padding: "18px 24px", borderRadius: 12, background: "#f9fafb", border: "1px solid #f3f4f6",
                  fontSize: 15, fontWeight: 500, color: P.navy
                }}
              />
            </div>
          </div>

          {/* Legal & Documents Section */}
          <div style={{ marginBottom: 48 }}>
            <h3 style={{ color: P.navy, fontWeight: 800, fontSize: 22, marginBottom: 12, fontFamily: P.fontHeading }}>
              Legal & Documents
            </h3>
            <div style={{ height: 1, background: P.mist, width: "100%", marginBottom: 32 }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              <label style={{ fontSize: 11, fontWeight: 900, color: P.navy, textTransform: "uppercase", letterSpacing: "0.5px" }}>PAN Number</label>
              <input 
                name="panNumber" value={formData.panNumber} onChange={handleInputChange} required
                placeholder="9-digit PAN number"
                style={{
                  padding: "18px 24px", borderRadius: 12, background: "#f9fafb", border: "1px solid #f3f4f6",
                  fontSize: 15, fontWeight: 500, color: P.navy
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 900, color: P.navy, textTransform: "uppercase", letterSpacing: "0.5px" }}>PAN Document</label>
                <div 
                  onClick={() => document.getElementById("pan-upload").click()}
                  style={{
                    height: 180, borderRadius: 16, border: `2px dashed ${P.sky}`, background: "#f9fafb",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.2s"
                  }}
                >
                  {formData.panImage ? (
                    <img src={formData.panImage} alt="PAN" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <>
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span style={{ fontSize: 13, color: P.muted, marginTop: 12, fontWeight: 700 }}>Upload Image</span>
                    </>
                  )}
                  <input id="pan-upload" type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, "panImage")} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 900, color: P.navy, textTransform: "uppercase", letterSpacing: "0.5px" }}>Business License</label>
                <div 
                  onClick={() => document.getElementById("license-upload").click()}
                  style={{
                    height: 180, borderRadius: 16, border: `2px dashed ${P.sky}`, background: "#f9fafb",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.2s"
                  }}
                >
                  {formData.licenseImage ? (
                    <img src={formData.licenseImage} alt="License" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <>
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={P.muted} strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span style={{ fontSize: 13, color: P.muted, marginTop: 12, fontWeight: 700 }}>Upload Image</span>
                    </>
                  )}
                  <input id="license-upload" type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, "licenseImage")} />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div style={{ marginBottom: 32, padding: "18px", borderRadius: 12, background: "#fef2f2", color: "#ef4444", fontSize: 14, fontWeight: 700, border: "1px solid #fee2e2" }}>
              {error}
            </div>
          )}

          <button 
            type="submit" disabled={loading}
            style={{
              width: "100%", padding: "22px", borderRadius: 16, background: P.navy, color: P.white,
              fontWeight: 900, fontSize: 16, border: "none", cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s", opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Submitting Application..." : "Submit for Verification"}
          </button>
        </form>
      </div>
    </div>
  );
}
