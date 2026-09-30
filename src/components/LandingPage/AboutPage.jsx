import Header from "./Header";
import IMG1 from "/images/aboutpage_logo_tagline.png";
import { BiHeart, BiMusic } from "react-icons/bi";
import { HiLightningBolt, HiShieldCheck } from "react-icons/hi";
import laptopImage from "/images/aboutpage_laptop_app_mockup.png"

const AboutPage = () => {
  return (
    <div
      id="About"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#020d0b]
        text-white
      "
    >
      {/* ================= GREEN SMOKE BACKGROUND ================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-[url('/images/aboutpage_green_smoke_background.png')]
          bg-cover
          bg-center
          bg-no-repeat
          opacity-40
        "
      />

      {/* DARK OVERLAY */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-[#020d0b]/80
        "
      />

      {/* GREEN GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-1/4
          z-0
          h-72
          w-72
          rounded-full
          bg-green-500/10
          blur-[120px]
          sm:h-96
          sm:w-96
        "
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10">
        <Header />

        {/* ================= HERO ================= */}
        <section
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-10
            px-5
            pb-16
            pt-12
            lg:flex-row
            lg:items-center
            lg:gap-8
            lg:px-8
            lg:pt-16
          "
        >
          {/* ================= LEFT CONTENT ================= */}
          <div className="w-full lg:w-1/2">

            {/* LOGO */}
            <img
              src={IMG1}
              alt="X-sound logo"
              className="mb-6 mt-7 w-52 sm:w-60"
            />

            {/* BADGE */}
            <div
              className="
                mb-5
                w-fit
                rounded-full
                border
                border-green-400
                bg-green-700/20
                px-4
                py-1.5
                text-xs
                font-bold
                tracking-wider
                text-green-300
              "
            >
              ABOUT X-SOUND
            </div>

            {/* HEADING */}
            <h1
              className="
                max-w-xl
                text-4xl
                font-black
                leading-[1.05]
                tracking-tight
                sm:text-5xl
                lg:text-5xl
                xl:text-6xl
              "
            >
              More Than Just Music.

              <span
                className="
                  block
                  bg-linear-to-r
                  from-green-400
                  via-emerald-100
                  to-green-600
                  bg-clip-text
                  text-transparent
                "
              >
                It's a Vibe.
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-6
                max-w-xl
                text-sm
                leading-7
                text-gray-400
                sm:text-base
                lg:text-lg
              "
            >
              X-sound is a modern music streaming platform built for music
              lovers, by music lovers. Our goal is simple — to give you a
              seamless, beautiful and personalized way to discover, stream
              and enjoy your favorite music, anytime, anywhere.
            </p>

            {/* ================= FEATURES ================= */}
            <div
              className="
                mt-10
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
              "
            >
              {/* STREAM */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-green-500/20
                  bg-black/30
                  p-4
                  backdrop-blur-sm
                "
              >
                <BiMusic
                  className="
                    h-12
                    w-12
                    shrink-0
                    rounded-full
                    border-2
                    border-green-500
                    p-2
                    text-green-300
                  "
                />

                <p className="flex flex-col font-semibold">
                  Stream Anywhere

                  <span className="mt-1 text-xs font-light leading-5 text-gray-400">
                    Your music, on every device, always.
                  </span>
                </p>
              </div>

              {/* PERSONALIZED */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-green-500/20
                  bg-black/30
                  p-4
                  backdrop-blur-sm
                "
              >
                <BiHeart
                  className="
                    h-12
                    w-12
                    shrink-0
                    rounded-full
                    border-2
                    border-green-500
                    p-2
                    text-green-300
                  "
                />

                <p className="flex flex-col font-semibold">
                  Personalized Playlists

                  <span className="mt-1 text-xs font-light leading-5 text-gray-400">
                    Music that matches your mood.
                  </span>
                </p>
              </div>

              {/* FAST */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-green-500/20
                  bg-black/30
                  p-4
                  backdrop-blur-sm
                "
              >
                <HiLightningBolt
                  className="
                    h-12
                    w-12
                    shrink-0
                    rounded-full
                    border-2
                    border-green-500
                    p-2
                    text-green-300
                  "
                />

                <p className="flex flex-col font-semibold">
                  Fast & Smooth

                  <span className="mt-1 text-xs font-light leading-5 text-gray-400">
                    No lags. Just pure listening.
                  </span>
                </p>
              </div>

              {/* SECURITY */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-green-500/20
                  bg-black/30
                  p-4
                  backdrop-blur-sm
                "
              >
                <HiShieldCheck
                  className="
                    h-12
                    w-12
                    shrink-0
                    rounded-full
                    border-2
                    border-green-500
                    p-2
                    text-green-300
                  "
                />

                <p className="flex flex-col font-semibold">
                  Safe & Secure

                  <span className="mt-1 text-xs font-light leading-5 text-gray-400">
                    Your privacy matters to us.
                  </span>
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              className="
                mt-8
                rounded-full
                bg-green-500
                px-7
                py-3
                font-semibold
                text-black
                transition
                duration-300
                hover:bg-green-400
                hover:shadow-[0_0_30px_rgba(34,197,94,0.35)]
              "
            >
              Start Listening →
            </button>
          </div>

          {/* ================= RIGHT VISUAL ================= */}
          <div
            className="
              relative
              lg:flex
              min-h-105
              sm:hidden
              w-full
              items-center
              justify-center
              lg:min-h-[600px]
              lg:w-1/2
            "
          >
            {/* GREEN GLOW */}
            <div
              className="
                absolute
                right-10
                top-20
                h-64
                w-64
                rounded-full
                bg-green-500/20
                blur-[100px]
                sm:h-80
                sm:w-80
              "
            />

            {/* LAPTOP */}
            <img
              src={laptopImage}
              alt="X-sound laptop application"
              className="
                absolute
                right-0
                top-8
                z-20
                w-72
                object-contain
                drop-shadow-[0_20px_50px_rgba(0,255,120,0.2)]
                sm:w-96
                lg:w-[480px]
              "
            />

            {/* DECORATIVE TEXT */}
            <div
              className="
                absolute
                bottom-0
                right-0
                z-40
                hidden
                rotate-[-8deg]
                text-2xl
                font-bold
                text-green-400
                lg:block
              "
            >
              Music
              <br />
              Connects
              <br />
              People
            </div>
          </div>
        </section>

        {/* ================= BOTTOM LINE ================= */}
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <hr className="border-green-700/40" />
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <section
          className="
            mx-auto
            grid
            max-w-7xl
            grid-cols-1
            gap-5
            px-5
            py-10
            sm:grid-cols-2
            lg:grid-cols-4
            lg:px-8
          "
        >
          <div className="text-center">
            <h3 className="text-lg font-bold text-green-400">
              Discover
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Find new music and artists you love.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold text-green-400">
              Stream
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Enjoy your favorite music wherever you go.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold text-green-400">
              Create
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Build playlists that match your vibe.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold text-green-400">
              Enjoy
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Music that follows you everywhere.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
