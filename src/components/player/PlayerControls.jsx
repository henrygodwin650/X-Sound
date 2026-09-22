import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { FiHeart, FiPause, FiPlay, FiRepeat, FiShuffle, FiSkipBack, FiSkipForward } from 'react-icons/fi'
import useMusic from '../../Hooks/useMusic';

const PlayerControls = () => {
  const {
    isPlaying,
    togglePlay,
    nextSong,
    previousSong,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
  } = useMusic();

  const [liked, setLiked] = useState(false);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,.35)]">
      <div className="flex items-center justify-center gap-5">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLiked(!liked)}
          className={`rounded-full p-3 ${liked ? "bg-pink-500 text-white" : "bg-white/10 text-gray-400"
            }`}
        >
          <FiHeart size={22} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShuffle(!shuffle)}
          className={`rounded-full p-3 transition ${shuffle ? "bg-green-500 text-white" : "bg-white/10 text-gray-400"
            }`}
        >
          <FiShuffle size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-full bg-white/10 p-4 text-white"
          onClick={previousSong}
        >
          <FiSkipBack size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-xl"
        >
          {isPlaying ? <FiPause size={34} /> : <FiPlay size={34} />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full bg-white/10 p-4 text-white"
          onClick={nextSong}
        >
          <FiSkipForward size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setRepeat(!repeat)}
          className={`rounded-full p-3 ${repeat ? "bg-green-500 text-white" : "bg-white/10 text-gray-400"
            }`}
        >
          <FiRepeat size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default PlayerControls