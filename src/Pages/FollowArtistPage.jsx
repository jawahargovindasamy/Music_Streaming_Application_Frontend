import React, { useContext, useEffect } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import Navbar from "../Components/Navbar";
import ArtistItem from "../Components/ArtistItem";

const FollowArtistPage = () => {
  const { followedArtistsData, getFollowedArtists } = useContext(PlayerContext);

  useEffect(() => {
    getFollowedArtists();
  }, []);


  return (
    <>
      <Navbar />
      <h1 className="my-5 font-bold text-2xl">Followed Artist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {followedArtistsData.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 italic">
            No Followed Artist yet.
          </p>
        ) : (
          followedArtistsData.map((item) => (
            <ArtistItem key={item.id} {...item} />
          ))
        )}
      </div>
    </>
  );
};

export default FollowArtistPage;
