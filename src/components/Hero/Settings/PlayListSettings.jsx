import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../backend/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const PlayListSettings = () => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const startEditing = (playlist) => {
    setEditingId(playlist.id);
    setEditName(playlist.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  // SAVE PLAYLIST
  const savePlaylist = async (playlistId) => {
    if (!editName.trim()) return;

    try {
      setSaving(true);

      const user = auth.currentUser;
      if (!user) return;

      const updatedPlaylists = playlists.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, name: editName.trim() }
          : playlist
      );
      setPlaylists(updatedPlaylists);

      await updateDoc(doc(db, "users", user.uid), {
        playlists: updatedPlaylists,
      });

      setEditingId(null);
      setEditName("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // DELETE PLAYLIST
  const deletePlaylist = async (playlistId) => {
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

  // LOAD PLAYLIST
  const loadPlaylist = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.playlists) {
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

      const updatedPlaylists = [...playlists, newPlaylist];

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
        <p className="text-white">Loading playlists...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">My Playlists</h2>
          <p className="text-sm text-gray-400">
            Create and manage your music playlists
          </p>
        </div>
        <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white">
          {playlists.length}
        </span>
      </div>

      {/* Create Playlist Card */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Create Playlist
        </h3>

        <input
          type="text"
          placeholder="Enter playlist name..."
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder:text-gray-500 outline-none"
        />

        <button
          type="button"
          onClick={createPlaylist}
          disabled={saving}
          className="mt-4 w-full rounded-xl bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600 disabled:opacity-50"
        >
          {saving ? "Creating..." : "Create playlist"}
        </button>
      </div>

      {playlists.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/10 p-10 text-center backdrop-blur-xl">
          <div className="mb-4 text-6xl">🎵</div>
          <h3 className="text-2xl font-bold text-white">No Playlists Yet</h3>
          <p className="mt-2 text-gray-400">
            Create your first playlist and start organizing your favorite songs.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl hover:bg-white/15"
          >
            <div className="flex-1">
              {editingId === playlist.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-white outline-none"
                  autoFocus
                />
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-white">
                    {playlist.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {(playlist.songs || []).length} Songs
                  </p>
                </>
              )}
            </div>

            <div className="ml-4 flex gap-2">
              {editingId === playlist.id ? (
                <>
                  <button
                    onClick={() => savePlaylist(playlist.id)}
                    disabled={saving}
                    className="rounded-lg bg-green-500 px-4 py-2 text-white disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="rounded-lg bg-gray-500 px-4 py-2 text-white"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(playlist)}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePlaylist(playlist.id)}
                    disabled={saving}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white disabled:opacity-50"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayListSettings