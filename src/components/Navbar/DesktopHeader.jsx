import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";


const DesktopHeader = ({
  collapsed,
  search,
  setSearch,
  user,
}) => {

  return (
    <header
      className={`
hidden
lg:flex
fixed
top-0
right-0
z-40
h-20
items-center
justify-between
px-8
bg-transparent
backdrop-blur-xl
transition-all
duration-300

${collapsed ? "left-24" : "left-72"}

`}
    >

      {/* Search */}

      <div className="relative w-105">

        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] py-3 pl-14 pr-5 text-white placeholder:text-gray-400 outline-none focus:border-green-500 "
        />

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-6">
        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] px-3 py-2 transition hover:bg-white/10"     >

          {/* Avatar */}

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-lg font-bold text-white">

            {(user?.displayName || "G")
              .charAt(0)
              .toUpperCase()}

          </div>

          <div>

            <h3 className="font-semibold text-white">

              {user?.displayName || "Guest"}

            </h3>

            <p className="text-xs text-gray-400">

              {user?.email || "Not Logged In"}

            </p>

          </div>

        </Link>

      </div>

    </header>
  )
}

export default DesktopHeader