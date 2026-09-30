import React from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaHeart,
  FaStar,
} from "react-icons/fa";

import {useHomeMusic} from "../../Hooks/useHomeMusic";
import useMusic from "../../Hooks/useMusic";

const TopAlbums = () => {
  const { music, loading } = useHomeMusic();
  const { playSong } = useMusic();

  const albums = Array.from(
    new Map(
      music
        .filter((song) => song.albumId)
        .map((song) => [
          song.albumId,
          {
            id: song.albumId,
            title: song.album,
            artist: song.artist,
            image: song.cover,
            song,
          },
        ])
    ).values()
  ).slice(0, 8);

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

      {loading ? (
        <div className="py-10 text-center text-gray-400">
          Loading albums...
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

          {albums.map((album) => (

            <motion.div
              key={album.id}
              whileHover={{ y: -10 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_15px_40px_rgba(0,0,0,.25)] backdrop-blur-3xl"
            >

              <div className="relative">

                <img
                  src={album.image}
                  alt={album.title}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">

                  <button
                    onClick={() =>
                      playSong(album.song, music)
                    }
                    className="rounded-full bg-green-500 p-5 text-white shadow-xl"
                  >
                    <FaPlay />
                  </button>

                </div>

                <button className="absolute right-4 top-4 rounded-full bg-black/60 p-3 text-red-400">
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
                      Jamendo
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
      )}

    </section>
  );
};

export default TopAlbums;