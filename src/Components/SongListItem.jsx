import React from "react";
import { FaMusic, FaEdit, FaClock } from "react-icons/fa";
import { formatDuration } from "../utils/formatters";

const SongListItem = ({
  song,
  index,
  setEditingSong,
  setSongData,
  setSongClicked,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-white/5 border-b border-white/10 last:border-b-0">
      <div className="w-8 text-center text-white/60 text-sm font-medium">
        {index + 1}
      </div>
      <FaMusic className="text-blue-300" size={16} />
      <div className="flex-1">
        <h3 className="text-white font-medium">{song.name}</h3>
        {song.desc && <p className="text-white/60 text-sm">{song.desc}</p>}
        <div className="flex items-center gap-4 mt-1">
          <span className="text-blue-200 text-xs px-2 py-1 bg-blue-500/20 rounded">
            {song.genre}
          </span>
          <div className="flex items-center gap-1 text-white/60 text-xs">
            <FaClock size={12} /> {formatDuration(song.duration)}
          </div>
        </div>
      </div>
      <button
        className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 rounded-lg p-2 text-green-200 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setEditingSong(song);
          setSongData({
            name: song.name,
            desc: song.desc,
            albumID: song.albumID,
            genre: song.genre,
            duration: song.duration,
            audio: null,
          });
          setSongClicked(true);
        }}
      >
        <FaEdit size={14} />
      </button>
    </div>
  );
};

export default SongListItem;
