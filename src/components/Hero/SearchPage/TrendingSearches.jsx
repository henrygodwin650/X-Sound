import { motion } from "framer-motion";
import React from "react";
import { FiTrendingUp } from "react-icons/fi";

const trending = [
  {
    id: 1,
    title: "Burna Boy",
  },
  {
    id: 2,
    title: "Wizkid",
  },
  {
    id: 3,
    title: "Phyno",
  },
  {
    id: 4,
    title: "Evado",
  },
  {
    id: 5,
    title: "Rema",
  },
  {
    id: 6,
    title: "Omah Lay",
  },
  {
    id: 7,
    title: "Chinyere Udoma",
  },
  {
    id: 8,
    title: "Davido",
  },
  {
    id: 9,
    title: "Ayra Starr",
  },
  {
    id: 10,
    title: "Jeriq",
  },
];

const TrendingSearches = ({ setSearch }) => {
  return (
    <div className="mb-12">
      <div className="mb-5 flex items-center gap-3">
        <FiTrendingUp className="text-2xl text-green-500" />

        <h2 className="text-2xl font-bold text-white">
          Trending Searches
        </h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {trending.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              scale: 1.06,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => setSearch(item.title)}
            className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-gray-200 backdrop-blur-3xl transition hover:bg-green-500 hover:text-white"
          >
            <p className="font-bold">#{item.title}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TrendingSearches;