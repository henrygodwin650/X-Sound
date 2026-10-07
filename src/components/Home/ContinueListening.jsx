import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";

import { useHomeMusic } from "../../Hooks/useHomeMusic";
import useMusic from "../../Hooks/useMusic";

const ContinueListening = () => {
  const { recent, loading } = useHomeMusic();

  const {
    playSong,
    togglePlay,
    isPlaying,
    currentSong,
  } = useMusic();

  if (loading) {
    return (
      <section className="mt-12 py-10 text-center text-gray-400 sm:mt-16">
        Loading your music...
      </section>
    );
  }

  if (!recent.length) {
    return (
      <section className="mt-12 py-10 text-center sm:mt-16">
        <h2 className="text-2xl font-black text-white sm:text-3xl">
          Continue Listening
        </h2>

        <p className="mt-2 text-sm text-gray-400 sm:text-base">
          Start playing music and your recent songs will appear here.
        </p>
      </section>
    );
  }

  const handlePlay = (song) => {
    const isCurrentSong = currentSong?.id === song.id;

    if (isCurrentSong) {
      togglePlay();
      return;
    }

    playSong(song, recent);
  };

  return (
    <section className="mt-12 sm:mt-16">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
        <div>
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Continue Listening
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Pick up where you left off
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 text-sm font-semibold text-green-400 transition hover:text-green-300 cursor-pointer sm:text-base"
        >
          View All
        </button>
      </div>

      {/* Songs */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {recent.slice(0, 4).map((song) => {
          const isCurrentSong = currentSong?.id === song.id;
          const isCurrentPlaying = isCurrentSong && isPlaying;

          return (
            <motion.div
              key={song.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`group flex min-w-0 gap-3 rounded-2xl border p-3 shadow-[0_15px_40px_rgba(0,0,0,.25)] backdrop-blur-3xl transition sm:gap-5 sm:rounded-3xl sm:p-5 ${
                isCurrentSong
                  ? "border-green-500/40 bg-green-500/10"
                  : "border-white/10 bg-white/10 hover:border-green-500/20"
              }`}
            >
              {/* Artwork */}
              <div className="relative h-20 w-20 shrink-0 sm:h-28 sm:w-28">
                {song.cover ? (
                  <img
                    src={song.cover}
                    alt={song.title}
                    loading="lazy"
                    className="h-full w-full rounded-xl object-cover sm:rounded-2xl"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-green-500/20 text-2xl font-black text-green-400 sm:rounded-2xl sm:text-3xl">
                    {song.title?.charAt(0)?.toUpperCase() || "X"}
                  </div>
                )}

                {/* Playing indicator */}
                {isCurrentPlaying && (
                  <div className="absolute bottom-2 left-2 flex items-end gap-0.5 rounded-md bg-black/70 px-2 py-1">
                    <span className="h-2 w-1 animate-pulse rounded-full bg-green-400" />
                    <span className="h-4 w-1 animate-pulse rounded-full bg-green-400 [animation-delay:150ms]" />
                    <span className="h-3 w-1 animate-pulse rounded-full bg-green-400 [animation-delay:300ms]" />
                  </div>
                )}
              </div>

              {/* Song information */}
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h3 className="truncate text-base font-bold text-white sm:text-xl">
                  {song.title}
                </h3>

                <p className="mt-1 truncate text-sm text-gray-400">
                  {song.artist || "Unknown Artist"}
                </p>

                {/* Progress */}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10 sm:mt-4 sm:h-2">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isCurrentSong
                        ? "w-1/3 bg-green-500"
                        : "w-0 bg-green-500"
                    }`}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-gray-500 sm:mt-3 sm:text-sm">
                  <span className="truncate">
                    {isCurrentPlaying
                      ? "Now playing"
                      : isCurrentSong
                        ? "Paused"
                        : "Ready to play"}
                  </span>

                  <span className="shrink-0">
                    {song.duration || "0:00"}
                  </span>
                </div>
              </div>

              {/* Play / Pause */}
              <button
                type="button"
                onClick={() => handlePlay(song)}
                aria-label={
                  isCurrentPlaying
                    ? `Pause ${song.title}`
                    : `Play ${song.title}`
                }
                className={`flex h-11 w-11 shrink-0 self-center items-center justify-center rounded-full transition sm:h-12 sm:w-12 ${
                  isCurrentSong
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-white/10 text-white hover:bg-green-500"
                }`}
              >
                {isCurrentPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ContinueListening;