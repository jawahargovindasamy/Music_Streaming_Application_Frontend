import React from "react";
import { useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import Navbar from "../Components/Navbar";
import SongItem from "../Components/SongItem";

const RecentPage = () => {
  const { recentlyPlayed } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      <h1 className="my-5 font-bold text-2xl">Recently Played Songs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recentlyPlayed?.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 italic">
            No albums available.
          </p>
        ) : (
          recentlyPlayed?.map((item) => (
            <SongItem
              playlist={recentlyPlayed}
              key={item.id}
              id={item.id}
              name={item.name}
              desc={item.desc}
              image={item.image}
            />
          ))
        )}
      </div>
    </>
  );
};

export default RecentPage;
