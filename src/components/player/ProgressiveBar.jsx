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
    Number.isFinite(duration) && duration > 0
      ? duration
      : 0;

  const safeCurrentTime =
    Number.isFinite(currentTime) && currentTime >= 0
      ? currentTime
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
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "0:00";
    }

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    if (!currentSong || safeDuration <= 0) {
      return;
    }

    const value = Number(e.target.value);

    if (!Number.isFinite(value)) {
      return;
    }

    const newTime =
      (value / 100) * safeDuration;

    seek(newTime);
  };

  const hasSong = Boolean(currentSong);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-3xl">
      {/* ================= TIME ================= */}

      <div className="mb-3 flex justify-between text-sm text-gray-400">
        <span>{formatTime(safeCurrentTime)}</span>

        <span>{formatTime(safeDuration)}</span>
      </div>

      {/* ================= PROGRESS SLIDER ================= */}

      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={progress}
        onChange={handleSeek}
        disabled={!hasSong || safeDuration <= 0}
        aria-label="Song progress"
        className="
          w-full
          cursor-pointer
          accent-green-500
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      />

      {/* ================= PROGRESS BAR ================= */}

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
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

      {/* ================= PLAYBACK STATUS ================= */}

      <div className="mt-5 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${isPlaying
                ? "animate-pulse bg-green-500"
                : "bg-gray-500"
              }`}
          />

          <span
            className={`text-sm ${isPlaying
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