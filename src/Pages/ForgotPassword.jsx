import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";
import { PlayerContext } from "../Context/PlayerContext";
import { FaHome } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { url } = useContext(PlayerContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/auth/forgot-password`, {
        email,
      });
      console.log("Forgot password request sent:", response.data);
      toast.success(response.data.message || "Password reset email sent!");
    } catch (error) {
      console.log("Error during forgot password request:", error);
      toast.error(
        error?.response?.data?.message || "Failed to send password reset email"
      );
    } finally {
      setEmail("");
      setLoading(false);
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

      {/* Forgot Password Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-purple-500/30 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-center gap-3">
          <img src="../../public/Sonique.png" alt="" className="w-10 h-10 rounded-2xl"/>
          <h2 className="text-3xl font-extrabold text-center">
            Forgot Password
          </h2>
        </div>
        <p className="text-center text-sm text-gray-300">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2  ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 cursor-pointer"
            } text-white font-semibold py-3 rounded-lg transition duration-200`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-300">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:underline font-medium cursor-pointer"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
