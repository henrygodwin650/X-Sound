import React, { useState } from "react";
import LocalMusicHeader from "./localMusicHeader";
import ImportMusicButton from "./ImportMusicButton";
import LocalSearch from "./LocalSearch";
import EmptyLibrary from "./EmptyLibrary";
import { useLocalMusic } from "../../../Hooks/useLocalMusic";
import LocalSongCard from "./LocalSongCard";

const LocalMusic = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [view, setView] = useState("list");

  const { songs, clearLibrary } = useLocalMusic();

  const filteredSongs = songs.filter(
    (song) =>
      (song.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (song.artist || "").toLowerCase().includes(search.toLowerCase()) ||
      (song.album || "").toLowerCase().includes(search.toLowerCase())
  );

  const sortedSongs = [...filteredSongs].sort((a, b) => {
    const aVal = (a[sortBy] || "").toString();
    const bVal = (b[sortBy] || "").toString();

    return aVal.localeCompare(bVal);
  });

  return (
    <div className="min-h-screen overflow-x-hidden hero-bg-color px-3 pb-24 pt-20 sm:px-5 sm:pt-24 md:px-6">
      <LocalMusicHeader />

      {/* Search + actions */}
      <div
        className="
          mt-6 flex flex-col gap-3
          sm:mt-8
          md:flex-row md:items-center md:justify-between
        "
      >
        <LocalSearch
          search={search}
          setSearch={setSearch}
        />

        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <ImportMusicButton />

          <button
            type="button"
            onClick={clearLibrary}
            className="
              w-full rounded-xl
              bg-red-500 px-5 py-3
              text-sm font-semibold text-white
              transition hover:bg-red-600
              sm:w-auto
            "
          >
            Clear Library
          </button>
        </div>
      </div>

      {/* Library controls */}
      <div className="mt-8 sm:mt-10">
        <div
          className="
            flex flex-col gap-4
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          {/* View buttons */}
          <div className="flex w-full gap-2 sm:w-auto sm:gap-3">
            <button
              type="button"
              className={`
                flex-1 rounded-xl border px-4 py-2.5
                text-sm font-semibold text-white
                transition
                sm:flex-none sm:px-6
                ${view === "list"
                  ? "border-green-500 bg-green-500"
                  : "border-white/10 bg-white/10 hover:bg-green-500"
                }
              `}
              onClick={() => setView("list")}
            >
              List
            </button>

            <button
              type="button"
              className={`
                flex-1 rounded-xl border px-4 py-2.5
                text-sm font-semibold text-white
                transition
                sm:flex-none sm:px-6
                ${view === "grid"
                  ? "border-blue-500 bg-blue-500"
                  : "border-white/10 bg-white/10 hover:bg-blue-500"
                }
              `}
              onClick={() => setView("grid")}
            >
              Grid
            </button>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              w-full rounded-xl
              border border-green-500
              bg-white/10
              px-4 py-2.5
              text-sm text-green-400
              outline-none
              focus:ring-2 focus:ring-green-500/30
              sm:w-auto
            "
          >
            <option value="title">Sort by Title</option>
            <option value="artist">Sort by Artist</option>
            <option value="album">Sort by Album</option>
            <option value="year">Sort by Year</option>
          </select>
        </div>

        {/* Songs */}
        {sortedSongs.length === 0 ? (
          <div className="mt-6 sm:mt-8">
            <EmptyLibrary />
          </div>
        ) : (
          <div
            className={`
              mt-6 sm:mt-8
              ${view === "grid"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-3"
              }
            `}
          >
            {sortedSongs.map((song) => (
              <LocalSongCard
                key={song.id}
                song={song}
                songs={songs}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalMusic;