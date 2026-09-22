import React from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
  FaSpotify,
} from "react-icons/fa6";

const Footer = () => {

  return (

    <footer
      className="
mt-24
border-t
border-white/10
bg-black/20
backdrop-blur-xl
"
    >

      <div
        className="
mx-auto
max-w-7xl
px-6
py-16
"
      >

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div>

            <h1 className="text-4xl font-black">

              <span className="text-white">

                X

              </span>

              <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">

                Sound

              </span>

            </h1>

            <p className="mt-5 leading-7 text-gray-400">

              Discover millions of songs,
              albums, artists and playlists.
              Built for music lovers.

            </p>

            <div className="mt-8 lg:mt-16 flex gap-4">

              <button className="rounded-full bg-white/10 p-3 hover:bg-green-500 transition"
                whilehover={{
                  scale: 1.08
                }}

                whiletap={{
                  scale: .95
                }}
              >

                <FaFacebookF />

              </button>

              <button className="rounded-full bg-white/10 p-3 hover:bg-green-500 transition"
                whilehover={{
                  scale: 1.08
                }}

                whiletap={{
                  scale: .95
                }}>

                <FaInstagram />

              </button>

              <button className="rounded-full bg-white/10 p-3 hover:bg-green-500 transition"
                whilehover={{
                  scale: 1.08
                }}

                whiletap={{
                  scale: .95
                }}
              >

                <FaXTwitter />

              </button>

              <button className="rounded-full bg-white/10 p-3 hover:bg-green-500 transition"
                whilehover={{
                  scale: 1.08
                }}

                whiletap={{
                  scale: .95
                }}
              >

                <FaGithub />

              </button>

              <button className="rounded-full bg-white/10 p-3 hover:bg-green-500 transition"
                whilehover={{
                  scale: 1.08
                }}

                whiletap={{
                  scale: .95
                }}
              >

                <FaYoutube />

              </button>

            </div>

          </div>
          <div>

            <h3 className="mb-5 text-xl font-bold text-white">

              Quick Links

            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-green-400 cursor-pointer">

                Home

              </li>

              <li className="hover:text-green-400 cursor-pointer">

                Discover

              </li>

              <li className="hover:text-green-400 cursor-pointer">

                Artists

              </li>

              <li className="hover:text-green-400 cursor-pointer">

                Albums

              </li>

              <li className="hover:text-green-400 cursor-pointer">

                Playlists

              </li>

            </ul>

          </div>
          <div>

            <h3 className="mb-5 text-xl font-bold text-white">

              Support

            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-green-400 cursor-pointer">

                Help Center

              </li>

              <li className="hover:text-green-400 cursor-pointer">

                Privacy Policy

              </li>

              <li className="hover:text-green-400 cursor-pointer">

                Terms of Service

              </li>

              <li className="hover:text-green-400 cursor-pointer">

                Contact

              </li>

            </ul>

          </div>
          <div>

            <h3 className="mb-5 text-xl font-bold text-white">

              Company

            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-green-400 cursor-pointer">

                About Us

              </li>

              <li className="hover:text-green-400 cursor-pointer">

                Careers

              </li>

              <li className="hover:text-green-400 cursor-pointer">

                Developers

              </li>

              <li className="hover:text-green-400 cursor-pointer">

                Blog

              </li>

            </ul>

          </div>
          <div>

            <h3 className="mb-5 text-xl font-bold text-white">

              Newsletter

            </h3>

            <p className="mb-5 text-gray-400">

              Subscribe to receive the latest music releases and updates.

            </p>

            <input
              type="email"
              placeholder="Email address"
              className="mb-4 w-full rounded-xl border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,.25)] px-4 py-3 text-white outline-none focus:border-green-500 "
            />

            <button
              className=" w-full rounded-xl bg-linear-to-r from-green-500 to-emerald-600 py-3 font-semibold text-white transition hover:scale-[1.02] "
            >

              Subscribe

            </button>

          </div>
          <div
            className=" mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-gray-500 md:flex-row "
          >

            <p>

              © 2026 XSound. All rights reserved.

            </p>

            <div className="flex items-center gap-2">

              <FaSpotify className="text-green-500" />

              <span>

                Built with React • Firebase • Node.js

              </span>

            </div>

          </div>
        </div>
      </div>
    </footer>

  );

};

export default Footer;