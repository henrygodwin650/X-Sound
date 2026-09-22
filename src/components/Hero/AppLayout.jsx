import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import MiniPlayer from "../player/MiniPlayer"

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <MiniPlayer />
    </>
  )
}

export default AppLayout