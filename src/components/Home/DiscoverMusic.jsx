import React, { useState } from "react";
import musicData from "./MusicData";
import MusicCard from "../Cards/MusicCard";

const Discover = () => {

  const [activeTab, setActiveTab] = useState("trending");

  const songs =
    activeTab === "trending"
      ? musicData.filter(song => song.trending)
      : musicData.filter(song => song.recent);

  return (
    <section className="mt-10">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Discover
          </h2>

          <p className="text-gray-400">
            Explore trending and newly added music.
          </p>

        </div>

        {/* Tabs */}

        <div className="flex rounded-2xl bg-white/10
backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] p-1 border border-white/10">

          <button
            onClick={() => setActiveTab("trending")}
            className={`px-6 py-3 rounded-xl transition-all duration-300

            ${activeTab === "trending"
                ? "bg-green-500 text-white"
                : "text-gray-400 hover:text-white"
              }`}
          >
            🔥 Trending
          </button>

          <button
            onClick={() => setActiveTab("recent")}
            className={`px-6 py-3 rounded-xl transition-all duration-300

            ${activeTab === "recent"
                ? "bg-green-500 text-white"
                : "text-gray-400 hover:text-white"
              }`}
          >
            🆕 New
          </button>

        </div>

      </div>
      <div
        className="
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        "
      >

        {songs.map((music) => (

          <MusicCard
            key={music.id}
            music={music}
          />

        ))}

      </div>

    </section>
  );
};

export default Discover;