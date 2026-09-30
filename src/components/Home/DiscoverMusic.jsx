import { useEffect, useState } from "react";
import MusicCard from "../Cards/MusicCard";
import { getMusic, getPopularMusic } from "../../Api/musicApi";

const Discover = () => {
  const [activeTab, setActiveTab] = useState("trending");

  const [trendingSongs, setTrendingSongs] = useState([]);
  const [recentSongs, setRecentSongs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMusic = async () => {
      try {
        setLoading(true);
        setError("");

        const [popular, recent] = await Promise.all([
          getPopularMusic(),
          getMusic(),
        ]);

        setTrendingSongs(popular);
        setRecentSongs(recent);
      } catch (err) {
        console.error("Discover music error:", err);
        setError("Unable to load music right now.");
      } finally {
        setLoading(false);
      }
    };

    loadMusic();
  }, []);

  const songs =
    activeTab === "trending"
      ? trendingSongs
      : recentSongs;

  return (
    <section className="mt-10">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold text-white">
            Discover
          </h2>

          <p className="text-gray-400">
            Explore trending and newly added music.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="
            flex
            rounded-2xl
            border
            border-white/10
            bg-white/10
            p-1
            shadow-[0_15px_40px_rgba(0,0,0,.25)]
            backdrop-blur-3xl
          "
        >
          <button
            onClick={() => setActiveTab("trending")}
            className={`
              rounded-xl
              px-6
              py-3
              transition-all
              duration-300
              ${
                activeTab === "trending"
                  ? "bg-green-500 text-white"
                  : "text-gray-400 hover:text-white"
              }
            `}
          >
            🔥 Trending
          </button>

          <button
            onClick={() => setActiveTab("recent")}
            className={`
              rounded-xl
              px-6
              py-3
              transition-all
              duration-300
              ${
                activeTab === "recent"
                  ? "bg-green-500 text-white"
                  : "text-gray-400 hover:text-white"
              }
            `}
          >
            🆕 New
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-10 text-center text-gray-400">
          Loading music...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-center text-red-400">
          {error}
        </div>
      )}

      {/* Music */}
      {!loading && !error && (
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
      )}

    </section>
  );
};

export default Discover;