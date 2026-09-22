import { motion } from 'framer-motion'
import React from 'react'
import { FiClock, FiTrash2, FiX } from 'react-icons/fi'

const RecentSearches = ({
  recentSearches,
  setRecentSearches,
  setSearch,
}) => {
  const removeSearch = (item) => {
    const updated = recentSearches.filter((s) => s !== item);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated))
  }

  // CLEAR
  const clearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches")
  }
  // RETURN
  if (recentSearches.length === 0) return null;
  return (
    <div className='mb-12'>
      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiClock className='text-2xl text-green-500' />
          <h2 className="text-2xl font-bold text-white">Recent Searches</h2>
        </div>
        <button onClick={clearAll} className="flex items-center gap-2 text-red-400 hover:text-red-300">
          <FiTrash2 />
          Clear All
        </button>
      </div>
      <div className="space-y-3">
        {recentSearches.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className='flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-3xl'
          >
            <button onClick={() => setSearch(item)} className="flex items-center gap-4 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                <FiClock className='text-green-400' />
              </div>
              <span className='font-medium text-white'>{item}</span>
            </button>
            <button className='rounded-full p-2 text-gray-400 transition hover:bg-red-500 hover:text-white' onClick={() => removeSearch(item)}>
              <FiX />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default RecentSearches