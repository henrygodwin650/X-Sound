import React from 'react'
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa6'
import useMusic from '../../Hooks/useMusic'

const MiniPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
    previousSong,
    currentTime,
    duration,
  } = useMusic();

  const song = currentSong || {
    title: "No song playing",
    artist: "XSound",
    cover: '',
    image: '',
  };

  const cover = song.cover || song.image || '';

  const formatTime = (seconds = 0) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        {/* SONG INFO */}
        <div className="flex items-center gap-3 min-w-0">
          {cover ? (
            <img
              src={cover}
              alt={song.title}
              className="h-14 w-14 rounded-xl object-cover shrink-0"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-500 text-xl font-bold text-white">
              {(song.title || "X").charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white">{song.title}</h3>
            <p className="truncate text-sm text-gray-400">{song.artist}</p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-5">
          <button
            onClick={previousSong}
            className="text-white hover:text-green-400 transition"
          >
            <FaBackward size={18} />
          </button>

          <button
            onClick={togglePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          >
            {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
          </button>

          <button
            onClick={nextSong}
            className="text-white hover:text-green-400 transition"
          >
            <FaForward size={18} />
          </button>
        </div>

        {/* DURATION */}
        <div className="hidden text-sm text-gray-400 md:block">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
