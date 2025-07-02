import React, { useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import AlbumItem from "../Components/AlbumItem";
import Navbar from "../Components/Navbar";

const AlbumsPage = () => {
  const { albumsData } = useContext(PlayerContext);
  return (
    <>
      <Navbar />
      <h1 className="my-5 font-bold text-2xl">All Albums</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albumsData.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 italic">
            No albums available.
          </p>
        ) : (
          albumsData.map((item) => (
            <AlbumItem key={item.id} {...item} />
          ))
        )}
      </div>
    </>
  );
};

export default AlbumsPage;
