import React, { useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import ArtistItem from "../Components/ArtistItem";
import Navbar from "../Components/Navbar";

const ArtistPage = () => {
  const { artistsData } = useContext(PlayerContext);
  return (
    <>
      <Navbar />
      <h1 className="my-5 font-bold text-2xl">All Artists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artistsData.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 italic">
            No artists available.
          </p>
        ) : (
          artistsData.map((item) => <ArtistItem key={item.id} {...item} />)
        )}
      </div>
    </>
  );
};

export default ArtistPage;
