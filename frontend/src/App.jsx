import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Dashboard       from "./pages/Dashboard";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard  from "./pages/AdminDashboard";

import ProtectedRoute from "./components/common/ProtectedRoute";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/"       element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* User dashboard / Public browsing */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Vendor dashboard — only role "vendor" */}
          <Route
            path="/vendor/dashboard"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin dashboard — only role "admin" */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}