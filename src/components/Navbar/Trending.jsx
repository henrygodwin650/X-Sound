import React from "react";
import musicData from "../Home/MusicData";
import MusicCard from "../Cards/MusicCard";

import { FiTrendingUp } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Trending = () => {
  const trendingMusic = musicData.filter(
    (music) => music.trending
  );

  return (
    <section className="mt-10">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <FiTrendingUp className="text-3xl text-green-400" />

            <h2 className="text-3xl font-bold text-white">
              Trending
            </h2>

          </div>

          <p className="mt-2 text-gray-400">
            The hottest tracks people are listening to right now.
          </p>

        </div>

        <button
          className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-green-500/30
          px-5
          py-3
          text-green-400
          transition
          hover:bg-green-500
          hover:text-white
          "
          whilehover={{
            scale: 1.08
          }}

          whiletap={{
            scale: .95
          }}
        >
          <Link to="/trending-page" className="flex items-center justify-center gap-3">
            View All

            <FaArrowRight  className="flex"/>
          </Link>
        </button>

      </div>

      {/* Music Grid */}

      <div
        className="
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        "
      >
        {trendingMusic.map((music) => (

          <MusicCard
            key={music.id}
            music={music}
          />

        ))}
      </div>

    </section>
  );
};

export default Trending;