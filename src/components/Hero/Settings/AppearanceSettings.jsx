import { doc, updateDoc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../backend/firebase";

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
    } else {
      const preferDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      document.documentElement.classList.toggle(
        "dark",
        preferDark
      );
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

      const docSnap = await getDoc(
        doc(db, "users", user.uid)
      );

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.appearance) {
          const settings = {
            ...appearance,
            ...data.appearance,
          };

          setAppearance(settings);
          applyTheme(settings.theme);
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
      <div className="flex items-center justify-center py-10 text-sm text-white">
        Loading appearance settings...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* THEME */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
        <label className="mb-3 block text-base font-semibold text-white sm:text-lg">
          Theme
        </label>

        <select
          name="theme"
          value={appearance.theme}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none sm:text-base"
        >
          <option value="dark">🌙 Dark</option>
          <option value="light">☀️ Light</option>
          <option value="system">💻 System Default</option>
        </select>
      </div>

      {/* ANIMATIONS */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white sm:text-base">
            Enable Animations
          </h3>

          <p className="mt-1 text-xs leading-5 text-gray-400 sm:text-sm">
            Smooth page transitions and effects.
          </p>
        </div>

        <input
          type="checkbox"
          name="animations"
          checked={appearance.animations}
          onChange={handleChange}
          className="h-5 w-5 shrink-0 accent-green-500"
        />
      </div>

      {/* GLASS */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white sm:text-base">
            Glass Effect
          </h3>

          <p className="mt-1 text-xs leading-5 text-gray-400 sm:text-sm">
            Enable glassmorphism throughout the app.
          </p>
        </div>

        <input
          type="checkbox"
          name="glassEffect"
          checked={appearance.glassEffect}
          onChange={handleChange}
          className="h-5 w-5 shrink-0 accent-green-500"
        />
      </div>

      {/* ACCENT */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
        <label className="mb-3 block text-base font-semibold text-white sm:text-lg">
          Accent Color
        </label>

        <select
          name="accentColor"
          value={appearance.accentColor}
          onChange={handleChange}
          className="w-full rounded-xl bg-zinc-900 p-3 text-sm text-white sm:text-base"
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
        className="w-full rounded-2xl bg-green-500 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
      >
        {saving ? "Saving Changes..." : "Save Changes"}
      </button>
    </form>
  );
};

export default AppearanceSettings;