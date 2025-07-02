// src/Context/PlayerContext.jsx
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);
  const url = "https://music-streaming-application-backend.onrender.com";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [artistsData, setArtistsData] = useState([]);
  const [album, setAlbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
  const [reccomendedData, setRecommendedData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likedSongsData, setLikedSongsData] = useState([]);
  const [likedAlbumsData, setLikedAlbumsData] = useState([]);
  const [followedArtistsData, setFollowedArtistsData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [searchResults, setSearchResults] = useState({
    artists: [],
    songs: [],
    albums: [],
  });
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const { user } = useContext(AuthContext);
  const [userData, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/list/${user.userId}`);
      setData(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch data");
    }
  };

  const getSongData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      const songs = response.data.data;
      setSongsData(songs);
      if (songs.length > 0) setTrack(songs[0]);
    } catch (error) {
      console.error("Failed to fetch songs:", error.message);
    }
  };

  const getAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch albums:", error.message);
    }
  };

  const getArtistData = async () => {
    try {
      const response = await axios.get(`${url}/api/artist/list`);
      setArtistsData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch artists:", error.message);
    }
  };

  const getAlbumById = useCallback(async (id) => {
    try {
      const response = await axios.get(`${url}/api/album/list/${id}`);
      setAlbum(response.data.data);
    } catch (error) {
      console.error("Failed to fetch album:", error.message);
    }
  }, []);

  const getArtistById = useCallback(async (id) => {
    try {
      const response = await axios.get(`${url}/api/artist/list/${id}`);
      setArtist(response.data.data);
    } catch (error) {
      console.error("Failed to fetch artist:", error.message);
    }
  }, []);

  const getSearchData = async (query) => {
    try {
      const response = await axios.get(`${url}/api/user/search?q=${query}`);
      setSearchResults({
        artists: response.data.artists || [],
        songs: response.data.songs || [],
        albums: response.data.albums || [],
      });
    } catch (error) {
      console.error("Failed to fetch search data:", error.message);
    }
  };

  const getRecentlyPlayed = async () => {
    try {
      const response = await axios.get(`${url}/api/stream/recent`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setRecentlyPlayed(response.data.data);
    } catch (error) {
      console.error("Failed to fetch recently played songs:", error.message);
    }
  };

  const getPlaylist = async () => {
    try {
      const response = await axios.get(`${url}/api/playlist/list`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setPlaylist(response.data.data);
    } catch (error) {
      console.error("Failed to fetch playlist:", error.message);
    }
  };

  const getLikedSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/user/like/song/list`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setLikedSongsData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch liked songs:", error.message);
    }
  };

  const getLikedAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/user/like/album/list`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setLikedAlbumsData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch liked albums:", error.message);
    }
  };

  const getFollowedArtists = async () => {
    try {
      const response = await axios.get(`${url}/api/user/follow/list`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setFollowedArtistsData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch followed artists:", error.message);
    }
  };

  const getRecommended = async () => {
    try {
      const response = await axios.get(`${url}/api/user/recommendations`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setRecommendedData(response.data.formattedSongs);
    } catch (error) {
      console.error("Failed to fetch recommended:", error.message);
    }
  };

  const changeVolume = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
    }
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !audioRef.current.muted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const playWithId = async (id, playlist = []) => {
    const selectedTrack = songsData.find((item) => item.id === id);
    if (!selectedTrack) return;

    setTrack(selectedTrack);
    setCurrentPlaylist(playlist.length ? playlist : songsData);
    setPlayStatus(true);

    try {
      await axios.post(`${url}/api/song/increment/${id}`);
      if (user) {
        await axios.post(
          `${url}/api/stream/create`,
          { songId: id },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      }
      getRecentlyPlayed();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to increment view count."
      );
    }
  };

  const previous = () => {
    const list = currentPlaylist.length ? currentPlaylist : songsData;
    const currentIndex = list.findIndex((item) => item.id === track?.id);
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    playWithId(list[prevIndex].id, list);
  };

  const next = () => {
    const list = currentPlaylist.length ? currentPlaylist : songsData;
    const currentIndex = list.findIndex((item) => item.id === track?.id);

    if (isShuffling) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * list.length);
      } while (nextIndex === currentIndex && list.length > 1);
      playWithId(list[nextIndex].id, list);
    } else {
      const nextIndex = (currentIndex + 1) % list.length;
      playWithId(list[nextIndex].id, list);
    }
  };

  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;
    const rect = seekBg.current.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
    if (!playStatus) setPlayStatus(true);
  };

  const likeSong = async (songId) => {
    try {
      const res = await axios.post(
        `${url}/api/user/like/song`,
        { songId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success(res.data.message || "Song liked successfully!");
      await fetchData();
      getLikedSongs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error liking song.");
    }
  };

  const likeAlbum = async (albumId) => {
    try {
      const res = await axios.post(
        `${url}/api/user/like/album`,
        { albumId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success(res.data.message || "Album liked successfully!");
      await fetchData();
      getLikedAlbums();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error liking album.");
    }
  };

  const followArtist = async (artistId) => {
    try {
      const res = await axios.post(
        `${url}/api/artist/${artistId}/follow`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success(res.data.message || "Artist followed successfully!");
      await fetchData();
      getFollowedArtists();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error following artist.");
    }
  };

  const toggleLoop = () =>
    setIsLooping((prev) => (prev ? false : (setIsShuffling(false), true)));
  const toggleShuffle = () =>
    setIsShuffling((prev) => (prev ? false : (setIsLooping(false), true)));

  useEffect(() => {
    getSongData();
    getAlbumData();
    getArtistData();
    if (user) {
      getPlaylist();
      getRecentlyPlayed();
      getLikedSongs();
      getLikedAlbums();
      fetchData();
      getRecommended();
    }
  }, [user]);

  // Fixed: Only set audio source when track changes, not on every render
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    // Only change source if it's different from current track
    if (audio.src !== track.audio) {
      audio.src = track.audio;
      audio.load(); // Ensure the new source is loaded
    }

    const handleCanPlay = () => {
      if (playStatus) {
        audio.play().catch(console.error);
      }
    };

    const handleLoadedData = () => {
      if (playStatus) {
        audio.play().catch(console.error);
      }
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadeddata", handleLoadedData);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [track?.id]); // Changed dependency to track.id instead of track

  // Fixed: Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playStatus) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [playStatus]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const cur = audio.currentTime;
      const dur = audio.duration || 0;

      if (seekBar.current) {
        seekBar.current.style.width = `${Math.floor((cur / dur) * 100) || 0}%`;
      }

      setTime({
        currentTime: {
          minute: Math.floor(cur / 60),
          second: Math.floor(cur % 60),
        },
        totalTime: {
          minute: Math.floor(dur / 60),
          second: Math.floor(dur % 60),
        },
      });
    };

    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        next();
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [track, isLooping, isShuffling]);

  return (
    <PlayerContext.Provider
      value={{
        url,
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData,
        artistsData,
        likedSongsData,
        likedAlbumsData,
        followedArtistsData,
        reccomendedData,
        getArtistById,
        getAlbumById,
        getLikedSongs,
        getLikedAlbums,
        getFollowedArtists,
        getRecommended,
        album,
        artist,
        recentlyPlayed,
        volume,
        changeVolume,
        isLooping,
        isShuffling,
        toggleLoop,
        toggleShuffle,
        isMuted,
        toggleMute,
        likeSong,
        likeAlbum,
        followArtist,
        userData,
        isSidebarOpen,
        setIsSidebarOpen,
        searchQuery,
        setSearchQuery,
        searchResults,
        playlist,
        getPlaylist,
        currentPlaylist,
        getSearchData,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
