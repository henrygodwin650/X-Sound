import { motion } from "framer-motion";
import { FiHeart, FiShare2 } from "react-icons/fi";
import useMusic from "../../Hooks/useMusic";

const AlbumArt = ({ song, isPlaying: propIsPlaying }) => {
  const {
    currentSong,
    isPlaying: contextIsPlaying,
    toggleFavorite,
    isFavorite,
  } = useMusic();

  const activeSong = song || currentSong;
  const isPlaying = propIsPlaying ?? contextIsPlaying;

  if (!activeSong) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 text-center text-gray-400 backdrop-blur-3xl sm:rounded-3xl">
        No song selected
      </div>
    );
  }

  const image = activeSong.cover || "";
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
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Song page link copied!");
      }
    } catch (error) {
      console.log("Share cancelled:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-black/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-3xl sm:rounded-3xl sm:p-6"
    >
      {/* Album Cover */}
      <div className="mx-auto w-full max-w-[280px] sm:max-w-[360px] lg:max-w-none">
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
            <div className="flex aspect-square w-full items-center justify-center rounded-full bg-white/10 text-sm text-gray-500">
              No artwork
            </div>
          )}

          {/* Record center */}
          <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gray-700 bg-black sm:h-10 sm:w-10" />
        </div>
      </div>

      {/* Song information */}
      <div className="mt-5 text-center sm:mt-6">
        <h2 className="truncate text-xl font-bold text-white sm:text-2xl">
          {activeSong.title}
        </h2>

        <p className="mt-1 truncate text-sm text-gray-400">
          {activeSong.artist}
        </p>

        {activeSong.album && (
          <p className="mt-1 truncate text-xs text-gray-500">
            {activeSong.album}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-center gap-3 sm:mt-8 sm:gap-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavorite}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          className={`rounded-full p-3.5 text-white transition sm:p-4 ${
            favorite
              ? "bg-pink-500"
              : "bg-white/10 hover:bg-pink-500"
          }`}
        >
          <FiHeart
            size={19}
            fill={favorite ? "currentColor" : "none"}
          />
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          aria-label="Share song"
          className="rounded-full bg-white/10 p-3.5 text-white transition hover:bg-green-500 sm:p-4"
        >
          <FiShare2 size={19} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AlbumArt;