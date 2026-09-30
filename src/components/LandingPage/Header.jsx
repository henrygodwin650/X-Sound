import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import {
  FaCircleInfo,
  FaHeart,
  FaPhone,
  FaUser,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const Links = [
  {
    id: 1,
    name: "Home",
    link: "/",
    icon: FaHome,
  },
  {
    id: 2,
    name: "About",
    link: "/about-app",
    icon: FaCircleInfo,
  },
  {
    id: 3,
    name: "Contact",
    link: "/contact-us",
    icon: FaPhone,
  },
  {
    id: 4,
    name: "Blogs",
    link: "/blog-app",
    icon: FaHeart,
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const location = useLocation();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-green-800 bg-[#020d0b] shadow-lg backdrop-blur-xl dark:bg-black/80">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0"
        >
          <p className="text-2xl font-black tracking-tight sm:text-3xl">
            <span className="text-white">
              X
            </span>

            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              -sound
            </span>
          </p>
        </Link>


        {/* ================= DESKTOP NAVIGATION ================= */}
        <nav className="hidden items-center gap-6 lg:flex">

          {Links.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.link;

            return (
              <Link
                key={item.id}
                to={item.link}
                className={`group flex items-center gap-2 font-medium transition-all duration-200 ${
                  isActive
                    ? "text-green-500"
                    : "text-gray-600 hover:text-green-500 dark:text-gray-300"
                }`}
              >
                <Icon className="text-lg transition-transform group-hover:scale-110" />

                <span>
                  {item.name}
                </span>
              </Link>
            );
          })}

        </nav>


        {/* ================= RIGHT SIDE ================= */}
        <div className="relative flex items-center gap-2">

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="rounded-xl p-2 text-3xl text-gray-400 transition hover:bg-gray-100 hover:text-green-500 dark:text-white dark:hover:bg-white/10 lg:hidden"
          >
            {isMenuOpen ? <BiX /> : <BiMenu />}
          </button>


          {/* ================= ACCOUNT ================= */}
          <button
            type="button"
            onClick={() => setIsAccountOpen((prev) => !prev)}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
              isAccountOpen
                ? "border-green-500 bg-green-500/10 text-green-500"
                : "border-gray-300 bg-white text-gray-700 hover:border-green-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            }`}
          >
            <FaUser />

            <span className="hidden sm:block">
              Account
            </span>
          </button>


          {/* ================= ACCOUNT DROPDOWN ================= */}
          {isAccountOpen && (
            <div className="absolute right-0 top-14 w-40 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-zinc-900">

              <Link
                to="/login"
                onClick={() => setIsAccountOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
              >
                <FaUser className="text-green-500" />

                <span>
                  Sign in
                </span>
              </Link>

              <Link
                to="/create-account"
                onClick={() => setIsAccountOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
              >
                <FaHeart className="text-green-500" />

                <span>
                  Sign Up
                </span>
              </Link>

            </div>
          )}

        </div>
      </div>


      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-[#020d0b] px-4 py-4 shadow-xl dark:border-green-800 dark:bg-zinc-950 lg:hidden">

          <nav className="flex flex-col gap-2">

            {Links.map((item) => {
              const Icon = item.icon;

              const isActive =
                location.pathname === item.link;

              return (
                <Link
                  key={item.id}
                  to={item.link}
                  onClick={closeMenu}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition ${
                    isActive
                      ? "bg-green-500/10 text-green-500"
                      : "text-gray-700 hover:bg-gray-100 hover:text-green-500 dark:text-gray-200 dark:hover:bg-white/10"
                  }`}
                >
                  <Icon className="text-lg" />

                  <span>
                    {item.name}
                  </span>
                </Link>
              );
            })}

          </nav>

        </div>
      )}

    </header>
  );
};

export default Header;
