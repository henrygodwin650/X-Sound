import React, { useState } from 'react'

const PlaybackSettings = () => {
  // States
  const [playback, setPlayback] = useState({
    autoplay: true,
    shuffle: false,
    repeat: "off",
    audioQuality: "high",
    explicitContent: true,
    volume: 80,
  });

  // Handle Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setPlayback((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <div>

      {/* Autoplay */}
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
        <div>{ }
          <h3 className="text-lg font-semibold text-white">
            Autoplay
          </h3>

          <p className="text-sm text-gray-400">
            Automatically play the next song.
          </p>
        </div>

        <input
          type="checkbox"
          name="autoplay"
          checked={playback.autoplay}
          onChange={handleChange}
          className="h-5 w-5 accent-green-500"
        />
      </div>

      {/* Shuffle */}
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Shuffle
          </h3>

          <p className="text-sm text-gray-400">
            Shuffle songs by default.
          </p>
        </div>

        <input
          type="checkbox"
          name="shuffle"
          checked={playback.shuffle}
          onChange={handleChange}
          className="h-5 w-5 accent-green-500"
        />
      </div>

      {/* Repeat Mode */}
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
        <label className="mb-3 block text-lg font-semibold text-white">
          Repeat Mode
        </label>

        <select
          name="repeat"
          value={playback.repeat}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
        >
          <option value="off">Off</option>
          <option value="one">Repeat Current Song</option>
          <option value="all">Repeat Playlist</option>
        </select>
      </div>

      {/* Audio Quality */}
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
        <label className="mb-3 block text-lg font-semibold text-white">
          Audio Quality
        </label>

        <select
          name="audioQuality"
          value={playback.audioQuality}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Volume */}
      <div className="mt-4 rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-xl">

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-lg font-semibold">
            Default Volume
          </h3>

          <span className="text-green-400 font-semibold">
            {playback.volume}%
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          name="volume"
          value={playback.volume}
          onChange={handleChange}
          className="w-full accent-green-500"
        />

      </div>

      {/* Explicit Content */}
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Explicit Content
          </h3>

          <p className="text-sm text-gray-400">
            Allow songs marked as explicit.
          </p>
        </div>

        <input
          type="checkbox"
          name="explicitContent"
          checked={playback.explicitContent}
          onChange={handleChange}
          className="h-5 w-5 accent-green-500"
        />
      </div>
      {/* Save Button */}
      <button
        type="submit"
        className="mt-6 w-full rounded-2xl bg-green-500 py-3 text-lg font-semibold text-white transition hover:bg-green-600"
      >
        Save Changes
      </button>
    </div>
  )
}

export default PlaybackSettings