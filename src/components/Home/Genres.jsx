import React from "react";
import { motion } from "framer-motion";

import {
  FaMusic,
  FaGuitar,
  FaDrum,
  FaHeadphones,
  FaMicrophone,
  FaCompactDisc,
  FaFire,
  FaHeart,
} from "react-icons/fa";

const genres = [
  {
    id: 1,
    name: "Afrobeats",
    icon: FaFire,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    name: "Hip Hop",
    icon: FaMicrophone,
    color: "from-purple-600 to-indigo-600",
  },
  {
    id: 3,
    name: "Pop",
    icon: FaMusic,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    name: "R&B",
    icon: FaHeart,
    color: "from-red-500 to-pink-600",
  },
  {
    id: 5,
    name: "Rock",
    icon: FaGuitar,
    color: "from-gray-700 to-gray-900",
  },
  {
    id: 6,
    name: "Jazz",
    icon: FaCompactDisc,
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: 7,
    name: "EDM",
    icon: FaHeadphones,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 8,
    name: "Drill",
    icon: FaDrum,
    color: "from-green-500 to-emerald-600",
  },
];

const Genres = () => {
  return (
    <section className="mt-16">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">
          Browse by Genres
        </h2>

        <button className="text-green-400 hover:text-green-300">
          View All
        </button>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {genres.map((genre) => {

          const Icon = genre.icon;

          return (

            <motion.div
              key={genre.id}
              whilehover={{
                y: -10,
                scale: 1.03,
              }}
              whiletap={{
                scale: .97,
              }}
              className={`
    group
    cursor-pointer
    overflow-hidden
    rounded-3xl
    bg-linear-to-br
    ${genre.color}
    p-6
    shadow-xl
    `}
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-2xl font-black text-white">

                    {genre.name}

                  </h3>

                  <p className="mt-2 text-white/80">

                    Explore Playlist

                  </p>

                </div>

                <motion.div
                  whilehover={{
                    rotate: 15,
                    scale: 1.2,
                  }}
                  className="
        rounded-full
        bg-white/20
        p-5
        backdrop-blur-xl
        "
                >

                  <Icon className="text-3xl text-white" />

                </motion.div>

              </div>

              <div
                className="absolute-right-10-bottom-10h-36w-36rounded-fullbg-white/10blur-2xl"
              />

            </motion.div>

          );

        })}
      </div>

    </section>
  );
};

export default Genres;