import React from "react";
import {
  FiHeart,
  FiMoreVertical,
  FiMusic,
  FiPlay,
  FiPause,
  FiTrash2,
} from "react-icons/fi";
import { motion } from "framer-motion";

import { formatTime } from "./ImportMusicButton";
import { useLocalMusic } from "../../../Hooks/useLocalMusic";
import useMusic from "../../../Hooks/useMusic";

const LocalSongCard = ({ song, songs }) => {
  // Local music library actions
  const { removeSong } = useLocalMusic();

  // Global music player
  const {
    playSong,
    togglePlay,
    isPlaying,
    currentSong,
  } = useMusic();

  const fileType =
    song.type?.split("/")?.[1]?.toUpperCase() || "AUDIO";

  const fileSize = song.size
    ? `${(song.size / (1024 * 1024)).toFixed(2)} MB`
    : "";

  // Check if this exact song is currently loaded
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    // If this song is already the current song,
    // pause/resume it instead of loading it again.
    if (isCurrentSong) {
      togglePlay();
      return;
    }

    // Otherwise load and play this song
    playSong(song, songs);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="
        group
        flex flex-col gap-4
        rounded-2xl
        border border-white/10
        bg-white/10
        p-3
        backdrop-blur-3xl
        transition
        hover:border-green-500/50
        sm:rounded-3xl sm:p-4
        md:flex-row md:items-center md:justify-between
      "
    >
      {/* Song information */}
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        {/* Cover */}
        <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
          {song.cover ? (
            <img
              src={song.cover}
              alt={song.title || "Song cover"}
              className="
                h-full w-full
                rounded-xl
                object-cover
                sm:rounded-2xl
              "
            />
          ) : (
            <div
              className="
                flex h-full w-full
                items-center justify-center
                rounded-xl
                bg-linear-to-br
                from-green-500
                to-emerald-700
                sm:rounded-2xl
              "
            >
              <FiMusic className="text-2xl text-white sm:text-3xl" />
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="min-w-0 flex-1">
          <h3
            className="
              truncate
              text-base font-bold text-white
              sm:text-lg
            "
            title={song.title}
          >
            {song.title || "Unknown Title"}
          </h3>

          <p className="truncate text-sm text-gray-400">
            {song.artist || "Unknown Artist"}
          </p>

          <p className="truncate text-xs text-gray-500 sm:text-sm">
            {song.album || "Unknown Album"}
          </p>

          {/* Genre + duration */}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="text-green-400">
              {song.genre || "Unknown"}
            </span>

            <span className="text-gray-500">
              {formatTime(song.duration)}
            </span>

            {song.year && (
              <span className="text-gray-500">
                {song.year}
              </span>
            )}
          </div>

          {/* File information */}
          <div
            className="
              mt-1
              flex flex-wrap
              items-center
              gap-2
              text-[11px]
              text-gray-500
              sm:text-xs
            "
          >
            <span>{fileType}</span>

            {fileSize && (
              <>
                <span>•</span>
                <span>{fileSize}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="
          flex
          w-full
          items-center
          justify-end
          gap-2
          border-t border-white/10
          pt-3
          md:w-auto
          md:border-t-0
          md:pt-0
        "
      >
        {/* Favorite */}
        <button
          type="button"
          aria-label="Favorite song"
          className="
            rounded-full
            bg-white/10
            p-2.5
            text-gray-300
            transition
            hover:bg-pink-500
            hover:text-white
            sm:p-3
          "
        >
          <FiHeart />
        </button>

        {/* Play / Pause */}
        <button
          type="button"
          onClick={handlePlay}
          aria-label={
            isCurrentSong && isPlaying
              ? `Pause ${song.title || "song"}`
              : `Play ${song.title || "song"}`
          }
          className="
            rounded-full
            bg-green-500
            p-2.5
            text-white
            shadow-lg
            shadow-green-500/20
            transition
            hover:scale-110
            hover:bg-green-400
            sm:p-3
          "
        >
          {isCurrentSong && isPlaying ? (
            <FiPause />
          ) : (
            <FiPlay />
          )}
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={() => removeSong(song.id)}
          aria-label={`Delete ${song.title || "song"}`}
          className="
            rounded-full
            bg-red-500/10
            p-2.5
            text-red-400
            transition
            hover:bg-red-500
            hover:text-white
            sm:p-3
          "
        >
          <FiTrash2 />
        </button>

        {/* More */}
        <button
          type="button"
          aria-label="More options"
          className="
            rounded-full
            bg-white/10
            p-2.5
            text-gray-300
            transition
            hover:bg-white/20
            sm:p-3
          "
        >
          <FiMoreVertical />
        </button>
      </div>
    </motion.div>
  );
};

export default LocalSongCard;