import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";
import TrendingSearches from "./TrendingSearches";
import RecentSearches from "./RecentSearches";
import TopResult from "./SearchResults/TopResult";
import useDebounce from "../../../Hooks/useDebounce";
import SearchSkeleton from "./SearchSkeleton";

import { searchMusic } from "../../../Api/musicApi";

const Search = () => {
  const [recentSearches, setRecentSearches] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  // ==============================
  // SEARCH JAMENDO API
  // ==============================
  useEffect(() => {
    const fetchMusic = async () => {
      if (!debouncedSearch.trim()) {
        setMusic([]);
        setError("");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const results = await searchMusic(debouncedSearch);

        setMusic(results);
      } catch (err) {
        console.error("Search API error:", err);

        setMusic([]);
        setError("Unable to search music right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [debouncedSearch]);

  // ==============================
  // SAVE SEARCHES
  // ==============================
  useEffect(() => {
    if (!debouncedSearch.trim()) return;

    const timeout = setTimeout(() => {
      setRecentSearches((prevSearches) => {
        const searchTerm = debouncedSearch.trim();

        const updated = [
          searchTerm,
          ...prevSearches.filter((item) => item !== searchTerm),
        ].slice(0, 10);

        localStorage.setItem(
          "recentSearches",
          JSON.stringify(updated)
        );

        return updated;
      });
    }, 800);

    return () => clearTimeout(timeout);
  }, [debouncedSearch]);

  // ==============================
  // FILTER API RESULTS
  // ==============================
  const filteredMusic = filter === "All" ? music : music;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="min-h-screen px-6 py-28 hero-bg-color"
    >
      {/* SEARCH BAR */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        music={music}
      />

      {/* SEARCH FILTERS */}
      <SearchFilters
        filter={filter}
        setFilter={setFilter}
      />

      {/* EMPTY SEARCH */}
      {search === "" ? (
        <>
          <TrendingSearches
            setSearch={setSearch}
          />

          <RecentSearches
            setSearch={setSearch}
            setRecentSearches={setRecentSearches}
            recentSearches={recentSearches}
          />
        </>
      ) : (
        <TopResult />
      )}

      {/* API ERROR */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-red-400">
          {error}
        </div>
      )}

      {/* SEARCH RESULTS */}
      {loading ? (
        <SearchSkeleton />
      ) : (
        search.trim() && (
          <SearchResults
            music={filteredMusic}
          />
        )
      )}
    </motion.div>
  );
};

export default Search;