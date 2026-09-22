import { motion } from 'framer-motion'
import React from 'react'
import { FiPlay } from 'react-icons/fi'

const TopResult = ({ item }) => {
  if(!item) return null;
  return (
    <motion.div
     whileHover={{scale: 1.02}}
     className='rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/10 p-6'
    >
      <h2 className="mb-5 text-xl font-bold text-white">
        Top Result
      </h2>
      <img src={item.image} alt={item.title} className="h-36 w-36 rounded-2xl object-cover" />
      <h1 className="mt-5 text-3xlfont-bold text-white">
        {item.title}
      </h1>
      <p className="mt-2 text-gray-400">
        {item.artist}
      </p>
      <button className="mt-6 flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white">
        <FiPlay />
      </button>
    </motion.div>
  )
}

export default TopResult