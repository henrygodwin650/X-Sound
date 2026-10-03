import { motion } from "framer-motion";
import React from "react";
import {
  FiCheckCircle,
  FiClock,
  FiDisc,
  FiPauseCircle,
  FiPlayCircle,
} from "react-icons/fi";

const SongInfo = ({ song, isPlaying = false }) => {
  if (!song) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        min-w-0
        w-full
        max-w-full
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/10
        p-5
        shadow-[0_20px_60px_rgba(0,0,0,.35)]
        backdrop-blur-3xl
        sm:rounded-3xl
        sm:p-6
        lg:p-8
      "
    >
      {/* Status */}
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <div
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
            isPlaying
              ? "animate-pulse bg-green-500"
              : "bg-gray-500"
          }`}
        />

        <p
          className={`min-w-0 truncate text-xs uppercase tracking-[2px] sm:text-sm sm:tracking-[4px] ${
            isPlaying
              ? "text-green-400"
              : "text-gray-400"
          }`}
        >
          {isPlaying ? "Now Playing" : "Paused"}
        </p>
      </div>

      {/* Song title */}
      <h1
        className="
          mt-5
          w-full
          max-w-full
          break-words
          [overflow-wrap:anywhere]
          text-2xl
          font-black
          leading-tight
          text-white
          sm:mt-6
          sm:text-3xl
          lg:text-4xl
        "
        title={song.title}
      >
        {song.title || "Unknown Song"}
      </h1>

      {/* Artist */}
      <div className="mt-3 flex min-w-0 max-w-full items-center gap-2 sm:mt-4 sm:gap-3">
        <h2
          className="
            min-w-0
            flex-1
            truncate
            text-base
            font-semibold
            text-white
            sm:text-xl
          "
          title={song.artist}
        >
          {song.artist || "Unknown Artist"}
        </h2>

        <FiCheckCircle
          className="shrink-0 text-blue-500"
          title="Artist"
        />
      </div>

      {/* Album */}
      {song.album && (
        <div className="mt-6 flex min-w-0 max-w-full items-center gap-3 text-sm text-gray-300 sm:mt-8">
          <FiDisc className="shrink-0" />

          <span
            className="min-w-0 truncate"
            title={song.album}
          >
            Album:
            <strong className="ml-2 text-white">
              {song.album}
            </strong>
          </span>
        </div>
      )}

      {/* Details */}
      <div className="mt-6 grid min-w-0 grid-cols-2 gap-5 sm:mt-8 sm:gap-6 md:grid-cols-3">
        {/* Genre */}
        <div className="min-w-0">
          <p className="text-xs text-gray-400 sm:text-sm">
            Genre
          </p>

          <h3
            className="mt-1 truncate text-sm text-white sm:mt-2"
            title={song.genre || "Music"}
          >
            {song.genre || "Music"}
          </h3>
        </div>

        {/* Source */}
        <div className="min-w-0">
          <p className="text-xs text-gray-400 sm:text-sm">
            Source
          </p>

          <h3
            className="mt-1 truncate text-sm text-green-400 sm:mt-2"
            title={song.source || "Jamendo"}
          >
            {song.source || "Jamendo"}
          </h3>
        </div>

        {/* Duration */}
        <div className="min-w-0">
          <p className="text-xs text-gray-400 sm:text-sm">
            Duration
          </p>

          <h3 className="mt-1 flex items-center gap-2 text-sm text-white sm:mt-2">
            <FiClock className="shrink-0" />

            <span className="truncate">
              {song.duration || "0:00"}
            </span>
          </h3>
        </div>
      </div>

      {/* Playback status */}
      <div className="mt-6 flex min-w-0 items-center gap-3 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
        {isPlaying ? (
          <>
            <FiPlayCircle className="shrink-0 text-green-400" />

            <span className="min-w-0 truncate text-xs text-gray-300 sm:text-sm">
              Streaming from Jamendo
            </span>
          </>
        ) : (
          <>
            <FiPauseCircle className="shrink-0 text-gray-400" />

            <span className="min-w-0 truncate text-xs text-gray-400 sm:text-sm">
              Playback paused
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SongInfo;
