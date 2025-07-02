import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaHome,
  FaBook,
  FaPlus,
  FaArrowRight,
  FaMusic,
  FaPodcast,
  FaImage,
} from "react-icons/fa";

import { PlayerContext } from "../Context/PlayerContext";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { recentlyPlayed, playWithId, playlist, getPlaylist, url } =
    useContext(PlayerContext);
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const handleCreatePlaylist = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title for the playlist.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (imageFile) formData.append("image", imageFile);

      const response = await axios.post(
        `${url}/api/playlist/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(
        response?.data?.message || "Playlist created successfully!"
      );
      getPlaylist();
      setIsModalOpen(false);
      setTitle("");
      setImageFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating playlist.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setImageFile(null);
    setLoading(false);
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full bg-zinc-950 text-white flex flex-col transform transition-all duration-300 ease-in-out z-50 border-r border-zinc-800
          w-72 sm:w-80 lg:w-80 xl:w-96
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <img
              src="../../public/Sonique.png"
              alt="logo"
              className="w-8 h-8"
            />
            <span className="font-bold text-lg xl:text-xl">Sonique</span>
          </div>
          <button
            className="lg:hidden p-2 hover:bg-zinc-800 rounded-full transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 lg:p-4 border-b border-zinc-800 space-y-2">
          <button
            onClick={() => handleNavigation("/")}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-left font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <FaHome className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Home</span>
          </button>
        </nav>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-3 lg:p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaBook className="w-5 h-5" />
              <span className="font-semibold text-base xl:text-lg">
                Your Library
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 lg:px-6 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700 hover:scrollbar-thumb-zinc-600">
            <div className="space-y-4 py-4 pb-6">
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm lg:text-base font-medium text-zinc-400 px-2">
                    My Playlists
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-zinc-800 rounded-full cursor-pointer"
                      onClick={
                        user
                          ? () => setIsModalOpen(true)
                          : () => navigate("/login")
                      }
                    >
                      <FaPlus className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>
                </div>
                {playlist && playlist.length > 0 ? (
                  playlist.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800/50 cursor-pointer group transition-all"
                      onClick={() => navigate(`/playlist/${item._id}`)}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex items-center justify-center group-hover:from-zinc-600 group-hover:to-zinc-700 transition-colors">
                        <FaMusic className="w-5 h-5 text-zinc-400 group-hover:text-zinc-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm lg:text-base font-medium truncate group-hover:text-white transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs lg:text-sm text-zinc-400 truncate group-hover:text-zinc-300 transition-colors">
                          {item?.songs?.length || 0} songs
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-zinc-700 rounded-full cursor-pointer">
                          <FaArrowRight className="w-3 h-3 text-zinc-400" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-zinc-900 rounded-xl p-4 space-y-2 border border-zinc-800 hover:bg-zinc-800/50 transition-all">
                    <h3 className="font-semibold text-base lg:text-lg xl:text-xl">
                      Create your first playlist
                    </h3>
                    <p className="text-sm lg:text-base text-zinc-400">
                      It's easy, we'll help you
                    </p>
                    <button
                      className={`bg-white text-black font-medium text-sm lg:text-base px-4 py-2 rounded-full mt-2 transition-all hover:scale-105 ${
                        user ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (user) {
                          setIsModalOpen(true);
                        } else {
                          toast.error("Login to create playlist");
                          navigate("/login"); // optional redirect
                        }
                      }}
                    >
                      Create playlist
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-zinc-900 rounded-xl p-4 space-y-2 border border-zinc-800 hover:bg-zinc-800/50 transition-all">
                <h3 className="flex items-center gap-2 font-semibold text-base lg:text-lg xl:text-xl">
                  <FaPodcast className="w-5 h-5 text-green-500" />
                  Let's find some podcasts
                </h3>
                <p className="text-sm lg:text-base text-zinc-400">
                  We'll keep you updated on new episodes
                </p>
                <button
                  className="bg-white text-black font-medium text-sm lg:text-base px-4 py-2 rounded-full mt-2 transition-all hover:scale-105"
                  onClick={() => console.log("Browse podcasts")}
                >
                  Browse podcasts
                </button>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm lg:text-base font-medium text-zinc-400 px-2">
                    Recently Played
                  </h2>
                  <button
                    className={`p-2 hover:bg-zinc-800 rounded-full ${
                      user ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    onClick={
                      user
                        ? () => navigate("/recently-played")
                        : () => navigate("/login")
                    }
                  >
                    <FaArrowRight className="w-4 h-4 text-zinc-400" />
                  </button>
                </div>
                {recentlyPlayed && recentlyPlayed.length > 0 ? (
                  recentlyPlayed.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => playWithId(item.id, recentlyPlayed)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800/50 cursor-pointer group transition-all"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex items-center justify-center group-hover:from-zinc-600 group-hover:to-zinc-700 transition-colors">
                        <FaMusic className="w-5 h-5 text-zinc-400 group-hover:text-zinc-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm lg:text-base font-medium truncate group-hover:text-white transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs lg:text-sm text-zinc-400 truncate group-hover:text-zinc-300 transition-colors">
                          {item.views} Views
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-zinc-500 text-sm mt-2">
                    No recently played songs yet.
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <h4 className="text-sm lg:text-base font-medium text-zinc-400 px-2">
                  Quick Actions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all text-left cursor-pointer"
                    onClick={
                      user
                        ? () => navigate("/liked-songs")
                        : () => navigate("/login")
                    }
                  >
                    <div className="text-xs lg:text-sm font-medium">
                      Liked Songs
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Your favorite Songs
                    </div>
                  </button>
                  <button
                    className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all text-left cursor-pointer"
                    onClick={
                      user
                        ? () => navigate("/liked-album")
                        : () => navigate("/login")
                    }
                  >
                    <div className="text-xs lg:text-sm font-medium">
                      Liked Album
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Your favorite Album
                    </div>
                  </button>
                  <button
                    className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all text-left cursor-pointer"
                    onClick={
                      user
                        ? () => navigate("/followed-artist")
                        : () => navigate("/login")
                    }
                  >
                    <div className="text-xs lg:text-sm font-medium">
                      Followed Artist
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Your favorites Artists
                    </div>
                  </button>
                  <button className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all text-left cursor-pointer">
                    <div className="text-xs lg:text-sm font-medium">
                      Downloaded
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Offline music
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-gradient-to-br from-zinc-900 via-gray-900 to-zinc-800 text-white p-8 rounded-2xl w-full max-w-lg border border-white/20 shadow-2xl transform transition-all duration-300 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Create New Playlist
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Add your favorite songs to a custom playlist
                </p>
              </div>
              <button
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200 hover:rotate-90 cursor-pointer"
                onClick={closeModal}
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Playlist Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter playlist name..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-200 placeholder-gray-400"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Playlist Cover Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="playlist-image"
                  />
                  <label
                    htmlFor="playlist-image"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm text-gray-300 rounded-xl border-2 border-dashed border-white/30 hover:border-purple-400 cursor-pointer transition-all duration-200 flex items-center justify-center gap-3 hover:bg-white/20"
                  >
                    <FaImage className="text-purple-400 text-xl" />
                    <span className="font-medium">
                      {imageFile ? "Change Image" : "Choose Cover Image"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Image Preview */}
              {imageFile && (
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg shadow-lg border-2 border-white/20"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-white">Preview</p>
                    <p className="text-sm text-gray-400">{imageFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => setImageFile(null)}
                    className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  className="flex-1 bg-gray-600/50 hover:bg-gray-600/70 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105 border border-gray-500/30 cursor-pointer"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  onClick={handleCreatePlaylist}
                  disabled={loading || !title.trim()}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FaPlus className="w-4 h-4" />
                      Create Playlist
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
