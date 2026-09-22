import React, { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../../backend/firebase'

// Favorite cards
import Ayra1 from '../../../assets/cover-image/images (16).jpeg'
import Rema from '../../../assets/cover-image/images (1).jpeg'
import Davido from '../../../assets/cover-image/download (4).jpeg'
import Burnaboy2 from '../../../assets/cover-image/images (5).jpeg'
import Wizkid2 from '../../../assets/cover-image/images (12).jpeg'
import { FaHeart, FaPlay } from 'react-icons/fa6'

const favorite = [
  {
    id: 1,
    title: "Calm Down",
    artist: "Rema",
    album: "Rave & Roses",
    cover: Rema,
  },
  {
    id: 2,
    title: "Rush",
    artist: "Ayra Starr",
    album: "Tears & Pain",
    cover: Ayra1,
  },
  {
    id: 3,
    title: "Last Last",
    artist: "Burna Boy",
    album: "Odogwu",
    cover: Burnaboy2,
  },
  {
    id: 4,
    title: "Unavailable",
    artist: "Davido",
    album: "Timeless",
    cover: Davido,
  },
  {
    id: 5,
    title: "Essence",
    artist: "Wizkid",
    album: "Ayo EP",
    cover: Wizkid2,
  },
];

const FavoriteSettings = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const removeFavorites = async (songId) => {
    try{
      setSaving(true)

      const user = auth.currentUser;
      if(!user) return;

      const updatedFavorites = favorites.filter(
        (songs) => songs.id !== songId 
      );
      setFavorites(updatedFavorites);

      await updateDoc(doc(db, "users", user.uid), {
        faavorites: updatedFavorites
      })
    } catch(error){
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  // Load Favorites
  const loadFavorites = async () => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.favorites) {
          setFavorites(data.favorites);
        }
      }
    } catch (error) {
      console.error("Error Loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  },[])

  if(loading) {
    return(
      <div className="flex items-center justify-center py-10">
        Loading favorite songs...
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      <div className="mb-6 flex items-center justify-between">
        <div className="">
          <h2 className="text-2xl font-bold text-white">Favorite Songs</h2>
          <p className="text-sm text-gray-400">
            Songs you've liked on Xsound
          </p>
        </div>
        <div className="">
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-white">
            {favorites.length}
          </span>
        </div>
      </div>

      {favorites.length === 0 && (
        <div className="rounded-3xl border border-white/10 p-8 text-center backdrop-blur-xl">
          {/* Empty Space  */}
          <div className="mb-5 text-5xl">❤</div>
          <h2 className="text-2xl font-bold text-white">
            No Favorites Yet
          </h2>
          <p className="mt-3 text-gray-400">
            Songs you like will appear here.
          </p>
        </div>
      )}
      <div className="space-y-4">
        {favorite.map((song) => (
          <div key={song.id}>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl transition hover:bg-white/15">
              <div className="flex items-center gap-4">
                <img src={song.cover} alt={song.title} className="h-16 w-16 rounded-xl object-cover" />
                <div>
                  <h3 className="font-semibold text-white">
                    {song.title}
                  </h3>
                  <p className='mt-1 text-sm text-gray-400'>{song.artist}</p>
                  <p className="text-xs text-green-400">
                    {song.album}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                 onClick={() => removeFavorites(song.id)}
                 disabled={saving}
                 className="text-3xl disabled:opacity-50 text-red-500 transition hover:scale-110">
                  <FaHeart />
                </button>
                <button className="text-3xl text-green-500 transition hover:scale-110">
                  <FaPlay />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div >
  )
}

export default FavoriteSettings