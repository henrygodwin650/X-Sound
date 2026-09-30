import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaMusic,
  FaHeadphones,
  FaGlobe,
} from "react-icons/fa";

const news = [
  {
    id: 1,
    title: "Discover new independent music",
    description:
      "Explore music from artists available through the Jamendo catalog.",
    category: "Discover",
    icon: FaMusic,
  },
  {
    id: 2,
    title: "Stream music online",
    description:
      "XSound streams music directly from online sources without storing downloaded tracks.",
    category: "Streaming",
    icon: FaHeadphones,
  },
  {
    id: 3,
    title: "Music from around the world",
    description:
      "Explore different artists, albums and genres from the Jamendo catalog.",
    category: "Explore",
    icon: FaGlobe,
  },
];

const MusicNews = () => {
  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">
          XSound Updates
        </h2>

        <button className="text-green-400">
          View All
        </button>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {news.map((item) => {

          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_15px_40px_rgba(0,0,0,.25)] backdrop-blur-3xl"
            >

              <div className="flex h-60 items-center justify-center bg-linear-to-br from-green-500/20 via-emerald-500/10 to-black">

                <Icon className="text-7xl text-green-400/60" />

              </div>

              <div className="p-6">

                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-400">
                  {item.category}
                </span>

                <h3 className="mt-4 text-2xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-gray-400">
                  <FaCalendarAlt />
                  XSound
                </div>

                <button className="mt-6 flex items-center gap-3 font-semibold text-green-400 transition hover:gap-5">
                  Explore
                  <FaArrowRight />
                </button>

              </div>

            </motion.div>
          );
        })}

      </div>

    </section>
  );
};

export default MusicNews;