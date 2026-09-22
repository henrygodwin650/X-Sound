import React from 'react'
import { motion } from "framer-motion"
import Rema from '../../assets/cover-image/images (1).jpeg'
import AlbumArt from './AlbumArt'
import SongInfo from './SongInfo'
import PlayerControls from './PlayerControls'
import ProgressiveBar from './ProgressiveBar'
import Volume from './Volume'
import Queue from './Queue'
import useMusic from '../../Hooks/useMusic'


const fallbackSong = {
  id: 1,
  title: "Calm Down",
  artist: "Rema",
  album: "Rave & Roses",
  image: Rema,
  cover: Rema,
  duration: "3:42",
  genre: "Afrobeats",
  year: "2022",
  plays: "2.4B",
  description:
    "Calm Down became one of the biggest Afrobeats songs worldwide, introducing millions of listeners to Rema's music.",
};

const Player = () => {
  const { isPlaying, currentSong } = useMusic();
  const song = currentSong || fallbackSong;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-6 pb-10 pt-24"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
        {/* LEFT SIDE */}
        <div className="lg:col-span-3">
          <AlbumArt isPlaying={isPlaying} song={song} />
        </div>

        <div className="space-y-8 lg:col-span-6">
          <SongInfo song={song} isPlaying={isPlaying} />
          <ProgressiveBar />
          <PlayerControls />
          <Volume />
        </div>

        <div className="lg:col-span-3">
          <Queue />
        </div>
      </div>
    </motion.div>
  );
};

export default Player