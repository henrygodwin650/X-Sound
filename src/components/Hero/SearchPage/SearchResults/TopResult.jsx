import { motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa6";
import useMusic from "../../../../Hooks/useMusic";

const TopResult = ({ music }) => {
  const { playSong, pauseSong, isPlaying, currentSong } = useMusic();

  if (!music) return null;

  const handlePlay = () => {
    if (currentSong?.id === music.id && isPlaying) {
      pauseSong();
    } else {
      playSong(music, [music]);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-3xl"
    >
      <h2 className="mb-5 text-xl font-bold text-white">
        Top Result
      </h2>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <img
          src={music.cover}
          alt={music.title}
          className="h-36 w-36 rounded-2xl object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold text-white">
            {music.title}
          </h1>

          <p className="mt-2 text-gray-400">
            {music.artist}
          </p>

          {music.album && (
            <p className="mt-1 text-sm text-gray-500">
              {music.album}
            </p>
          )}

          <button
            type="button"
            onClick={handlePlay}
            className="mt-6 flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-400">
            {currentSong?.id === music.id && isPlaying ? (
              <FaPause />
            ) : (
              <FaPlay className="ml-1" />
            )}
            <span>
              {currentSong?.id === music.id && isPlaying ? "Pause" : "Play"}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TopResult;