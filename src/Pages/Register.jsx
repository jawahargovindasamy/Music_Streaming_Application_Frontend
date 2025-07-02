import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserPlus, FaHome } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { PlayerContext } from "../Context/PlayerContext";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {url} = useContext(PlayerContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/auth/register`,
        formData
      );
      toast.success(response.data.message || "Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 hidden md:flex items-center gap-2 bg-white/10 border border-purple-500/30 backdrop-blur-lg text-white px-4 py-2 rounded-xl hover:bg-white/20 hover:border-purple-400/50 transition-all duration-200 shadow-lg"
      >
        <FaHome className="text-purple-400" />
        <span className="font-medium">Home</span>
      </Link>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-purple-500/30 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-center gap-3">
          <FaUserPlus className="text-purple-400 text-3xl" />
          <h2 className="text-3xl font-extrabold text-center">Create Account</h2>
        </div>
        <p className="text-center text-sm text-gray-300">
          Join Sonique — your music universe starts here 🎵
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full mt-1 p-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mt-1 p-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full mt-1 p-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-4 text-purple-300 hover:text-purple-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* Already have an account */}
          <div className="flex justify-end text-sm">
            <Link to="/login" className="text-purple-400 hover:underline font-medium">
              Already have an account? Login
            </Link>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
