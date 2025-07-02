import React, { useContext, useEffect } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import Navbar from "../Components/Navbar";
import AlbumItem from "../Components/AlbumItem";
import ArtistItem from "../Components/ArtistItem";
import SongItem from "../Components/SongItem";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const { searchResults, getSearchData } = useContext(PlayerContext);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (!query) return;
    try {
      getSearchData(query);
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  }, [query]);

  const hasSearchResults =
    searchResults &&
    (searchResults.albums.length > 0 ||
      searchResults.artists.length > 0 ||
      searchResults.songs.length > 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 sm:px-6 md:px-10 pt-6 pb-16 text-white bg-gradient-to-b from-black via-zinc-900 to-black">
        {hasSearchResults ? (
          <section className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl sm:text-3xl mb-6">
              Search results for{" "}
              <span className="text-purple-400">"{query}"</span>
            </h1>

            {/* Albums */}
            {searchResults.albums.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-3">Albums</h2>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                  {searchResults.albums.map((item) => (
                    <div
                      className="snap-center flex-shrink-0 w-40 sm:w-48 md:w-52"
                      key={item._id}
                    >
                      <AlbumItem
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        desc={item.desc}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Artists */}
            {searchResults.artists.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mt-6 mb-3">Artists</h2>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                  {searchResults.artists.map((item) => (
                    <div
                      className="snap-center flex-shrink-0 w-40 sm:w-48 md:w-52"
                      key={item._id}
                    >
                      <ArtistItem
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        bio={item.bio}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Songs */}
            {searchResults.songs.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mt-6 mb-3">Songs</h2>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                  {searchResults.songs.map((item) => (
                    <div
                      className="snap-center flex-shrink-0 w-40 sm:w-48 md:w-52"
                      key={item._id}
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
              </>
            )}
          </section>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold text-zinc-300">
              No results found
            </h2>
            <p className="text-zinc-500 mt-2">
              We couldn’t find anything for{" "}
              <span className="text-white">"{query}"</span>
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default SearchPage;
