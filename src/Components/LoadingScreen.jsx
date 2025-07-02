import React from "react";

const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center text-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
      <p className="text-white/60">Loading playlist...</p>
    </div>
  </div>
);

export default LoadingScreen;
