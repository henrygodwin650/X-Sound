// music.trending === true;
import React from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

import {
  FiClock,
  FiMoreHorizontal,
} from "react-icons/fi";
import useMusic from "../../Hooks/useMusic";

const MusicCard = ({ music }) => {
  const { playSong, queue } = useMusic();

  if (!music) return null;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] border border-white/10 transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_0_25px_rgba(34,197,94,.25)]"
    >
      {/* Cover */}
      <div className="relative overflow-hidden">
        <img
          src={music.cover}
          alt={music.title}
          className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />

        {/* Play Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-xl text-white opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100"
          onClick={() => playSong(music, queue.length ? queue : [music])}
        >
          <FaPlay className="ml-1" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="truncate text-lg font-bold text-white">
              {music.title}
            </h3>
            <p className="text-sm text-gray-400">{music.artist}</p>
          </div>

          <button className="text-gray-400 hover:text-white">
            <FiMoreHorizontal />
          </button>
        </div>

        <p className="truncate text-sm text-gray-500">{music.album}</p>

        <div className="flex items-center justify-between">
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
            {music.genre}
          </span>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-400">
              <FiClock />
              <span className="text-xs">{music.duration}</span>
            </div>

            <button className="text-red-400 transition hover:scale-110">
              <FaRegHeart />
            </button>
          </div>
        </div>
      </div>

      {/* Badge */}
      <div className="absolute left-4 top-4 z-20">
        {music.recent ? (
          <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
            🆕 New
          </span>
        ) : music.trending ? (
          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
            🔥 Trending
          </span>
        ) : null}
      </div>
    </motion.div>
  );
};

export default MusicCard;