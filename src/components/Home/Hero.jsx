import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  FaPlay,
  FaRandom,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaMusic,
} from "react-icons/fa";

import { featuredMusic } from "../Home/FeaturedMusic";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  // Auto change every 5 seconds
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) =>
        prev === featuredMusic.length - 1
          ? 0
          : prev + 1
      );

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const music = featuredMusic[current] ?? featuredMusic[0];

  const nextSlide = () => {
    setCurrent((prev) => {
      return prev === featuredMusic.length - 1
        ? 0
        : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrent((prev) => {
      return prev === 0
        ? featuredMusic.length - 1
        : prev - 1;
    });

  };
  return (
    <section
      className="
      relative
      overflow-hidden
      rounded-[35px]
      border
      border-white/10
      hero-bg-color
      p-8
      mt-4
      lg:p-12
      "
    >
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
        className="absolute left-16 bottom-16 text-5xl text-white/10"
      >
        <FaMusic />
      </motion.div>

      {/* Background Glow */}

      <motion.div
        key={music.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .8 }}
        className="
    absolute
    inset-0
    bg-linear-to-br
    from-green-500/20
    via-emerald-500/10
    to-black
    "
      />

      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-green-500/20 blur-[120px]" />

      <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-emerald-400/20 blur-[120px]" />

      {/* Content */}

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">

        {/* Left Side */}

        <div>

          <span
            className="
            rounded-full
            bg-green-500/20
            px-4
            py-2
            text-sm
            font-semibold
            text-green-400
            "
          >
            NOW PLAYING
          </span>

          <h1 className="mt-6 text-5xl font-black text-white lg:text-7xl">
            {music.title}
          </h1>

          <h2 className="mt-3 text-2xl font-semibold text-green-400">
            {music.artist}
          </h2>

          <p className="mt-6 max-w-xl leading-8 text-gray-300">
            {music.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <motion.button
              whilehover={{
                scale: 1.05,
                rotateX: 2,
              }}
              whiletap={{ scale: 0.95 }}
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-green-500
              px-8
              py-4
              font-bold
              text-white
              shadow-xl
              "
            >
              <FaPlay />

              Play Now
            </motion.button>

            <motion.button
              whilehover={{ scale: 1.05 }}
              whiletap={{ scale: 0.95 }}
              className=" flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] px-8 py-4 font-semibold text-white "
            >
              <FaRandom />

              Shuffle
            </motion.button>

            <motion.button
              whilehover={{
                scale: 1.05,
                rotateX: 2,
              }}
              whiletap={{ scale: .95 }}
              className="flex items-center   justify-center rounded-2xl bg-red-500/20 p-4 text-red-400 hover:bg-red-500  hover:text-white transition
    "
            >

              <FaHeart className="text-xl" />

            </motion.button>

          </div>

          <div className="mt-10 flex flex-wrap gap-8">

            <motion.div
              key={music.id}
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: .5,
              }}
            >

              <p className="text-4xl font-black text-white">
                125M
              </p>

              <span className="text-gray-400">
                Streams
              </span>

            </motion.div>

            <div>

              <p className="text-4xl font-black text-white">
                5.0
              </p>

              <span className="text-gray-400">
                Rating
              </span>

            </div>

            <div>

              <p className="text-4xl font-black text-white">
                3.8M
              </p>

              <span className="text-gray-400">
                Likes
              </span>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex flex-col items-center justify-center">

          <div className="relative flex justify-center">

            {/* Vinyl */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
              className=" absolute top-1/2 -translate-y-1/2 right-6 h-80 w-80 rounded-full bg-black border-12 border-gray-900 shadow-2xl "
            >

              <div className="absolute inset-10 rounded-full border-4 border-gray-700" />

              <div className="absolute inset-24 rounded-full bg-gray-700" />

              <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

            </motion.div>

            {/* Album */}

            <motion.img
              key={music.id}
              initial={{ opacity: 0, scale: .9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .6 }}
              whilehover={{
                scale: 1.05,
                rotate: -4,
                rotateX: 2,
              }}
              src={music.image}
              alt={music.title}
              className=" relative z-10 h-85 w-85 rounded-[35px] object-cover shadow-[0_0_60px_rgba(34,197,94,.45)]"
            />
            <div
              className=" pointer-events-none absolute left-10 top-8 h-56 w-20 rotate-12 rounded-full bg-white/10 blur-xl "
            />

          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={prevSlide}
              className=" rounded-full bg-white/10 p-4 text-white transition hover:bg-green-500"
              whilehover={{
                scale: 1.08
              }}

              whiletap={{
                scale: .95
              }}
            >

              <FaChevronLeft />

            </button>

            <button
              onClick={nextSlide}
              className=" rounded-full bg-white/10 p-4 text-white transition hover:bg-green-500
        "whilehover={{
                scale: 1.08
              }}

              whiletap={{
                scale: .95
              }}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-3">

            {featuredMusic.map((_, index) => (

              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-3 rounded-full transition-all

            ${current === index ? "w-10 bg-green-500" : "w-3 bg-white/30"}`}
              />
            ))}

          </div>
        </div>
      </div>
    </section >
  );
};

export default Hero;