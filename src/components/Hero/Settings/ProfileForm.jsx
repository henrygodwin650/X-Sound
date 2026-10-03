import React, { useEffect, useState } from "react";
import { FaSave, FaUser } from "react-icons/fa";
import { auth, db } from "../../../backend/firebase";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    country: "Nigeria",
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});

  const loadProfile = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      const docSnap = await getDoc(
        doc(db, "users", user.uid)
      );

      const data = docSnap.exists()
        ? docSnap.data()
        : {};

      setFormData({
        displayName: user.displayName || "",
        username: data.username || "",
        email: user.email || "",
        phone: data.phone || "",
        bio: data.bio || "",
        country: data.country || "Nigeria",
      });
    } catch (error) {
      console.error("Profile loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));

    setMessage("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required.";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (formData.username.length < 3) {
      newErrors.username =
        "Username must be at least 3 characters.";
    }

    if (
      formData.phone &&
      !/^\+?[0-9]{10,15}$/.test(
        formData.phone.replace(/\s/g, "")
      )
    ) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (formData.bio.length > 150) {
      newErrors.bio = "Bio cannot exceed 150 characters.";
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!validate()) return;

    const user = auth.currentUser;

    if (!user) return;

    try {
      setSaving(true);

      await updateProfile(user, {
        displayName: formData.displayName.trim(),
      });

      await setDoc(
        doc(db, "users", user.uid),
        {
          username: formData.username.trim(),
          phone: formData.phone.trim(),
          bio: formData.bio.trim(),
          country: formData.country,
        },
        {
          merge: true,
        }
      );

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);

      setMessage(
        "Something went wrong. Please try again later."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:rounded-3xl sm:p-6"
    >
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3 text-lg font-bold text-green-400 sm:mb-8 sm:text-xl">
        <FaUser className="text-xl text-white sm:text-2xl" />
        Profile Settings
      </div>

      {/* MESSAGE */}
      {message && (
        <div
          className={`mb-5 rounded-xl border px-4 py-3 text-center text-sm ${
            message.includes("successfully")
              ? "border-green-500/30 bg-green-500/10 text-green-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          {message}
        </div>
      )}

      {/* AVATAR */}
      <div className="mb-7 flex justify-center sm:mb-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-green-500 bg-green-600 text-4xl font-bold text-white sm:h-28 sm:w-28 sm:text-5xl">
          {(formData.displayName?.charAt(0) || "U").toUpperCase()}
        </div>
      </div>

      {/* INPUT GRID */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {/* DISPLAY NAME */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Display Name
          </label>

          <input
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="Your name"
            type="text"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500 sm:text-base"
          />

          {error.displayName && (
            <p className="mt-1 text-xs text-red-400 sm:text-sm">
              {error.displayName}
            </p>
          )}
        </div>

        {/* USERNAME */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Username
          </label>

          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="@username"
            type="text"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500 sm:text-base"
          />

          {error.username && (
            <p className="mt-1 text-xs text-red-400 sm:text-sm">
              {error.username}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-400 outline-none sm:text-base"
          />

          <p className="mt-1 text-xs text-gray-500">
            Email is managed by your Firebase account.
          </p>
        </div>

        {/* PHONE */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+234 904 000 0000"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500 sm:text-base"
          />

          {error.phone && (
            <p className="mt-1 text-xs text-red-400 sm:text-sm">
              {error.phone}
            </p>
          )}
        </div>

        {/* BIO */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Bio
          </label>

          <textarea
            rows={4}
            name="bio"
            value={formData.bio}
            maxLength={150}
            onChange={handleChange}
            placeholder="Tell people about yourself..."
            className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500 sm:text-base"
          />

          {error.bio && (
            <p className="mt-1 text-xs text-red-400 sm:text-sm">
              {error.bio}
            </p>
          )}

          <p className="mt-1 text-right text-xs text-gray-400">
            {formData.bio.length} / 150
          </p>
        </div>

        {/* COUNTRY */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Country
          </label>

          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500 sm:text-base"
          >
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="South Africa">South Africa</option>
            <option value="United States">United States</option>
          </select>
        </div>

        {/* SAVE */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            <FaSave />

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;