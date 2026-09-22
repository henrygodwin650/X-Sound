import { doc, updateDoc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../backend/firebase';

const AppearanceSettings = () => {
  const [appearance, setAppearance] = useState({
    theme: "dark",
    animations: true,
    glassEffect: true,
    accentColor: "green",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppearance((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "system") {
      const preferDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", preferDark);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      const user = auth.currentUser;
      if (!user) return;

      await updateDoc(doc(db, "users", user.uid), {
        appearance,
      });

      applyTheme(appearance.theme);
      alert("Appearance settings updated successfully.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const loadAppearance = async () => {
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
        if (data.appearance) {
          setAppearance((prev) => ({
            ...prev,
            ...data.appearance,
          }));
          applyTheme(data.appearance.theme || "dark");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppearance();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-white">
        Loading appearance settings...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
        <label className="mb-3 block text-lg font-semibold text-white">
          Theme
        </label>
        <select
          name="theme"
          value={appearance.theme}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none"
        >
          <option value="dark">🌙 Dark</option>
          <option value="light">☀️ Light</option>
          <option value="system">💻 System Default</option>
        </select>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4">
        <div>
          <h3 className="font-semibold text-white">Enable Animations</h3>
          <p className="text-sm text-gray-400">
            Smooth page transitions and effects.
          </p>
        </div>
        <input
          type="checkbox"
          name="animations"
          checked={appearance.animations}
          onChange={handleChange}
          className="h-5 w-5 accent-green-500"
        />
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4">
        <div>
          <h3 className="font-semibold text-white">Glass Effect</h3>
          <p className="text-sm text-gray-400">
            Enable glassmorphism throughout the app.
          </p>
        </div>
        <input
          type="checkbox"
          name="glassEffect"
          checked={appearance.glassEffect}
          onChange={handleChange}
          className="h-5 w-5 accent-green-500"
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
        <label className="mb-3 block font-semibold text-white">
          Accent Color
        </label>
        <select
          name="accentColor"
          value={appearance.accentColor}
          onChange={handleChange}
          className="w-full rounded-xl bg-zinc-900 p-3 text-white"
        >
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="red">Red</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-6 w-full rounded-2xl bg-green-500 py-3 text-lg font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving Changes..." : "Save Changes"}
      </button>
    </form>
  );
};

export default AppearanceSettings