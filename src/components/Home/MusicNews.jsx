import React from "react";
import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";
import Rema from '../../assets/cover-image/images (1).jpeg'
import Burnaboy2 from '../../assets/cover-image/images (5).jpeg'
import Ayra1 from '../../assets/cover-image/images (16).jpeg'
const news = [
  {
    id: 1,
    title: "Rema announces a new world tour",
    date: "July 2026",
    image: Rema,
    category: "Concert",
  },
  {
    id: 2,
    title: "Burna Boy drops a surprise album",
    date: "Yesterday",
    image: Burnaboy2,
    category: "Album",
  },
  {
    id: 3,
    title: "Ayra Starr tops global charts",
    date: "2 days ago",
    image: Ayra1,
    category: "Trending",
  },
];

const MusicNews = () => {

  return (

    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black text-white">

          Music News

        </h2>

        <button className="text-green-400">

          View All

        </button>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {news.map((item) => (

          <motion.div

            key={item.id}

            whilehover={{
              y: -8
            }}

            className="
overflow-hidden
rounded-3xl
border
border-white/10
bg-white/10
backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)]
backdrop-blur-xl
"

          >

            <div className="overflow-hidden">

              <img

                src={item.image}

                alt={item.title}

                className="
h-60
w-full
object-cover
transition
duration-500
hover:scale-110
"
              />

            </div>
            <div className="p-6">

              <span
                className="
rounded-full
bg-green-500/20
px-3
py-1
text-sm
font-semibold
text-green-400
"
              >

                {item.category}

              </span>

              <h3 className="mt-4 text-2xl font-bold text-white">

                {item.title}

              </h3>

              <div className="mt-5 flex items-center gap-2 text-gray-400">

                <FaCalendarAlt />

                {item.date}

              </div>
              <button
                className="
mt-6
flex
items-center
gap-3
font-semibold
text-green-400
transition
hover:gap-5
"
              >

                Read More

                <FaArrowRight />

              </button>

            </div>

          </motion.div>

        ))}
      </div>

    </section>

  );

};

export default MusicNews;