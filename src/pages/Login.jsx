// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // very simple validation/fake auth
    if (!email || !password) return alert("Enter email & password");
    login({ email });
    nav("/", { replace: true });
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>
        <label className="block mb-2">
          <div className="text-sm mb-1">Email</div>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded" />
        </label>
        <label className="block mb-4">
          <div className="text-sm mb-1">Password</div>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full p-2 border rounded" />
        </label>
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
      </form>
    </div>
  );
}
