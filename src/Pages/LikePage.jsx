import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import { PlayerContext } from "../Context/PlayerContext";
import SongItem from "../Components/SongItem";

const LikePage = () => {
  const { likedSongsData } = useContext(PlayerContext);
  
  return (
    <>
      <Navbar />
      <h1 className="my-5 font-bold text-2xl">Liked Songs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {likedSongsData.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 italic">
            No liked songs yet.
          </p>
        ) : (
          likedSongsData.map((item) => <SongItem key={item.id} {...item} playlist={likedSongsData} />)
        )}
      </div>
    </>
  );
};

export default LikePage;
