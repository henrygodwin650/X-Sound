import React, { useState } from "react";
import {
  FaBackward,
  FaChevronDown,
  FaChevronUp,
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
    handleNext,
    handlePrevious,
    currentTime,
    duration,
  } = useMusic();

  const [hidePlayer, setHidePlayer] = useState(true);

  if (!currentSong) {
    return null;
  }

  const song = currentSong;

  const formatTime = (seconds = 0) => {
    const value = Number(seconds);

    if (!Number.isFinite(value) || value < 0) {
      return "0:00";
    }

    const mins = Math.floor(value / 60);
    const secs = Math.floor(value % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress =
    duration > 0
      ? Math.min((currentTime / duration) * 100, 100)
      : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 text-white shadow-2xl backdrop-blur-xl">
      {/* Progress bar */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-white/10">
        <div
          className="h-full bg-green-500 transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4">
        {/* MAIN PLAYER */}
        <div className="flex items-center justify-between gap-3">
          {/* SONG INFO */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Link
              to="/player"
              className="block shrink-0"
              aria-label="Open full player"
            >
              {song.cover ? (
                <img
                  src={song.cover}
                  alt={song.title}
                  className="h-12 w-12 rounded-xl object-cover sm:h-14 sm:w-14"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-lg font-bold text-white sm:h-14 sm:w-14">
                  {(song.title || "X").charAt(0).toUpperCase()}
                </div>
              )}
            </Link>

            <div className="min-w-0 flex-1">
              <Link to="/player">
                <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                  {song.title || "Unknown Song"}
                </h3>
              </Link>

              <p className="truncate text-xs text-gray-400 sm:text-sm">
                {song.artist || "Unknown Artist"}
              </p>
            </div>
          </div>

          {/* DESKTOP TIME */}
          <div className="hidden shrink-0 text-xs text-gray-400 lg:block">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          {/* CONTROLS */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous song"
              className="hidden text-gray-300 transition hover:text-green-400 sm:block"
            >
              <FaBackward size={17} />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause song" : "Play song"}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600 active:scale-95 sm:h-12 sm:w-12"
            >
              {isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay className="ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next song"
              className="hidden text-gray-300 transition hover:text-green-400 sm:block"
            >
              <FaForward size={17} />
            </button>

            {/* Expand / collapse */}
            <button
              type="button"
              onClick={() => setHidePlayer((prev) => !prev)}
              aria-label={
                hidePlayer
                  ? "Expand mini player"
                  : "Collapse mini player"
              }
              className="ml-1 text-gray-300 transition hover:text-green-400"
            >
              {hidePlayer ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>

        {/* EXPANDED DETAILS */}
        {!hidePlayer && (
          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Song details */}
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-green-400">
                  Now Playing
                </p>

                <p className="mt-1 truncate font-semibold text-white">
                  {song.title}
                </p>

                <p className="truncate text-sm text-gray-400">
                  {song.artist || "Unknown Artist"}
                </p>
              </div>

              {/* Mobile / expanded controls */}
              <div className="flex items-center justify-between gap-5 sm:justify-end">
                <button
                  type="button"
                  onClick={handlePrevious}
                  aria-label="Previous song"
                  className="text-gray-300 transition hover:text-green-400 sm:hidden"
                >
                  <FaBackward size={18} />
                </button>

                <div className="text-xs text-gray-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next song"
                  className="text-gray-300 transition hover:text-green-400 sm:hidden"
                >
                  <FaForward size={18} />
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-green-500 transition-[width] duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-1 flex justify-between text-[11px] text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniPlayer;