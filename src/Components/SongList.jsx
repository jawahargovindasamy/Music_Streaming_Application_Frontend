import React from "react";
import { FaClock, FaTrash, FaMusic } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { formatTime } from "../utils/formatters";
import { useNavigate } from "react-router-dom";

const SongList = ({ songs, track, onPlay, onRemove }) => {
  const navigate = useNavigate();

  if (songs.length === 0) {
    return (
      <div className="text-center py-12 text-white/60">
        <FaMusic className="mx-auto text-6xl mb-4" />
        <p className="text-xl mb-2">No songs in this playlist yet</p>
        <p className="text-sm">Add some songs to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden mt-6">
      <div className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-3 text-xs font-medium text-white/40 uppercase tracking-wider border-b border-white/10">
        <div className="flex items-center col-span-2">
          <span className="w-4 mr-4 text-center">#</span>Title
        </div>
        <div>Album</div>
        <div className="hidden lg:block">Date Added</div>
        <div className="flex justify-center">
          <FaClock className="w-4 h-4" />
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {songs.map((item, index) => (
          <div
            key={item.id}
            className={`group cursor-pointer transition-all hover:bg-white/5 active:bg-white/10 transform hover:scale-[1.01] ${
              track?.id === item.id ? "bg-green-500/10" : ""
            }`}
          >
            <div className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-3 items-center">
              <div className="flex col-span-2 items-center min-w-0">
                <span
                  className={`text-sm font-medium w-4 mr-4 text-center ${
                    track?.id === item.id
                      ? "text-green-400"
                      : "text-white/40 group-hover:text-white"
                  }`}
                >
                  {index + 1}
                </span>
                <img
                  className="w-10 h-10 rounded object-cover mr-3 flex-shrink-0"
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`whitespace-nowrap overflow-x-auto ${
                      track?.id === item.id
                        ? "text-green-400"
                        : "text-white hover:text-white"
                    }`}
                    onClick={() => onPlay(item.id)}
                  >
                    {item.name}
                  </p>
                  <p
                    className={`text-xs truncate ${
                      track?.id === item.id
                        ? "text-green-400"
                        : "text-white/40 hover:text-white hover:underline"
                    }`}
                    onClick={() => navigate(`/artist/${item.artistID}`)}
                  >
                    {item.artistName}
                  </p>
                </div>
              </div>

              <div
                className="text-white/60 text-sm whitespace-nowrap overflow-x-auto hover:text-white hover:underline"
                title={`Go to album ${item.albumName}`}
                onClick={() => navigate(`/album/${item.albumID}`)}
              >
                {item.albumName || "Unknown Album"}
              </div>

              <div className="hidden lg:block text-white/60 text-sm whitespace-nowrap">
                {formatDistanceToNow(new Date(item.releaseDate), {
                  addSuffix: true,
                })}
              </div>

              <div className="text-white/60 text-sm text-center relative">
                <span className="group-hover:opacity-0 transition-opacity">
                  {formatTime(item.duration)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(item.id);
                  }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Row */}
            <div className="sm:hidden px-4 py-3 flex items-center gap-3">
              <img
                className="w-12 h-12 rounded object-cover flex-shrink-0"
                src={item.image || "/placeholder.svg"}
                alt={item.name}
              />
              <div className="flex-1 min-w-0 overflow-x-auto whitespace-nowrap">
                <p
                  className={`${
                    track?.id === item.id
                      ? "text-green-400"
                      : "text-white group-hover:text-white"
                  }`}
                  onClick={() => onPlay(item.id)}
                >
                  {item.name}
                </p>
              </div>
              <div className="text-white/60 text-sm flex-shrink-0">
                {formatTime(item.duration)}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
                className="p-2 text-red-400 hover:text-red-300 flex-shrink-0"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
