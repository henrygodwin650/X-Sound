import { motion } from 'framer-motion'
import React from 'react'
import useMusic from '../../Hooks/useMusic';

const ProgressiveBar = () => {
  const { currentTime, duration, seek } = useMusic();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds = 0) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);
    const newTime = (value / 100) * (duration || 0);
    seek(newTime);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,.35)]">
      <div className="mb-3 flex justify-between text-sm text-gray-400">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <input
        min={0}
        max={100}
        value={progress}
        onChange={handleSeek}
        type="range"
        className="w-full cursor-pointer accent-green-500"
      />

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
          className="h-full rounded-full bg-linear-to-r from-green-400 to-emerald-500"
        />
      </div>

      <div className="mt-5 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-green-400">Playing</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressiveBar