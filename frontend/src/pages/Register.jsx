import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (res.status === 201 || res.status === 200) {
        setSuccess("Account created successfully! Redirecting...");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#EFF3FD] via-[#F4F7FF] to-[#E9EDF8] overflow-hidden px-4">
      {/* Premium Dreamy Pastel Fluid Multi-Shade Gradient Blobs */}
      <div className="absolute right-[-10%] top-[-10%] w-[55rem] h-[55rem] bg-gradient-to-tr from-[#C5CDFA]/40 via-[#D6DCFA]/50 to-[#FDE8E5]/30 rounded-full filter blur-3xl opacity-90 animate-float-slow"></div>
      <div className="absolute left-[15%] top-[5%] w-[45rem] h-[45rem] bg-gradient-to-br from-[#E2DBFA]/50 via-[#E8E2FA]/50 to-[#D5EDFC]/40 rounded-full filter blur-3xl opacity-85 animate-float"></div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[40rem] h-[40rem] bg-gradient-to-r from-[#D5EDFC]/40 via-[#E8E2FA]/40 to-[#C5CDFA]/30 rounded-full filter blur-3xl opacity-75 animate-float-reverse"></div>

      {/* Glassmorphic Register card */}
      <div className="w-full max-w-md bg-white/60 border border-white/80 shadow-2xl backdrop-blur-md rounded-3xl p-8 sm:p-10 relative z-10 transform transition-all duration-700 ease-out animate-fade-in-up">
        <h2 className="text-center text-3xl font-black text-[#7C3AED] mb-8">
          Register Account
        </h2>

        <form className="space-y-7" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white/95 border border-purple-100/50 px-2 py-0.5 rounded-md text-[10px] font-bold text-[#7C3AED]">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white/85 text-slate-800 px-4 py-3.5 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition text-sm"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white/95 border border-purple-100/50 px-2 py-0.5 rounded-md text-[10px] font-bold text-[#7C3AED]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white/85 text-slate-800 px-4 py-3.5 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition text-sm"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white/95 border border-purple-100/50 px-2 py-0.5 rounded-md text-[10px] font-bold text-[#7C3AED]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full rounded-xl border border-slate-200 bg-white/85 text-slate-800 px-4 py-3.5 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white/95 border border-purple-100/50 px-2 py-0.5 rounded-md text-[10px] font-bold text-[#7C3AED]">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full rounded-xl border border-slate-200 bg-white/85 text-slate-800 px-4 py-3.5 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Error/Success messages */}
          {error && (
            <p className="text-xs text-red-650 bg-red-50 border border-red-150 p-3 rounded-xl animate-pulse font-medium">
              {error}
            </p>
          )}
          {success && (
            <p className="text-xs text-green-650 bg-green-50 border border-green-150 p-3 rounded-xl animate-pulse font-medium">
              {success}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl shadow-sm transition duration-150 ease-in-out transform active:scale-[0.98] cursor-pointer"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#2563EB] font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
