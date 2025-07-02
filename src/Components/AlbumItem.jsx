import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      title={`Open ${name}`}
      className="relative group min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-all duration-200"
    >
      <img
        className="rounded w-50 h-56  aspect-square object-cover"
        src={image}
        alt={name || "Album cover"}
      />

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100">
        <div className="bg-green-500 text-black rounded-full p-2 shadow-md">
          <FaPlay size={12} />
        </div>
      </div>

      <p className="font-bold mt-2 mb-1 truncate">{name}</p>
      <p className="text-slate-200 text-sm line-clamp-2">{desc.slice(0, 25)}</p>
    </div>
  );
};

export default AlbumItem;
