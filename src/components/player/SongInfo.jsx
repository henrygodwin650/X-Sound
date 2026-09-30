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
      className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-3xl"
    >
      {/* ================= STATUS ================= */}

      <div className="flex items-center gap-3">
        <div
          className={`h-3 w-3 rounded-full ${
            isPlaying
              ? "animate-pulse bg-green-500"
              : "bg-gray-500"
          }`}
        />

        <p
          className={`text-sm uppercase tracking-[4px] ${
            isPlaying
              ? "text-green-400"
              : "text-gray-400"
          }`}
        >
          {isPlaying ? "Now Playing" : "Paused"}
        </p>
      </div>

      {/* ================= SONG TITLE ================= */}

      <h1 className="mt-6 break-words text-4xl font-black text-white">
        {song.title || "Unknown Song"}
      </h1>

      {/* ================= ARTIST ================= */}

      <div className="mt-4 flex items-center gap-3">
        <h2 className="truncate text-xl font-semibold text-white">
          {song.artist || "Unknown Artist"}
        </h2>

        <FiCheckCircle
          className="shrink-0 text-blue-500"
          title="Artist"
        />
      </div>

      {/* ================= ALBUM ================= */}

      {song.album && (
        <div className="mt-8 flex items-center gap-3 text-gray-300">
          <FiDisc />

          <span>
            Album:
            <strong className="ml-2 text-white">
              {song.album}
            </strong>
          </span>
        </div>
      )}

      {/* ================= SONG DETAILS ================= */}

      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
        {/* Genre */}
        <div>
          <p className="text-sm text-gray-400">
            Genre
          </p>

          <h3 className="mt-2 truncate text-white">
            {song.genre || "Music"}
          </h3>
        </div>

        {/* Source */}
        <div>
          <p className="text-sm text-gray-400">
            Source
          </p>

          <h3 className="mt-2 text-green-400">
            {song.source || "Jamendo"}
          </h3>
        </div>

        {/* Duration */}
        <div>
          <p className="text-sm text-gray-400">
            Duration
          </p>

          <h3 className="mt-2 flex items-center gap-2 text-white">
            <FiClock />

            {song.duration || "0:00"}
          </h3>
        </div>
      </div>

      {/* ================= PLAYBACK STATUS ================= */}

      <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
        {isPlaying ? (
          <>
            <FiPlayCircle className="text-green-400" />

            <span className="text-sm text-gray-300">
              Streaming from Jamendo
            </span>
          </>
        ) : (
          <>
            <FiPauseCircle className="text-gray-400" />

            <span className="text-sm text-gray-400">
              Playback paused
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SongInfo;