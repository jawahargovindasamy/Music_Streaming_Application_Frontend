import React, { useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import Navbar from "../Components/Navbar";
import SongItem from "../Components/SongItem";

const ReccomendPage = () => {
  const { reccomendedData } = useContext(PlayerContext);
  return (
    <>
      <Navbar />
      <h1 className="my-5 font-bold text-2xl">Songs You Might Like</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reccomendedData.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 italic">
            No albums available.
          </p>
        ) : (
          reccomendedData.map((item) => (
            <SongItem key={item.id} playlist={reccomendedData} {...item} />
          ))
        )}
      </div>
    </>
  );
};

export default ReccomendPage;
