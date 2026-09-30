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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen overflow-hidden bg-[#020d0b] px-6 pb-10 pt-24"
    >
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 z-0 bg-[#020d0b]" />

      {/* Green glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-1/4
          z-0
          h-72
          w-72
          rounded-full
          bg-green-500/10
          blur-[120px]
          sm:h-96
          sm:w-96
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          z-0
          h-72
          w-72
          rounded-full
          bg-emerald-500/10
          blur-[120px]
          sm:h-96
          sm:w-96
        "
      />

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#020d0b]/30" />

      {/* ================= PLAYER CONTENT ================= */}

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
        {/* ================= LEFT SIDE ================= */}

        <div className="lg:col-span-3">
          <AlbumArt
            isPlaying={isPlaying}
            song={song}
          />
        </div>

        {/* ================= CENTER ================= */}

        <div className="space-y-8 lg:col-span-6">
          <SongInfo
            song={song}
            isPlaying={isPlaying}
          />

          <ProgressiveBar />

          <PlayerControls />

          <Volume />
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="lg:col-span-3">
          <Queue />
        </div>
      </div>
    </motion.div>
  );
};

export default Player;