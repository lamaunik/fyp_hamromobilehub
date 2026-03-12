// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute
 *
 * Props:
 *   allowedRoles  – array of roles that may access this route, e.g. ["admin"]
 *                   If omitted, ANY authenticated user is allowed.
 *   redirectTo    – where to send unauthenticated users (default "/signin")
 */
export default function ProtectedRoute({ children, allowedRoles, redirectTo = "/signin" }) {
  const { user, loading } = useAuth();

  // Still loading user from localStorage — render nothing to avoid flicker
  if (loading) return null;

  // Not logged in → send to sign-in
  if (!user) return <Navigate to={redirectTo} replace />;

  // Logged in but wrong role → send to their own dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin")  return <Navigate to="/admin/dashboard"  replace />;
    if (user.role === "vendor") return <Navigate to="/vendor/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}