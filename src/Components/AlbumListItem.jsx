import React from "react";
import {
  FaUser,
  FaCalendar,
  FaChevronDown,
  FaChevronRight,
  FaEdit,
} from "react-icons/fa";
import SongListItem from "./SongListItem";

const AlbumListItem = ({
  album,
  isExpanded,
  toggleAlbum,
  setEditingAlbum,
  setAlbumData,
  setAlbumClicked,
  setEditingSong,
  setSongData,
  setSongClicked,
  storedUser,
}) => {
  const handleEditAlbum = (e) => {
    e.stopPropagation();
    setEditingAlbum(album);

    setAlbumData({
      name: album.name,
      desc: album.desc,
      bgColor: album.bgColor,
      releaseDate: album.releaseDate,
      image: null,
    });
    setAlbumClicked(true);
  };
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all">
      <div className="p-6 flex items-center justify-between">
        <div
          className="flex items-center gap-4 cursor-pointer flex-1"
          onClick={() => toggleAlbum(album.id)}
        >
          <div>
            <h2 className="text-xl font-bold text-white mb-1">{album.name}</h2>
            <div className="flex items-center gap-2 text-blue-200 font-medium mb-1">
              <FaUser size={14} /> {storedUser.username}
            </div>
            <div className="flex items-center gap-2 text-blue-300 text-sm">
              <FaCalendar size={14} />{" "}
              {new Date(album.releaseDate).toDateString()}
            </div>
            {album.desc && (
              <p className="text-white/70 text-sm mt-1">{album.desc}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleEditAlbum}
            className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg p-2 text-blue-200 cursor-pointer"
          >
            <FaEdit size={16} />
          </button>
          <div
            onClick={() => toggleAlbum(album.id)}
            className="cursor-pointer text-white"
          >
            {isExpanded ? (
              <FaChevronDown size={16} />
            ) : (
              <FaChevronRight size={16} />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-white/20 bg-black/20">
          {album.songs.length > 0 ? (
            album.songs.map((song, index) => (
              <SongListItem
                key={song.id}
                song={song}
                index={index}
                setEditingSong={setEditingSong}
                setSongData={setSongData}
                setSongClicked={setSongClicked}
              />
            ))
          ) : (
            <div className="p-6 text-center text-white/60">
              No songs in this album yet
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumListItem;
