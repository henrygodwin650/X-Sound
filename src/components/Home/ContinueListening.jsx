import React from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

import {useHomeMusic} from "../../Hooks/useHomeMusic";
import useMusic from "../../Hooks/useMusic";

const ContinueListening = () => {
  const { recent, loading } = useHomeMusic();
  const { playSong } = useMusic();

  if (loading) {
    return (
      <section className="mt-16 py-10 text-center text-gray-400">
        Loading your music...
      </section>
    );
  }

  return (
    <section className="mt-16">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">
          Continue Listening
        </h2>

        <button className="text-green-400">
          View All
        </button>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {recent.slice(0, 4).map((song) => (

          <motion.div
            key={song.id}
            whileHover={{ y: -5 }}
            className="flex gap-5 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-[0_15px_40px_rgba(0,0,0,.25)] backdrop-blur-3xl"
          >

            <img
              src={song.cover}
              alt={song.title}
              className="h-28 w-28 rounded-2xl object-cover"
            />

            <div className="flex flex-1 flex-col justify-center">

              <h3 className="text-xl font-bold text-white">
                {song.title}
              </h3>

              <p className="text-gray-400">
                {song.artist}
              </p>

              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-full w-0 rounded-full bg-green-500" />
              </div>

              <div className="mt-3 flex justify-between text-sm text-gray-400">
                <span>Ready to play</span>
                <span>{song.duration}</span>
              </div>

            </div>

            <button
              onClick={() =>
                playSong(song, recent)
              }
              className="self-center rounded-full bg-green-500 p-4 text-white"
            >
              <FaPlay />
            </button>

          </motion.div>

        ))}

      </div>

    </section>
  );
};

export default ContinueListening;