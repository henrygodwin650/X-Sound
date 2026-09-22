import { motion } from "framer-motion"
import React from "react"
import { FiMenu } from "react-icons/fi"
import { Link } from "react-router-dom"


const MobileHeader = ({
  setMobileMenu,
  user
}) => {

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center shadow-xl justify-between px-5 lg:hidden bg-transparent backdrop-blur-xl "
    >

      {/* Menu */}

      <button
        onClick={() => setMobileMenu(true)}
        className="rounded-xl p-2 text-white transition hover:bg-green-600 hover:text-white"
      >

        <FiMenu className="text-2xl" />

      </button>

      {/* Logo */}

      <Link to="/home" className="text-3xl font-black">

        <span className="text-white">
          X
        </span>

        <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Sound
        </span>

      </Link>

      {/* User */}

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-green-500 to-emerald-600 font-bold text-white">

        {(user?.displayName || "G")
          .charAt(0)
          .toUpperCase()}

      </div>

    </header>
  )
}

export default MobileHeader