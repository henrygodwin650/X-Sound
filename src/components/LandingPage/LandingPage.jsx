import React from "react";
import Header from "./Header";
import { FaHeadset, FaPlay, FaStar } from "react-icons/fa";
import Image1 from '/images/xsound_phone-player.png'
import Image2 from "/images/xsound_playlist-card-right.png"
import Image3 from "/images/xsound_playlist-card-left.png"
import UsersI from '/images/xsound_user-avatars.png'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#020d0b] text-white">
      <Header />

      {/* ================= HERO ================= */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 pb-10 pt-24 lg:flex-row lg:gap-16 lg:px-12">

        {/* ================= LEFT SIDE ================= */}
        <div className="flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">

          {/* Small Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-gray-200 backdrop-blur-md">
              <FaHeadset className="text-green-400" />

              <span>
                Your Music, Your Vibe
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Discover Music
            <span className="block bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              That Moves You
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            X-sound is your all-in-one music streaming platform.
            Discover your favorite music, explore new artists,
            create playlists, and enjoy your music wherever you go.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            {/* Start Listening */}
            <button className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 px-7 py-3.5 font-bold text-black shadow-lg shadow-green-500/20 transition duration-300 hover:scale-105 hover:shadow-green-500/30">
              <FaPlay className="text-sm" />
              Start Listening
            </button>

            {/* Explore */}
            <button className="rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition duration-300 hover:border-green-400 hover:bg-green-500/10 hover:text-green-400">
              Explore Music
            </button>

          </div>

          {/* Playlist Card */}
          <div className="mt-10 hidden items-center gap-4 sm:flex">

            <img
              src={UsersI} alt=''
              className="h-24 w-36 rounded-xl object-cover shadow-lg shadow-green-900/20"
            />

            <div className='flex flex-col items-center'>
              <div className="flex gap-2 py-2 items-center text-yellow-300">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-sm text-gray-400">
                Featured Playlist
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Good Vibes
              </h3>

              <p className="text-sm text-gray-500">
                Curated for your mood
              </p>
            </div>

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="relative flex w-full max-w-xl items-center justify-center">

          {/* Green Glow */}
          <div className="absolute h-72 w-72 rounded-full bg-green-500/20 blur-[100px] sm:h-96 sm:w-96" />

          {/* Phone */}
          <img
            src={Image1}
            alt="X-sound music player"
            className="relative z-10 w-[240px] drop-shadow-[0_0_40px_rgba(34,197,94,0.25)] sm:w-[280px] lg:w-[330px]"
          />

          {/* Floating Playlist Card */}
          <div className="absolute -left-2 top-10 z-20 hidden w-44 rotate-[-6deg] rounded-2xl border border-white/10 bg-[#071713]/90 p-3 shadow-2xl backdrop-blur-md sm:block lg:-left-10">

            <img
              src={Image3}
              alt="Playlist"
              className="h-24 w-full rounded-xl object-cover"
            />

            <p className="mt-2 text-sm font-semibold">
              Good Vibes
            </p>

            <p className="text-xs text-gray-500">
              X-sound Playlist
            </p>

          </div>

          {/* Right Floating Card */}
          <div className="absolute -right-2 top-32 z-20 hidden w-40 rotate-[6deg] rounded-2xl border border-white/10 bg-[#071713]/90 p-3 shadow-2xl backdrop-blur-md lg:block">

            <img
              src={Image2}
              alt="Playlist"
              className="h-24 w-full rounded-xl object-cover"
            />

            <p className="mt-2 text-sm font-semibold">
              Chill Hits
            </p>

            <p className="text-xs text-gray-500">
              X-sound Playlist
            </p>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="border-t border-white/5 bg-[#020d0b] px-6 py-16">

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-400">
              ♪
            </div>

            <h3 className="font-bold">
              Discover Music
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Find music that matches your taste.
            </p>
          </div>


          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-400">
              ♫
            </div>

            <h3 className="font-bold">
              Create Playlists
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Organize your favorite songs.
            </p>
          </div>


          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-400">
              ▶
            </div>

            <h3 className="font-bold">
              Stream Online
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Listen to your music online.
            </p>
          </div>


          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-400">
              ♡
            </div>

            <h3 className="font-bold">
              Save Favorites
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Keep track of the music you love.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default LandingPage;