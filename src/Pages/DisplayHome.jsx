import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import AlbumItem from "../Components/AlbumItem";
import SongItem from "../Components/SongItem";
import ArtistItem from "../Components/ArtistItem";
import { PlayerContext } from "../Context/PlayerContext";
import { useNavigate } from "react-router-dom";

const DisplayHome = () => {
  const { songsData, albumsData, artistsData, reccomendedData } =
    useContext(PlayerContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <>
        {/* Featured Album */}
        <section className="mb-8 px-2 sm:px-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-xl sm:text-2xl">Featured Album</h1>
            {albumsData.length > 4 && (
              <button
                onClick={() => navigate("/albums")}
                className="text-blue-400 font-medium cursor-pointer no-underline"
              >
                View All
              </button>
            )}
          </div>
          {albumsData.length === 0 ? (
            <p className="text-gray-400">No featured albums found.</p>
          ) : (
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide">
              {albumsData.map((item) => (
                <div
                  className="snap-center flex-shrink-0 w-40 sm:w-48 md:w-52"
                  key={item.id}
                >
                  <AlbumItem
                    id={item.id}
                    name={item.name}
                    desc={item.desc}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Songs might you like section */}
        {reccomendedData.length > 0 && (
          <section className="mb-8 px-2 sm:px-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-bold text-xl sm:text-2xl">
                Songs You Might Like
              </h1>
              {reccomendedData.length > 4 && (
                <button
                  onClick={() => navigate("/recommended")}
                  className="text-blue-400 font-medium cursor-pointer no-underline"
                >
                  View All
                </button>
              )}
            </div>
            {reccomendedData.length > 0 && (
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide">
                {reccomendedData.slice(0, 8).map((item) => (
                  <div
                    className="snap-center flex-shrink-0 w-40 sm:w-48 md:w-52"
                    key={item.id}
                  >
                    <SongItem
                      playlist={reccomendedData}
                      id={item.id}
                      name={item.name}
                      desc={item.desc}
                      image={item.image}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Featured Artists */}
        <section className="mb-8 px-2 sm:px-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-xl sm:text-2xl">Featured Artists</h1>
            {artistsData.length > 4 && (
              <button
                onClick={() => navigate("/artists")}
                className="text-blue-400 font-medium cursor-pointer no-underline"
              >
                View All
              </button>
            )}
          </div>
          {artistsData.length === 0 ? (
            <p className="text-gray-400">No artists found.</p>
          ) : (
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide">
              {artistsData.map((item) => (
                <div
                  className="snap-center flex-shrink-0 w-40 sm:w-48 md:w-52"
                  key={item.artistId || item.id}
                >
                  <ArtistItem
                    id={item.artistId || item.id}
                    name={item.username}
                    bio={item.bio}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Featured Songs */}
        <section className="mb-8 px-2 sm:px-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-xl sm:text-2xl">Featured Songs</h1>
            {songsData.length > 4 && (
              <button
                onClick={() => navigate("/songs")}
                className="text-blue-400 font-medium cursor-pointer no-underline"
              >
                View All
              </button>
            )}
          </div>
          {songsData.length === 0 ? (
            <p className="text-gray-400">No songs found.</p>
          ) : (
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide">
              {songsData.slice(0, 8).map((item) => (
                <div
                  className="snap-center flex-shrink-0 w-40 sm:w-48 md:w-52"
                  key={item.id}
                >
                  <SongItem
                    playlist={songsData}
                    id={item.id}
                    name={item.name}
                    desc={item.desc}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </>
    </>
  );
};

export default DisplayHome;
