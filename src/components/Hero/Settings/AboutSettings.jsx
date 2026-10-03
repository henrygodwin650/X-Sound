import React from "react";

const AboutSettings = () => {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* HEADER */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-xl sm:rounded-3xl sm:p-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/20 sm:mb-5 sm:h-20 sm:w-20">
          <span className="text-3xl font-black text-white sm:text-4xl">
            X
          </span>
        </div>

        <h1 className="text-3xl font-black text-white sm:text-4xl">
          X<span className="text-green-500">Sound</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
          Discover, stream and enjoy your favorite music anytime, anywhere.
          XSound delivers a modern listening experience with personalized
          playlists, favorites, and seamless playback.
        </p>
      </div>

      {/* APP INFORMATION */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6">
        <h2 className="mb-5 text-lg font-bold text-white sm:text-xl">
          App Information
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-400 sm:text-base">
              Version
            </span>

            <span className="text-sm font-semibold text-white sm:text-base">
              1.0.0
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-400 sm:text-base">
              Platform
            </span>

            <span className="text-right text-sm font-semibold text-white sm:text-base">
              Web Application
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-400 sm:text-base">
              Status
            </span>

            <span className="text-sm font-semibold text-green-400 sm:text-base">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6">
        <h2 className="mb-5 text-lg font-bold text-white sm:text-xl">
          What You Can Do
        </h2>

        <div className="space-y-3">
          <div className="rounded-xl bg-white/5 p-3 text-sm text-white sm:p-4 sm:text-base">
            🎵 Stream your favorite music
          </div>

          <div className="rounded-xl bg-white/5 p-3 text-sm text-white sm:p-4 sm:text-base">
            ❤️ Save songs to Favorites
          </div>

          <div className="rounded-xl bg-white/5 p-3 text-sm text-white sm:p-4 sm:text-base">
            🎼 Create and manage playlists
          </div>

          <div className="rounded-xl bg-white/5 p-3 text-sm text-white sm:p-4 sm:text-base">
            🔍 Search artists, albums and songs
          </div>

          <div className="rounded-xl bg-white/5 p-3 text-sm text-white sm:p-4 sm:text-base">
            ⚙️ Customize your listening experience
          </div>
        </div>
      </div>

      {/* PRIVACY */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
        <h3 className="text-base font-semibold text-white sm:text-lg">
          🔒 Privacy Policy
        </h3>

        <p className="mt-3 text-sm leading-7 text-gray-400">
          XSound respects your privacy. Your account information, playlists,
          favorites, and personal settings are securely stored and are only
          used to improve your music experience.
        </p>
      </div>

      {/* TERMS */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
        <h3 className="text-base font-semibold text-white sm:text-lg">
          📜 Terms of Service
        </h3>

        <p className="mt-3 text-sm leading-7 text-gray-400">
          By using XSound you agree to use the platform responsibly and comply
          with applicable laws and regulations.
        </p>
      </div>

      {/* SUPPORT */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
        <h3 className="text-base font-semibold text-white sm:text-lg">
          ☎ Contact Support
        </h3>

        <p className="mt-3 text-sm text-gray-400">
          Need help? Reach out to our support team.
        </p>

        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-green-500 py-3 text-sm font-semibold text-white transition hover:bg-green-600 sm:text-base"
        >
          ☎ Contact Support
        </button>
      </div>

      {/* FAQ */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
        <h3 className="text-base font-semibold text-white sm:text-lg">
          ❔ Help & FAQ
        </h3>

        <p className="mt-3 text-sm text-gray-400">
          Find answers to common questions about using XSound.
        </p>

        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-green-500 py-3 text-sm font-semibold text-white transition hover:bg-green-600 sm:text-base"
        >
          View FAQ
        </button>
      </div>

      {/* CREDITS */}
      <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-center sm:p-6">
        <h3 className="text-xl font-bold text-white">
          X<span className="text-green-500">Sound</span>
        </h3>

        <p className="mt-3 text-sm text-gray-300 sm:text-base">
          Built with React, Tailwind CSS and Firebase.
        </p>

        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
          &copy; 2026 XSound. All rights reserved.
        </p>
      </div>

      {/* FOOTER */}
      <div className="pb-2 text-center">
        <p className="text-sm text-gray-400">
          Thank you for choosing
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          X<span className="text-green-500">Sound</span>
        </h2>

        <p className="mt-3 text-xs text-gray-500 sm:text-sm">
          Your music. Your vibe. Your sound.
        </p>
      </div>
    </div>
  );
};

export default AboutSettings;