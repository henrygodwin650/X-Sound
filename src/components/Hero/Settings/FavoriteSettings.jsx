import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../backend/firebase";
import { FaHeart, FaPlay } from "react-icons/fa6";
import useMusic from "../../../Hooks/useMusic";

const FavoriteSettings = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { playSong } = useMusic();

  const loadFavorites = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        setFavorites([]);
        return;
      }

      const docSnap = await getDoc(
        doc(db, "users", user.uid)
      );

      if (docSnap.exists()) {
        const data = docSnap.data();

        setFavorites(
          Array.isArray(data.favorites)
            ? data.favorites
            : []
        );
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (songId) => {
    try {
      setSaving(true);

      const user = auth.currentUser;

      if (!user) return;

      const updatedFavorites = favorites.filter(
        (song) => String(song.id) !== String(songId)
      );

      setFavorites(updatedFavorites);

      await updateDoc(doc(db, "users", user.uid), {
        favorites: updatedFavorites,
      });
    } catch (error) {
      console.error("Error removing favorite:", error);

      await loadFavorites();

      alert("Unable to remove this favorite. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePlay = (song) => {
    playSong(song, favorites);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-sm text-gray-400">
          Loading favorite songs...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Favorite Songs
          </h2>

          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            Songs you've liked on XSound
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white sm:text-sm">
          {favorites.length}
        </span>
      </div>

      {/* EMPTY */}
      {favorites.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl sm:p-8">
          <FaHeart className="mx-auto mb-5 text-4xl text-red-400 sm:text-5xl" />

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            No Favorites Yet
          </h2>

          <p className="mt-3 text-sm text-gray-400">
            Songs you like will appear here.
          </p>
        </div>
      )}

      {/* FAVORITES */}
      {favorites.length > 0 && (
        <div className="space-y-3">
          {favorites.map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl transition hover:bg-white/15 sm:gap-4 sm:p-4"
            >
              {/* COVER */}
              {song.cover ? (
                <img
                  src={song.cover}
                  alt={song.title}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-500 text-xl font-bold text-white sm:h-16 sm:w-16">
                  {(song.title || "X")
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              {/* INFO */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                  {song.title}
                </h3>

                <p className="mt-1 truncate text-xs text-gray-400 sm:text-sm">
                  {song.artist || "Unknown Artist"}
                </p>

                <p className="truncate text-xs text-green-400">
                  {song.album || "Single"}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => removeFavorite(song.id)}
                  disabled={saving}
                  aria-label={`Remove ${song.title} from favorites`}
                  className="text-lg text-red-500 transition hover:scale-110 disabled:opacity-50 sm:text-2xl"
                >
                  <FaHeart />
                </button>

                <button
                  type="button"
                  onClick={() => handlePlay(song)}
                  aria-label={`Play ${song.title}`}
                  className="text-lg text-green-500 transition hover:scale-110 hover:text-green-400 sm:text-2xl"
                >
                  <FaPlay />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteSettings;