import { motion } from "framer-motion";
import React from "react";
import {
  FiHeart,
  FiPause,
  FiPlay,
  FiRepeat,
  FiShuffle,
  FiSkipBack,
  FiSkipForward,
} from "react-icons/fi";
import useMusic from "../../Hooks/useMusic";

const PlayerControls = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    handleNext,
    handlePrevious,
    shuffle,
    toggleShuffle,
    repeat,
    toggleRepeat,
    toggleFavorite,
    isFavorite,
  } = useMusic();

  const liked = currentSong ? isFavorite(currentSong.id) : false;
  const disabled = !currentSong;

  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-8 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-3xl">
      <div className="flex items-center justify-center gap-3 sm:gap-5">

        {/* Favorite */}
        <motion.button
          type="button"
          whileHover={!disabled ? { scale: 1.1 } : {}}
          whileTap={!disabled ? { scale: 0.9 } : {}}
          disabled={disabled}
          onClick={() => toggleFavorite(currentSong)}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          title={liked ? "Remove from favorites" : "Add to favorites"}
          className={`shrink-0 rounded-full p-3 transition ${
            liked
              ? "bg-pink-500 text-white"
              : "bg-white/10 text-gray-400 hover:bg-pink-500 hover:text-white"
          } disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <FiHeart
            size={22}
            fill={liked ? "currentColor" : "none"}
          />
        </motion.button>

        {/* Shuffle */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleShuffle}
          aria-label={shuffle ? "Disable shuffle" : "Enable shuffle"}
          title={shuffle ? "Disable shuffle" : "Enable shuffle"}
          className={`shrink-0 rounded-full p-3 transition ${
            shuffle
              ? "bg-green-500 text-white"
              : "bg-white/10 text-gray-400 hover:bg-green-500 hover:text-white"
          }`}
        >
          <FiShuffle size={20} />
        </motion.button>

        {/* Previous */}
        <motion.button
          type="button"
          whileHover={!disabled ? { scale: 1.1 } : {}}
          whileTap={!disabled ? { scale: 0.9 } : {}}
          disabled={disabled}
          onClick={handlePrevious}
          aria-label="Previous song"
          title="Previous song"
          className="shrink-0 rounded-full bg-white/10 p-4 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiSkipBack size={24} />
        </motion.button>

        {/* Play / Pause */}
        <motion.button
          type="button"
          whileHover={!disabled ? { scale: 1.08 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          disabled={disabled}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause song" : "Play song"}
          title={isPlaying ? "Pause song" : "Play song"}
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-xl transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPlaying ? (
            <FiPause size={34} />
          ) : (
            <FiPlay size={34} className="ml-1" />
          )}
        </motion.button>

        {/* Next */}
        <motion.button
          type="button"
          whileHover={!disabled ? { scale: 1.08 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          disabled={disabled}
          onClick={handleNext}
          aria-label="Next song"
          title="Next song"
          className="shrink-0 rounded-full bg-white/10 p-4 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiSkipForward size={24} />
        </motion.button>

        {/* Repeat */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleRepeat}
          aria-label={
            repeat === "off"
              ? "Enable repeat all"
              : repeat === "all"
                ? "Enable repeat one"
                : "Disable repeat"
          }
          title={
            repeat === "off"
              ? "Repeat all"
              : repeat === "all"
                ? "Repeat one"
                : "Disable repeat"
          }
          className={`relative shrink-0 rounded-full p-3 transition ${
            repeat !== "off"
              ? "bg-green-500 text-white"
              : "bg-white/10 text-gray-400 hover:bg-green-500 hover:text-white"
          }`}
        >
          <FiRepeat size={20} />

          {repeat !== "off" && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-green-600">
              {repeat === "one" ? "1" : "∞"}
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default PlayerControls;