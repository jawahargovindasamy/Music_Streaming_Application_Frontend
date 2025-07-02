import React from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ArtistItem = ({ image, name, bio, id }) => {
  const navigate = useNavigate();
  console.log();

  return (
    <div
      onClick={() => navigate(`/artist/${id}`)}
      title="Open Artist"
      className="relative group min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-all duration-200"
    >
      <img
        className="w-48 h-48 rounded-full aspect-square object-cover"
        src={image || undefined}
        alt={name || "Artist cover"}
      />
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100">
        <div className="bg-green-500 text-black rounded-full p-2 shadow-md">
          <FaPlay size={12} />
        </div>
      </div>
      <p className="font-bold mt-2 mb-1 truncate">{name}</p>
      <p className="text-slate-200 text-sm line-clamp-2">{bio.slice(0, 25)}</p>
    </div>
  );
};

export default ArtistItem;
