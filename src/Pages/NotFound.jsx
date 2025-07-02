import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Oops! Page Not Found</h2>
      <p className="mb-8 text-gray-400">
        The page you're looking for doesn't exist. It may have been moved or
        deleted.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-full text-white text-lg"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
