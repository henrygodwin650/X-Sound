import React from "react";
import Header from "./Header";

import {
  FaArrowRight,
  FaSearch,
} from "react-icons/fa";

import { FaBookOpen } from "react-icons/fa6";

import Image1 from '/images/xsound_blog_artist_story.png'
import Image2 from "/images/xsound_blog_hero.png"
import Image3 from "/images/xsound_blog_new_releases.png"
import Image4 from '/images/xsound_blog_afrobeats.png'
import Image6 from "/images/xsound_blog_playlist_tips.png"

const Blog = () => {
  return (
   <div
      id="Contact"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#020d0b]
        text-white
      "
    >
      {/* ================= GREEN SMOKE BACKGROUND ================= */}
      <div
        className="
           pointer-events-none
    absolute
    inset-0
    z-0
          bg-[url('/images/ChatGPT%20Image%20Sep%2026,%202026,%2010_17_55%20PM.png')]
          bg-cover
    bg-[center_center]
    bg-no-repeat
    opacity-40
    sm:bg-center
    lg:bg-[center_left]
        "
      />

      {/* Dark overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-[#020d0b]/80
        "
      />

      {/* Green glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-1/4
          z-0
          h-72
          w-72
          rounded-full
          bg-green-500/10
          blur-[120px]
          sm:h-96
          sm:w-96
        "
      />

      {/* ================= CONTENT ================= */}
      <div className='relative z-10' >
      <Header />

      {/* ================= HERO ================= */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 pb-10 pt-24 lg:flex-row lg:gap-16 lg:px-12">

        {/* ================= LEFT SIDE ================= */}
        <div className="flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">

          {/* Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-gray-200 backdrop-blur-md">
              <FaBookOpen className="text-green-400" />

              <span>Our Blog</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Music. Culture.

            <span className="block bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Real Stories.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            Explore the latest music trends, artist stories, tips, and
            insights — all in one place. Stay inspired, stay connected
            with the X-sound blog.
          </p>

          {/* Search */}
          <div className="mt-6 flex w-full max-w-md items-center rounded-full border border-green-500/40 bg-white/5 p-1 backdrop-blur-md">

            <FaSearch className="ml-4 text-green-400" />

            <input
              type="text"
              placeholder="Search articles..."
              className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-gray-500"
            />

            <button
              className="flex h-11 w-11 items-center justify-center rounded-full bg-green-400 text-black transition duration-300 hover:bg-green-300 hover:scale-105"
            >
              <FaArrowRight />
            </button>

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="relative flex w-full max-w-xl items-center justify-center">

          {/* Green Glow */}
          <div className="absolute h-72 w-72 rounded-full bg-green-500/20 blur-[100px] sm:h-96 sm:w-96" />

          {/* Blog Hero Image */}
          <img
            src={Image2}
            alt="X-sound music blog"
            className="relative z-10 h-auto w-full max-w-[600px] rounded-2xl object-cover shadow-2xl shadow-green-900/20"
          />

        </div>

      </section>


      {/* ================= LATEST ARTICLES ================= */}
      <section className="border-t border-white/5 bg-[#020d0b] px-6 py-16">

        <div className="mx-auto max-w-6xl">

          {/* Section Header */}
          <div className="mb-10 flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-green-400">
                X-SOUND BLOG
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Latest Articles
              </h2>
            </div>

            <button className="hidden items-center gap-2 text-sm font-semibold text-green-400 transition hover:text-green-300 sm:flex">
              View All Blogs
              <FaArrowRight />
            </button>

          </div>


          {/* Article Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Article 1 */}
            <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-green-500/40">

              <img
                src={Image4}
                alt="Afrobeats"
                className="h-48 w-full object-cover"
              />

              <div className="p-5">

                <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  Music Trends
                </span>

                <h3 className="mt-4 text-lg font-bold">
                  The Rise of Afrobeats
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Discover how Afrobeats became a global movement
                  and continues to influence music around the world.
                </p>

                <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-400">
                  Read More
                  <FaArrowRight />
                </button>

              </div>

            </article>


            {/* Article 2 */}
            <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-green-500/40">

              <img
                src={Image1}
                alt="Artist story"
                className="h-48 w-full object-cover"
              />

              <div className="p-5">

                <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  Artist Stories
                </span>

                <h3 className="mt-4 text-lg font-bold">
                  From Bedroom to Billboard
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Explore the journey of artists who turned their
                  dreams into global music careers.
                </p>

                <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-400">
                  Read More
                  <FaArrowRight />
                </button>

              </div>

            </article>


            {/* Article 3 */}
            <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-green-500/40">

              <img
                src={Image6}
                alt="Music playlist"
                className="h-48 w-full object-cover"
              />

              <div className="p-5">

                <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  Tips & Guides
                </span>

                <h3 className="mt-4 text-lg font-bold">
                  Build the Perfect Music Playlist
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Learn how to create playlists that match your
                  mood, activity, and favorite sounds.
                </p>

                <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-400">
                  Read More
                  <FaArrowRight />
                </button>

              </div>

            </article>


            {/* Article 4 */}
            <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-green-500/40">

              <img
                src={Image3}
                alt="New music releases"
                className="h-48 w-full object-cover"
              />

              <div className="p-5">

                <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  New Releases
                </span>

                <h3 className="mt-4 text-lg font-bold">
                  New Music You Shouldn't Miss
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Discover fresh sounds and new releases from
                  emerging and established artists.
                </p>

                <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-400">
                  Read More
                  <FaArrowRight />
                </button>

              </div>

            </article>

          </div>

        </div>

      </section>
      </div>

    </div>
  );
};

export default Blog;
