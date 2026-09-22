import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import DarkMode from "../Navbar/DarkMode";

import {
  FiMenu,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";

import { FaCrown } from "react-icons/fa6";

const DesktopSidebar = (
  {
    collapsed,
    setCollapsed,
    search,
    setSearch,
    filteredMenu,
    user,
  }
) => {

  return (

    <motion.aside

      initial={{ x: -100 }}

      animate={{ x: 0 }}

      transition={{
        duration: .5,
        ease: "easeOut"
      }}

      className={` hidden lg:flex fixed top-0 left-0 z-50 h-screen flex-col border-r border-white/10 hero-bg-color backdrop-blur-2xl transition-all duration-300 ${collapsed ? "w-24" : "w-72"}`}

    >
      {/* ================= Logo ================= */}

      <div className="flex items-center justify-between px-6 py-7">

        {!collapsed && (

          <Link to="/home" className="select-none">

            <h1 className="text-4xl font-black tracking-tight">

              <span className="text-white">
                X
              </span>

              <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Sound
              </span>

            </h1>

            <p className="mt-1 text-xs uppercase tracking-[4px] text-gray-400">
              Premium Streaming
            </p>

          </Link>

        )}

        <motion.button
          onClick={() => setCollapsed(!collapsed)}

          whileHover={{
            scale: 1.08
          }}

          whileTap={{
            scale: .95
          }}

          className="
rounded-xl
p-2
text-white
transition
hover:bg-green-500
"

        >

          <FiMenu className="text-2xl" />

        </motion.button>

      </div>

      {/* ================= Search ================= */}

      <div className="px-4">

        {!collapsed && (

          <div className="relative">

            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition focus:border-green-500 " />

          </div>

        )}

      </div>

      {/* ================= User Card ================= */}

      <div className="px-4 py-6">

        <div
          className={`rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] p-4 transition-all 
                ${collapsed
              ? "flex justify-center p-0"
              : "flex items-center gap-4"}`}
        >

          {/* Avatar */}

          <div className={`flex items-center justify-center rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-xl font-bold text-white
                ${collapsed
              ? "h-10 w-10"
              : "h-14 w-14 "}`}>

            {(user?.displayName || "G")
              .charAt(0)
              .toUpperCase()}

          </div>

          {!collapsed && (

            <div className="overflow-hidden">

              <h3 className="truncate font-semibold text-white">

                {user?.displayName || "Guest User"}

              </h3>

              <p className="truncate text-sm text-gray-400">

                {user?.email || "Not Logged In"}

              </p>

            </div>

          )}

        </div>

      </div>

      {/* ================= Navigation ================= */}

      <nav className="flex-1 space-y-2 overflow-y-auto px-4">

        {filteredMenu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                `group flex items-center rounded-2xl px-4 py-3 transition-all duration-300

            ${collapsed ? "justify-center" : "gap-4"}

            ${isActive
                  ? "bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >

              <Icon className="text-2xl shrink-0" />

              {!collapsed && (

                <>
                  <span className="font-medium">
                    {item.name}
                  </span>

                  {item.badge && (

                    <span className="ml-auto rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white">

                      {item.badge}

                    </span>

                  )}

                </>

              )}

            </NavLink>

          );

        })}

      </nav>

      {/* ================= Theme ================= */}

      <div className="px-4 pb-4">

        <div
          className={`rounded-2xl border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] p-4

      ${collapsed
              ? "flex justify-center"
              : "flex items-center justify-between"}
      `}
        >

          {!collapsed && (

            <span className="font-medium text-gray-300">
              Theme
            </span>

          )}

          <DarkMode />

        </div>

      </div>

      {/* ================= Premium ================= */}

      {!collapsed && (

        <div className="mx-4 mb-4 rounded-3xl border border-green-500/20 bg-linear-to-br from-green-500/20 to-emerald-700/10 p-5">

          <div className="flex items-center gap-3">

            <FaCrown className="text-3xl text-yellow-400" />

            <div>

              <h3 className="font-bold text-white">
                Premium
              </h3>

              <p className="text-sm text-gray-400">
                Unlimited streaming
              </p>

            </div>

          </div>

          <button
            className="
          mt-5
          w-full
          rounded-2xl
          bg-linear-to-r
          from-green-500
          to-emerald-600
          py-3
          font-semibold
          text-white
          transition
          hover:scale-[1.03]
        "
          >
            Upgrade
          </button>

        </div>

      )}
    </motion.aside>
  )
}

export default DesktopSidebar