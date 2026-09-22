import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import React from 'react'
import Shallipop from '../../assets/cover-image/images (30).jpeg'
import Ayra1 from '../../assets/cover-image/images (16).jpeg'
import Phyno from '../../assets/cover-image/images (28).jpeg'
import Rema from '../../assets/cover-image/images (1).jpeg'
import OmahLay from '../../assets/cover-image/images (7).jpeg'

const recentSongs = [
  {
    id: 1,
    title: "Can't relate",
    artist: "Omah Lay",
    image: OmahLay,
    progress: 72,
    duration: "4:13",
  },
  {
    id: 2,
    title: "Dumebi",
    artist: "Rema",
    image: Rema,
    progress: 43,
    duration: "3:58",
  },
  {
    id: 3,
    title: "Rush",
    artist: "Ayra Starr",
    image: Ayra1,
    progress: 91,
    duration: "3:31",
  },
  {
    id: 4,
    title: "Do I",
    artist: "Phyno",
    image: Phyno,
    progress: 28,
    duration: "3:46",
  },
];

const ContinueListening = () => {
  return (
    <section className="mt-16">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">
          Continue Listening
        </h2>

        <button className="text-green-400">
          View All
        </button>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {recentSongs.map((song) => (
          <motion.div
            key={song.id}
            whilehover={{
               y: -5 
              }}
            className="flex gap-5 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] p-5 "
          >

            <img
              src={song.image}
              alt={song.title}
              className=" h-28 w-28 rounded-2xl object-cover "
            />

            <div className="flex flex-1 flex-col justify-center">

              <h3 className="text-xl font-bold text-white">
                {song.title}
              </h3>

              <p className="text-gray-400">
                {song.artist}
              </p>

              <div className="mt-4 h-2 rounded-full bg-white/10">

                <div
                  style={{
                    width: `${song.progress}%`,
                  }}
                  className="
                h-full
                rounded-full
                bg-green-500
                "
                />

              </div>

              <div className="mt-3 flex justify-between text-sm text-gray-400">

                <span>{song.progress}%</span>

                <span>{song.duration}</span>

              </div>

            </div>

            <button
              className=" self-center rounded-full bg-green-500 p-4 text-white "
            >

              <FaPlay />

            </button>

          </motion.div>

        ))}
      </div>

    </section>
  );
};

export default ContinueListening;