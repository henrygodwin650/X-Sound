import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import Davido from '../../assets/cover-image/images (19).jpeg'
import Burnaboy2 from '../../assets/cover-image/images (4).jpeg'
import Wizkid2 from '../../assets/cover-image/images (13).jpeg'
import Ayra1 from '../../assets/cover-image/images (17).jpeg'
import Phyno from '../../assets/cover-image/images (27).jpeg'

const artists = [
  {
    id: 1,
    name: "Phyno",
    listeners: "110M",
    image: Phyno,
  },
  {
    id: 2,
    name: "Davido",
    listeners: "85M",
    image: Davido,
  },
  {
    id: 3,
    name: "Wizkid",
    listeners: "42M",
    image: Wizkid2,
  },
  {
    id: 4,
    name: "Burna Boy",
    listeners: "51M",
    image: Burnaboy2,
  },
  {
    id: 5,
    name: "Ayra Starr",
    listeners: "35M",
    image: Ayra1,
  },
];

const PopularArtists = () => {
  return (
    <section className="mt-14">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">
          Popular Artists
        </h2>

        <button className="text-green-400 hover:text-green-300">
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

        {artists.map((artist) => (

          <motion.div
            key={artist.id}
            whilehover={{
              y: -8,
              scale: 1.03,
            }}
            className="
            min-w-[220px]
            rounded-3xl
            border
            border-white/10
            bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)]
            p-6
            "
          >

            <img
              src={artist.image}
              alt={artist.name}
              className="
              mx-auto
              h-36
              w-36
              rounded-full
              object-cover
              ring-4
              ring-green-500
              "
            />

            <div className="mt-5 text-center">

              <div className="flex items-center justify-center gap-2">

                <h3 className="text-xl font-bold text-white">
                  {artist.name}
                </h3>

                <FaCheckCircle className="text-green-400" />

              </div>

              <p className="mt-2 text-sm text-gray-400">
                {artist.listeners} Monthly Listeners
              </p>

              <button
                className="
                mt-5
                rounded-full
                bg-green-500
                px-6
                py-2
                font-semibold
                text-white
                transition
                hover:scale-105
                "
              >
                Follow
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
};

export default PopularArtists;