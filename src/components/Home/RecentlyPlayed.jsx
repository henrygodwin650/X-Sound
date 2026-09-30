import React from "react";
import { motion } from "framer-motion";
import { FaPlay, FaClock } from "react-icons/fa";

import {useHomeMusic} from "../../Hooks/useHomeMusic";
import useMusic from "../../Hooks/useMusic";

const RecentlyPlayed = () => {
  const { recent, loading } = useHomeMusic();
  const { playSong } = useMusic();

  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">
          Recently Played
        </h2>

        <button className="text-green-400">
          View All
        </button>

      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_15px_40px_rgba(0,0,0,.25)] backdrop-blur-3xl">

        <div className="hidden grid-cols-[70px_1.8fr_1fr_120px_80px] items-center border-b border-white/10 px-6 py-5 text-sm uppercase tracking-widest text-gray-400 md:grid">

          <div>#</div>
          <div>Title</div>
          <div>Album</div>
          <div>Artist</div>
          <div>
            <FaClock />
          </div>

        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-400">
            Loading music...
          </div>
        ) : (
          recent.slice(0, 5).map((song, index) => (

            <motion.div
              key={song.id}
              whileHover={{
                backgroundColor:
                  "rgba(255,255,255,.05)",
              }}
              className="grid items-center gap-4 px-6 py-5 md:grid-cols-[70px_1.8fr_1fr_120px_80px]"
            >

              <div className="text-gray-400">
                {index + 1}
              </div>

              <div className="flex items-center gap-4">

                <div className="relative">

                  <img
                    src={song.cover}
                    alt={song.title}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <button
                    onClick={() =>
                      playSong(song, recent)
                    }
                    className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/60 opacity-0 transition hover:opacity-100"
                  >
                    <FaPlay className="text-white" />
                  </button>

                </div>

                <div>
                  <h3 className="font-bold text-white">
                    {song.title}
                  </h3>

                  <p className="text-gray-400">
                    {song.artist}
                  </p>
                </div>

              </div>

              <div className="hidden text-gray-300 md:block">
                {song.album}
              </div>

              <div className="hidden text-gray-400 md:block">
                {song.artist}
              </div>

              <div className="text-gray-400">
                {song.duration}
              </div>

            </motion.div>

          ))
        )}

      </div>

    </section>
  );
};

export default RecentlyPlayed;