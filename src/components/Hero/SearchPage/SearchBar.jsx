import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { FiMic, FiSearch, FiX } from 'react-icons/fi'
import SearchSuggestions from './SearchSuggestions'

const SearchBar = ({ search, music = [], setSearch }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);

  const suggestions = (music || [])
    .filter((item) => {
      if (!search) return false;
      return (
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.artist?.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(0, 6);

  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setIsListening(true);
    recognition.onresult = (event) => {
      setSearch(event.results[0][0].transcript);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          setSearch(suggestions[selectedIndex].title);
          setSelectedIndex(-1);
        }
        break;
      case "Escape":
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative mx-auto mb-8 w-full max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-full border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)]"
      >
        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />

        <input
          type="text"
          value={search}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedIndex(-1);
          }}
          placeholder="Search songs, artists, albums, playlists..."
          className="w-full bg-transparent py-5 pl-16 pr-32 text-lg text-white placeholder:text-gray-400 outline-none"
        />

        <SearchSuggestions
          search={search}
          selectedIndex={selectedIndex}
          suggestions={suggestions}
          setSearch={setSearch}
        />

        <div className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {search && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearch("")}
              className="rounded-full p-2 text-gray-400 transition hover:bg-red-500 hover:text-white"
            >
              <FiX className="text-xl" />
            </motion.button>
          )}

          <motion.button
            onClick={startVoiceSearch}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`rounded-full p-2.5 text-white shadow-lg ${isListening
                ? "bg-red-500 animate-pulse"
                : "bg-linear-to-r from-green-500 to-emerald-600"
              }`}
          >
            <FiMic className="text-lg" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchBar;
