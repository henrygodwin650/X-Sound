import React, { useEffect, useState } from "react";
import { auth, db } from "../../../backend/firebase";
import {
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const PlayListSettings = () => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const startEditing = (playlist) => {
    setEditingId(playlist.id);
    setEditName(playlist.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  const savePlaylist = async (playlistId) => {
    if (!editName.trim()) {
      alert("Enter a playlist name.");
      return;
    }

    try {
      setSaving(true);

      const user = auth.currentUser;

      if (!user) return;

      const updatedPlaylists = playlists.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              name: editName.trim(),
            }
          : playlist
      );

      setPlaylists(updatedPlaylists);

      await updateDoc(doc(db, "users", user.uid), {
        playlists: updatedPlaylists,
      });

      cancelEditing();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const deletePlaylist = async (playlistId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this playlist?"
    );

    if (!confirmed) return;

    try {
      setSaving(true);

      const user = auth.currentUser;

      if (!user) return;

      const updatedPlaylists = playlists.filter(
        (playlist) => playlist.id !== playlistId
      );

      setPlaylists(updatedPlaylists);

      await updateDoc(doc(db, "users", user.uid), {
        playlists: updatedPlaylists,
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const loadPlaylist = async () => {
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

        if (Array.isArray(data.playlists)) {
          setPlaylists(data.playlists);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlaylist();
  }, []);

  const createPlaylist = async () => {
    if (!playlistName.trim()) {
      alert("Enter a playlist name.");
      return;
    }

    try {
      setSaving(true);

      const user = auth.currentUser;

      if (!user) return;

      const newPlaylist = {
        id: crypto.randomUUID(),
        name: playlistName.trim(),
        songs: [],
        createdAt: new Date().toISOString(),
      };

      const updatedPlaylists = [
        ...playlists,
        newPlaylist,
      ];

      setPlaylists(updatedPlaylists);

      await updateDoc(doc(db, "users", user.uid), {
        playlists: updatedPlaylists,
      });

      setPlaylistName("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-sm text-white">
          Loading playlists...
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
            My Playlists
          </h2>

          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            Create and manage your music playlists.
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white sm:px-4 sm:py-2 sm:text-sm">
          {playlists.length}
        </span>
      </div>

      {/* CREATE */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
        <h3 className="mb-4 text-base font-semibold text-white sm:text-lg">
          Create Playlist
        </h3>

        <input
          type="text"
          placeholder="Enter playlist name..."
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createPlaylist();
            }
          }}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 sm:text-base"
        />

        <button
          type="button"
          onClick={createPlaylist}
          disabled={saving}
          className="mt-4 w-full rounded-xl bg-green-500 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-50 sm:text-base"
        >
          {saving ? "Creating..." : "Create Playlist"}
        </button>
      </div>

      {/* EMPTY */}
      {playlists.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-center backdrop-blur-xl sm:p-10">
          <div className="mb-4 text-5xl sm:text-6xl">
            🎵
          </div>

          <h3 className="text-xl font-bold text-white sm:text-2xl">
            No Playlists Yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
            Create your first playlist and start organizing your
            favorite songs.
          </p>
        </div>
      )}

      {/* PLAYLISTS */}
      <div className="space-y-3">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl transition hover:bg-white/15"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                {editingId === playlist.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white outline-none sm:text-base"
                    autoFocus
                  />
                ) : (
                  <>
                    <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                      {playlist.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                      {(playlist.songs || []).length} Songs
                    </p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex">
                {editingId === playlist.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => savePlaylist(playlist.id)}
                      disabled={saving}
                      className="rounded-lg bg-green-500 px-3 py-2 text-sm text-white disabled:opacity-50 sm:px-4"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="rounded-lg bg-gray-600 px-3 py-2 text-sm text-white sm:px-4"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => startEditing(playlist)}
                      className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white sm:px-4"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deletePlaylist(playlist.id)}
                      disabled={saving}
                      className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white disabled:opacity-50 sm:px-4"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayListSettings;