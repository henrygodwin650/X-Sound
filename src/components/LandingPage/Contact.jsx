import React from "react";
import Header from "./Header";

import {
  FaLocationDot,
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaBoltLightning,
} from "react-icons/fa6";

import {
  BiCheckShield,
  BiEnvelope,
  BiHeadphone,
  BiHeart,
  BiMessage,
  BiPhoneIncoming,
  BiSolidCheckShield,
} from "react-icons/bi";

import IMG1 from "/images/xsound_contact_headphones.png";

const Contact = () => {
  return (
    <div
      id="Contact"
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
          bg-[url('/images/ChatGPT%20Image%20Sep%2026,%202026,%2010_17_55%20PM.png')]
          bg-cover
    bg-[center_center]
    bg-no-repeat
    opacity-40
    sm:bg-center
    lg:bg-[center_left]
        "
      />

      {/* Dark overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-[#020d0b]/80
        "
      />

      {/* Green glow */}
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

        {/* HERO */}
        <section
          className="
            flex
            min-h-screen
            flex-col
            items-center
            justify-center
            gap-10
            px-5
            pb-12
            pt-28
            sm:px-8
            lg:flex-row
            lg:items-center
            lg:gap-8
            lg:px-10
            xl:gap-12
            xl:px-16
          "
        >
          {/* ========================================================= */}
          {/* LEFT SIDE - CONTACT INFORMATION */}
          {/* ========================================================= */}

          <div
            className="
            relative
            z-10
            flex
            w-full
            max-w-xl
            flex-col
            items-center
            text-center
            lg:items-start
            lg:text-left
          "
          >
            {/* Badge */}
            <div className="mb-5">
              <div
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-green-500/20
                bg-green-500/10
                px-4
                py-2
                text-xs
                font-medium
                text-gray-200
                backdrop-blur-md
                sm:text-sm
              "
              >
                <BiEnvelope className="text-green-400" />

                <span>Get in Touch</span>
              </div>
            </div>

            {/* Heading */}
            <h1
              className="
              max-w-xl
              text-4xl
              font-black
              leading-[1.05]
              tracking-tight
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
            "
            >
              We'd Love to

              <span
                className="
                block
                bg-gradient-to-r
                from-green-400
                via-emerald-400
                to-green-500
                bg-clip-text
                text-transparent
              "
              >
                Hear From You.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
              mt-6
              max-w-lg
              text-sm
              leading-7
              text-gray-400
              sm:text-base
              lg:text-lg
            "
            >
              Have a question, or just want to say hi?
              <br className="hidden sm:block" />

              We're here for you. Reach out to us and
              we'll get back to you as soon as possible.
            </p>

            {/* ================= CONTACT INFORMATION ================= */}
            <div className="mt-8 flex w-full flex-col gap-5 sm:mt-10">
              {/* Email */}
              <div className="flex items-center gap-4">
                <BiEnvelope className="
                  h-10
                  w-10
                  shrink-0
                  rounded-full
                  border
                  border-green-400/30
                  bg-green-400/5
                  p-2
                  text-xl
                  text-green-300
                "
                />

                <p className="flex flex-col items-start font-semibold">
                  Email Us

                  <span className="text-xs font-extralight text-gray-400 sm:text-sm">
                    support@xsound.com
                  </span>
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <BiPhoneIncoming
                  className="
                  h-10
                  w-10
                  shrink-0
                  rounded-full
                  border
                  border-green-400/30
                  bg-green-400/5
                  p-2
                  text-xl
                  text-green-300
                "
                />

                <p className="flex flex-col items-start font-semibold">
                  Call Us

                  <span className="text-xs font-extralight text-gray-400 sm:text-sm">
                    +234 901 234 567
                  </span>

                  <span className="text-xs font-extralight text-gray-500 sm:text-sm">
                    Mon-Fri, 9am - 6pm (WAT)
                  </span>
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <FaLocationDot
                  className="
                  h-10
                  w-10
                  shrink-0
                  rounded-full
                  border
                  border-green-400/30
                  bg-green-400/5
                  p-2
                  text-xl
                  text-green-300
                "
                />

                <p className="flex flex-col items-start font-semibold">
                  Our Location

                  <span className="text-xs font-extralight text-gray-400 sm:text-sm">
                    Enugu, Nigeria
                  </span>
                </p>
              </div>

              {/* ================= SOCIAL MEDIA ================= */}
              <div className="mt-2 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-green-400/30
                  text-green-300
                  transition
                  duration-300
                  hover:border-green-400
                  hover:bg-green-400
                  hover:text-black
                "
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  aria-label="X"
                  className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-green-400/30
                  text-green-300
                  transition
                  duration-300
                  hover:border-green-400
                  hover:bg-green-400
                  hover:text-black
                "
                >
                  <FaXTwitter />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-green-400/30
                  text-green-300
                  transition
                  duration-300
                  hover:border-green-400
                  hover:bg-green-400
                  hover:text-black
                "
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  aria-label="YouTube"
                  className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-green-400/30
                  text-green-300
                  transition
                  duration-300
                  hover:border-green-400
                  hover:bg-green-400
                  hover:text-black
                "
                >
                  <FaYoutube />
                </a>

                <a
                  href="#"
                  aria-label="TikTok"
                  className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-green-400/30
                  text-green-300
                  transition
                  duration-300
                  hover:border-green-400
                  hover:bg-green-400
                  hover:text-black
                "
                >
                  <FaTiktok />
                </a>
              </div>

              {/* ================= MUSIC DECORATION ================= */}
              <div
                className="
                mt-3
                flex
                -rotate-3
                flex-col
                items-center
                lg:items-start
              "
              >
                <p className="font-mono text-xs font-semibold italic text-green-500 sm:text-sm">
                  .Music brings us together.
                </p>

                <div className="mt-2 flex items-center gap-1">
                  <div
                    className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-yellow-600
                    border-t-transparent
                    sm:h-6
                    sm:w-6
                  "
                  />

                  <div
                    className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-red-600
                    border-t-transparent
                    [animation-duration:1.5s]
                    sm:h-6
                    sm:w-6
                  "
                  />

                  <div
                    className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-green-600
                    border-t-transparent
                    [animation-duration:2s]
                    sm:h-6
                    sm:w-6
                  "
                  />

                  <div
                    className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-blue-600
                    border-t-transparent
                    [animation-duration:3s]
                    sm:h-6
                    sm:w-6
                  "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* MIDDLE - CONTACT FORM */}
          {/* ========================================================= */}

          <div
            className="
            relative
            z-10
            flex
            w-full
            max-w-xl
            items-center
            justify-center
          "
          >
            {/* Form Glow */}
            <div
              className="
              pointer-events-none
              absolute
              h-64
              w-64
              rounded-full
              bg-green-500/20
              blur-[100px]
              sm:h-80
              sm:w-80
            "
            />

            {/* Contact Form */}
            <div
              className="
              relative
              z-10
              w-full
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-5
              shadow-2xl
              backdrop-blur-xl
              sm:p-7
              lg:p-8
            "
            >
              {/* Form Header */}
              <div className="mb-6">
                <p className="flex items-center gap-2 text-xs font-medium tracking-wider text-green-400 sm:text-sm">
                  <BiMessage className="text-base" />

                  CONTACT US
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Send Us a Message
                </h2>

                <p className="mt-2 text-xs leading-6 text-gray-500 sm:text-sm">
                  We'd love to hear from you. Fill out the form below.
                </p>
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="mb-2 block text-xs text-gray-400 sm:text-sm">
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-gray-600
                  focus:border-green-500/60
                  focus:bg-black/30
                "
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="mb-2 block text-xs text-gray-400 sm:text-sm">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-gray-600
                  focus:border-green-500/60
                  focus:bg-black/30
                "
                />
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label className="mb-2 block text-xs text-gray-400 sm:text-sm">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="How can we help?"
                  className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-gray-600
                  focus:border-green-500/60
                  focus:bg-black/30
                "
                />
              </div>

              {/* Message */}
              <div className="mb-5">
                <label className="mb-2 block text-xs text-gray-400 sm:text-sm">
                  Message
                </label>

                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-gray-600
                  focus:border-green-500/60
                  focus:bg-black/30
                  sm:rows-5
                "
                />
              </div>

              {/* Submit */}
              <button
                type="button"
                className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-gradient-to-r
                from-green-400
                to-emerald-500
                px-5
                py-3
                text-sm
                font-bold
                text-black
                transition
                duration-300
                hover:scale-[1.02]
                hover:shadow-lg
                hover:shadow-green-500/20
                active:scale-[0.98]
                sm:text-base
              "
              >
                Send Message

                <span>→</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT - SIDE */}
          {/* ========================================================= */}

          {/* ================= HEADPHONES DECORATION ================= */}
          <div
            className="
    pointer-events-none
    absolute
    bottom-0
    right-[-80px]
    hidden
    w-[400px]
    opacity-40
    lg:block
    xl:right-0
    xl:w-[500px]
    2xl:w-[600px]
  "
          >
            <img
              src={IMG1}
              alt="X-sound headphones"
              className="
      h-auto
      w-full
      object-contain
      mix-blend-screen
    "
            />
          </div>
        </section>
      </div>

      <hr className='text-green-700' />

      {/* ================= FEATURES ================= */}
      <div
        className="
    relative
    z-10
    grid
    grid-cols-1
    border-t
    border-green-900/50
    bg-[#021c08]/90
    backdrop-blur-xl
    sm:grid-cols-2
    lg:grid-cols-4
  "
      >
        {/* Feature 1 */}
        <div
          className="
      flex
      items-center
      gap-4
      border-b
      border-green-900/40
      p-5
      sm:border-r
      lg:border-b-0
    "
        >
          <BiHeadphone
            className="
        h-10
        w-10
        shrink-0
        rounded-full
        border
        border-green-400/30
        bg-green-400/5
        p-2
        text-xl
        text-green-300
      "
          />

          <div>
            <p className="font-semibold">
              Music Support
            </p>

            <span className="text-xs text-gray-400 sm:text-sm">
              We're here to help
            </span>
          </div>
        </div>

        {/* Feature 2 */}
        <div
          className="
      flex
      items-center
      gap-4
      border-b
      border-green-900/40
      p-5
      lg:border-b-0
      lg:border-r
    "
        >
          <BiCheckShield
            className="
        h-10
        w-10
        shrink-0
        rounded-full
        border
        border-green-400/30
        bg-green-400/5
        p-2
        text-xl
        text-green-300
      "
          />

          <div>
            <p className="font-semibold">
              Secure Platform
            </p>

            <span className="text-xs text-gray-400 sm:text-sm">
              Your privacy matters
            </span>
          </div>
        </div>

        {/* Feature 3 */}
        <div
          className="
      flex
      items-center
      gap-4
      border-b
      border-green-900/40
      p-5
      sm:border-r
      lg:border-b-0
    "
        >
          <div
            className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-green-400/30
        bg-green-400/5
        text-green-300
      "
          >
            <FaBoltLightning />
          </div>

          <div>
            <p className="font-semibold">
              Fast Response
            </p>

            <span className="text-xs text-gray-400 sm:text-sm">
              Quick assistance
            </span>
          </div>
        </div>

        {/* Feature 4 */}
        <div
          className="
      flex
      items-center
      gap-4
      p-5
    "
        >
          <div
            className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-green-400/30
        bg-green-400/5
        text-green-300
      "
          >
            <BiHeart />
          </div>

          <div>
            <p className="font-semibold">
              Made With Love
            </p>

            <span className="text-xs text-gray-400 sm:text-sm">
              Music brings us together
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;