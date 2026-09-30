import React from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

import {useHomeMusic} from "../../Hooks/useHomeMusic";
import useMusic from "../../Hooks/useMusic";

const Recommended = () => {
  const { trending, loading } = useHomeMusic();
  const { playSong } = useMusic();

  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">
          Recommended For You
        </h2>

        <button className="text-green-400">
          View All
        </button>

      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">
          Loading recommendations...
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-3 scrollbar-hide">

          {trending.slice(0, 8).map((song) => (

            <motion.div
              key={song.id}
              whileHover={{ y: -8 }}
              className="min-w-[250px] rounded-3xl border border-white/10 bg-white/10 p-5 shadow-[0_15px_40px_rgba(0,0,0,.25)] backdrop-blur-3xl"
            >

              <div className="relative overflow-hidden rounded-2xl">

                <img
                  src={song.cover}
                  alt={song.title}
                  className="h-56 w-full object-cover transition duration-500 hover:scale-110"
                />

                <button
                  onClick={() =>
                    playSong(song, trending)
                  }
                  className="absolute bottom-4 right-4 rounded-full bg-green-500 p-4 text-white shadow-xl"
                >
                  <FaPlay />
                </button>

              </div>

              <div className="mt-5">

                <h3 className="truncate text-xl font-bold text-white">
                  {song.title}
                </h3>

                <p className="mt-1 text-gray-400">
                  {song.artist}
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    {song.duration}
                  </span>

                  <button>
                    <FaRegHeart className="text-xl text-gray-400" />
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>
      )}

    </section>
  );
};

export default Recommended;