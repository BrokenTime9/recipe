"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecipeStore } from "../store/store";
import axios from "axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();
  const { authError, setAuthError, setUser } = useRecipeStore();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setAuthError(""); // Clear error when switching modes
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setAuthError(""); // Clear error on input change
  };

  const handlePasswordChange = (e) => {
    setPass(e.target.value);
    setAuthError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? "http://localhost:5000/auth/login"
      : "http://localhost:5000/auth/register";

    try {
      const res = await axios.post(endpoint, {
        username,
        password: pass,
      });

      if (res.data.success) {
        setUser(res.data.data);
        setAuthError(""); // Clear error on success
        router.push("/");
      } else {
        console.log("Backend says failure:", res.data);
        setAuthError(res.data.message || "Unexpected error");
      }
    } catch (err) {
      if (err.response) {
        console.error("Error response:", err.response.data);
        setAuthError(err.response.data.message || "Authentication failed");
      } else {
        console.error("Error:", err.message);
        setAuthError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg sm:p-10">
        <h1 className="text-3xl font-semibold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              name="name"
              value={username}
              onChange={handleUsernameChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={pass}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Error message */}
          {authError && (
            <p className="text-red-600 text-sm text-center">{authError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-blue-600 hover:underline ml-1"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
