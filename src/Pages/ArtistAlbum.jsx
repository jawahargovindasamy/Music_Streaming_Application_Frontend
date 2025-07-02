import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";

import AlbumHeader from "../Components/AlbumHeader";
import AlbumForm from "../Components/AlbumForm";
import SongForm from "../Components/SongForm";
import AlbumList from "../Components/AlbumList";
import { PlayerContext } from "../Context/PlayerContext";

const ArtistAlbum = () => {
  const [isAlbumClicked, setAlbumClicked] = useState(false);
  const [isSongClicked, setSongClicked] = useState(false);
  const [expandedAlbums, setExpandedAlbums] = useState(new Set());
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [editingSong, setEditingSong] = useState(null);
  const [albumList, setAlbumList] = useState([]);
  const [albumData, setAlbumData] = useState({
    name: "",
    desc: "",
    bgColor: "",
    releaseDate: "",
    image: null,
  });
  const [songData, setSongData] = useState({
    name: "",
    desc: "",
    albumID: "",
    genre: "",
    duration: "",
    audio: null,
  });

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;
  const artistId = storedUser?.artistId;
  const { url } = useContext(PlayerContext);

  const fetchAlbumData = async () => {
    try {
      if (!artistId) throw new Error("User ID not found");
      const response = await axios.get(`${url}/api/album/artist/${artistId}`);
      setAlbumList(response.data?.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch album data."
      );
    }
  };

  useEffect(() => {
    fetchAlbumData();
  }, [artistId]);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen p-3 sm:p-6 text-white">
        <AlbumHeader
          isAlbumClicked={isAlbumClicked}
          setAlbumClicked={setAlbumClicked}
          isSongClicked={isSongClicked}
          setSongClicked={setSongClicked}
          setAlbumData={setAlbumData}
          setSongData={setSongData}
        />

        {isAlbumClicked && (
          <AlbumForm
            token={token}
            albumData={albumData}
            setAlbumData={setAlbumData}
            fetchAlbumData={fetchAlbumData}
            setAlbumClicked={setAlbumClicked}
            editingAlbum={editingAlbum}
          />
        )}

        {isSongClicked && (
          <SongForm
            token={token}
            songData={songData}
            setSongData={setSongData}
            setSongClicked={setSongClicked}
            editingSong={editingSong}
            albumList={albumList}
            fetchAlbumData={fetchAlbumData}
          />
        )}

        <AlbumList
          albums={albumList}
          expandedAlbums={expandedAlbums}
          setExpandedAlbums={setExpandedAlbums}
          editingAlbum={editingAlbum}
          setEditingAlbum={setEditingAlbum}
          setAlbumData={setAlbumData}
          setAlbumClicked={setAlbumClicked}
          editingSong={editingSong}
          setEditingSong={setEditingSong}
          setSongData={setSongData}
          setSongClicked={setSongClicked}
          storedUser={storedUser}
        />
      </div>
    </>
  );
};

export default ArtistAlbum;
