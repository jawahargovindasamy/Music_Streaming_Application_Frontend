import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlayerContext } from "../Context/PlayerContext";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../Components/Navbar";
import AlbumItem from "../Components/AlbumItem";
import SongItem from "../Components/SongItem";
import {
  FaHeart,
  FaUserFriends,
  FaCompactDisc,
  FaMusic,
  FaChevronRight,
} from "react-icons/fa";
import ShareSection from "../Components/ShareSection";

const DisplayArtist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArtistById, artist, followArtist } = useContext(PlayerContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getArtistById(id);
  }, [id, getArtistById]);

  const isFollowing = artist?.artist?.followers?.some(
    (followerId) => followerId === user?.userId
  );

  const handleFollowClick = async () => {
    await followArtist(id);
    artist.artist.followers = isFollowing
      ? artist.artist.followers.filter((f) => f !== user?.userId)
      : [...artist.artist.followers, user?.userId];
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="relative mt-2">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-transparent to-transparent" />

        <div className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            {/* Artist Image & Follow */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative group">
                <img
                  className="w-64 h-64 object-cover rounded-2xl shadow-2xl transition-transform group-hover:scale-105"
                  src={artist?.artist?.image || "/placeholder.svg"}
                  alt={artist?.artist?.name}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
              </div>

              {user ? (
                <button
                  onClick={handleFollowClick}
                  className={`mt-6 px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isFollowing
                      ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg shadow-red-500/25"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  } transform hover:scale-105 active:scale-95`}
                >
                  <FaHeart
                    className={`w-4 h-4 ${isFollowing ? "fill-current" : ""}`}
                  />
                  {isFollowing ? "Following" : "Follow"}
                </button>
              ) : (
                <button
                  className="mt-6 bg-slate-700 text-slate-400 px-8 py-3 rounded-full opacity-50 cursor-not-allowed flex items-center gap-2"
                  disabled
                  title="Login to follow"
                >
                  <FaHeart className="w-4 h-4" /> Follow
                </button>
              )}
            </div>

            {/* Artist Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full border border-purple-500/30">
                  Artist
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {artist?.artist?.name || "Loading..."}
              </h1>
              {artist?.artist?.bio && (
                <p className="text-slate-300 text-lg max-w-2xl mb-6 leading-relaxed">
                  {artist.artist.bio}
                </p>
              )}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <FaUserFriends className="w-4 h-4" />
                  {artist?.artist?.followers?.length || 0} Followers
                </div>
                <div className="flex items-center gap-2">
                  <FaCompactDisc className="w-4 h-4" />
                  {artist?.albums?.length || 0} Albums
                </div>
                <div className="flex items-center gap-2">
                  <FaMusic className="w-4 h-4" />
                  {artist?.songs?.length || 0} Songs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
        {/* Featured Albums */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <FaCompactDisc className="w-6 h-6 text-purple-400" /> Featured
              Albums
            </h2>
            {artist?.albums?.length > 4 && (
              <button
                onClick={() => navigate("/albums")}
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 group"
              >
                View All
                <FaChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>

          {artist?.albums?.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No featured albums found.
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
              {artist?.albums?.map((item) => (
                <div
                  key={item._id}
                  className="snap-center flex-shrink-0 w-48 sm:w-52 md:w-56 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 card-hover"
                >
                  <AlbumItem
                    id={item._id}
                    name={item.name}
                    desc={item.desc}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Featured Songs */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <FaMusic className="w-6 h-6 text-purple-400" /> Featured Songs
            </h2>
            {artist?.songs?.length > 4 && (
              <button
                onClick={() => navigate("/songs")}
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 group cursor-pointer"
              >
                View All
                <FaChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>

          {artist?.songs?.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No songs found.
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
              {artist?.songs?.map((item) => (
                <div
                  key={item._id}
                  className="snap-center flex-shrink-0 w-48 sm:w-52 md:w-56 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 card-hover"
                >
                  <SongItem
                    id={item._id}
                    name={item.name}
                    desc={item.desc}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <ShareSection
        name={"artist"}
        artistName={artist?.artist?.name || "this artist"}
        artistImage={artist?.artist?.image}
        music={"music"}
      />
    </>
  );
};

export default DisplayArtist;
