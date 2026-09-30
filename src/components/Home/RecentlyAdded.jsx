import React from "react";
import { FiClock } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

import MusicCard from "../Cards/MusicCard";
import {useHomeMusic} from "../../Hooks/useHomeMusic";

const RecentlyAdded = () => {
  const {
    recent,
    loading,
    error,
  } = useHomeMusic();

  return (
    <section className="mt-16">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <div className="flex items-center gap-3">
            <FiClock className="text-3xl text-green-400" />

            <h2 className="text-3xl font-bold text-white">
              Recently Added
            </h2>
          </div>

          <p className="mt-2 text-gray-400">
            Fresh music from Jamendo.
          </p>
        </div>

        <Link
          to="/recent-page"
          className="flex items-center gap-2 rounded-xl border border-green-500/30 px-5 py-3 text-green-400 transition hover:bg-green-500 hover:text-white"
        >
          View All
          <FaArrowRight />
        </Link>

      </div>

      {loading && (
        <div className="py-10 text-center text-gray-400">
          Loading music...
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-500/10 p-5 text-center text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recent.slice(0, 8).map((music) => (
            <MusicCard
              key={music.id}
              music={music}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default RecentlyAdded;