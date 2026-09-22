import React from "react";
import { motion } from "framer-motion";
import Evado from '../../assets/cover-image/images (34).jpeg'
import Rema from '../../assets/cover-image/download.jpeg'
import OmahLay from '../../assets/cover-image/images (9).jpeg'
import ChinyereUdoma from '../../assets/cover-image/images (14).jpeg'
import Jeriq from '../../assets/cover-image/download (5).jpeg'

import {
  FaPlay,
  FaClock,
} from "react-icons/fa";
const recentlyPlayed = [
  {
    id: 1,
    title: "High Praise",
    artist: "Chinyere Udoma",
    album: "After Hours",
    duration: "3:22",
    image: ChinyereUdoma,
  },
  {
    id: 2,
    title: "Calm Down",
    artist: "Rema",
    album: "Rave & Roses",
    duration: "3:39",
    image: Rema,
  },
  {
    id: 3,
    title: "Bad influence",
    artist: "Omah Lay",
    album: "Painless",
    duration: "3:18",
    image: OmahLay,
  },
  {
    id: 4,
    title: "S.O.F",
    artist: "Evado",
    album: "Drunk in Pain",
    duration: "2:57",
    image: Evado,
  },
  {
    id: 5,
    title: "No more Nleka",
    artist: "Jeriq",
    album: "Made In Lagos",
    duration: "4:10",
    image: Jeriq,
  },
];
const RecentlyPlayed = () => {

  return (

    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">

          Recently Played

        </h2>

        <button className="text-green-400">

          View All

        </button>

      </div>

      <div
        className="
overflow-hidden
rounded-3xl
border
border-white/10
bg-white/10
backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)]
backdrop-blur-xl
"
      >
        <div
          className="
grid
grid-cols-[70px_1.8fr_1fr_120px_80px]
items-center
border-b
border-white/10
px-6
py-5
text-sm
uppercase
tracking-widest
text-gray-400
"
        >

          <div>#</div>

          <div>Title</div>

          <div>Album</div>

          <div>Artist</div>

          <div>

            <FaClock />

          </div>

        </div>
        {recentlyPlayed.map((song, index) => (

          <motion.div

            key={song.id}

            whilehover={{
              backgroundColor: "rgba(255,255,255,.05)"
            }}

            className="
grid
grid-cols-[70px_1.8fr_1fr_120px_80px]
items-center
px-6
py-5
transition
"

          >

            <div>

              {index + 1}

            </div>

            <div className="flex items-center gap-4">

              <div className="relative">

                <img

                  src={song.image}

                  alt={song.title}

                  className="
h-16
w-16
rounded-xl
object-cover
"
                />

                <button
                  className="
absolute
inset-0
flex
items-center
justify-center
rounded-xl
bg-black/60
opacity-0
transition
hover:opacity-100
"
                >

                  <FaPlay className="text-white" />

                </button>

              </div>

              <div>

                <h3 className="font-bold text-white">

                  {song.title}

                </h3>

                <p className="text-gray-400">

                  {song.artist}

                </p>

              </div>

            </div>

            <div className="text-gray-300">

              {song.album}

            </div>

            <div className="text-gray-400">

              {song.artist}

            </div>

            <div className="text-gray-400">

              {song.duration}

            </div>

          </motion.div>

        ))}
      </div>

    </section>

  );

};

export default RecentlyPlayed;