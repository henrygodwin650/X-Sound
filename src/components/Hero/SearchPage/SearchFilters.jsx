import { motion } from 'framer-motion'
import React from 'react'

const filters = [
  "All",
  "Songs",
  "Artists",
  "Albums",
  "Playlists",
  "Genres"
]

const SearchFilters = ({
  filter,
  setFilter
}) => {
  return (
    <div className='mb-10 overflow-x-auto scrollbar-hide'>
      <div className="flex w-max gap-3 px-1">
        {filters.map((item) => (
          <motion.button
            key={item}
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: .95
            }}
            onClick={() => setFilter(item)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            filter === item ? "bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg" : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default SearchFilters