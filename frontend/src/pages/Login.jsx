import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return false;
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setError("⚠️ Session expired. Please login again.");
        }
        return Promise.reject(err);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/auth/login",
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("userEmail", res.data.user.email);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#EFF3FD] via-[#F4F7FF] to-[#E9EDF8] overflow-hidden px-4">
      {/* Premium Dreamy Pastel Fluid Multi-Shade Gradient Blobs */}
      <div className="absolute right-[-10%] top-[-10%] w-[55rem] h-[55rem] bg-gradient-to-tr from-[#C5CDFA]/40 via-[#D6DCFA]/50 to-[#FDE8E5]/30 rounded-full filter blur-3xl opacity-90 animate-float-slow"></div>
      <div className="absolute left-[15%] top-[5%] w-[45rem] h-[45rem] bg-gradient-to-br from-[#E2DBFA]/50 via-[#E8E2FA]/50 to-[#D5EDFC]/40 rounded-full filter blur-3xl opacity-85 animate-float"></div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[40rem] h-[40rem] bg-gradient-to-r from-[#D5EDFC]/40 via-[#E8E2FA]/40 to-[#C5CDFA]/30 rounded-full filter blur-3xl opacity-75 animate-float-reverse"></div>

      {/* Glassmorphic login card */}
      <div className="w-full max-w-md bg-white/60 border border-white/80 shadow-2xl backdrop-blur-md rounded-3xl p-8 sm:p-10 relative z-10 transform transition-all duration-700 ease-out animate-fade-in-up">
        <h2 className="text-center text-3xl font-black text-[#2563EB] mb-8">
          CareerCraft AI Login
        </h2>

        {isLoggedIn ? (
          <div className="space-y-6">
            <p className="text-center text-green-600 font-bold">
              ✅ You are logged in
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-3.5 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600 transition duration-150 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <form className="space-y-7" onSubmit={handleSubmit}>
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white/95 border border-blue-100/50 px-2 py-0.5 rounded-md text-[10px] font-bold text-[#2563EB]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white/85 text-slate-800 px-4 py-3.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white/95 border border-blue-100/50 px-2 py-0.5 rounded-md text-[10px] font-bold text-[#2563EB]">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white/85 text-slate-800 px-4 py-3.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition text-sm"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-xs text-red-650 bg-red-50 border border-red-150 p-3 rounded-xl animate-pulse font-medium">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl shadow-sm transition duration-150 ease-in-out transform active:scale-[0.98] cursor-pointer"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-[#2563EB] font-bold hover:underline">
                Register
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
