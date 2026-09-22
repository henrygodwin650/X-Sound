import React, { useEffect, useMemo, useState } from 'react'
import SidebarSkeleton from '../Skeleton/SidebarSkeleton'
import DesktopSidebar from './DesktopSidebar'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'
import MobileDrawer from './MobileDrawer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../backend/firebase'
import { BiLibrary } from 'react-icons/bi'
import { FiHeart, FiHome, FiSearch, FiSettings } from 'react-icons/fi'
import { FaHeadset } from 'react-icons/fa6'

const MenuLinks = [

  {
    id: 1,
    name: "Home",
    link: "/home",
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
const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);



  return (
    <>
      {/* ========================= */}
      {/* Desktop Sidebar */}

      {loading ? (
        <SidebarSkeleton />
      ) : (<DesktopSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        search={search}
        setSearch={setSearch}
        filteredMenu={filteredMenu}
        user={user}
      />)}
      {/* ========================= */}
      {/* ========================= */}
      {/* Desktop Header */}
      <DesktopHeader
        collapsed={collapsed}
        search={search}
        setSearch={setSearch}
        user={user}
      />
      {/* ========================= */}

      {/* ========================= */}
      {/* Mobile Header */}
      <MobileHeader
        setMobileMenu={setMobileMenu}
        user={user}
      />
      {/* ========================= */}


      {/* ========================= */}
      {/* Mobile Drawer */}

      {
        loading ? (
          <SidebarSkeleton />
        ) : (
          <MobileDrawer
            mobileMenu={mobileMenu}
            setMobileMenu={setMobileMenu}
            user={user}
            MenuLinks={MenuLinks}
          />)
      }
    </>
  )
}

export default Navbar