import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Dashboard       from "./pages/Dashboard";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard  from "./pages/AdminDashboard";
import MessagesPage    from "./pages/MessagesPage";
import KhaltiVerify    from "./pages/KhaltiVerify";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import VendorKYC        from "./pages/VendorKYC";

import ProtectedRoute from "./components/common/ProtectedRoute";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/"       element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* User dashboard / Public browsing */}
        <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
        <Route path="/dashboard/:tab" element={<Dashboard />} />
        <Route path="/dashboard/product/:id" element={<Dashboard />} />

        {/* Vendor dashboard — only role "vendor" */}
        <Route path="/vendor/dashboard" element={<Navigate to="/vendor/dashboard/overview" replace />} />
        <Route
          path="/vendor/dashboard/:tab"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/kyc"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorKYC />
            </ProtectedRoute>
          }
        />

        {/* Admin dashboard — only role "admin" */}
        <Route path="/admin/dashboard" element={<Navigate to="/admin/dashboard/overview" replace />} />
        <Route
          path="/admin/dashboard/:tab"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<LandingPage />} />

        {/* Messages Route */}
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />

        {/* Khalti Verification */}
        <Route
          path="/khalti/verify"
          element={
            <ProtectedRoute>
              <KhaltiVerify />
            </ProtectedRoute>
          }
        />

        {/* Payment Success Page */}

        {/* Payment Success Page */}
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <PaymentSuccessPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}