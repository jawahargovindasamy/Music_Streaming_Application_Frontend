import React from "react";
import { FaMusic } from "react-icons/fa";
import Navbar from "./Navbar";

const NotFoundScreen = () => (
  <div className="min-h-screen bg-black text-white">
    <Navbar />
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <FaMusic className="mx-auto text-gray-400 text-6xl mb-4" />
        <p className="text-white text-xl">Playlist not found.</p>
      </div>
    </div>
  </div>
);

export default NotFoundScreen;
