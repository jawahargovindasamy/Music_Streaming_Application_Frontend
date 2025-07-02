import React from "react";
import { FaPlay, FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const PlaylistControls = ({
  playlist,
  onPlay,
  onEdit,
  onAdd,
  onDeleteConfirm,
}) => {
  if (!playlist) return null;

  return (
    <div className="flex items-center gap-4 mt-8 justify-center sm:justify-start px-4 sm:px-6 lg:px-8">
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
        onClick={onAdd}
      >
        <FaPlus className="w-6 h-6" />
      </button>

      <button
        className="p-3 rounded-full text-white/60 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
        title="Delete playlist"
        onClick={onDeleteConfirm}
      >
        <FaTrash className="w-6 h-6" />
      </button>
    </div>
  );
};

export default PlaylistControls;
