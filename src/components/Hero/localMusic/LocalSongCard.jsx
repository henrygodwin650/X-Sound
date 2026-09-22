import React from 'react'
import { FiHeart, FiMoreVertical, FiMusic, FiPlay, FiTrash2 } from 'react-icons/fi'
import { motion } from "framer-motion"
import { formatTime } from './ImportMusicButton'
import { useLocalMusic } from '../../../Hooks/useLocalMusic'

const LocalSongCard = ({ song }) => {

  const { removeSong, playSong } = useLocalMusic();
  return (
    <motion.div
      whileHover={{
        scale: 1.01
      }}
      className='mb-4 flex items-center justify-between rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl p-4 transition hover:border-green-500'
    >
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-green-500 to-emerald-700">
          <FiMusic className='text-3xl text-white' />
        </div>
        <div className="">

          {song.cover ? (
            <img
              src={song.cover}
              alt={song.title}
              className='h-16 w-16 rounded-2xl object-cover'
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r from-green-500 to-emerald-700">
              <FiMusic className='text-3xl text-white' />
            </div>
          )
          }

          <h3 className="text-lg font-bold text-white">
            {song.title}
          </h3>

          <p className="text-gray-400">
            {song.artist}
          </p>
          <p className="text-sm text-gray-500">
            {song.album}
          </p>

          <p className="text-xs text-green-400">
            {song.genre}
          </p>
          <span>
            {formatTime(song.duration)}
          </span>
          <span>
            {song.year}
          </span>
          <div className="mt-1 flex gap-3 text-sm text-gray-500">
            <span>
              {song.type.split("/")[1]?.toUpperCase()}
            </span>
            <span>
              .
            </span>
            <span>
              {(song.size / (1024 * 1024)).toFixed(2)}MB
            </span>
          </div>
        </div>
      </div>
      <div
        onDoubleClick={() => playSong(song.songs)}
        className="flex items-center gap-3">
        <button
          className='rounded-full bg-white/10 p-3 text-gray-300 transition hover:bg-pink-500 hover:text-white'
        >
          <FiHeart />
        </button>
        <button className='rounded-full bg-green-500 p-3 text-white transition hover:scale-110'>
          <FiPlay />
        </button>
        <button
          onClick={() => removeSong(song.id)}
          className="rounded-full bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500 hover:text-white">
          <FiTrash2 />
        </button>
        <button className='rounded-full bg-white/10 p-3 text-gray-300 hover:bg-white/20'>
          <FiMoreVertical />
        </button>
      </div>
    </motion.div>
  )
}

export default LocalSongCard