import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaRandom,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaMusic,
} from "react-icons/fa";

import { useHomeMusic } from "../../Hooks/useHomeMusic";
import useMusic from "../../Hooks/useMusic";

const Hero = () => {
  const { trending, recent, loading } = useHomeMusic();
  const { playSong, toggleFavorite, favorites = [] } = useMusic();

  const songs = trending.length > 0 ? trending : recent;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!songs.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [songs.length]);

  useEffect(() => {
    if (current >= songs.length) {
      setCurrent(0);
    }
  }, [current, songs.length]);

  if (loading) {
    return (
      <section className="mt-4 flex min-h-[350px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 sm:min-h-[450px] sm:rounded-[30px] lg:min-h-[500px]">
        <div className="text-base text-gray-400 sm:text-lg">
          Loading music...
        </div>
      </section>
    );
  }

  if (!songs.length) {
    return (
      <section className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center sm:rounded-[30px] sm:p-10">
        <FaMusic className="mx-auto text-4xl text-green-400 sm:text-5xl" />

        <h2 className="mt-5 text-xl font-bold text-white sm:text-2xl">
          No music available
        </h2>

        <p className="mt-2 text-sm text-gray-400 sm:text-base">
          Please try again later.
        </p>
      </section>
    );
  }

  const music = songs[current];

  const isFavorite = favorites.some(
    (song) => song.id === music.id
  );

  const nextSlide = () => {
    setCurrent((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  const handlePlay = () => {
    playSong(music, songs);
  };

  const handleFavorite = () => {
    toggleFavorite(music);
  };

  const handleShuffle = () => {
    if (songs.length < 2) return;

    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === current);

    setCurrent(randomIndex);
  };

  return (
    <section className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#06120e] p-5 sm:rounded-[30px] sm:p-8 lg:rounded-[35px] lg:p-10 xl:p-12">
      {/* Background glow */}
      <motion.div
        key={music.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-linear-to-br from-green-500/20 via-emerald-500/10 to-black"
      />

      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-green-500/20 blur-[100px] sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-[100px] sm:h-72 sm:w-72 lg:h-80 lg:w-80" />

      {/* Floating music notes */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="pointer-events-none absolute right-8 top-8 hidden text-5xl text-green-500/20 sm:block lg:right-20 lg:top-16 lg:text-6xl"
      >
        <FaMusic />
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute bottom-10 left-8 hidden text-4xl text-white/10 sm:block lg:bottom-16 lg:left-16 lg:text-5xl"
      >
        <FaMusic />
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-12">
        {/* Text content */}
        <div className="order-2 min-w-0 text-center lg:order-1 lg:text-left">
          <span className="inline-flex rounded-full bg-green-500/20 px-3 py-2 text-xs font-semibold tracking-wide text-green-400 sm:px-4 sm:text-sm">
            NOW PLAYING
          </span>

          <motion.h1
            key={music.id + "-title"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-5 break-words text-3xl font-black leading-tight text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
          >
            {music.title}
          </motion.h1>

          <h2 className="mt-3 break-words text-lg font-semibold text-green-400 sm:text-xl md:text-2xl">
            {music.artist || "Unknown Artist"}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:mt-6 sm:text-base sm:leading-8 lg:mx-0">
            Discover and stream{" "}
            <span className="font-semibold text-green-400">
              {music.genre || "Music"}
            </span>{" "}
            music on XSound.
          </p>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4 lg:justify-start">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-green-600 sm:min-h-14 sm:gap-3 sm:rounded-2xl sm:px-8 sm:text-base"
            >
              <FaPlay />
              Play Now
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShuffle}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-3xl transition hover:bg-white/20 sm:min-h-14 sm:gap-3 sm:rounded-2xl sm:px-6 sm:text-base"
            >
              <FaRandom />
              Shuffle
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFavorite}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              className={`flex h-12 w-12 items-center justify-center rounded-xl transition sm:h-14 sm:w-14 sm:rounded-2xl ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
              }`}
            >
              <FaHeart className="text-lg sm:text-xl" />
            </motion.button>
          </div>

          {/* Song details */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:mt-10 sm:gap-x-10 lg:justify-start">
            <div className="min-w-0">
              <p className="text-xl font-black text-white sm:text-2xl">
                {music.duration || "—"}
              </p>
              <span className="text-xs text-gray-400 sm:text-sm">
                Duration
              </span>
            </div>

            <div className="min-w-0 max-w-[130px]">
              <p className="truncate text-xl font-black text-white sm:text-2xl">
                {music.genre || "Music"}
              </p>
              <span className="text-xs text-gray-400 sm:text-sm">
                Genre
              </span>
            </div>

            <div>
              <p className="text-xl font-black text-white sm:text-2xl">
                Jamendo
              </p>
              <span className="text-xs text-gray-400 sm:text-sm">
                Source
              </span>
            </div>
          </div>
        </div>

        {/* Artwork and carousel */}
        <div className="order-1 flex min-w-0 flex-col items-center justify-center lg:order-2">
          <div className="relative flex w-full items-center justify-center">
            {/* Record decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
              className="absolute left-1/2 top-1/2 aspect-square w-[65%] max-w-[320px] -translate-y-1/2 translate-x-[-35%] rounded-full border-[8px] border-gray-900 bg-black shadow-2xl sm:border-[10px] lg:border-[12px]"
            >
              <div className="absolute inset-[12%] rounded-full border-2 border-gray-700 sm:border-4" />
              <div className="absolute inset-[30%] rounded-full bg-gray-700" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white sm:h-5 sm:w-5" />
            </motion.div>

            <motion.img
              key={music.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={music.cover}
              alt={`${music.title} album artwork`}
              loading="lazy"
              className="relative z-10 aspect-square w-[75%] max-w-[280px] rounded-2xl object-cover shadow-[0_0_45px_rgba(34,197,94,.35)] sm:max-w-[340px] sm:rounded-[30px] lg:max-w-[360px] xl:max-w-[400px]"
            />
          </div>

          {/* Previous and next */}
          <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8 sm:gap-5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous featured song"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-green-500 sm:h-12 sm:w-12"
            >
              <FaChevronLeft />
            </button>

            <span className="min-w-12 text-center text-sm font-medium text-gray-400">
              {current + 1} / {songs.length}
            </span>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next featured song"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-green-500 sm:h-12 sm:w-12"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Slide indicators */}
          <div className="mt-5 flex max-w-full flex-wrap justify-center gap-2">
            {songs.map((song, index) => (
              <button
                key={song.id}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-8 bg-green-500 sm:w-10"
                    : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Show ${song.title}`}
                aria-current={current === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;