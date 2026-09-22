import React from 'react'
import { FiSearch } from 'react-icons/fi'

const LocalSearch = ({ search = "", setSearch }) => {
  return (
    <div className="relative w-full md:w-96">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch?.(e.target.value)}
        placeholder="Search local music..."
        className="w-full rounded-full border border-white/10 bg-white/10 py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-green-500"
      />
    </div>
  );
};

export default LocalSearch;