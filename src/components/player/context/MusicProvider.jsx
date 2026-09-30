import React, { useEffect, useRef, useState } from "react";
import MusicContext from "./MusicContext";

const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  // =========================
  // STATE
  // =========================

  const [favorites, setFavorites] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [repeat, setRepeat] = useState("off");
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(70);

  // =========================
  // VOLUME
  // =========================

  useEffect(() => {
    const audio = audioRef.current;

    const safeVolume = Math.min(
      Math.max(Number(volume) || 0, 0),
      100
    );

    audio.volume = safeVolume / 100;
  }, [volume]);

  // =========================
  // LOAD + PLAY SONG
  // =========================

  const loadAndPlaySong = async (song) => {
    if (!song) return;

    const audio = audioRef.current;

    const source = song.url || song.audio;

    if (!source) {
      console.error("No audio source found:", song);
      setIsPlaying(false);
      return;
    }

    try {
      // Stop current audio
      audio.pause();

      // Reset player
      audio.currentTime = 0;
      setCurrentTime(0);
      setDuration(0);

      // Load new song
      audio.src = source;
      audio.load();

      // Keep volume in sync
      audio.volume = volume / 100;

      // Play
      await audio.play();

      setIsPlaying(true);
    } catch (error) {
      console.error("Unable to play audio:", error);
      setIsPlaying(false);
    }
  };

  // =========================
  // PLAY SONG
  // =========================

  const playSong = (song, songs = queue) => {
    if (!song) return;

    const newQueue =
      Array.isArray(songs) && songs.length > 0
        ? songs
        : [song];

    const index = newQueue.findIndex(
      (item) => item.id === song.id
    );

    setQueue(newQueue);
    setCurrentIndex(index >= 0 ? index : 0);
    setCurrentSong(song);

    // If the same song is already loaded,
    // simply resume it.
    if (
      currentSong?.id === song.id &&
      audioRef.current.src
    ) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error("Unable to resume audio:", error);
            setIsPlaying(false);
          });
      }

      return;
    }

    loadAndPlaySong(song);
  };

  // =========================
  // PAUSE
  // =========================

  const pauseSong = () => {
    const audio = audioRef.current;

    audio.pause();
    setIsPlaying(false);
  };

  // =========================
  // TOGGLE PLAY / PAUSE
  // =========================

  const togglePlay = async () => {
    if (!currentSong) return;

    const audio = audioRef.current;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Playback error:", error);
      setIsPlaying(false);
    }
  };

  // =========================
  // SEEK
  // =========================

  const seek = (time) => {
    const audio = audioRef.current;

    if (!Number.isFinite(time)) return;

    if (
      Number.isFinite(audio.duration) &&
      audio.duration > 0
    ) {
      audio.currentTime = Math.min(
        Math.max(time, 0),
        audio.duration
      );
    } else {
      audio.currentTime = Math.max(time, 0);
    }

    setCurrentTime(audio.currentTime);
  };

  // =========================
  // NEXT SONG
  // =========================

  const handleNext = () => {
    if (!queue.length) {
      setIsPlaying(false);
      return;
    }

    // Repeat current song
    if (repeat === "one") {
      const audio = audioRef.current;

      audio.currentTime = 0;

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Repeat error:", error);
          setIsPlaying(false);
        });

      return;
    }

    let nextIndex;

    // Shuffle
    if (shuffle && queue.length > 1) {
      do {
        nextIndex = Math.floor(
          Math.random() * queue.length
        );
      } while (nextIndex === currentIndex);
    } else {
      nextIndex = currentIndex + 1;
    }

    // Reached end
    if (nextIndex >= queue.length) {
      if (repeat === "all") {
        nextIndex = 0;
      } else {
        setIsPlaying(false);
        return;
      }
    }

    const nextSong = queue[nextIndex];

    setCurrentIndex(nextIndex);
    setCurrentSong(nextSong);

    loadAndPlaySong(nextSong);
  };

  // =========================
  // PREVIOUS SONG
  // =========================

  const handlePrevious = () => {
    if (!queue.length) return;

    const audio = audioRef.current;

    // If song has played for more than 3 seconds,
    // restart the current song instead.
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    let previousIndex;

    // Shuffle
    if (shuffle && queue.length > 1) {
      do {
        previousIndex = Math.floor(
          Math.random() * queue.length
        );
      } while (previousIndex === currentIndex);
    } else {
      previousIndex = currentIndex - 1;
    }

    // Reached beginning
    if (previousIndex < 0) {
      if (repeat === "all") {
        previousIndex = queue.length - 1;
      } else {
        previousIndex = 0;
      }
    }

    const previousSong = queue[previousIndex];

    setCurrentIndex(previousIndex);
    setCurrentSong(previousSong);

    loadAndPlaySong(previousSong);
  };

  // =========================
  // SHUFFLE
  // =========================

  const toggleShuffle = () => {
    setShuffle((previous) => !previous);
  };

  // =========================
  // REPEAT
  // =========================

  const toggleRepeat = () => {
    setRepeat((previous) => {
      if (previous === "off") {
        return "all";
      }

      if (previous === "all") {
        return "one";
      }

      return "off";
    });
  };

  // =========================
  // FAVORITES
  // =========================

  const toggleFavorite = (song) => {
    if (!song) return;

    setFavorites((previous) => {
      const exists = previous.some(
        (item) => item.id === song.id
      );

      if (exists) {
        return previous.filter(
          (item) => item.id !== song.id
        );
      }

      return [...previous, song];
    });
  };

  const isFavorite = (id) => {
    return favorites.some(
      (song) => song.id === id
    );
  };

  // =========================
  // AUDIO EVENTS
  // =========================

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const updateDuration = () => {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener(
      "timeupdate",
      updateTime
    );

    audio.addEventListener(
      "loadedmetadata",
      updateDuration
    );

    audio.addEventListener(
      "play",
      handlePlay
    );

    audio.addEventListener(
      "pause",
      handlePause
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        updateTime
      );

      audio.removeEventListener(
        "loadedmetadata",
        updateDuration
      );

      audio.removeEventListener(
        "play",
        handlePlay
      );

      audio.removeEventListener(
        "pause",
        handlePause
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, [queue, currentIndex, shuffle, repeat]);

  // =========================
  // CLEANUP
  // =========================

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, []);

  // =========================
  // CONTEXT VALUE
  // =========================

  const value = {
    currentSong,
    setCurrentSong,

    queue,
    setQueue,

    favorites,
    setFavorites,

    volume,
    setVolume,

    isPlaying,
    setIsPlaying,

    shuffle,
    setShuffle,

    repeat,
    setRepeat,

    currentIndex,
    setCurrentIndex,

    currentTime,
    setCurrentTime,

    duration,

    audioRef,

    playSong,
    pauseSong,
    togglePlay,
    seek,

    handleNext,
    handlePrevious,

    toggleShuffle,
    toggleRepeat,

    toggleFavorite,
    isFavorite,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;