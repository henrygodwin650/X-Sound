import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import AnimatedBackground from "../Navbar/AnimatedBackground";
import Trending from "../Navbar/Trending";
import RecentlyAdded from "../Home/RecentlyAdded";
import Hero from "../Home/Hero";
import DiscoverMusic from "../Home/DiscoverMusic";
import PopularArtists from "../Home/PopularArtist";
import ContinueListening from "../Home/ContinueListening";
import TopAlbums from "../Home/TopAlbum";
import Genres from "../Home/Genres";
import FeaturedPlaylist from "../Home/FeaturedPlaylist";
import Recommended from "../Home/Recommended";
import RecentlyPlayed from "../Home/RecentlyPlayed";
import TopCharts from "../Home/TopChart";
import MusicNews from "../Home/MusicNews";
import Footer from "../Navbar/Footer";

import { useNavigate } from "react-router-dom";

import { auth } from "../../backend/firebase";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { useHomeMusic } from '../../Hooks/useHomeMusic.js'

const HomePage = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] =
    useState(false);

  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");

  const {
    loading: musicLoading,
  } = useHomeMusic();

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
        }
      );

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020d0b]">

      {/* Animated background */}

      <AnimatedBackground />

      {/* Green glow */}

      <div className="pointer-events-none absolute -left-32 top-1/4 z-0 h-72 w-72 rounded-full bg-green-500/10 blur-[120px] sm:h-96 sm:w-96" />

      <div className="pointer-events-none absolute -right-32 top-1/2 z-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px] sm:h-96 sm:w-96" />

      <div
        className={`relative z-10 p-6 pt-24 transition-all duration-300 ${
          collapsed
            ? "lg:ml-24"
            : "lg:ml-72"
        }`}
      >

        <Trending />

        <RecentlyAdded />

        <Hero />

        <DiscoverMusic />

        <PopularArtists />

        <TopAlbums />

        <ContinueListening />

        <Genres />

        <FeaturedPlaylist />

        <Recommended />

        <RecentlyPlayed />

        <TopCharts />

        <MusicNews />

        <Footer />

      </div>
    </div>
  );
};

export default HomePage;