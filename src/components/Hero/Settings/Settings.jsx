import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  FaBell,
  FaHeart,
  FaMusic,
  FaUser,
  FaLock,
  FaPlay,
  FaPaintRoller,
} from "react-icons/fa";

import {
  FaCircleInfo,
  FaGear,
} from "react-icons/fa6";

import { FiLogOut } from "react-icons/fi";

import SettingItems from "./SettingItems";
import ProfileForm from "./ProfileForm";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import PlaybackSettings from "./PlaybackSettings";
import LogoutSettings from "./LogoutSettings";
import AppearanceSettings from "./AppearanceSettings";
import FavoriteSettings from "./FavoriteSettings";
import PlayListSettings from "./PlayListSettings";
import AboutSettings from "./AboutSettings";

const notes = [
  { id: 1, left: "5%", size: 24, duration: 12, delay: 0 },
  { id: 2, left: "15%", size: 18, duration: 16, delay: 3 },
  { id: 3, left: "25%", size: 30, duration: 18, delay: 5 },
  { id: 4, left: "38%", size: 22, duration: 15, delay: 2 },
  { id: 5, left: "52%", size: 28, duration: 14, delay: 7 },
  { id: 6, left: "66%", size: 20, duration: 19, delay: 4 },
  { id: 7, left: "78%", size: 26, duration: 17, delay: 8 },
  { id: 8, left: "92%", size: 22, duration: 13, delay: 6 },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection((prev) =>
      prev === section ? null : section
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-green-950">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-green-500/20 blur-[120px] sm:h-96 sm:w-96 sm:blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-[130px] sm:h-[28rem] sm:w-[28rem] sm:blur-[170px]" />
      </div>

      {/* FLOATING NOTES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{
              y: "110vh",
              opacity: 0,
            }}
            animate={{
              y: "-20vh",
              opacity: [0, 0.5, 0.8, 0],
            }}
            transition={{
              duration: note.duration,
              delay: note.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: note.left,
              fontSize: note.size,
            }}
            className="absolute text-green-400/20"
          >
            <FaMusic />
          </motion.div>
        ))}
      </div>

      {/* PAGE HEADER */}
      <div className="relative z-10 px-4 pb-6 pt-24 sm:pb-8 sm:pt-28">
        <div className="flex items-center justify-center gap-3 text-white sm:gap-4">
          <FaGear className="text-2xl text-green-400 sm:text-4xl" />

          <h1 className="text-3xl font-black sm:text-4xl">
            Settings
          </h1>
        </div>

        <p className="mx-auto mt-3 max-w-lg text-center text-xs text-gray-400 sm:text-sm">
          Customize your XSound account and listening experience.
        </p>
      </div>

      {/* SETTINGS */}
      <ul className="relative z-10 mx-auto mb-8 flex w-full max-w-4xl flex-col gap-3 px-3 pb-10 sm:gap-4 sm:px-4">
        {/* PROFILE */}
        <SettingItems
          title="Profile"
          icon={<FaUser />}
          section="profile"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <ProfileForm />
        </SettingItems>

        {/* ACCOUNT */}
        <SettingItems
          title="Account & Security"
          icon={<FaLock />}
          section="account"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <AccountSettings />
        </SettingItems>

        {/* NOTIFICATIONS */}
        <SettingItems
          title="Notifications"
          icon={<FaBell />}
          section="notifications"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <NotificationSettings />
        </SettingItems>

        {/* APPEARANCE */}
        <SettingItems
          title="Appearance"
          icon={<FaPaintRoller />}
          section="appearance"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <AppearanceSettings />
        </SettingItems>

        {/* PLAYBACK */}
        <SettingItems
          title="Playback"
          icon={<FaPlay />}
          section="playback"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <PlaybackSettings />
        </SettingItems>

        {/* FAVORITES */}
        <SettingItems
          title="Favorites"
          icon={<FaHeart />}
          section="favorites"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <FavoriteSettings />
        </SettingItems>

        {/* PLAYLIST */}
        <SettingItems
          title="Playlist"
          icon={<FaMusic />}
          section="playlist"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <PlayListSettings />
        </SettingItems>

        {/* ABOUT */}
        <SettingItems
          title="About XSound"
          icon={<FaCircleInfo />}
          section="about"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <AboutSettings />
        </SettingItems>

        {/* LOGOUT */}
        <SettingItems
          title="Logout"
          icon={<FiLogOut />}
          titleClass="text-red-500"
          section="logout"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <LogoutSettings />
        </SettingItems>
      </ul>
    </div>
  );
};

export default Settings;