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

import {useHomeMusic} from "../../Hooks/useHomeMusic";
import useMusic from "../../Hooks/useMusic";

const Hero = () => {
  const {
    trending,
    recent,
    loading,
  } = useHomeMusic();

  const { playSong } = useMusic();

  const songs =
    trending.length > 0
      ? trending
      : recent;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!songs.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === songs.length - 1
          ? 0
          : prev + 1
      );
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
      <section className="mt-4 flex min-h-[500px] items-center justify-center rounded-[35px] border border-white/10 bg-white/5">
        <div className="text-lg text-gray-400">
          Loading music...
        </div>
      </section>
    );
  }

  if (!songs.length) {
    return (
      <section className="mt-4 rounded-[35px] border border-white/10 bg-white/5 p-10 text-center">
        <FaMusic className="mx-auto text-5xl text-green-400" />

        <h2 className="mt-5 text-2xl font-bold text-white">
          No music available
        </h2>

        <p className="mt-2 text-gray-400">
          Please try again later.
        </p>
      </section>
    );
  }

  const music = songs[current];

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === songs.length - 1
        ? 0
        : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0
        ? songs.length - 1
        : prev - 1
    );
  };

  const handlePlay = () => {
    playSong(music, songs);
  };

  return (
    <section className="relative mt-4 overflow-hidden rounded-[35px] border border-white/10 bg-white/5 p-8 lg:p-12">

      {/* Green glow */}

      <motion.div
        key={music.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-linear-to-br from-green-500/20 via-emerald-500/10 to-black"
      />

      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-green-500/20 blur-[120px]" />

      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-[120px]" />

      {/* Floating notes */}

      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute right-20 top-16 text-6xl text-green-500/20"
      >
        <FaMusic />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute bottom-16 left-16 text-5xl text-white/10"
      >
        <FaMusic />
      </motion.div>

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">

        {/* Text */}

        <div>

          <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
            NOW PLAYING
          </span>

          <h1 className="mt-6 break-words text-5xl font-black text-white lg:text-7xl">
            {music.title}
          </h1>

          <h2 className="mt-3 text-2xl font-semibold text-green-400">
            {music.artist}
          </h2>

          <p className="mt-6 max-w-xl leading-8 text-gray-300">
            Discover and stream{" "}
            <span className="text-green-400">
              {music.genre}
            </span>{" "}
            music on XSound.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className="flex items-center gap-3 rounded-2xl bg-green-500 px-8 py-4 font-bold text-white shadow-xl"
            >
              <FaPlay />
              Play Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const randomIndex = Math.floor(
                  Math.random() * songs.length
                );

                setCurrent(randomIndex);
              }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-3xl"
            >
              <FaRandom />
              Shuffle
            </motion.button>

            <button className="flex items-center justify-center rounded-2xl bg-red-500/20 p-4 text-red-400 transition hover:bg-red-500 hover:text-white">
              <FaHeart className="text-xl" />
            </button>

          </div>

          <div className="mt-10 flex flex-wrap gap-8">

            <div>
              <p className="text-3xl font-black text-white">
                {music.duration}
              </p>

              <span className="text-gray-400">
                Duration
              </span>
            </div>

            <div>
              <p className="text-3xl font-black text-white">
                {music.genre}
              </p>

              <span className="text-gray-400">
                Genre
              </span>
            </div>

            <div>
              <p className="text-3xl font-black text-white">
                Jamendo
              </p>

              <span className="text-gray-400">
                Source
              </span>
            </div>

          </div>

        </div>

        {/* Artwork */}

        <div className="flex flex-col items-center justify-center">

          <div className="relative flex justify-center">

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
              className="absolute right-6 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border-[12px] border-gray-900 bg-black shadow-2xl"
            >
              <div className="absolute inset-10 rounded-full border-4 border-gray-700" />

              <div className="absolute inset-24 rounded-full bg-gray-700" />

              <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
            </motion.div>

            <motion.img
              key={music.id}
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{ duration: 0.6 }}
              src={music.cover}
              alt={music.title}
              className="relative z-10 h-85 w-85 rounded-[35px] object-cover shadow-[0_0_60px_rgba(34,197,94,.45)]"
            />

          </div>

          <div className="mt-8 flex justify-center gap-4">

            <button
              onClick={prevSlide}
              className="rounded-full bg-white/10 p-4 text-white transition hover:bg-green-500"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={nextSlide}
              className="rounded-full bg-white/10 p-4 text-white transition hover:bg-green-500"
            >
              <FaChevronRight />
            </button>

          </div>

          <div className="mt-6 flex justify-center gap-3">

            {songs.map((song, index) => (
              <button
                key={song.id}
                onClick={() => setCurrent(index)}
                className={`h-3 rounded-full transition-all ${
                  current === index
                    ? "w-10 bg-green-500"
                    : "w-3 bg-white/30"
                }`}
                aria-label={`Show ${song.title}`}
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;