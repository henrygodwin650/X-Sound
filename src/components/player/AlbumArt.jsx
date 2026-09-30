import { motion } from "framer-motion";
import React from "react";
import { FiHeart, FiShare2 } from "react-icons/fi";
import useMusic from "../../Hooks/useMusic";

const AlbumArt = ({ song, isPlaying: propIsPlaying }) => {
  const {
    currentSong,
    isPlaying: contextIsPlaying,
    toggleFavorite,
    isFavorite,
  } = useMusic();

  // Determine which song should be displayed FIRST.
  const activeSong = song || currentSong;

  // Determine playing state.
  const isPlaying = propIsPlaying ?? contextIsPlaying;

  // No song available.
  if (!activeSong) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center text-gray-700 backdrop-blur-3xl">
        No song selected
      </div>
    );
  }

  // Jamendo normalized songs use "cover".
  const image = activeSong.cover || "";

  // Check the global favorites state.
  const favorite = isFavorite(activeSong.id);

  const handleFavorite = () => {
    toggleFavorite(activeSong);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: activeSong.title,
          text: `Listen to ${activeSong.title} by ${activeSong.artist}`,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Song page link copied!");
      }
    } catch (error) {
      // User cancelled the share dialog.
      console.log("Share cancelled:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-black/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-3xl"
    >
      {/* Album Cover */}
      <div className="relative overflow-hidden">
        {image ? (
          <motion.img
            animate={
              isPlaying
                ? { rotate: 360 }
                : { rotate: 0 }
            }
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: 18,
              ease: "linear",
            }}
            src={image}
            alt={activeSong.title}
            className="aspect-square w-full rounded-full object-cover shadow-2xl"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-full bg-white/10 text-gray-500">
            No artwork
          </div>
        )}

        {/* Center of record */}
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gray-700 bg-black" />
      </div>

      {/* Song information */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-white">
          {activeSong.title}
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          {activeSong.artist}
        </p>

        {activeSong.album && (
          <p className="mt-1 text-xs text-gray-500">
            {activeSong.album}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center gap-4">
        {/* Favorite */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavorite}
          className={`rounded-full p-4 text-white transition ${
            favorite
              ? "bg-pink-500"
              : "bg-white/10 hover:bg-pink-500"
          }`}
        >
          <FiHeart
            size={20}
            fill={favorite ? "currentColor" : "none"}
          />
        </motion.button>

        {/* Share */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="rounded-full bg-white/10 p-4 text-white transition hover:bg-green-500"
        >
          <FiShare2 size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AlbumArt;