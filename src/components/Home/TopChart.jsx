import React from "react";
import { motion } from "framer-motion";

import {
  FaPlay,
  FaFire,
} from "react-icons/fa";

import {
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import Ayra1 from '../../assets/cover-image/images (16).jpeg'
import Rema from '../../assets/cover-image/images (1).jpeg'
import Davido from '../../assets/cover-image/download (4).jpeg'
import Burnaboy2 from '../../assets/cover-image/images (5).jpeg'
import Wizkid2 from '../../assets/cover-image/images (12).jpeg'


const charts = [
  {
    id: 1,
    rank: 1,
    title: "Calm Down",
    artist: "Rema",
    image: Rema,
    streams: "12.5M",
    trend: "up",
  },
  {
    id: 2,
    rank: 2,
    title: "Rush",
    artist: "Ayra Starr",
    image: Ayra1,
    streams: "10.8M",
    trend: "up",
  },
  {
    id: 3,
    rank: 3,
    title: "Last Last",
    artist: "Burna Boy",
    image: Burnaboy2,
    streams: "9.3M",
    trend: "down",
  },
  {
    id: 4,
    rank: 4,
    title: "Unavailable",
    artist: "Davido",
    image: Davido,
    streams: "8.7M",
    trend: "up",
  },
  {
    id: 5,
    rank: 5,
    title: "Essence",
    artist: "Wizkid",
    image: Wizkid2,
    streams: "8.1M",
    trend: "down",
  },
];
const TopCharts = () => {
  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="flex items-center gap-3 text-3xl font-black text-white">

          <FaFire className="text-orange-500" />

          Top Charts

        </h2>

        <button className="text-green-400 hover:text-green-300">

          View All

        </button>

      </div>

      <div className="space-y-4">
        {charts.map((song) => (
          <motion.div

            key={song.id}

            whilehover={{
              scale: 1.02
            }}

            className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] p-5 transition "

          >

            <div
              className="sm:flex hidden h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-xl font-black text-white "
            >

              #{song.rank}

            </div>

            <img

              src={song.image}

              alt={song.title}

              className="h-20 w-20 rounded-2xl object-cover"
            />
            <div className="flex-1">

              <h3 className="text-xl font-bold text-white">

                {song.title}

              </h3>

              <p className="mt-1 text-gray-400">

                {song.artist}

              </p>

            </div>

            <div className="hidden md:block">

              <p className="text-gray-300">

                {song.streams}

              </p>

              <p className="text-xs text-gray-500">

                Streams

              </p>

            </div>
            <div>

              {song.trend === "up" ? (

                <div className="flex items-center gap-2 text-green-500">

                  <FiTrendingUp />

                  Up

                </div>

              ) : (

                <div className="flex items-center gap-2 text-red-500">

                  <FiTrendingDown />

                  Down

                </div>

              )}

            </div>
            <button
              className="hidden sm:flex ml-6 rounded-full bg-green-500 p-4 text-white transition hover:scale-110 "
            >

              <FaPlay />

            </button>

          </motion.div>

        ))}
      </div>

    </section>
  );
};

export default TopCharts;