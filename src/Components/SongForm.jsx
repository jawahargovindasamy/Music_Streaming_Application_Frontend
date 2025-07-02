import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PlayerContext } from "../Context/PlayerContext";

const SongForm = ({
  token,
  songData,
  setSongData,
  setSongClicked,
  editingSong,
  albumList,
  fetchAlbumData,
}) => {
  const [loading, setLoading] = useState(false);

  const {url} = useContext(PlayerContext);

  const genres = [
    "Pop",
    "Rock",
    "Hip-Hop",
    "R&B",
    "EDM",
    "Dance",
    "Indie",
    "Alternative",
    "Country",
    "Jazz",
    "Blues",
    "Classical",
    "Reggae",
    "Metal",
    "Punk",
    "Funk",
    "Soul",
    "Progressive Rock",
    "Folk",
    "kuthu",
    "Romantic",
    "Peppy",
    "Theme",
    "Upbeat",
    "Carnatic-influenced",
    "Mid-tempo",
    "Arabic",
    "Melodic",
    "Playful",
    "Nostalgic",
    "Pathos",
  ];

  const resetForm = () => {
    setSongData({
      name: "",
      desc: "",
      albumID: "",
      genre: "",
      duration: "",
      audio: null,
    });
    setSongClicked(false);
  };

  const handleSongSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!token) throw new Error("Token not found");

      const payload = new FormData();
      payload.append("name", songData.name);
      payload.append("desc", songData.desc);
      payload.append("albumID", songData.albumID);
      payload.append("genre", songData.genre);
      payload.append("duration", songData.duration);
      if (songData.audio) payload.append("audio", songData.audio);

      const method = editingSong ? "put" : "post";
      const endpoint = editingSong
        ? `${url}/api/song/update/${editingSong.id}`
        : `${url}/api/song/upload`;

      const response = await axios({
        method,
        url: endpoint,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        response?.data?.message ||
          (editingSong
            ? "Song updated successfully!"
            : "Song created successfully!")
      );

      fetchAlbumData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save song.");
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return (
    <form
      className={`bg-gray-900 rounded-xl mt-4 sm:mt-6 p-4 sm:p-6 max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      onSubmit={handleSongSubmit}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
        {editingSong ? "Update Song" : "Create New Song"}
      </h2>

      <div className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {/* Song Name */}
          <div className="lg:col-span-2">
            <label className="block text-gray-300 font-medium text-sm sm:text-base">
              Song Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Enter song name"
              value={songData.name}
              onChange={(e) =>
                setSongData({ ...songData, name: e.target.value })
              }
              className="mt-1 w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              disabled={loading}
            />
          </div>

          {/* Song Audio */}
          <div>
            <label className="block text-gray-300 font-medium text-sm sm:text-base">
              Song File{" "}
              {editingSong ? (
                "(optional)"
              ) : (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSongData((prev) => ({ ...prev, audio: file }));
                  const audio = new Audio(URL.createObjectURL(file));
                  audio.addEventListener("loadedmetadata", () => {
                    setSongData((prev) => ({
                      ...prev,
                      duration: Math.round(audio.duration),
                    }));
                  });
                }
              }}
              className="cursor-pointer mt-1 w-full text-gray-300 file:border-none file:bg-gray-600 file:px-3 file:py-2 file:rounded-lg file:text-gray-100 text-sm sm:text-base"
              required={!editingSong}
              disabled={loading}
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-gray-300 font-medium text-sm sm:text-base">
              Genre <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="mt-1 w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base cursor-pointer"
              value={songData.genre}
              onChange={(e) =>
                setSongData({ ...songData, genre: e.target.value })
              }
              disabled={loading}
            >
              <option value="">Select Genre</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Album */}
          <div className="lg:col-span-2">
            <label className="block text-gray-300 font-medium text-sm sm:text-base">
              Album Name <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="mt-1 w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base cursor-pointer"
              value={songData.albumID}
              onChange={(e) =>
                setSongData({ ...songData, albumID: e.target.value })
              }
              disabled={loading}
            >
              <option value="">Select Album</option>
              {albumList.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <label className="block text-gray-300 font-medium text-sm sm:text-base">
              Song Description
            </label>
            <textarea
              placeholder="Enter song description"
              value={songData.desc}
              onChange={(e) =>
                setSongData({ ...songData, desc: e.target.value })
              }
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
          ) : editingSong ? (
            "Edit Song"
          ) : (
            "Create Song"
          )}
        </button>
      </div>
    </form>
  );
};

export default SongForm;
