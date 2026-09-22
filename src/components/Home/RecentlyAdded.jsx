import React from "react";
import { FiClock } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";

import musicData from "../Home/MusicData";
import MusicCard from "../Cards/MusicCard";
import { Link } from "react-router-dom";

const RecentlyAdded = () => {
  const recentMusic = musicData.filter(
    (music) => music.recent
  );

  return (
    <section className="mt-16">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <FiClock className="text-3xl text-green-400" />

            <h2 className="text-3xl font-bold text-white">
              Recently Added
            </h2>

          </div>

          <p className="mt-2 text-gray-400">
            Fresh songs added to XSound.
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
          <Link to='/recent-page' className="flex items-center justify-center gap-3">
            View All

            <FaArrowRight />
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
        {recentMusic.map((music) => (
          <div
            key={music.id}
            className="relative"
          >

            <MusicCard music={music} />

          </div>
        ))}
      </div>

    </section>
  );
};

export default RecentlyAdded;