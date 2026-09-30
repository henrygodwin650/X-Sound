import React from "react";
import { motion } from "framer-motion";
import { FaPlay, FaRegHeart } from "react-icons/fa6";
import {
  FiClock,
  FiMoreHorizontal,
  FiTrendingUp,
} from "react-icons/fi";

import MusicCardSkeleton from "../Skeleton/MusicCardSkeleton";
import useMusic from "../../Hooks/useMusic";
import { useHomeMusic } from "../../Hooks/useHomeMusic";

const TrendingPage = () => {
  const { playSong } = useMusic();

  const {
    popular,
    loading,
    error,
  } = useHomeMusic();

  const trendingSongs = popular.slice(0, 12);

  const handlePlay = (song) => {
    playSong(song, trendingSongs);
  };

  return (
    <div className="hero-bg-color p-5">
      {/* Heading */}
      <div className="mb-8 mt-4 flex items-center justify-center">
        <span className="mb-4 mt-16 inline-flex w-fit items-center gap-4 px-5 py-4 text-center text-5xl font-semibold text-white">
          <FiTrendingUp className="text-green-500" />
          Trending Songs
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <MusicCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <p className="text-red-400">
            Unable to load trending songs.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Please check your internet connection and try again.
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && trendingSongs.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
          <FiTrendingUp className="mx-auto mb-4 text-5xl text-green-500" />

          <h2 className="text-2xl font-bold text-white">
            No Trending Songs
          </h2>

          <p className="mt-3 text-gray-400">
            Trending music will appear here.
          </p>
        </div>
      )}

      {/* Songs */}
      {!loading && !error && trendingSongs.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trendingSongs.map((music) => (
            <motion.div
              key={music.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_15px_40px_rgba(0,0,0,.25)] backdrop-blur-3xl transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_0_25px_rgba(34,197,94,.25)]"
            >
              {/* Cover */}
              <div className="relative overflow-hidden">
                <img
                  src={music.cover}
                  alt={`${music.title} by ${music.artist}`}
                  className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />

                {/* Trending Badge */}
                <div className="absolute left-4 top-4 z-20">
                  <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                    🔥 Trending
                  </span>
                </div>

                {/* Play */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePlay(music)}
                  aria-label={`Play ${music.title}`}
                  className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-xl text-white opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100"
                >
                  <FaPlay className="ml-1" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-white">
                      {music.title}
                    </h3>

                    <p className="truncate text-sm text-gray-400">
                      {music.artist}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="More options"
                    className="shrink-0 text-gray-400 transition hover:text-white"
                  >
                    <FiMoreHorizontal />
                  </button>
                </div>

                <p className="truncate text-sm text-gray-500">
                  {music.album || "Single"}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                    {music.genre || "Music"}
                  </span>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-400">
                      <FiClock />

                      <span className="text-xs">
                        {music.duration}
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label={`Favorite ${music.title}`}
                      className="text-gray-400 transition hover:scale-110 hover:text-red-400"
                    >
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingPage;