import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FiVolume, FiVolume1, FiVolume2, FiVolumeX } from 'react-icons/fi'
import useMusic from '../../Hooks/useMusic';

const Volume = () => {
  const {volume, setVolume, isPlaying} = useMusic();

  const [muted, setMuted] = useState(false);

  useEffect(() => {
    localStorage.setItem("volume", volume);
  }, [volume])

  const VolumeIcon = () => {
    if (muted || volume === 0) {
      return <FiVolumeX size={22} />;
    }
    if (volume < 35) {
      return <FiVolume size={22} />;
    }
    if (volume < 70) {
      return <FiVolume1 size={22} />;
    }
    return <FiVolume2 size={22} />
  }

  return (
    <div className='rounded-3xl bg-gray-500 border-white/10 backdrop-blur-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0.35)]'>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Volume
        </h3>
        <span className="text-green-400">
          {muted ? 0 : volume}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: .9 }}
          onClick={() => setMuted(!muted)}
          className='rounded-full bg-white/10 p-3 text-white hover:bg-green-500 transition'
        >
          <VolumeIcon />
        </motion.button>
        <input type="range" min='0' max='100' value={volume} onChange={(e) => {
          setVolume(Number(e.target.value));
        }}
          className='flex-1 cursor-pointer accent-green-500'
        />
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
        <motion.div
          animate={{width: `${muted ? 0 : volume}%`}}
          transition={{ duration: 0.2 }}
          className='rounded-full h-full bg-linear-to-r from-green-400 to-emerald-500 ' />
      </div>
      {isPlaying && (
        <div className="mt-3 text-center text-xs text-green-400 flex items-center justify-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"/>
          Audio Active
        </div>
      )}
    </div>
  )
}

export default Volume