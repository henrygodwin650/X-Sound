import React from 'react'

const AboutSettings = () => {
  return (
    <div className='space-y-3'>

      {/* HEADER */}
      <div className="rounded-3xl border border-white/10 bg-whitee/10 p-8 backdrop-blur-xltext-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green500/20 border border-green-500/30">
          <span className="text-4xl font-black text-white">X</span>
        </div>
        <h1 className="text-4xl font-black text-white">
          X <span className="text-green-500">Sound</span>
        </h1>
        <p className="mt-4 text-gray-300 leading-8">
          Discover, stream and enjoy your favorite music anytime, anywhere. XSound delivers a modern listening experience with personalized playlists, favorites, and seamless playback.
        </p>
      </div>

      {/* APP INFO */}
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
        <h2 className="mb-5 text-xl font-bold text-white">
          App Information
        </h2>

        <div className="space-y-4">
          {/* APP */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Version</span>
            <span className="font-semibold text-white">1.0.0</span>
          </div>

          {/* WEB */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Platform</span>
            <span className="font-semibold text-white">
              Web Application
            </span>
          </div>

          {/* STATUS */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Status</span>
            <span className="font-semibold text-green-400">Online</span>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
        <h2 className="mb-5 text-xl font-bold text-white">
          What You Can Do
        </h2>
        <div className="space-y-3">
          <div className="rounded-xl bg-white/5 p-4 text-white">🎵 Stream your favorite music</div>
          <div className="rounded-xl bg-white/5 p-4 text-white">❤ Save songs to Favorites</div>
          <div className="rounded-xl bg-white/5 p-4 text-white">🎼 Create and manage playlists</div>
          <div className="rounded-xl bg-white/5 p-4 text-white">🔍 Search artists, album and songs</div>
          <div className="rounded-xl bg-white/5 p-4 text-white">⚙ Customize your listening experience</div>
        </div>
      </div>

      {/* APP TERMS */}
      <div>
        {/* Privacy Policy */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">🔒Privacy Policy</h3>
          <p className="mt-3 text-sm leading-7 text-gray-400">
            Xsound respects your privacy. Your account information, playlsits, favorites, and personal settings are securely stored and are only used to improve your music experience.
          </p>
        </div>

        {/* TERMS OF SERVICE */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <h1 className="text-lg font-semibold text-white">
            📜 Terms of service
          </h1>
          <p className="mt-3 text-sm leading-7 text-gray-400">
            By using XSound you agree to use the platform responsibly and comply with applicable laws and regulations.
          </p>
        </div>

        {/* CONTACT SUPPORT */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">☎ Contact Support</h3>
          <p className="mt-3 text-sm text-gray-400">
            Need help? Reach out to our support team
          </p>
          <button className="mt-4 w-full rounded-xl bg-green-500 py-3 font-semibold text-white transition hover:bg-">
            ☎ Contact Support
          </button>
        </div>

        {/* HELP & FAQ */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">❔ Help & FAQ</h3>
          <p className="mt-3 text-sm text-gray-400">
            Find answers to common questions about using xsound
          </p>
          <button className="mt-4 w-full rounded-xl bg-green-500 py-3 font-semibold text-white transition hover:bg-">
            View FAQ
          </button>
        </div>
      </div>

      {/* APP CREDITS */}
      <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-6 text-center">
        <h3 className="text-xl font-bold text-white">
          X<span className="text-green-500">Sound</span>
        </h3>

        <p className="mt-3 text-gray-300">
          Built with React, Tailwind CSS and Firebase.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          &copy; 2026 XSound. All rights reserved.
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Thank you for choosing
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">
          X <span className="text-green-500">Sound</span>
        </h2>
        <p className="mt-3 text-sm text-gray-500">
          Your music. Your vibe. Your sound.
        </p>
      </div>
    </div>
  )
}

export default AboutSettings