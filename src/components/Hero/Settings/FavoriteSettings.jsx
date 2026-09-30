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

  // Load favorites from Firestore
  const loadFavorites = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        setFavorites([]);
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (Array.isArray(data.favorites)) {
          setFavorites(data.favorites);
        } else {
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  // Remove favorite
  const removeFavorite = async (songId) => {
    try {
      setSaving(true);

      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const updatedFavorites = favorites.filter(
        (song) => String(song.id) !== String(songId)
      );

      // Update UI immediately
      setFavorites(updatedFavorites);

      // Update Firestore
      await updateDoc(doc(db, "users", user.uid), {
        favorites: updatedFavorites,
      });
    } catch (error) {
      console.error("Error removing favorite:", error);

      // Reload if Firestore update failed
      await loadFavorites();

      alert("Unable to remove this favorite. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Play favorite
  const handlePlay = (song) => {
    playSong(song, favorites);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-gray-400">
          Loading favorite songs...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Favorite Songs
          </h2>

          <p className="text-sm text-gray-400">
            Songs you've liked on Xsound
          </p>
        </div>

        <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-white">
          {favorites.length}
        </span>
      </div>

      {/* EMPTY STATE */}
      {favorites.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <div className="mb-5 text-5xl text-red-400">
            <FaHeart className="mx-auto" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            No Favorites Yet
          </h2>

          <p className="mt-3 text-gray-400">
            Songs you like will appear here.
          </p>
        </div>
      )}

      {/* FAVORITES */}
      {favorites.length > 0 && (
        <div className="space-y-4">
          {favorites.map((song) => (
            <div
              key={song.id}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl transition hover:bg-white/15"
            >
              {/* SONG INFO */}
              <div className="flex min-w-0 items-center gap-4">
                {/* COVER */}
                {song.cover ? (
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-500 text-xl font-bold text-white">
                    {(song.title || "X")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                {/* DETAILS */}
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-white">
                    {song.title}
                  </h3>

                  <p className="mt-1 truncate text-sm text-gray-400">
                    {song.artist || "Unknown Artist"}
                  </p>

                  <p className="truncate text-xs text-green-400">
                    {song.album || "Single"}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="ml-4 flex shrink-0 items-center gap-4">
                {/* REMOVE FAVORITE */}
                <button
                  type="button"
                  onClick={() => removeFavorite(song.id)}
                  disabled={saving}
                  aria-label={`Remove ${song.title} from favorites`}
                  className="text-2xl text-red-500 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaHeart />
                </button>

                {/* PLAY */}
                <button
                  type="button"
                  onClick={() => handlePlay(song)}
                  aria-label={`Play ${song.title}`}
                  className="text-2xl text-green-500 transition hover:scale-110 hover:text-green-400"
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