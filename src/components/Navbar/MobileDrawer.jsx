import { motion } from 'framer-motion';
import React from 'react'
import { FiLogOut, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import DarkMode from './DarkMode';


const MobileDrawer = ({
  mobileMenu,
  setMobileMenu,
  user,
  MenuLinks
}) => {
  return (
    <>
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: mobileMenu ? 0 : "-100%" }}
        transition={{ duration: 0.35 }}
        className="fixed left-0 top-0 z-50 h-screen w-80 bg-transparent backdrop-blur-3xl border-r border-white/10 shadow-2xl lg:hidden"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">

          <h2 className="text-3xl font-black text-white">
            X
            <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Sound
            </span>
          </h2>

          <button
            onClick={() => setMobileMenu(false)}
            className="rounded-xl p-2 text-white transition hover:bg-red-500"
          >
            <FiX className="text-2xl" />
          </button>

        </div>

        {/* User */}

        <div className="border-b border-white/10 px-6 py-4">

          <div className="flex items-center gap-4">

            <img
              src="https://ui-avatars.com/api/?name=User&background=22c55e&color=fff"
              alt="User"
              className="h-16 w-16 rounded-full ring-2 ring-green-500"
            />

            <div className="overflow-hidden">

              <h3 className="truncate text-lg font-bold text-white">
                {user?.displayName || "Guest User"}
              </h3>

              <p className="truncate text-sm text-gray-400">
                {user?.email || "Not Logged In"}
              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}

        <div className="flex-1 overflow-y-auto p-5">

          {MenuLinks.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.id}
                to={item.link}
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300

                    ${isActive
                    ? "bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >

                <Icon className="text-2xl" />

                <span className="font-medium">
                  {item.name}
                </span>

                {item.badge && (
                  <span className="ml-auto rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white">
                    {item.badge}
                  </span>
                )}

              </NavLink>

            );

          })}

          {/* Theme */}

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/10 shadow-[0_15px_40px_rgba(0,0,0,.25)] p-3 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">
                Theme
              </span>

              <DarkMode />
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default MobileDrawer