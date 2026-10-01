import { motion } from "framer-motion";
import AlbumArt from "./AlbumArt";
import SongInfo from "./SongInfo";
import PlayerControls from "./PlayerControls";
import ProgressiveBar from "./ProgressiveBar";
import Volume from "./Volume";
import Queue from "./Queue";
import useMusic from "../../Hooks/useMusic";

const fallbackSong = {
  id: "fallback",
  title: "No song selected",
  artist: "X-sound",
  album: "Your Music",
  cover: "",
  audio: "",
  duration: "0:00",
  genre: "Music",
};

const Player = () => {
  const { isPlaying, currentSong } = useMusic();

  const song = currentSong || fallbackSong;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen overflow-hidden bg-[#020d0b] px-3 pb-10 pt-20 sm:px-5 sm:pt-24 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#020d0b]" />

      {/* Green glow - left */}
      <div className="pointer-events-none absolute -left-32 top-1/4 z-0 h-64 w-64 rounded-full bg-green-500/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[120px]" />

      {/* Green glow - right */}
      <div className="pointer-events-none absolute -right-32 bottom-0 z-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[120px]" />

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#020d0b]/30" />

      {/* Player */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =========================
            MOBILE / TABLET
        ========================== */}

        <div className="grid gap-5 md:grid-cols-2 lg:hidden">
          {/* Album */}
          <div className="md:col-span-1">
            <AlbumArt
              isPlaying={isPlaying}
              song={song}
            />
          </div>

          {/* Song info */}
          <div className="md:col-span-1">
            <SongInfo
              song={song}
              isPlaying={isPlaying}
            />
          </div>

          {/* Progress */}
          <div className="md:col-span-2">
            <ProgressiveBar />
          </div>

          {/* Controls */}
          <div className="md:col-span-2">
            <PlayerControls />
          </div>

          {/* Volume */}
          <div className="md:col-span-2">
            <Volume />
          </div>

          {/* Queue */}
          <div className="md:col-span-2">
            <Queue />
          </div>
        </div>

        {/* =========================
            LARGE DESKTOP
        ========================== */}

        <div className="hidden gap-8 lg:grid lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-3">
            <AlbumArt
              isPlaying={isPlaying}
              song={song}
            />
          </div>

          {/* Center */}
          <div className="space-y-8 lg:col-span-6">
            <SongInfo
              song={song}
              isPlaying={isPlaying}
            />

            <ProgressiveBar />

            <PlayerControls />

            <Volume />
          </div>

          {/* Right */}
          <div className="lg:col-span-3">
            <Queue />
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Player;