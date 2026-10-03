import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../backend/firebase";

const PlaybackSettings = () => {
  const [playback, setPlayback] = useState({
    autoplay: true,
    shuffle: false,
    repeat: "off",
    audioQuality: "high",
    explicitContent: true,
    volume: 80,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setPlayback((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "volume"
            ? Number(value)
            : value,
    }));
  };

  const loadPlayback = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      const docSnap = await getDoc(
        doc(db, "users", user.uid)
      );

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.playback) {
          setPlayback((prev) => ({
            ...prev,
            ...data.playback,
          }));
        }
      }
    } catch (error) {
      console.error("Playback loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const user = auth.currentUser;

      if (!user) return;

      await updateDoc(doc(db, "users", user.uid), {
        playback,
      });

      alert("Playback settings updated successfully.");
    } catch (error) {
      console.error("Playback update error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadPlayback();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-white">
        Loading playback settings...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* AUTOPLAY */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white sm:text-lg">
            Autoplay
          </h3>

          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            Automatically play the next song.
          </p>
        </div>

        <input
          type="checkbox"
          name="autoplay"
          checked={playback.autoplay}
          onChange={handleChange}
          className="h-5 w-5 shrink-0 accent-green-500"
        />
      </div>

      {/* SHUFFLE */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white sm:text-lg">
            Shuffle
          </h3>

          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            Shuffle songs by default.
          </p>
        </div>

        <input
          type="checkbox"
          name="shuffle"
          checked={playback.shuffle}
          onChange={handleChange}
          className="h-5 w-5 shrink-0 accent-green-500"
        />
      </div>

      {/* REPEAT */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
        <label className="mb-3 block text-base font-semibold text-white sm:text-lg">
          Repeat Mode
        </label>

        <select
          name="repeat"
          value={playback.repeat}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none sm:text-base"
        >
          <option value="off">Off</option>
          <option value="one">Repeat Current Song</option>
          <option value="all">Repeat Playlist</option>
        </select>
      </div>

      {/* AUDIO QUALITY */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
        <label className="mb-3 block text-base font-semibold text-white sm:text-lg">
          Audio Quality
        </label>

        <select
          name="audioQuality"
          value={playback.audioQuality}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none sm:text-base"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* VOLUME */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="text-base font-semibold text-white sm:text-lg">
            Default Volume
          </h3>

          <span className="shrink-0 font-semibold text-green-400">
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

      {/* EXPLICIT CONTENT */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white sm:text-lg">
            Explicit Content
          </h3>

          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            Allow songs marked as explicit.
          </p>
        </div>

        <input
          type="checkbox"
          name="explicitContent"
          checked={playback.explicitContent}
          onChange={handleChange}
          className="h-5 w-5 shrink-0 accent-green-500"
        />
      </div>

      {/* SAVE */}
      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-2xl bg-green-500 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default PlaybackSettings;