import React from "react";
import { motion } from "framer-motion";

import {
  FaPlay,
  FaFire,
} from "react-icons/fa";

import {
  FiTrendingUp,
} from "react-icons/fi";

import {useHomeMusic} from "../../Hooks/useHomeMusic";
import useMusic from "../../Hooks/useMusic";

const TopCharts = () => {
  const { trending, loading } = useHomeMusic();
  const { playSong } = useMusic();

  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="flex items-center gap-3 text-3xl font-black text-white">
          <FaFire className="text-orange-500" />
          Top Charts
        </h2>

        <button className="text-green-400 hover:text-green-300">
          View All
        </button>

      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">
          Loading charts...
        </div>
      ) : (
        <div className="space-y-4">

          {trending.slice(0, 5).map((song, index) => (

            <motion.div
              key={song.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-[0_15px_40px_rgba(0,0,0,.25)] backdrop-blur-3xl"
            >

              <div className="hidden h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-xl font-black text-white sm:flex">
                #{index + 1}
              </div>

              <img
                src={song.cover}
                alt={song.title}
                className="h-20 w-20 rounded-2xl object-cover"
              />

              <div className="flex-1">

                <h3 className="text-xl font-bold text-white">
                  {song.title}
                </h3>

                <p className="mt-1 text-gray-400">
                  {song.artist}
                </p>

              </div>

              <div className="hidden md:block">
                <p className="text-gray-300">
                  {song.genre}
                </p>

                <p className="text-xs text-gray-500">
                  Genre
                </p>
              </div>

              <div className="flex items-center gap-2 text-green-500">
                <FiTrendingUp />
                Trending
              </div>

              <button
                onClick={() =>
                  playSong(song, trending)
                }
                className="ml-6 hidden rounded-full bg-green-500 p-4 text-white transition hover:scale-110 sm:flex"
              >
                <FaPlay />
              </button>

            </motion.div>

          ))}

        </div>
      )}

    </section>
  );
};

export default TopCharts;