import { motion } from 'framer-motion'
import React from 'react'
import { FiHeart, FiPlay } from 'react-icons/fi'
import useMusic from '../../../Hooks/useMusic';

const SearchCard = ({ item }) => {
  const { playSong } = useMusic();
  return (
    <motion.div
      key={item.id}
      whileHover={{
        y: -8
      }}
      className='group overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl transition'
    >
      <div className="relative">
        <img src={item.image} alt={item.title} className='h-56 w-full object-cover' />
        <motion.button
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: .9
          }}
          className='absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center bg-green-500 rounded-full text-white opacity-0 shadow-xl transition group-hover:opacity-100'
          onClick={() => playSong(song, searchResults)}
        >
          <FiPlay />
        </motion.button>
        {/* Favourite button */}
        <motion.button
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: .9
          }}
          className='absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white'
        >
          <FiHeart />
        </motion.button>
      </div>

      {/* Card body */}
      <div className="space-y-2 p-4">
        {/* TITLE */}
        <h3 className="truncate font-bold text-white">
          {item.title}
        </h3>
        {/* Artist */}
        <p className="truncate text-gray-400">
          {item.artist}
        </p>
        {/* Type Badge */}
        <span className="inline-block rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
          {item.type}
        </span>
      </div>
    </motion.div>
  )
}

export default SearchCard