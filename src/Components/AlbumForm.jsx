import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PlayerContext } from "../Context/PlayerContext";

const AlbumForm = ({
  token,
  albumData,
  setAlbumData,
  fetchAlbumData,
  setAlbumClicked,
  editingAlbum,
}) => {
  const [loading, setLoading] = useState(false);

  const {url} = useContext(PlayerContext)

  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!token) throw new Error("Token not found");

      const payload = new FormData();
      payload.append("name", albumData.name);
      payload.append("desc", albumData.desc);
      payload.append("bgColor", albumData.bgColor);
      payload.append("releaseDate", albumData.releaseDate);

      if (albumData.image) {
        payload.append("image", albumData.image);
      }

      const response = await axios({
        method: editingAlbum ? "put" : "post",
        url: editingAlbum
          ? `${url}/api/album/update/${editingAlbum.id}`
          : `${url}/api/album/upload`,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        response?.data?.message ||
          (editingAlbum
            ? "Album updated successfully!"
            : "Album created successfully!")
      );

      fetchAlbumData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create album.");
    } finally {
      setLoading(false);
      setAlbumData({
        name: "",
        desc: "",
        bgColor: "#0f172a",
        releaseDate: "",
        image: null,
      });
      setAlbumClicked(false);
    }
  };

  return (
    <form
      className={`bg-gray-900 rounded-xl mt-4 sm:mt-6 p-4 sm:p-6 max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      onSubmit={handleAlbumSubmit}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
        {editingAlbum ? "Update Album" : "Create New Album"}
      </h2>
      <div className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {/* Album Name */}
          <div className="lg:col-span-2">
            <label className="block text-gray-300 font-medium text-sm sm:text-base">
              Album Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Enter album name"
              value={albumData.name}
              onChange={(e) => setAlbumData({ ...albumData, name: e.target.value })}
              className="mt-1 w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              disabled={loading}
            />
          </div>

          {/* Album Cover */}
          <div>
            <label className="block text-gray-300 font-medium text-sm sm:text-base">
              Cover Image {editingAlbum ? "(optional)" : <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAlbumData({ ...albumData, image: e.target.files[0] })}
              className="cursor-pointer mt-1 w-full text-gray-300 file:border-none file:bg-gray-600 file:px-3 file:py-2 file:rounded-lg file:text-gray-100 text-sm sm:text-base"
              disabled={loading}
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="block text-gray-300 font-medium text-sm sm:text-base">
              Release Date <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="date"
              value={albumData.releaseDate ? albumData.releaseDate.slice(0, 10) : ""}
              onChange={(e) => setAlbumData({ ...albumData, releaseDate: e.target.value })}
              className="mt-1 w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              disabled={loading}
            />
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-gray-300 font-medium text-sm sm:text-base">
              Background Color
            </label>
            <div className="flex space-x-4 items-center mt-1">
              <input
                type="color"
                value={albumData.bgColor || "#0f172a"}
                onChange={(e) => setAlbumData({ ...albumData, bgColor: e.target.value })}
                className="w-12 h-12 rounded-full cursor-pointer"
                disabled={loading}
              />
              <input
                type="text"
                placeholder="#0f172a"
                value={albumData.bgColor}
                onChange={(e) => setAlbumData({ ...albumData, bgColor: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                disabled={loading}
              />
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <label className="block text-gray-300 font-medium text-sm sm:text-base">
              Album Description
            </label>
            <textarea
              placeholder="Enter album description"
              value={albumData.desc}
              onChange={(e) => setAlbumData({ ...albumData, desc: e.target.value })}
              className="mt-1 w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              rows="3"
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 sm:p-4 rounded-lg text-white font-bold transition-all duration-200 transform ${
            loading
              ? "bg-green-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 hover:scale-105 cursor-pointer"
          } text-sm sm:text-base`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : editingAlbum ? (
            "Edit Album"
          ) : (
            "Create Album"
          )}
        </button>
      </div>
    </form>
  );
};

export default AlbumForm;
