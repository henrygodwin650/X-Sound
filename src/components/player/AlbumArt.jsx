import { motion } from 'framer-motion'
import React from 'react'
import { FiDownload, FiHeart, FiShare2 } from 'react-icons/fi'
import useMusic from '../../Hooks/useMusic'

const AlbumArt = ({ song, isPlaying: propIsPlaying }) => {
  const { currentSong, isPlaying: contextIsPlaying } = useMusic();

  const activeSong = song || currentSong;
  const isPlaying = propIsPlaying ?? contextIsPlaying;

  if (!activeSong) {
    return (
      <div className="rounded-3xl bg-white/10 p-6 text-center text-gray-400 backdrop-blur-3xl">
        No song selected
      </div>
    );
  }

  const image = activeSong.image || activeSong.cover || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-3xl"
    >
      <div className="relative overflow-hidden">
        <motion.img
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            repeat: isPlaying ? Infinity : 0,
            duration: 18,
            ease: "linear",
          }}
          src={image}
          alt={activeSong.title}
          className="aspect-square w-full rounded-full object-cover shadow-2xl"
        />
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gray-700 bg-black" />
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-white">{activeSong.title}</h2>
        <p className="text-sm text-gray-400">{activeSong.album}</p>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-full bg-white/10 p-4 text-white transition hover:bg-pink-500"
        >
          <FiHeart size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-full bg-white/10 p-4 text-white transition hover:bg-green-500"
        >
          <FiDownload size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-full bg-white/10 p-4 text-white transition hover:bg-blue-500"
        >
          <FiShare2 size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AlbumArt