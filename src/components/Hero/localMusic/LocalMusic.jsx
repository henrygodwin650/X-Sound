import React, { useState } from 'react'
import LocalMusicHeader from './localMusicHeader'
import ImportMusicButton from './ImportMusicButton'
import LocalSearch from './LocalSearch'
import EmptyLibrary from './EmptyLibrary'
import { useLocalMusic } from '../../../Hooks/useLocalMusic'
import LocalSongCard from './LocalSongCard'

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
    <div className="min-h-screen hero-bg-color p-6 pt-24">
      <LocalMusicHeader />

      <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <LocalSearch search={search} setSearch={setSearch} />
        <ImportMusicButton />
        <button
          onClick={clearLibrary}
          className="rounded-xl bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
        >
          Clear Library
        </button>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button
              className={`rounded-xl border px-6 py-2 text-white transition ${
                view === "list"
                  ? "bg-green-500 border-green-500"
                  : "bg-white/10 border-white/10 hover:bg-green-500"
              }`}
              onClick={() => setView("list")}
            >
              List
            </button>
            <button
              className={`rounded-xl border px-6 py-2 text-white transition ${
                view === "grid"
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white/10 border-white/10 hover:bg-blue-500"
              }`}
              onClick={() => setView("grid")}
            >
              Grid
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-green-500 bg-white/20 px-4 py-2 text-green-400"
          >
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="year">Year</option>
          </select>
        </div>

        {sortedSongs.length === 0 ? (
          <div className="mt-8">
            <EmptyLibrary />
          </div>
        ) : (
          <div
            className={`mt-8 ${
              view === "grid"
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-2"
            }`}
          >
            {sortedSongs.map((song) => (
              <LocalSongCard key={song.id} song={song} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalMusic;