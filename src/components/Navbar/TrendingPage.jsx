import React, { useEffect, useState } from 'react'
import Rema from '../../assets/cover-image/download.jpeg'
import Burna from '../../assets/cover-image/download (1).jpeg'
import Wizkid1 from '../../assets/cover-image/download (2).jpeg'
import Ayra from '../../assets/cover-image/download (3).jpeg'
import Davido from '../../assets/cover-image/download (4).jpeg'
import Jeriq from '../../assets/cover-image/download (5).jpeg'
import Rema1 from '../../assets/cover-image/images (1).jpeg'
import Rema2 from '../../assets/cover-image/images (2).jpeg'
import Rema3 from '../../assets/cover-image/images (3).jpeg'
import Burna2 from '../../assets/cover-image/images (4).jpeg'
import Burna1 from '../../assets/cover-image/images (5).jpeg'
import Omah1 from '../../assets/cover-image/images (6).jpeg'
import Omah2 from '../../assets/cover-image/images (7).jpeg'
import Omah3 from '../../assets/cover-image/images (8).jpeg'
import Omah4 from '../../assets/cover-image/images (9).jpeg'
import Omah5 from '../../assets/cover-image/images (10).jpeg'
import Wizkid from '../../assets/cover-image/images (11).jpeg'
import Wizkid2 from '../../assets/cover-image/images (12).jpeg'
import Wizkid3 from '../../assets/cover-image/images (13).jpeg'
import Udoma1 from '../../assets/cover-image/images (14).jpeg'
import Udoma2 from '../../assets/cover-image/images (15).jpeg'
import Ayra1 from '../../assets/cover-image/images (16).jpeg'
import Ayra2 from '../../assets/cover-image/images (17).jpeg'
import Ayra3 from '../../assets/cover-image/images (18).jpeg'
import Davido1 from '../../assets/cover-image/images (19).jpeg'
import Davido2 from '../../assets/cover-image/images (20).jpeg'
import Davido3 from '../../assets/cover-image/images (21).jpeg'
import Jeriq3 from '../../assets/cover-image/images (22).jpeg'
import Evado from '../../assets/cover-image/images (23).jpeg'
import Jeriq1 from '../../assets/cover-image/images (24).jpeg'
import Jeriq2 from '../../assets/cover-image/images (25).jpeg'
import Phyno from '../../assets/cover-image/images (26).jpeg'
import Phyno1 from '../../assets/cover-image/images (27).jpeg'
import Phyno2 from '../../assets/cover-image/images (28).jpeg'
import Phyno3 from '../../assets/cover-image/images (29).jpeg'
import Shallipop from '../../assets/cover-image/images (30).jpeg'
import Shallipop1 from '../../assets/cover-image/images (31).jpeg'
import Evado1 from '../../assets/cover-image/images (32).jpeg'
import Evado2 from '../../assets/cover-image/images (33).jpeg'
import Evado3 from '../../assets/cover-image/images (34).jpeg'
import Rema4 from '../../assets/cover-image/images.jpeg'
import MusicCardSkeleton from '../Skeleton/MusicCardSkeleton'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaPlay, FaRegHeart } from 'react-icons/fa'
import { FiClock, FiMoreHorizontal, FiTrendingUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const trendingData = [

  {
    id: 1,
    title: "Kese",
    artist: "Wizkid",
    album: "After Hours",
    genre: "Pop",
    duration: "3:20",
    cover: Wizkid2,
    audio: "",
    plays: 12458390,
    likes: 2580000,
    trending: true,
    recent: true,
  },

  {
    id: 2,
    title: "Calm Down",
    artist: "Rema",
    album: "Rave & Roses",
    genre: "Afrobeats",
    duration: "3:59",
    cover: Rema,
    audio: "",
    plays: 9321456,
    likes: 1850000,
    trending: true,
    recent: false,
  },

  {
    id: 3,
    title: "Unavailable",
    artist: "Davido",
    album: "Timeless",
    genre: "Pop",
    duration: "3:21",
    cover: Davido,
    audio: "",
    plays: 8754321,
    likes: 1320000,
    trending: false,
    recent: true,
  },

  {
    id: 4,
    title: "By Now",
    artist: "Evado",
    album: "Still Drunk in Pain",
    genre: "R&B",
    duration: "4:20",
    cover: Evado,
    audio: "",
    plays: 6542389,
    likes: 980000,
    trending: true,
    recent: false,
  },

  {
    id: 5,
    title: "Last Last",
    artist: "Burna Boy",
    album: "Love, Damini",
    genre: "Afrobeats",
    duration: "2:53",
    cover: Burna1,
    audio: "",
    plays: 5123480,
    likes: 820000,
    trending: true,
    recent: true,
  },

  {
    id: 6,
    title: "Uzo Ano",
    artist: "Phyno",
    album: "NO GUTS",
    genre: "Pop",
    duration: "2:48",
    cover: Phyno,
    audio: "",
    plays: 11452344,
    likes: 2360000,
    trending: true,
    recent: false,
  },

  {
    id: 7,
    title: "Rush",
    artist: "Ayra Starr",
    album: "Rush EP",
    genre: "Afrobeats",
    duration: "3:04",
    cover: Ayra1,
    audio: "",
    plays: 4215400,
    likes: 650000,
    trending: false,
    recent: true,
  },

  {
    id: 8,
    title: "Clarity Of Mind",
    artist: "Omah Lay",
    album: "",
    genre: "Pop",
    duration: "2:36",
    cover: Omah2,
    audio: "",
    plays: 7421300,
    likes: 1200000,
    trending: true,
    recent: false,
  },
  {
    id: 9,
    title: "Akpofegom",
    artist: "Jeriq",
    album: "",
    genre: "Pop",
    duration: "2:36",
    cover: Jeriq,
    audio: "",
    plays: 7421300,
    likes: 1200000,
    trending: true,
    recent: false,
  },
  {
    id: 10,
    title: "Wind of Glory",
    artist: "Chinyere Udoma",
    album: "",
    genre: "Gospel",
    duration: "5:36",
    cover: Udoma1,
    audio: "",
    plays: 7421300,
    likes: 1200000,
    trending: true,
    recent: false,
  },
  {
    id: 11,
    title: "Laho",
    artist: "Shallipopi",
    album: "",
    genre: "Pop",
    duration: "2:36",
    cover: Shallipop,
    audio: "",
    plays: 7421300,
    likes: 1200000,
    trending: true,
    recent: false,
  },
  {
    id: 11,
    title: "Ofeke",
    artist: "Phyno",
    album: "",
    genre: "Pop",
    duration: "2:36",
    cover: Phyno3,
    audio: "",
    plays: 7421300,
    likes: 1200000,
    trending: true,
    recent: false,
  },
];


const TrendingPage = ({
  trendingSongs,
  playSong,
  song
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const trendingMusic = trendingData.filter(
    (music) => music.trending
  );

  return (
    <div className='hero-bg-color p-5'>
      <div className="">
        <div className="flex items-center justify-center mb-8 mt-4">
          <span className="mb-4 text-center mt-16 inline-flex w-fit px-5 gap-4 py-4 text-white text-5xl font-semibold">
            <FiTrendingUp className="text-green-500" />
            Trending Songs
          </span>
        </div>
        {loading ? (<MusicCardSkeleton />) : (
          <div
            className=" grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
          >
            {trendingMusic.map((music) => (
              <motion.div
                key={music.id}
                whilehover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className=" group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] border border-white/10 transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_0_25px_rgba(34,197,94,.25)] "
              >
                {/* Cover */}

                <div className="relative overflow-hidden">

                  <img
                    src={music.cover}
                    alt={music.title}
                    className=" h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110 "
                  />

                  {/* linear */}

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />

                  {/* Play Button */}

                  <motion.button
                    whiletap={{ scale: 0.9 }}
                    className=" absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-xl text-white opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 "
                    onClick={() => playSong(song, trendingSongs)}
                  >
                    <FaPlay className="ml-1" />
                  </motion.button>

                </div>

                {/* Content */}

                <div className="space-y-3 p-5">

                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="truncate text-lg font-bold text-white">
                        {music.title}
                      </h3>

                      <p className="text-sm text-gray-400">
                        {music.artist}
                      </p>

                    </div>

                    <button className="text-gray-400 hover:text-white">
                      <FiMoreHorizontal />
                    </button>

                  </div>

                  {/* Album */}

                  <p className="truncate text-sm text-gray-500">
                    {music.album}
                  </p>

                  {/* Footer */}

                  <div className="flex items-center justify-between">

                    <span
                      className="
            rounded-full
            bg-green-500/20
            px-3
            py-1
            text-xs
            font-medium
            text-green-400
            "
                    >
                      {music.genre}
                    </span>

                    <div className="flex items-center gap-4">

                      <div className="flex items-center gap-1 text-gray-400">

                        <FiClock />

                        <span className="text-xs">
                          {music.duration}
                        </span>

                      </div>

                      <button className="text-red-400 hover:scale-110 transition">
                        <FaRegHeart />
                      </button>

                    </div>

                  </div>

                </div>

                {/* Trending Badge */}

                <div className="absolute left-4 top-4 z-20">

                  {music.recent ? (

                    <span
                      className="
      rounded-full
      bg-blue-500
      px-3
      py-1
      text-xs
      font-semibold
      text-white
      "
                    >
                      🆕 New
                    </span>

                  ) : music.trending ? (

                    <span
                      className="
      rounded-full
      bg-green-500
      px-3
      py-1
      text-xs
      font-semibold
      text-white
      "
                    >
                      🔥 Trending
                    </span>

                  ) : null}

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TrendingPage