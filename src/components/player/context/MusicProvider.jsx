
import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import MusicContext from "./MusicContext";

const MusicProvider = ({ children }) => {
  // ============================================
  // AUDIO
  // ============================================
  const audioRef = useRef(new Audio());

  // ============================================
  // MUSIC STATE
  // ============================================
  const [favorites, setFavorites] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [repeat, setRepeat] = useState("off");
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("playerVolume");

    return savedVolume !== null
      ? Number(savedVolume)
      : 70;
  });

  // ============================================
  // APPLY VOLUME
  // ============================================
  useEffect(() => {
    const audio = audioRef.current;

    const safeVolume = Math.min(
      Math.max(Number(volume) || 0, 0),
      100
    );

    audio.volume = safeVolume / 100;

    localStorage.setItem(
      "playerVolume",
      safeVolume
    );
  }, [volume]);

  // ============================================
  // LOAD CURRENT SONG
  // ============================================
  useEffect(() => {
    if (!currentSong) return;

    const audio = audioRef.current;
    if (!audio) return;

    /*
      Online song:
        song.audio
  
      Local song:
        song.url
  
      We support both.
    */
    const source = currentSong.url || currentSong.audio;

    if (!source) {
      console.error("No audio source found:", currentSong);
      return;
    }

    // Stop previous audio
    audio.pause();

    // Reset the audio element
    audio.currentTime = 0;
    audio.src = source;

    // Load the new source
    audio.load();

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error("Unable to play audio:", error);
      }
    };

    playAudio();
  }, [currentSong]);

  // ============================================
  // PLAY SONG
  // ============================================
  const playSong = (
    song,
    songs = queue
  ) => {
    if (!song) return;

    const newQueue = Array.isArray(songs)
      ? songs
      : [];

    /*
      If the supplied queue is empty,
      still allow the individual song to play.
    */
    if (newQueue.length > 0) {
      setQueue(newQueue);

      const index = newQueue.findIndex(
        (item) => item.id === song.id
      );

      setCurrentIndex(
        index >= 0 ? index : 0
      );
    } else {
      setQueue([song]);
      setCurrentIndex(0);
    }

    setCurrentSong(song);
  };

  // ============================================
  // PAUSE
  // ============================================
  const pauseSong = () => {
    const audio = audioRef.current;

    audio.pause();

    setIsPlaying(false);
  };

  // ============================================
  // TOGGLE PLAY
  // ============================================
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
      console.error(
        "Playback error:",
        error
      );

      setIsPlaying(false);
    }
  };

  // ============================================
  // SEEK
  // ============================================
  const seek = (time) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!Number.isFinite(time)) {
      return;
    }

    if (
      Number.isFinite(audio.duration) &&
      audio.duration > 0
    ) {
      audio.currentTime = Math.min(
        Math.max(time, 0),
        audio.duration
      );
    } else {
      audio.currentTime = Math.max(
        time,
        0
      );
    }

    setCurrentTime(audio.currentTime);
  };

  // ============================================
  // NEXT SONG
  // ============================================
  const handleNext = () => {
    if (!queue.length) {
      setIsPlaying(false);
      return;
    }

    // Repeat current song
    if (repeat === "one") {
      const audio = audioRef.current;

      audio.currentTime = 0;

      audio.play().catch((error) => {
        console.error(
          "Repeat error:",
          error
        );
      });

      return;
    }

    let nextIndex;

    // Shuffle
    if (
      shuffle &&
      queue.length > 1
    ) {
      do {
        nextIndex = Math.floor(
          Math.random() * queue.length
        );
      } while (
        nextIndex === currentIndex
      );
    } else {
      nextIndex = currentIndex + 1;
    }

    // End of queue
    if (nextIndex >= queue.length) {
      if (repeat === "all") {
        nextIndex = 0;
      } else {
        setIsPlaying(false);
        return;
      }
    }

    setCurrentIndex(nextIndex);
    setCurrentSong(queue[nextIndex]);
  };

  // ============================================
  // PREVIOUS SONG
  // ============================================
  const handlePrevious = () => {
    if (!queue.length) return;

    const audio = audioRef.current;

    /*
      If the current song has played
      for more than 3 seconds,
      restart it instead.
    */
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    let previousIndex;

    // Shuffle
    if (
      shuffle &&
      queue.length > 1
    ) {
      do {
        previousIndex = Math.floor(
          Math.random() * queue.length
        );
      } while (
        previousIndex === currentIndex
      );
    } else {
      previousIndex =
        currentIndex - 1;
    }

    // Beginning of queue
    if (previousIndex < 0) {
      if (repeat === "all") {
        previousIndex =
          queue.length - 1;
      } else {
        previousIndex = 0;
      }
    }

    setCurrentIndex(previousIndex);

    // IMPORTANT:
    // Set the actual song,
    // not the index.
    setCurrentSong(
      queue[previousIndex]
    );
  };

  // ============================================
  // SHUFFLE
  // ============================================
  const toggleShuffle = () => {
    setShuffle(
      (previous) => !previous
    );
  };

  // ============================================
  // REPEAT
  // ============================================
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

  // ============================================
  // FAVORITES
  // ============================================
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

      return [
        ...previous,
        song,
      ];
    });
  };

  // ============================================
  // CHECK FAVORITE
  // ============================================
  const isFavorite = (id) => {
    return favorites.some(
      (song) => song.id === id
    );
  };

  // ============================================
  // AUDIO EVENTS
  // ============================================
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(
        audio.currentTime || 0
      );
    };

    const updateDuration = () => {
      setDuration(
        Number.isFinite(audio.duration)
          ? audio.duration
          : 0
      );
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

    // CLEANUP
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
  }, [
    queue,
    currentIndex,
    shuffle,
    repeat,
  ]);

  // ============================================
  // CONTEXT VALUE
  // ============================================
  const value = {
    // Song
    currentSong,
    setCurrentSong,

    // Queue
    queue,
    setQueue,

    // Favorites
    favorites,
    setFavorites,

    // Volume
    volume,
    setVolume,

    // Playing
    isPlaying,
    setIsPlaying,

    // Shuffle
    shuffle,
    setShuffle,

    // Repeat
    repeat,
    setRepeat,

    // Index
    currentIndex,
    setCurrentIndex,

    // Progress
    currentTime,
    setCurrentTime,

    duration,

    // Audio
    audioRef,

    // Functions
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