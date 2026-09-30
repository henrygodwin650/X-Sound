import React, { useState } from "react";
import {
  FaBackward,
  FaChevronDown,
  FaForward,
  FaPause,
  FaPlay,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import useMusic from "../../Hooks/useMusic";

const MiniPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
    previousSong,
    currentTime,
    duration,
  } = useMusic();

  const [hidePlayer, setHidePlayer] = useState(true);

  const song = currentSong || {
    id: "empty",
    title: "No song playing",
    artist: "XSound",
    cover: "",
  };

  const cover = song.cover || "";

  const formatTime = (seconds = 0) => {
    if (!seconds || Number.isNaN(Number(seconds))) {
      return "0:00";
    }

    const mins = Math.floor(Number(seconds) / 60);
    const secs = Math.floor(Number(seconds) % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Don't render the full player before a song has been selected.
  if (!currentSong) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/80 backdrop-blur-xl">
      {hidePlayer ? (
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4">
          {/* SONG INFO */}
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/player"
              className="shrink-0"
            >
              {cover ? (
                <img
                  src={cover}
                  alt={song.title}
                  className="h-14 w-14 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-500 text-xl font-bold text-white">
                  {(song.title || "X").charAt(0).toUpperCase()}
                </div>
              )}
            </Link>

            <div className="min-w-0">
              <h3 className="truncate font-semibold text-white">
                {song.title}
              </h3>

              <div className="flex min-w-0 items-center gap-4">
                <p className="truncate text-sm text-gray-400">
                  {song.artist || "Unknown Artist"}
                </p>

                <button
                  type="button"
                  aria-label="Expand mini player"
                  onClick={() => setHidePlayer(false)}
                  className="shrink-0 text-xs text-white transition hover:text-green-400 dark:text-green-500"
                >
                  <FaChevronDown />
                </button>
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex shrink-0 items-center gap-5">
            <button
              type="button"
              onClick={previousSong}
              aria-label="Previous song"
              className="text-white transition hover:text-green-400"
            >
              <FaBackward size={18} />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause song" : "Play song"}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600"
            >
              {isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay className="ml-1" />
              )}
            </button>

            <button
              type="button"
              onClick={nextSong}
              aria-label="Next song"
              className="text-white transition hover:text-green-400"
            >
              <FaForward size={18} />
            </button>
          </div>

          {/* DURATION */}
          <div className="hidden shrink-0 text-sm text-gray-400 md:block">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setHidePlayer(true)}
          aria-label="Collapse mini player"
          className="fixed bottom-0 left-1/2 z-50 -translate-x-1/2 rounded-t-lg bg-black/90 px-5 py-2 text-2xl text-gray-400 shadow-lg transition hover:text-green-400 dark:text-white"
        >
          <FaChevronDown />
        </button>
      )}
    </div>
  );
};

export default MiniPlayer;