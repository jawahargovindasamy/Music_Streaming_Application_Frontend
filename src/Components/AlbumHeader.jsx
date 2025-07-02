import React from "react";

const AlbumHeader = ({
  isAlbumClicked,
  setAlbumClicked,
  isSongClicked,
  setSongClicked,
  setAlbumData,
  setSongData,
}) => {
  const handleAlbumCancel = () => {
    setAlbumClicked(!isAlbumClicked);
    setAlbumData({
      name: "",
      desc: "",
      bgColor: "",
      releaseDate: "",
      image: null,
    });
    setSongClicked(false);
  };

  const handleSongCancel = () => {
    setSongClicked(!isSongClicked);
    setSongData({
      name: "",
      desc: "",
      albumID: "",
      genre: "",
      duration: "",
      audio: null,
    });
    setAlbumClicked(false);
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Music Library
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1">
          Manage your tracks, albums, and music content
        </p>
      </div>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
        <button
          onClick={() => handleAlbumCancel()}
          className={`w-full sm:w-auto rounded-lg px-4 sm:px-5 py-2 sm:py-3 font-bold text-white transition-all cursor-pointer ${
            isAlbumClicked
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isAlbumClicked ? "Cancel" : "Create Album"}
        </button>
        <button
          onClick={() => {
            handleSongCancel();
          }}
          className={`w-full sm:w-auto rounded-lg px-4 sm:px-5 py-2 sm:py-3 font-bold text-white transition-all cursor-pointer ${
            isSongClicked
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSongClicked ? "Cancel" : "Create Song"}
        </button>
      </div>
    </div>
  );
};

export default AlbumHeader;
