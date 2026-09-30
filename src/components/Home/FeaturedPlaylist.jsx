import React from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaHeart,
  FaMusic,
} from "react-icons/fa";

import {useHomeMusic} from "../../Hooks/useHomeMusic";
import useMusic from "../../Hooks/useMusic";

const FeaturedPlaylist = () => {
  const { music, loading } = useHomeMusic();
  const { playSong } = useMusic();

  const playlistSongs = music.slice(0, 8);
  const cover = playlistSongs[0]?.cover;

  if (loading) {
    return (
      <section className="mt-20 py-10 text-center text-gray-400">
        Loading playlist...
      </section>
    );
  }

  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">
          Featured Playlist
        </h2>

        <button className="text-green-400 hover:text-green-300">
          View All
        </button>

      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="overflow-hidden rounded-[35px] border border-white/10 bg-white/10 shadow-[0_15px_40px_rgba(0,0,0,.25)] backdrop-blur-3xl"
      >

        <div className="grid lg:grid-cols-2">

          <div className="relative">

            {cover ? (
              <img
                src={cover}
                alt="Featured playlist"
                className="h-full min-h-105 w-full object-cover"
              />
            ) : (
              <div className="flex min-h-105 items-center justify-center bg-green-900/30">
                <FaMusic className="text-7xl text-green-400" />
              </div>
            )}

            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />

          </div>

          <div className="flex flex-col justify-center p-10">

            <span className="mb-4 w-fit rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
              Editor's Choice
            </span>

            <h2 className="text-5xl font-black text-white">
              XSound Discover
            </h2>

            <p className="mt-5 leading-8 text-gray-300">
              A collection of music discovered from
              Jamendo. Stream your next favorite track
              directly online.
            </p>

            <div className="mt-8 flex flex-wrap gap-6">

              <div className="flex items-center gap-2">
                <FaMusic className="text-green-400" />

                <span className="text-white">
                  {playlistSongs.length} Songs
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaHeart className="text-red-400" />

                <span className="text-white">
                  Online Streaming
                </span>
              </div>

            </div>

            <div className="mt-10 flex flex-wrap gap-5">

              <button
                onClick={() => {
                  if (playlistSongs[0]) {
                    playSong(
                      playlistSongs[0],
                      playlistSongs
                    );
                  }
                }}
                className="flex items-center gap-3 rounded-full bg-green-500 px-8 py-4 font-bold text-white transition hover:scale-105"
              >
                <FaPlay />
                Play Playlist
              </button>

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default FeaturedPlaylist;