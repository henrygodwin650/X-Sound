import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../backend/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const NotificationSettings = () => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    newMusic: true,
    playlistUpdates: true,
    trendingSongs: false,
    weeklyRecommendations: true,
  });

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      const user = auth.currentUser;
      if (!user) return;

      await updateDoc(doc(db, "users", user.uid), {
        notifications,
      });

      alert("Notification settings updated successfully.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const loadNotifications = async () => {
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
        if (data.notifications) {
          setNotifications(data.notifications);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-white">
        Loading notifications...
      </div>
    );
  }

  const settings = [
    {
      name: "push",
      title: "Push Notifications",
      description: "Receive notifications on your device.",
    },
    {
      name: "email",
      title: "Email Notifications",
      description: "Receive updates in your email.",
    },
    {
      name: "newMusic",
      title: "New Music Releases",
      description: "Get notified when your favorite artists release new songs.",
    },
    {
      name: "playlistUpdates",
      title: "Playlist Updates",
      description: "Be notified when playlists are updated.",
    },
    {
      name: "trendingSongs",
      title: "Trending Songs",
      description: "Discover trending songs and charts.",
    },
    {
      name: "weeklyRecommendations",
      title: "Weekly Recommendations",
      description: "Receive personalized music recommendations every week.",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {settings.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
        >
          <div>
            <h3 className="font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
          <input
            type="checkbox"
            name={item.name}
            checked={notifications[item.name]}
            onChange={handleToggle}
            className="h-5 w-5 accent-green-500"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={saving}
        className="mt-6 w-full rounded-2xl bg-green-500 py-3 text-lg font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default NotificationSettings