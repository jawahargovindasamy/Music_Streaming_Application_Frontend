import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SongSearchPanel = ({ query, results, onSearch, onAdd, onClose }) => {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search for songs..."
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 border border-white/20"
          />
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {results.length > 0 && (
        <div className="max-h-64 overflow-y-auto space-y-2">
          {results.map((song) => (
            <div
              key={song.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={song.image || "/placeholder.svg"}
                  alt={song.name}
                  className="w-10 h-10 rounded object-cover"
                />
                <div>
                  <p className="text-white font-medium">{song.name}</p>
                  <p className="text-white/60 text-sm">
                    {song.artistName || "Unknown Artist"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onAdd(song.id)}
                className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded-full text-black text-sm font-semibold transition"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SongSearchPanel;
