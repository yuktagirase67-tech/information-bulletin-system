"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
const router = useRouter(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      
      alert("Login Successful");
router.push("/dashboard");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-bold text-black mb-4">
          Login Page
        </h2>

        <input
          className="border p-2 w-full mb-3 text-black"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3 text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-900 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}