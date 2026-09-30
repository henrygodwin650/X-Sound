import React, { useState } from "react";
import LocalMusicContext from "./LocalMusicContext";

const LocalMusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  const removeSong = (id) => {
    setSongs((prev) => prev.filter((song) => song.id !== id));
  };

  const clearLibrary = () => {
    setSongs([]);
  };

  const toggleFavourite = (id) => {
    setSongs((prev) =>
      prev.map((song) =>
        song.id === id
          ? {
              ...song,
              favorite: !song.favorite,
            }
          : song
      )
    );
  };

  return (
    <LocalMusicContext.Provider
      value={{
        songs,
        setSongs,
        removeSong,
        clearLibrary,
        toggleFavourite,
      }}
    >
      {children}
    </LocalMusicContext.Provider>
  );
};

export default LocalMusicProvider;