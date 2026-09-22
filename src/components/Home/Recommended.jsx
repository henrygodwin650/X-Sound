import React from "react";
import { motion } from "framer-motion";

import {
  FaPlay,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import Davido from '../../assets/cover-image/download (4).jpeg'
import Burnaboy2 from '../../assets/cover-image/images (5).jpeg'
import Wizkid2 from '../../assets/cover-image/images (12).jpeg'
import Ayra1 from '../../assets/cover-image/images (16).jpeg'
import Phyno from '../../assets/cover-image/images (28).jpeg'

const songs = [
  {
    id: 1,
    title: "With you",
    artist: "Davido",
    image: Davido,
    duration: "3:45",
    liked: true,
  },
  {
    id: 2,
    title: "Rush",
    artist: "Ayra Starr",
    image: Ayra1,
    duration: "3:18",
    liked: false,
  },
  {
    id: 3,
    title: "Essence",
    artist: "Wizkid",
    image: Wizkid2,
    duration: "4:08",
    liked: true,
  },
  {
    id: 4,
    title: "Ojemba",
    artist: "Phyno",
    image: Phyno,
    duration: "2:58",
    liked: false,
  },
  {
    id: 5,
    title: "Last Last",
    artist: "Burna Boy",
    image: Burnaboy2,
    duration: "3:40",
    liked: false,
  },
];
const Recommended = () => {

  return (

    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">

          Recommended For You

        </h2>

        <button className="text-green-400">

          View All

        </button>

      </div>

      <div
        className="
        flex
        gap-6
        overflow-x-auto
        pb-3
        scrollbar-hide
        "
      >
        {songs.map((song) => (

          <motion.div

            key={song.id}

            whilehover={{
              y: -8,
            }}

            className="min-w-[250px]rounded-3xlborderborder-white/10bg-white/10
backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)]p-5backdrop-blur-xl"
          >

            <div className="relative overflow-hidden rounded-2xl">

              <img
                src={song.image}
                alt={song.title}
                className=" h-56 w-full object-cover transition duration-500 hover:scale-110 "
              />

              <button
                className=" absolute bottom-4 right-4 rounded-full bg-green-500 p-4 text-white shadow-xl"
              >

                <FaPlay />

              </button>

            </div>
            <div className="mt-5">

              <h3 className="text-xl font-bold text-white">

                {song.title}`

              </h3>

              <p className="mt-1 text-gray-400">

                {song.artist}

              </p>

              <div className="mt-5 flex items-center justify-between">

                <span className="text-sm text-gray-500">

                  {song.duration}

                </span>

                <button>

                  {song.liked
                    ? (
                      <FaHeart className="text-red-500 text-xl" />
                    )
                    : (
                      <FaRegHeart className="text-gray-400 text-xl" />
                    )}

                </button>

              </div>

            </div>

          </motion.div>

        ))}
      </div>

    </section>

  );

};

export default Recommended;