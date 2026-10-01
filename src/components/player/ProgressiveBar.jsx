import { motion } from "framer-motion";
import React from "react";
import useMusic from "../../Hooks/useMusic";

const ProgressiveBar = () => {
  const {
    currentTime,
    duration,
    isPlaying,
    currentSong,
    seek,
  } = useMusic();

  const safeDuration =
    Number.isFinite(Number(duration)) && Number(duration) > 0
      ? Number(duration)
      : 0;

  const safeCurrentTime =
    Number.isFinite(Number(currentTime)) && Number(currentTime) >= 0
      ? Number(currentTime)
      : 0;

  const progress =
    safeDuration > 0
      ? Math.min(
          Math.max(
            (safeCurrentTime / safeDuration) * 100,
            0
          ),
          100
        )
      : 0;

  const formatTime = (seconds = 0) => {
    const value = Number(seconds);

    if (!Number.isFinite(value) || value < 0) {
      return "0:00";
    }

    const mins = Math.floor(value / 60);
    const secs = Math.floor(value % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    if (!currentSong || safeDuration <= 0) {
      return;
    }

    const value = Number(e.target.value);

    if (!Number.isFinite(value)) {
      return;
    }

    const newTime = (value / 100) * safeDuration;

    seek(newTime);
  };

  const hasSong = Boolean(currentSong);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-3xl sm:rounded-3xl sm:p-6">
      {/* Time */}
      <div className="mb-3 flex items-center justify-between gap-4 text-xs text-gray-400 sm:text-sm">
        <span>{formatTime(safeCurrentTime)}</span>

        <span>{formatTime(safeDuration)}</span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={progress}
        onChange={handleSeek}
        disabled={!hasSong || safeDuration <= 0}
        aria-label="Song progress"
        className="h-2 w-full cursor-pointer accent-green-500 disabled:cursor-not-allowed disabled:opacity-40"
      />

      {/* Progress bar */}
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10 sm:h-2">
        <motion.div
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.2,
            ease: "linear",
          }}
          className="h-full rounded-full bg-linear-to-r from-green-400 to-emerald-500"
        />
      </div>

      {/* Playback status */}
      <div className="mt-4 flex items-center justify-center sm:mt-5">
        <div className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              isPlaying
                ? "animate-pulse bg-green-500"
                : "bg-gray-500"
            }`}
          />

          <span
            className={`text-xs sm:text-sm ${
              isPlaying
                ? "text-green-400"
                : "text-gray-400"
            }`}
          >
            {!currentSong
              ? "No song selected"
              : isPlaying
                ? "Playing"
                : "Paused"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressiveBar;