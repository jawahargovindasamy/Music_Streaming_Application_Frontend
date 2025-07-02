import React, { useContext, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Corrected import path for toastify CSS
import axios from "axios";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { PlayerContext } from "../Context/PlayerContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { url } = useContext(PlayerContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Both password fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/auth/reset-password/${id}/${token}`,
        { password }
      );
      toast.success(response.data.message || "Password reset successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error(error?.response?.data?.message || "Password reset failed");
    } finally {
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Home Button (Optional) */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 hidden md:flex items-center gap-2 bg-white/10 border border-purple-500/30 backdrop-blur-lg text-white px-4 py-2 rounded-xl hover:bg-white/20 hover:border-purple-400/50 transition-all duration-200 shadow-lg"
      >
        <FaHome className="text-purple-400" />
        <span className="font-medium">Home</span>
      </Link>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-purple-500/30 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-center gap-3">
          <img
            src="../../public/Sonique.png"
            alt=""
            className="W-10 h-10 rounded-2xl"
          />
          <h2 className="text-3xl font-extrabold text-center">
            Reset Password
          </h2>
        </div>
        <p className="text-center text-sm text-gray-300">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-4 text-purple-300 hover:text-purple-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* Confirm New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300">
              Confirm New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 p-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none pr-10"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200 cursor-pointer"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center text-sm text-gray-300">
          Go back to{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
