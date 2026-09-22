import React, { useEffect, useMemo, useState } from "react";
import AnimatedBackground from "../Navbar/AnimatedBackground";
import DesktopSidebar from "../Navbar/DesktopSidebar";
import DesktopHeader from "../Navbar/DesktopHeader";
import Trending from "../Navbar/Trending";
import RecentlyAdded from "../Home/RecentlyAdded";
import Hero from "../Home/Hero";
import MusicCard from "../Cards/MusicCard";
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { auth } from "../../backend/firebase";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import DarkMode from "../Navbar/DarkMode";
import {
  FiHome,
  FiSearch,
  FiMenu,
  FiX,
  FiLogOut,
  FiPhone,
  FiSettings,
  FiMusic,
  FiHeart,
} from "react-icons/fi";

import {
  BiLibrary,
  BiHeart,
  BiUser,
} from "react-icons/bi";

import {
  FaCartShopping,
  FaCrown,
  FaDownload,
  FaHeadset,
} from "react-icons/fa6";
import MusicCardSkeleton from "../Skeleton/MusicCardSkeleton";
import SidebarSkeleton from "../Skeleton/SidebarSkeleton";
import HeroSkeleton from "../Skeleton/HeroSkeleton";
import NewsSkeleton from "../Skeleton/NewsSkeleton";
import ArtistSkeleton from "../Skeleton/ArtistSkeleton";

const MenuLinks = [

  {
    id: 1,
    name: "Home",
    link: "/",
    icon: FiHome,
  },
  {
    id: 2,
    name: "Library",
    link: "/player",
    icon: BiLibrary,
  }, {
    id: 3,
    name: "Search",
    link: "/search",
    icon: FiSearch,
  },
  {
    id: 4,
    name: "Local music",
    link: "/local",
    icon: FaHeadset,
  },
  {
    id: 5,
    name: "Favorite",
    link: "/favorite",
    icon: FiHeart,
  },
  {
    id: 6,
    name: "Settings",
    link: "/settings",
    icon: FiSettings,
  },
];


const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);
  // ===========================
  // Logout
  // ===========================

  const logout = async () => {
    try {
      await signOut(auth);

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  // ===========================
  // Search Filter
  // ===========================

  const filteredMenu = useMemo(() => {
    return MenuLinks.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className='hero-bg-color'>
      {/* Page Content */}

      <AnimatedBackground />
      <div
        className={`hero-bg-color p-6 pt-24 transition-all duration-300 ${collapsed ? "lg:ml-24" : "lg:ml-72"
          }`}
      >

        {/* ========================= */}



        {loading ? (
          <MusicCardSkeleton />
        )
          : (<Trending />)}



        {loading ? (
          <MusicCardSkeleton />
        )
          : (<RecentlyAdded />)}

        {loading ? (
          <HeroSkeleton />
        ) : (<Hero />)}
        <DiscoverMusic />

        {loading ? (
          <ArtistSkeleton />
        ) : (<PopularArtists />)}

        {loading ? (
          <HeroSkeleton />
        ) : (<TopAlbums />)}

        {loading ? (
          <MusicCardSkeleton />
        ) : <ContinueListening />}

        {loading ? (
          <MusicCardSkeleton />
        ) : <Genres />}

        {loading ? (
          <MusicCardSkeleton />
        ) : <FeaturedPlaylist />}

        {loading ? (
          <MusicCardSkeleton />
        ) : <Recommended />}

        {loading ? (<ArtistSkeleton />) : <RecentlyPlayed />}

        {loading ? (<ArtistSkeleton />) : <TopCharts />}

        {loading ? (
          <NewsSkeleton />
        )
          : (
            <MusicNews />

          )}


        {loading ? (<MusicCardSkeleton />) : <Footer />}
      </div>
    </div>
  );
};

export default HomePage;