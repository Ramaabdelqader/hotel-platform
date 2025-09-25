import { useState, useEffect } from "react";
import api from "../api/client";
import { AuthCtx } from "./AuthContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.data.token);
    const me = await api.get("/auth/me");
    setUser(me.data.data);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const me = await api.get("/auth/me");
          setUser(me.data.data);
        } catch {
          localStorage.removeItem("token");
        }
      }
    })();
  }, []);

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
