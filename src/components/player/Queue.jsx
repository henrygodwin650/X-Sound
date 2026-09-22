import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { FiMusic } from 'react-icons/fi'
import Rema from '../../assets/cover-image/images (1).jpeg'
import Burnaboy2 from '../../assets/cover-image/images (5).jpeg'
import Wizkid2 from '../../assets/cover-image/images (12).jpeg'
import Shallipop from '../../assets/cover-image/images (30).jpeg'
import useMusic from '../../Hooks/useMusic'

const Queue = () => {

  const [queue] = useState([
    {
      id: 1,
      title: 'Calm Down Remix',
      artist: 'Rema ft Selena Gomez',
      duration: '3:42',
      image: Rema,
    },
    {
      id: 2,
      title: 'Laho remix',
      artist: 'Burna Boy',
      duration: '2:58',
      image: Burnaboy2,
    },
    {
      id: 3,
      title: 'Brown Skin',
      artist: 'Wizkid',
      image: Wizkid2,
      duration: '2:58',
    },
    {
      id: 4,
      title: 'Obapiano',
      artist: 'Shallipopi',
      image: Shallipop,
      duration: '3:18',
    },
  ])
  const { currentSong } = useMusic();
  const currentSongId = 1;
  return (
    <div className='rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0, .35) p-6 h-full'>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Up next
        </h2>
        <span className='text-gray-400'>
          {queue.length} Songs
        </span>
      </div>
      <div className="space-y-3 max-h-137.2 overflow-y-auto pr-2">
        {queue.map((song) => (
          <motion.div
            key={song.id === currentSong?.id}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center gap-4 rounded-2xl p-3 cursor-pointer transition ${currentSongId === song.id ? "bg-green-500/20 border-green-500" : "hover:bg-white/10"
              }`}
          >
            <img src={song.image} alt={song.title} className="h-16 w-16 rounded-xl object-cover" />
            <div className="flex-1 overflow-hidden">
              <h3 className="truncate font-semibold text-yellow-400">
                {song.title}
              </h3>
              <p className="truncate text-sm text-gray-400">
                {song.artist}
              </p>
            </div>
            {currentSongId === song.id && 
            (
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              </div>
            )}
            <span className="text-sm text-gray-400">
              {song.duration}
            </span>
          </motion.div>
        ))}
      </div>
      {/* Empty Queue */}
      {queue.length === 0 && (
        <div className="py-16 text-center">
          <FiMusic className='mx-auto text-5xl text-gray-500' />
          <p className='mt-4 text-gray-400'>
            No songs in queue
          </p>
        </div>
      )}
    </div>
  )
}

export default Queue