import { motion } from "framer-motion";
import { FiMusic, FiPlay } from "react-icons/fi";
import useMusic from "../../Hooks/useMusic";

const Queue = () => {
  const {
    queue,
    currentSong,
    playSong,
  } = useMusic();

  const handlePlaySong = (song) => {
    playSong(song, queue);
  };

  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-3xl sm:rounded-3xl sm:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Up next
        </h2>

        <span className="text-xs text-gray-400 sm:text-sm">
          {queue.length} {queue.length === 1 ? "Song" : "Songs"}
        </span>
      </div>

      {/* Queue */}
      {queue.length > 0 ? (
        <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1 sm:max-h-[550px] sm:space-y-3 sm:pr-2">
          {queue.map((song) => {
            const isCurrent = currentSong?.id === song.id;

            return (
              <motion.div
                key={song.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlaySong(song)}
                className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-2.5 transition sm:gap-4 sm:rounded-2xl sm:p-3 ${
                  isCurrent
                    ? "border-green-500/30 bg-green-500/20"
                    : "border-transparent hover:bg-white/10"
                }`}
              >
                {/* Cover */}
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-16 sm:rounded-xl">
                  {song.cover ? (
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/10">
                      <FiMusic className="text-xl text-gray-500 sm:text-2xl" />
                    </div>
                  )}

                  {!isCurrent && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                      <FiPlay className="text-white" />
                    </div>
                  )}
                </div>

                {/* Song information */}
                <div className="min-w-0 flex-1">
                  <h3
                    className={`truncate text-sm font-semibold sm:text-base ${
                      isCurrent
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  >
                    {song.title}
                  </h3>

                  <p className="truncate text-xs text-gray-400 sm:text-sm">
                    {song.artist}
                  </p>
                </div>

                {/* Current indicator */}
                {isCurrent && (
                  <div className="hidden shrink-0 items-center gap-1 sm:flex">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                    <span className="text-xs text-green-400">
                      Playing
                    </span>
                  </div>
                )}

                {/* Duration */}
                <span className="hidden shrink-0 text-xs text-gray-400 sm:block sm:text-sm">
                  {song.duration || "0:00"}
                </span>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-[250px] flex-col items-center justify-center text-center sm:min-h-[300px]">
          <FiMusic className="text-4xl text-gray-500 sm:text-5xl" />

          <p className="mt-4 text-sm text-gray-400">
            No songs in queue
          </p>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Play a song to build your queue
          </p>
        </div>
      )}
    </div>
  );
};

export default Queue;