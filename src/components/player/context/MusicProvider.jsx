import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  // REFS
  // =========================

  // These refs allow the audio event listeners to
  // always access the latest state without
  // constantly removing/re-adding listeners.
  const queueRef = useRef([]);
  const currentIndexRef = useRef(0);
  const repeatRef = useRef("off");
  const shuffleRef = useRef(false);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  useEffect(() => {
    shuffleRef.current = shuffle;
  }, [shuffle]);

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

  const loadAndPlaySong = useCallback(
    async (song) => {
      if (!song) return;

      const audio = audioRef.current;

      // Local music uses `url`
      // Jamendo music uses `audio`
      const source = song.url || song.audio;

      if (!source) {
        console.error(
          "No audio source found for song:",
          song
        );

        setIsPlaying(false);
        return;
      }

      try {
        // Stop previous audio
        audio.pause();

        // Reset player state
        audio.currentTime = 0;
        setCurrentTime(0);
        setDuration(0);

        // Load new source
        audio.src = source;
        audio.load();

        // Keep volume synchronized
        const safeVolume = Math.min(
          Math.max(Number(volume) || 0, 0),
          100
        );

        audio.volume = safeVolume / 100;

        // Start playback
        await audio.play();

        setIsPlaying(true);
      } catch (error) {
        console.error(
          "Unable to play audio:",
          error
        );

        setIsPlaying(false);
      }
    },
    [volume]
  );

  // =========================
  // PLAY SONG
  // =========================

  const playSong = useCallback(
    (song, songs = queueRef.current) => {
      if (!song) return;

      const newQueue =
        Array.isArray(songs) && songs.length > 0
          ? songs
          : [song];

      const index = newQueue.findIndex(
        (item) => item.id === song.id
      );

      setQueue(newQueue);

      setCurrentIndex(
        index >= 0 ? index : 0
      );

      setCurrentSong(song);

      const audio = audioRef.current;

      // If this is already the active song,
      // simply resume it.
      if (
        currentSong?.id === song.id &&
        audio.src
      ) {
        if (audio.paused) {
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error(
                "Unable to resume audio:",
                error
              );

              setIsPlaying(false);
            });
        }

        return;
      }

      loadAndPlaySong(song);
    },
    [currentSong, loadAndPlaySong]
  );

  // =========================
  // PAUSE
  // =========================

  const pauseSong = useCallback(() => {
    const audio = audioRef.current;

    audio.pause();

    setIsPlaying(false);
  }, []);

  // =========================
  // TOGGLE PLAY / PAUSE
  // =========================

  const togglePlay = useCallback(async () => {
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
  }, [currentSong]);

  // =========================
  // SEEK
  // =========================

  const seek = useCallback((time) => {
    const audio = audioRef.current;

    const numericTime = Number(time);

    if (!Number.isFinite(numericTime)) {
      return;
    }

    if (
      Number.isFinite(audio.duration) &&
      audio.duration > 0
    ) {
      audio.currentTime = Math.min(
        Math.max(numericTime, 0),
        audio.duration
      );
    } else {
      audio.currentTime = Math.max(
        numericTime,
        0
      );
    }

    setCurrentTime(audio.currentTime);
  }, []);

  // =========================
  // NEXT SONG
  // =========================

  const handleNext = useCallback(() => {
    const currentQueue = queueRef.current;

    if (!currentQueue.length) {
      setIsPlaying(false);
      return;
    }

    const currentRepeat = repeatRef.current;
    const currentShuffle = shuffleRef.current;
    const currentIndexValue =
      currentIndexRef.current;

    // =========================
    // REPEAT ONE
    // =========================

    if (currentRepeat === "one") {
      const audio = audioRef.current;

      audio.currentTime = 0;

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error(
            "Repeat error:",
            error
          );

          setIsPlaying(false);
        });

      return;
    }

    let nextIndex;

    // =========================
    // SHUFFLE
    // =========================

    if (
      currentShuffle &&
      currentQueue.length > 1
    ) {
      do {
        nextIndex = Math.floor(
          Math.random() *
            currentQueue.length
        );
      } while (
        nextIndex === currentIndexValue
      );
    } else {
      nextIndex =
        currentIndexValue + 1;
    }

    // =========================
    // END OF QUEUE
    // =========================

    if (
      nextIndex >= currentQueue.length
    ) {
      if (currentRepeat === "all") {
        nextIndex = 0;
      } else {
        setIsPlaying(false);
        return;
      }
    }

    const nextSong =
      currentQueue[nextIndex];

    if (!nextSong) {
      setIsPlaying(false);
      return;
    }

    setCurrentIndex(nextIndex);
    setCurrentSong(nextSong);

    loadAndPlaySong(nextSong);
  }, [loadAndPlaySong]);

  // =========================
  // PREVIOUS SONG
  // =========================

  const handlePrevious = useCallback(() => {
    const currentQueue = queueRef.current;

    if (!currentQueue.length) return;

    const audio = audioRef.current;

    // If the current song has played
    // for more than 3 seconds,
    // restart it instead.
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    const currentShuffle =
      shuffleRef.current;

    const currentRepeat =
      repeatRef.current;

    const currentIndexValue =
      currentIndexRef.current;

    let previousIndex;

    // =========================
    // SHUFFLE
    // =========================

    if (
      currentShuffle &&
      currentQueue.length > 1
    ) {
      do {
        previousIndex = Math.floor(
          Math.random() *
            currentQueue.length
        );
      } while (
        previousIndex === currentIndexValue
      );
    } else {
      previousIndex =
        currentIndexValue - 1;
    }

    // =========================
    // BEGINNING OF QUEUE
    // =========================

    if (previousIndex < 0) {
      if (currentRepeat === "all") {
        previousIndex =
          currentQueue.length - 1;
      } else {
        previousIndex = 0;
      }
    }

    const previousSong =
      currentQueue[previousIndex];

    if (!previousSong) return;

    setCurrentIndex(previousIndex);
    setCurrentSong(previousSong);

    loadAndPlaySong(previousSong);
  }, [loadAndPlaySong]);

  // =========================
  // SHUFFLE
  // =========================

  const toggleShuffle = useCallback(() => {
    setShuffle((previous) => !previous);
  }, []);

  // =========================
  // REPEAT
  // =========================

  const toggleRepeat = useCallback(() => {
    setRepeat((previous) => {
      if (previous === "off") {
        return "all";
      }

      if (previous === "all") {
        return "one";
      }

      return "off";
    });
  }, []);

  // =========================
  // STOP MUSIC
  // =========================

  const stopMusic = () => {
  const audio = audioRef.current;

  audio.pause();
  audio.currentTime = 0;
  audio.src = "";

  setIsPlaying(false);
  setCurrentTime(0);
  setDuration(0);
  setCurrentSong(null);
  setCurrentIndex(-1);
  setQueue([]);
};
  
  // =========================
  // FAVORITES
  // =========================

  const toggleFavorite = useCallback(
    (song) => {
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
    },
    []
  );

  const isFavorite = useCallback(
    (id) => {
      return favorites.some(
        (song) => song.id === id
      );
    },
    [favorites]
  );

  // =========================
  // AUDIO EVENTS
  // =========================

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(
        audio.currentTime || 0
      );
    };

    const updateDuration = () => {
      if (
        Number.isFinite(audio.duration)
      ) {
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
  }, [handleNext]);

  // =========================
  // AUDIO ERROR
  // =========================

  useEffect(() => {
    const audio = audioRef.current;

    const handleError = () => {
      if (audio.error) {
        console.error(
          "Audio error:",
          audio.error
        );
      }

      setIsPlaying(false);
    };

    audio.addEventListener(
      "error",
      handleError
    );

    return () => {
      audio.removeEventListener(
        "error",
        handleError
      );
    };
  }, []);

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
    stopMusic,

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