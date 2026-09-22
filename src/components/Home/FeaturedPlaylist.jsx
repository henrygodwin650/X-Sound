import React from "react";
import { motion } from "framer-motion";
import Phyno from '../../assets/cover-image/images (28).jpeg'
import Evado from '../../assets/cover-image/images (32).jpeg'
import OmahLay from '../../assets/cover-image/images (7).jpeg'

import {
  FaPlay,
  FaHeart,
  FaMusic,
} from "react-icons/fa";
const playlist = 
{
  title: "Top Hits 2026",
  description:
    "The biggest songs trending around the world. Updated every Friday with fresh music.",

  image: OmahLay,

  songs: 72,

  likes: "1.8M",

  duration: "3h 45m",
};
const FeaturedPlaylist = () => {

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

        whilehover={{
          scale: 1.01,
        }}

        className="overflow-hidden rounded-[35px] border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)]"

      >

        <div className="grid lg:grid-cols-2">
          <div className="relative">

            <img
              src={playlist.image}
              alt={playlist.title}
              className="h-full min-h-105 w-full object-cover "
            />

            <div
              className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent "
            />

          </div>
          <div className="flex flex-col justify-center p-10">

            <span
              className="mb-4 w-fit rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400 "
            >

              Editor's Choice

            </span>

            <h2 className="text-5xl font-black text-white">

              {playlist.title}

            </h2>

            <p className="mt-5 leading-8 text-gray-300">

              {playlist.description}

            </p>
            <div className="mt-8 flex flex-wrap gap-6">

              <div className="flex items-center gap-2">

                <FaMusic className="text-green-400" />

                <span className="text-white">

                  {playlist.songs} Songs

                </span>

              </div>

              <div className="flex items-center gap-2">

                <FaHeart className="text-red-400" />

                <span className="text-white">

                  {playlist.likes}

                </span>

              </div>

              <div>

                <span className="text-white">

                  {playlist.duration}

                </span>

              </div>

            </div>
            <div className="mt-10 flex flex-wrap gap-5">

              <button
                className="
    flex
    items-center
    gap-3
    rounded-full
    bg-green-500
    px-8
    py-4
    font-bold
    text-white
    transition
    hover:scale-105
    "
              >

                <FaPlay />

                Play Playlist

              </button>

              <button
                className="
    rounded-full
    border
    border-white/20
    px-8
    py-4
    text-white
    transition
    hover:bg-white/10
    "
              >

                Save Playlist

              </button>

            </div>
          </div>

        </div>
      </motion.div>

    </section>

  );

};

export default FeaturedPlaylist;