import React from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaHeart,
  FaStar,
} from "react-icons/fa";

import Evado from '../../assets/cover-image/images (34).jpeg'
import Rema from '../../assets/cover-image/images (2).jpeg'
import OmahLay from '../../assets/cover-image/images (7).jpeg'
import ChinyereUdoma from '../../assets/cover-image/images (15).jpeg'
import Jeriq from '../../assets/cover-image/images (22).jpeg'

const albums = [
  {
    id: 1,
    title: "Wind of glory",
    artist: "Chinyere Udoma",
    image: ChinyereUdoma,
    rating: 4.9,
  },
  {
    id: 2,
    title: "Calm Down",
    artist: "Rema",
    image: Rema,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Wasteman",
    artist: "Evado",
    image: Evado,
    rating: 5.0,
  },
  {
    id: 4,
    title: "Active",
    artist: "Jeriq",
    image: Jeriq,
    rating: 4.7,
  },
];

const TopAlbums = () => {
  return (
    <section className="mt-16">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">
          Top Albums
        </h2>

        <button className="text-green-400 hover:text-green-300">
          View All
        </button>

      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

        {albums.map((album) => (

          <motion.div
            key={album.id}
            whilehover={{ y: -10 }}
            className="
            group
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/10
backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)]
            backdrop-blur-xl
            "
          >
            <div className="relative">

              <img
                src={album.image}
                alt={album.title}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div
                className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-black/50
                opacity-0
                transition
                group-hover:opacity-100
                "
              >

                <button
                  className="
                  rounded-full
                  bg-green-500
                  p-5
                  text-white
                  shadow-xl
                  transition
                  hover:scale-110
                  "
                >
                  <FaPlay />
                </button>

              </div>

              <button
                className="
                absolute
                right-4
                top-4
                rounded-full
                bg-black/60
                p-3
                text-red-400
                "
              >
                <FaHeart />
              </button>

            </div>
            <div className="p-5">

              <h3 className="text-xl font-bold text-white">
                {album.title}
              </h3>

              <p className="mt-1 text-gray-400">
                {album.artist}
              </p>

              <div className="mt-4 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <FaStar className="text-yellow-400" />

                  <span className="text-white">
                    {album.rating}
                  </span>

                </div>

                <span className="text-sm text-green-400">
                  Album
                </span>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
};

export default TopAlbums;