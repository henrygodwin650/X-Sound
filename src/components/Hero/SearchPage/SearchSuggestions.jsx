import React from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'

const SearchSuggestions = ({
  selectedIndex,
  search,
  suggestions = [],
  setSearch,
}) => {
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="font-bold text-green-400">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (!search || suggestions.length === 0) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-3xl border border-white/10 bg-[#181818] shadow-2xl">
      {suggestions.map((item, index) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.03 }}
          onClick={() => setSearch(item.title)}
          className={`flex w-full items-center gap-4 border-b border-white/5 px-5 py-4 text-left transition hover:bg-white/10 ${selectedIndex === index ? "bg-green-500/20" : ""
            }`}
        >
          <FiSearch className="text-green-500" />
          <div className="flex items-center gap-4">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="h-12 w-12 rounded-xl object-cover"
              />
            )}
            <div className="text-left">
              <h3 className="font-medium text-white">
                {highlightText(item.title, search)}
              </h3>
              <p className="text-sm text-gray-400">{item.artist}</p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default SearchSuggestions;
