import { useEffect, useState } from "react";
import api from "../api/client";

export default function useAuth() {
  const [user,setUser] = useState(null);

  async function login(email,password){
    const { data } = await api.post("/auth/login",{ email,password });
    localStorage.setItem("token", data.data.token);
    const me = await api.get("/auth/me");
    setUser(me.data.data);
  }
  function logout(){
    localStorage.removeItem("token");
    setUser(null);
  }
  useEffect(()=>{ (async()=>{
    const token = localStorage.getItem("token");
    if (token) {
      try { const me = await api.get("/auth/me"); setUser(me.data.data); } catch (err) {
  console.error("Auth check failed:", err);
}

    }
  })(); },[]);
  return { user, login, logout };
}
