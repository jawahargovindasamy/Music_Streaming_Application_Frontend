import axios from "axios";
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext.jsx";
import { PlayerContext } from "../Context/PlayerContext.jsx";
import logo from "../assests/Sonique.png"

const Login = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {url} = useContext(PlayerContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/auth/login`,
        formData
      );
      const userData = {
        ...response.data,
        role: response.data.role,
        userId: response.data.userId,
        username: response.data.username,
      };

      login(userData);

      localStorage.setItem("user", JSON.stringify(userData));

      toast.success(response.data.message || "Login successful");
      navigate("/");
    } catch (error) {
      console.log("Error during login:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setFormData({
        email: "",
        password: "",
      });
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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-purple-500/30 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-center gap-3 ">
          <img src={logo} alt="" className="w-10 h-10 rounded-2xl"/>
          <h2 className="text-3xl font-extrabold text-center">Sonique Login</h2>
        </div>
        <p className="text-center text-sm text-gray-300">
          Feel the Sound. Live the Beat.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full mt-1 p-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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

          <div className="flex justify-end text-sm">
            <Link
              to="/forgot-password"
              className="text-purple-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200 text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
