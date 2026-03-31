import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/api";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      if (token && savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const register = async (name, email, password, role) => {
    try {
      const data = await api.post("/auth/register", { name, email, password, role });
      
      if (data.requiresEmailVerification) {
        return { requiresEmailVerification: true, email: data.email };
      }

      if (data.pendingApproval) {
        return { pendingApproval: true };
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (err) {
      if (err.data?.requiresEmailVerification) {
        return { requiresEmailVerification: true, email: err.data.email };
      }
      throw new Error(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await api.post("/auth/login", { email, password });
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (err) {
      if (err.data?.requiresEmailVerification) {
        return { requiresEmailVerification: true, email: err.data.email };
      }
      throw new Error(err.message);
    }
  };

  const verifyEmail = async (email, otp) => {
    try {
      const data = await api.post("/auth/verify-email", { email, otp });

      if (data.pendingApproval) {
        return { pendingApproval: true };
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const resendVerification = async (email) => {
    try {
      return await api.post("/auth/resend-verification", { email });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const forgotPassword = async (email) => {
    try {
      return await api.post("/auth/forgotpassword", { email });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const resetPassword = async (email, otp, password) => {
    try {
      const data = await api.put("/auth/resetpassword", { email, otp, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const updateUser = (newUserData) => {
    setUser(prev => {
      const updated = { ...prev, ...newUserData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const getToken = () => localStorage.getItem("token");

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, getToken, updateUser, verifyEmail, resendVerification, forgotPassword, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};