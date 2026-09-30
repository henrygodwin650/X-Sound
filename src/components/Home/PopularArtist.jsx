import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

import {useHomeMusic} from "../../Hooks/useHomeMusic";

const PopularArtists = () => {
  const {
    music,
    loading,
  } = useHomeMusic();

  const artists = Array.from(
    new Map(
      music.map((song) => [
        song.artistId || song.artist,
        {
          id: song.artistId || song.artist,
          name: song.artist,
          image: song.cover,
        },
      ])
    ).values()
  ).slice(0, 8);

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

      {loading ? (
        <div className="py-10 text-center text-gray-400">
          Loading artists...
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-3 scrollbar-hide">

          {artists.map((artist) => (

            <motion.div
              key={artist.id}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="min-w-[220px] rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_15px_40px_rgba(0,0,0,.25)] backdrop-blur-3xl"
            >

              <img
                src={artist.image}
                alt={artist.name}
                className="mx-auto h-36 w-36 rounded-full object-cover ring-4 ring-green-500"
              />

              <div className="mt-5 text-center">

                <div className="flex items-center justify-center gap-2">

                  <h3 className="text-xl font-bold text-white">
                    {artist.name}
                  </h3>

                  <FaCheckCircle className="text-green-400" />

                </div>

                <p className="mt-2 text-sm text-gray-400">
                  Jamendo Artist
                </p>

                <button className="mt-5 rounded-full bg-green-500 px-6 py-2 font-semibold text-white transition hover:scale-105">
                  Follow
                </button>

              </div>

            </motion.div>

          ))}

        </div>
      )}

    </section>
  );
};

export default PopularArtists;