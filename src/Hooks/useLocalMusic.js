import React, { useContext } from 'react'
import LocalMusicContext from '../components/player/context/LocalMusicContext'

export const useLocalMusic = () => useContext(LocalMusicContext);
