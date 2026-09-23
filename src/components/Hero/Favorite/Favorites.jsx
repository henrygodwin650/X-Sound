import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Favorites = () => {
  return (
    <section className="min-h-screen bg-white px-4 py-8 text-gray-900 dark:bg-zinc-950 dark:text-white md:px-8">
      {/* Header */}
      <div className="mb-8 mt-15">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
            <FaHeart className="h-6 w-6 fill-green-500 text-green-500" />
          </div>

          <div>
            <div className="w-full flex justify-end items-center">
              <div className="">
                <h1 className="text-2xl font-bold">Favorites</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Songs you love
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty state */}
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-6 text-center dark:border-white/10 dark:bg-white/5">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <FaHeart className="h-8 w-8 text-green-500" />
        </div>

        <h2 className="mb-2 text-xl font-semibold">
          No favorite songs yet
        </h2>

        <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">
          Songs you add to your favorites will appear here.
        </p>

        <div className="items-end">
          <Link to="/lyrics" className="text-xl font-bold text-green-500 underline hover:text-green-600 dark:text-green-400 dark:hover:text-green-300">
            Lyrics
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Favorites;