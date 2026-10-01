import React from "react";
import { FaMusic, FaMicrophoneLines } from "react-icons/fa6";
import { motion } from "framer-motion";

import useMusic from "../../Hooks/useMusic";

const Lyrics = () => {
  const { currentSong } = useMusic();

  return (
    <section className="min-h-screen bg-white px-4 py-8 text-gray-900 dark:bg-zinc-950 dark:text-white md:px-8">
      {/* Header */}
      <div className="mb-8 mt-15">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
            <FaMusic className="text-xl text-green-500" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Lyrics</h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Follow along with the music
            </p>
          </div>
        </div>
      </div>

      {/* No song selected */}
      {!currentSong ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-6 text-center dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <FaMusic className="text-2xl text-green-500" />
          </div>

          <h2 className="mb-2 text-xl font-semibold">
            No song playing
          </h2>

          <p className="max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
            Play a song to see its lyrics here.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl">
          {/* Current song */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-xl backdrop-blur-xl sm:flex-row sm:text-left"
          >
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="h-28 w-28 rounded-2xl object-cover shadow-lg"
            />

            <div className="min-w-0 flex-1">
              <p className="mb-1 text-sm font-medium text-green-400">
                Now Playing
              </p>

              <h2 className="truncate text-2xl font-bold">
                {currentSong.title}
              </h2>

              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {currentSong.artist}
              </p>

              {currentSong.album && (
                <p className="mt-1 text-xs text-gray-400">
                  {currentSong.album}
                </p>
              )}
            </div>
          </motion.div>

          {/* Lyrics empty state */}
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center backdrop-blur-xl">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <FaMicrophoneLines className="text-2xl text-green-500" />
            </div>

            <h2 className="mb-2 text-xl font-semibold">
              Lyrics not available
            </h2>

            <p className="max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              Lyrics for{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {currentSong.title}
              </span>{" "}
              are not available yet.
            </p>

            <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
              Lyrics will appear here when a supported lyrics source is
              connected.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Lyrics;