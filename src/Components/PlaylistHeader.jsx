import React from "react";
import { FaEdit, FaPlay, FaPlus, FaTrash } from "react-icons/fa";
import { formatTotalDuration } from "../utils/formatters";

const PlaylistHeader = ({
  playlist,
  totalDuration,
  onPlay,
  onEdit,
  onAddSong,
  onDelete,
}) => {
  return (
    <div className="pt-6 pb-8">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-end">
        <div className="relative group flex-shrink-0">
          <img
            className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover rounded-lg shadow-2xl transition-transform group-hover:scale-105"
            src={playlist.image || "/placeholder.svg"}
            alt={playlist.title}
          />
          <div
            className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            onClick={onPlay}
          >
            <FaPlay className="w-16 h-16 text-white/80" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2 sm:space-y-4">
          <p className="text-sm font-medium text-white/60 uppercase tracking-wider">
            Playlist
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black leading-tight">
            {playlist.title}
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            "Your curated music collection"
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 text-sm text-white/60">
            <span className="font-semibold text-white cursor-pointer">
              Sonique
            </span>
            <span>•</span>
            <span>{playlist.songs.length} songs</span>
            <span>•</span>
            <span>{formatTotalDuration(totalDuration)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8 justify-center sm:justify-start">
        {playlist.songs.length > 0 && (
          <button
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105"
            onClick={onPlay}
          >
            <FaPlay className="w-5 h-5" />
            Play
          </button>
        )}
        <button
          className="p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
          title="Edit playlist"
          onClick={onEdit}
        >
          <FaEdit className="w-6 h-6" />
        </button>
        <button
          className="p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
          title="Add songs to playlist"
          onClick={onAddSong}
        >
          <FaPlus className="w-6 h-6" />
        </button>
        <button
          className="p-3 rounded-full text-white/60 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
          title="Delete playlist"
          onClick={onDelete}
        >
          <FaTrash className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default PlaylistHeader;
