import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedoAlt,
  FaHeart,
  FaVolumeUp,
  FaVolumeMute,
  FaDownload,
} from "react-icons/fa";
import { PlayerContext } from "../Context/PlayerContext";
import { saveAs } from "file-saver";

const Player = () => {
  const {
    playStatus,
    play,
    pause,
    track,
    time,
    previous,
    next,
    seekSong,
    volume,
    changeVolume,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
    isMuted,
    toggleMute,
    audioRef,
    likeSong,
    userData,
    seekBg,
    seekBar,
    getLikedSongs,
    likedSongsData,
  } = useContext(PlayerContext);

  const [showShortcut, setShowShortcut] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const timeoutRef = useRef(null);

  const formatTime = (m, s) =>
    `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

  const triggerIndicator = (label) => {
    setShowShortcut(label);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowShortcut(""), 1200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      switch (e.code) {
        case "Space":
          e.preventDefault();
          playStatus ? pause() : play();
          triggerIndicator(playStatus ? "Pause" : "Play");
          break;
        case "ArrowUp":
          e.preventDefault();
          changeVolume(Math.min(Math.round((volume + 0.1) * 100) / 100, 1));
          triggerIndicator("Volume Up");
          break;
        case "ArrowDown":
          e.preventDefault();
          changeVolume(Math.max(Math.round((volume - 0.1) * 100) / 100, 0));
          triggerIndicator("Volume Down");
          break;
        case "ArrowRight":
          e.preventDefault();
          if (audioRef.current) audioRef.current.currentTime += 5;
          triggerIndicator("+5s");
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (audioRef.current) audioRef.current.currentTime -= 5;
          triggerIndicator("-5s");
          break;
        case "KeyM":
          e.preventDefault();
          toggleMute();
          triggerIndicator(!isMuted ? "Muted" : "Unmuted");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playStatus, volume, isMuted]);

  useEffect(() => {
    setIsLiked(likedSongsData?.some((song) => song.id === track?.id));
  }, [likedSongsData, track]);

  if (!track) return null;

  const handleDownload = async () => {
    if (track?.audio) {
      try {
        const response = await fetch(track.audio, {
          mode: "cors",
        });
        const blob = await response.blob();
        saveAs(blob, `${track.name}.mp3`);
        triggerIndicator("Download started");
      } catch (err) {
        console.error("Download failed:", err);
        triggerIndicator("Download failed");
      }
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white border-t border-gray-800">
      {showShortcut && (
        <div className="absolute top-[-45px] left-1/2 transform -translate-x-1/2 bg-purple-600 px-5 py-1.5 rounded-full text-sm font-medium animate-fade-in-out z-50 shadow-lg">
          {showShortcut}
        </div>
      )}

      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        {/* Left - Song Info */}
        <div className="flex items-center gap-4 overflow-hidden">
          <img
            src={track.image}
            alt={track.name}
            className="w-14 h-14 rounded-lg object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col overflow-hidden">
            <h3 className="text-base font-bold truncate hover:text-purple-400 transition-colors">
              {track.name}
            </h3>
            <p className="text-sm text-gray-400 truncate">{track.desc}</p>
          </div>
          {userData && (
            <button
              onClick={() => {
                likeSong(track.id);
                setIsLiked(!isLiked);
                triggerIndicator(
                  isLiked ? "Removed from Liked" : "Added to Liked"
                );
                getLikedSongs();
              }}
              className="ml-3 text-red-500 hover:scale-110 transition-transform cursor-pointer"
              title="Like"
            >
              <FaHeart
                className={`w-5 h-5 ${
                  isLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"
                }`}
              />
            </button>
          )}
        </div>

        {/* Center - Controls */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-4 sm:gap-6 items-center">
            <button
              onClick={() => {
                toggleShuffle();
                triggerIndicator(isShuffling ? "Shuffle Off" : "Shuffle On");
              }}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isShuffling
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:bg-white/10"
              }`}
              title={isShuffling ? "Shuffle Off" : "Shuffle On"}
            >
              <FaRandom />
            </button>
            <button
              onClick={previous}
              className="p-2 rounded-full text-gray-400 hover:bg-white/10 cursor-pointer"
              title="Previous"
            >
              <FaStepBackward />
            </button>
            <button
              onClick={playStatus ? pause : play}
              className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-110 transition-transform cursor-pointer"
              title={playStatus ? "Pause" : "Play"}
            >
              {playStatus ? <FaPause /> : <FaPlay className="ml-1" />}
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full text-gray-400 hover:bg-white/10 cursor-pointer"
              title="Next"
            >
              <FaStepForward />
            </button>
            <button
              onClick={() => {
                toggleLoop();
                triggerIndicator(isLooping ? "Loop Off" : "Loop On");
              }}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isLooping
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:bg-white/10"
              }`}
              title={isLooping ? "Loop Off" : "Loop On"}
            >
              <FaRedoAlt />
            </button>
          </div>

          {/* Seek Bar */}
          <div className="flex items-center gap-3 w-full max-w-md">
            <span className="text-xs text-gray-400 w-10 text-right font-mono">
              {formatTime(time.currentTime.minute, time.currentTime.second)}
            </span>
            <div
              className="flex-1 cursor-pointer group"
              ref={seekBg}
              onClick={seekSong}
            >
              <div className="relative h-1 bg-gray-600 rounded-full overflow-hidden">
                <div
                  ref={seekBar}
                  className="absolute h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <span className="text-xs text-gray-400 w-10 text-left font-mono">
              {formatTime(time.totalTime.minute, time.totalTime.second)}
            </span>
          </div>
        </div>

        {/* Right - Volume & Download */}
        <div className="flex justify-center sm:justify-end items-center gap-5">
          <button
            onClick={handleDownload}
            title="Download"
            className="p-2 text-gray-400 hover:text-white hover:scale-110 transition-transform cursor-pointer"
          >
            <FaDownload />
          </button>

          <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full">
            <button
              onClick={() => {
                toggleMute();
                triggerIndicator(isMuted ? "Unmuted" : "Muted");
              }}
              className="text-gray-300 hover:text-white transition cursor-pointer"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-24 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
                  (isMuted ? 0 : volume) * 100
                }%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
