import React, { createContext } from 'react'


const MusicContext = createContext({
  currentSong: null,
  isPlaying: false,
  queue: [],
  favorites: [],
  volume: 70,
  shuffle: false,
  repeat: false,
  currentIndex: 0,
  currentTime: 0,
  duration: 0,
  playSong: () => {},
  pauseSong: () => {},
  togglePlay: () => {},
  nextSong: () => {},
  previousSong: () => {},
  seek: () => {},
  setVolume: () => {},
  setShuffle: () => {},
  setRepeat: () => {},
  setFavorites: () => {},
  audioRef: null,
});

export default MusicContext