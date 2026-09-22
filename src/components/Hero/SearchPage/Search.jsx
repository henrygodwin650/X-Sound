import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";
import TrendingSearches from "./TrendingSearches";
import RecentSearches from "./RecentSearches";
import Rema from '../../../assets/cover-image/images (1).jpeg'
import Burnaboy2 from '../../../assets/cover-image/images (5).jpeg'
import Wizkid2 from '../../../assets/cover-image/images (12).jpeg'
import TopResult from "./SearchResults/TopResult";
import useDebounce from "../../../Hooks/useDebounce";
import SearchSkeleton from "./SearchSkeleton";

const music = [
  {
    id: 1,
    title: 'Calm Down Remix',
    artist: 'Rema ft Selena Gomez',
    image: Rema,
    type: 'song'
  },
  {
    id: 2,
    title: 'Laho remix',
    artist: 'Burna Boy',
    image: Burnaboy2,
    type: 'song'
  },
  {
    id: 3,
    title: 'Brown Skin',
    artist: 'Wizkid',
    image: Wizkid2,
    type: 'song'
  },
]

const Search = () => {
  const [recentSearches, setRecentSearches] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  })
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState('All');
  const debouncedSearch = useDebounce(search, 300);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const filteredMusic = music.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.artist.toLowerCase().includes(debouncedSearch.toLowerCase()) || item.type.toLowerCase().includes(debouncedSearch.toLowerCase())

    const matchesFilter = filter === 'All' ? true : item.type === filter.slice(0, -1).toLowerCase();
    return matchesSearch && matchesFilter;
  })
  // SAVE SEARCHES AUTOMATICALLY
  useEffect(() => {
    if (!debouncedSearch.trim()) return;
    const timeout = setTimeout(() => {
      const updated = [
        debouncedSearch,
        ...recentSearches.filter((s) => s !== debouncedSearch)
      ].slice(0, 10);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }, 800)
    return () => clearTimeout(timeout)
  }, [debouncedSearch, recentSearches])

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="min-h-screen px-6 py-28 hero-bg-color">
      {/* SEARCH - BAR */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        music={music}
      />
      {/* SEARCH -FILTERS */}
      <SearchFilters
        filter={filter}
        setFilter={setFilter}
      />

      {search === "" ? (
        <>
          < TrendingSearches setSearch={setSearch} />
          <RecentSearches
            setSearch={setSearch}
            setRecentSearches={setRecentSearches}
            recentSearches={recentSearches} />
        </>
      ) : (<TopResult />)}
      {/* TRENDING - SEARCHES */}


      {/* SEARCH RESULTS */}
      {loading ? (
        <SearchSkeleton />
      ) : (
        <SearchResults
          music={filteredMusic}
        />
      )}

    </motion.div>
  )
}

export default Search;