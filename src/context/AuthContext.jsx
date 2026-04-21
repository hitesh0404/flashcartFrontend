// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { loginApi, registerApi, getCurrentUserApi } from "../api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUserApi()
      .then((res) => {
        setUser(res.data); // adjust if your /auth/me wraps data
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async ({ email, password }) => {
    const res = await loginApi({ email, password });

    // EXPECTED: res.data = { token, user }
    const { token, user: userData } = res.data; // change according to your response

    localStorage.setItem("access_token", token);
    setUser(userData);
    return userData;
  };

  const register = async (payload) => {
    const res = await registerApi(payload);
    return res.data; // you might not set user here; we’ll redirect to /login
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
