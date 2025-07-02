import React, { useContext, useEffect, useRef } from "react";
import { FaClock, FaPlay, FaHeart, FaEllipsisH } from "react-icons/fa";
import { PlayerContext } from "../Context/PlayerContext";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { formatTime, formatTotalDuration } from "../utils/formatters";

import Navbar from "../Components/Navbar";
import ShareSection from "../Components/ShareSection";
import { AuthContext } from "../Context/AuthContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const { playWithId, getAlbumById, album, track, likeAlbum, likedAlbumsData } =
    useContext(PlayerContext);
  const { user } = useContext(AuthContext);
  const displayRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAlbumById(id);
  }, [id, getAlbumById]);

  const bgColor = album ? album.bgColor : "#4338ca";

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = `linear-gradient(180deg, ${bgColor} 0%, ${bgColor}80 50%, #0f0f0f 100%)`;
    }
  }, [bgColor]);

  if (!album) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/60">Loading album...</p>
        </div>
      </div>
    );
  }

  const totalDuration = album.songs.reduce(
    (acc, song) => acc + Number(song.duration),
    0
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div ref={displayRef} className="px-4 sm:px-6 lg:px-8 pb-8 mt-2">
        {/* Album Header */}
        <div className="pt-6 pb-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-end">
            {/* Album Image */}
            <div className="relative group flex-shrink-0">
              <img
                className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover rounded-lg shadow-2xl transition-transform group-hover:scale-105"
                src={album.image || "/placeholder.svg"}
                alt={album.name}
              />
              <div
                className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                onClick={() => playWithId(album.songs[0].id, album.songs)}
              >
                <FaPlay className="w-16 h-16 text-white/80" />
              </div>
            </div>

            {/* Album Info */}
            <div className="flex-1 text-center sm:text-left space-y-2 sm:space-y-4">
              <p className="text-sm font-medium text-white/60 uppercase tracking-wider">
                Album
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
                {album.name}
              </h1>
              <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
                {album.desc}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 text-sm text-white/60">
                <span
                  className="font-semibold text-white cursor-pointer hover:underline"
                  onClick={() => navigate(`/artist/${album.artistID}`)}
                >
                  {album.artistName}
                </span>
                <span>•</span>
                <span>{album.songs.length} songs</span>
                <span>•</span>
                <span>{formatTotalDuration(totalDuration)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-8 justify-center sm:justify-start">
            <button
              className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105"
              onClick={() => playWithId(album.songs[0].id, album.songs)}
            >
              <FaPlay className="w-5 h-5" />
              Play
            </button>
            {user && (
              <button
                className="p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
                onClick={() => likeAlbum(album.id)}
              >
                <FaHeart
                  className={`w-6 h-6 transition-all ${
                    likedAlbumsData?.some((song) => song.id === album.id)
                      ? "text-red-500 scale-110"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                />
              </button>
            )}
            <button className="p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition">
              <FaEllipsisH className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Songs List */}
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

          {/* Songs */}
          <div className="divide-y divide-white/5">
            {album.songs.map((item, index) => (
              <div
                key={item.id}
                onClick={() => playWithId(item.id, album.songs)}
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
                    <p
                      className={`flex-1 whitespace-nowrap overflow-x-auto ${
                        track?.id === item.id
                          ? "text-green-400"
                          : "text-white group-hover:text-white"
                      }`}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className="text-white/60 text-sm whitespace-nowrap overflow-x-auto">
                    {album.name}
                  </div>
                  <div className="hidden lg:block text-white/60 text-sm whitespace-nowrap">
                    {formatDistanceToNow(new Date(item.releaseDate), {
                      addSuffix: true,
                    })}
                  </div>
                  <div className="text-white/60 text-sm text-center whitespace-nowrap">
                    {formatTime(item.duration)}
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
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className="text-white/60 text-sm flex-shrink-0">
                    {formatTime(item.duration)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-24 sm:h-8"></div>
      </div>
      <ShareSection
        name={"album"}
        artistName={album?.artistName || "this artist"}
        albumName={album?.name || "This album"}
        music={"Album"}
      />
    </div>
  );
};

export default DisplayAlbum;
