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
    <div className="h-full rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-3xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">
          Up next
        </h2>

        <span className="text-gray-400">
          {queue.length} Songs
        </span>
      </div>

      {/* Queue */}
      {queue.length > 0 ? (
        <div className="max-h-[550px] space-y-3 overflow-y-auto pr-2">
          {queue.map((song) => {
            const isCurrent = currentSong?.id === song.id;

            return (
              <motion.div
                key={song.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlaySong(song)}
                className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-3 transition ${
                  isCurrent
                    ? "border-green-500/30 bg-green-500/20"
                    : "border-transparent hover:bg-white/10"
                }`}
              >
                {/* Cover */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  {song.cover ? (
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/10">
                      <FiMusic className="text-2xl text-gray-500" />
                    </div>
                  )}

                  {/* Play overlay */}
                  {!isCurrent && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                      <FiPlay className="text-white" />
                    </div>
                  )}
                </div>

                {/* Song information */}
                <div className="min-w-0 flex-1">
                  <h3
                    className={`truncate font-semibold ${
                      isCurrent
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  >
                    {song.title}
                  </h3>

                  <p className="truncate text-sm text-gray-400">
                    {song.artist}
                  </p>
                </div>

                {/* Current song indicator */}
                {isCurrent && (
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    <span className="text-xs text-green-400">
                      Playing
                    </span>
                  </div>
                )}

                {/* Duration */}
                <span className="shrink-0 text-sm text-gray-400">
                  {song.duration || "0:00"}
                </span>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty queue */
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <FiMusic className="text-5xl text-gray-500" />

          <p className="mt-4 text-gray-400">
            No songs in queue
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Play a song to build your queue
          </p>
        </div>
      )}
    </div>
  );
};

export default Queue;