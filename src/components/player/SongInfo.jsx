import { motion } from 'framer-motion'
import React from 'react'
import { FiCheckCircle, FiClock, FiDisc, FiMusic } from 'react-icons/fi'

const SongInfo = ({ song, isPlaying = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='rounded-3xl bg-gray-500 backdrop-blur-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,.35)]'>
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full bg-green-500 
          ${isPlaying ? "animate-pulse" : ""
          }`} />
        <p className="uppercase tracking-[4px] text-sm text-green-400">
          Now Playing
        </p>
      </div>
      <h1 className='mt-6 text-4xl font-black text-white'>
        {song.title}
      </h1>
      <div className="mt-4 flex items-center gap-3">
        <h2 className="text-xl font-semibold text-white">
          {song.artist}
        </h2>
        <FiCheckCircle className='text-blue-500' />
      </div>
      <div className="mt-8 flex items-center gap-3 text-gray-300">
        <FiDisc />
        <span>
          Album: <strong className='ml-2 text-white'>
            {song.album}
          </strong>
        </span>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        <div className="">
          <p className="text-sm text-gray-300">
            Genre
          </p>
          <h3 className="mt-2 text-white">
            {song.genre}
          </h3>
        </div>
        <div className="">
          <p className="text-sm text-gray-300">
            Released
          </p>
          <h3 className="mt-2 text-white">
            {song.year}
          </h3>
        </div>
        <div className="">
          <p className="text-sm text-gray-200">
            Duration
          </p>
          <h3 className="mt-2 flex items-center gap-2 text-white">
            <FiClock />
            {song.duration}
          </h3>
        </div>
        <div className="">
          <p className="text-sm text-gray-300">
            Streams
          </p>
          <h3 className="mt-2 text-green-400">
            {song.plays}
          </h3>
        </div>
      </div>
      <p className="mt-8 leading-8 text-gray-300">
        {song.description}
      </p>
    </motion.div>
  )
}

export default SongInfo