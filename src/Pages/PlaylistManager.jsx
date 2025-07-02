import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { PlayerContext } from "../Context/PlayerContext";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import PlaylistHeader from "../Components/PlaylistHeader";
import SongSearchPanel from "../Components/SongSearchPanel";
import EditPlaylistModal from "../Components/EditPlaylistModal";
import DeleteConfirmModal from "../Components/DeleteConfirmModal";
import SongList from "../Components/SongList";
import LoadingScreen from "../Components/LoadingScreen";
import NotFoundScreen from "../Components/NotFoundScreen";

const PlaylistManager = () => {
  const [playlist, setPlaylist] = useState(null);
  const [isEditingPlaylist, setIsEditingPlaylist] = useState(false);
  const [newCoverImage, setNewCoverImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { songsData, playWithId, getPlaylist, track, url } =
    useContext(PlayerContext);
  const [title, setTitle] = useState("");
  const displayRef = useRef(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  useEffect(() => {
    if (playlist) setTitle(playlist.title);
  }, [playlist]);

  useEffect(() => {
    if (displayRef.current) {
      const bgColor = "#4338ca";
      displayRef.current.style.background = `linear-gradient(180deg, ${bgColor} 0%, ${bgColor}80 50%, #0f0f0f 100%)`;
    }
  }, [playlist]);

  const fetchPlaylist = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${url}/api/playlist/list/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setPlaylist(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load playlist");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSong = async (songId) => {
    try {
      await axios.post(
        `${url}/api/playlist/add-song/${id}`,
        { songId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Song added to playlist successfully!");
      fetchPlaylist();
      getPlaylist();
      setSearchQuery("");
      setSearchResults([]);
      setShowSearch(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding song.");
    }
  };

  const handleEditPlaylist = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (newCoverImage) formData.append("image", newCoverImage);
      await axios.put(
        `${url}/api/playlist/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Playlist updated successfully!");
      fetchPlaylist();
      getPlaylist();
      setIsEditingPlaylist(false);
      setNewCoverImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating playlist.");
    }
  };

  const handleDeletePlaylist = async () => {
    try {
      await axios.delete(`${url}/api/playlist/delete/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Playlist deleted successfully!");
      getPlaylist();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting playlist.");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = songsData.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.artistID?.name?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleRemoveSong = async (songId) => {
    try {
      const response = await axios.put(
        `${url}/api/playlist/update-song/${id}`,
        { songId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success(response.data.message || "Song removed from playlist.");
      fetchPlaylist();
      getPlaylist();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove song.");
    }
  };

  if (loading) return <LoadingScreen />;
  if (!playlist) return <NotFoundScreen />;

  const totalDuration = playlist.songs.reduce(
    (acc, song) => acc + Number(song.duration),
    0
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div ref={displayRef} className="px-4 sm:px-6 lg:px-8 pb-8 mt-2">
        <PlaylistHeader
          playlist={playlist}
          totalDuration={totalDuration}
          onPlay={() => playWithId(playlist.songs[0]?.id, playlist.songs)}
          onEdit={() => setIsEditingPlaylist(true)}
          onAddSong={() => setShowSearch(true)}
          onDelete={() => setShowDeleteConfirm(true)}
        />

        {showSearch && (
          <SongSearchPanel
            query={searchQuery}
            results={searchResults}
            onSearch={handleSearch}
            onClose={() => {
              setShowSearch(false);
              setSearchQuery("");
              setSearchResults([]);
            }}
            onAdd={handleAddSong}
          />
        )}

        {isEditingPlaylist && (
          <EditPlaylistModal
            title={title}
            setTitle={setTitle}
            newCoverImage={newCoverImage}
            setNewCoverImage={setNewCoverImage}
            onSave={handleEditPlaylist}
            onCancel={() => {
              setIsEditingPlaylist(false);
              setTitle(playlist.title);
              setNewCoverImage(null);
            }}
            currentImage={playlist?.image}
          />
        )}

        <SongList
          songs={playlist.songs}
          currentTrack={track}
          onPlay={playWithId}
          onRemove={handleRemoveSong}
          navigate={navigate}
        />

        {showDeleteConfirm && (
          <DeleteConfirmModal
            title={playlist.title}
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={() => {
              handleDeletePlaylist();
              setShowDeleteConfirm(false);
            }}
          />
        )}

        <div className="h-24 sm:h-8"></div>
      </div>
    </div>
  );
};

export default PlaylistManager;
