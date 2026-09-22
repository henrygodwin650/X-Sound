import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  FaBell,
  FaHeart,
  FaMusic,
  FaUser,
  FaBellSlash,
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
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-900 to-green-950">

      <div className="absolute inset-0">

        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-green-500/20 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-112 w-md rounded-full bg-emerald-500/20 blur-[170px]" />

      </div>
      {notes.map((note) => (
        <motion.div
          key={note.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-20vh",
            opacity: [0, .5, .8, 0],
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
      <div className="relative z-10 pt-24 pb-10">

        <div className="flex items-center justify-center gap-4 text-white">

          <FaGear className="text-4xl text-green-400" />

          <h1 className="text-4xl font-black">
            Settings
          </h1>

        </div>

      </div>
      <ul className="relative z-10 mx-auto flex max-w-4xl flex-col gap-4 mb-8 px-4 pb-10">

        {/* Profile  */}
        <SettingItems
          title="Profile"
          icon={<FaUser />}
          section="profile"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <ProfileForm />
        </SettingItems>

        {/* Account  */}
        <SettingItems
          title="Account & Security"
          icon={<FaLock />}
          section="account"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <AccountSettings />
        </SettingItems>

        {/* Notification Settings */}
        <SettingItems
          title="Notifications"
          icon={<FaBell />}
          section="notifications"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <NotificationSettings />
        </SettingItems>
        
        {/* Appearance  */}
        <SettingItems
          title="Appearance"
          icon={<FaPaintRoller />}
          section="appearance"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <AppearanceSettings />
        </SettingItems>

        {/* Playback  */}
        <SettingItems
          title="Playback"
          icon={<FaPlay />}
          section="playback"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <PlaybackSettings />
        </SettingItems>

        {/* Favorites  */}
        <SettingItems
          title="Favorites"
          icon={<FaHeart />}
          section="favorites"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <FavoriteSettings />
        </SettingItems>

        {/* Playlist  */}
        <SettingItems
          title="Playlist"
          icon={<FaMusic />}
          section="playlist"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <PlayListSettings />
        </SettingItems>

        {/* About Settings */}
        <SettingItems
          title="About XSound"
          icon={<FaCircleInfo />}
          section="about"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <AboutSettings />
        </SettingItems>

        {/* Logout Settings  */}
        <SettingItems
          title="Logout"
          icon={<FiLogOut />}
          titleColor="text-red-500"
          section="logout"
          activeSection={activeSection}
          toggleSection={toggleSection}
        >
          <LogoutSettings />
        </SettingItems>

      </ul>
    </div>
  )
}

export default Settings;