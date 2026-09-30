import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FiVolume,
  FiVolume1,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import useMusic from "../../Hooks/useMusic";

const Volume = () => {
  const { volume, setVolume, isPlaying } = useMusic();

  const [muted, setMuted] = useState(volume === 0);
  const [previousVolume, setPreviousVolume] = useState(
    volume > 0 ? volume : 70
  );

  // Keep mute state synchronized with the provider volume.
  useEffect(() => {
    setMuted(volume === 0);

    if (volume > 0) {
      setPreviousVolume(volume);
    }
  }, [volume]);

  const handleMute = () => {
    if (muted || volume === 0) {
      const restoredVolume = previousVolume || 70;

      setVolume(restoredVolume);
      setMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);

    setVolume(newVolume);

    if (newVolume > 0) {
      setPreviousVolume(newVolume);
      setMuted(false);
    } else {
      setMuted(true);
    }
  };

  const VolumeIcon = () => {
    if (muted || volume === 0) {
      return <FiVolumeX size={22} />;
    }

    if (volume < 35) {
      return <FiVolume size={22} />;
    }

    if (volume < 70) {
      return <FiVolume1 size={22} />;
    }

    return <FiVolume2 size={22} />;
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-3xl">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black/50">
          Volume
        </h3>

        <span className="text-green-400">
          {muted ? 0 : volume}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Mute button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMute}
          className="rounded-full bg-white/10 p-3 text-white transition hover:bg-green-500"
        >
          <VolumeIcon />
        </motion.button>

        {/* Volume slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 cursor-pointer accent-green-500"
        />
      </div>

      {/* Volume progress */}
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          animate={{
            width: `${muted ? 0 : volume}%`,
          }}
          transition={{ duration: 0.2 }}
          className="h-full rounded-full bg-linear-to-r from-green-400 to-emerald-500"
        />
      </div>

      {/* Audio status */}
      {isPlaying && (
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-green-400">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          Audio Active
        </div>
      )}
    </div>
  );
};

export default Volume;