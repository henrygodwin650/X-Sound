import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import React, { StrictMode } from 'react';
import "react-loading-skeleton/dist/skeleton.css"
import './index.css';
import App from './App.jsx';
import "react-loading-skeleton/dist/skeleton.css"
import { SkeletonTheme } from 'react-loading-skeleton';
import MusicProvider from './components/player/context/MusicProvider.jsx';
import LocalMusic from './components/Hero/localMusic/LocalMusic.jsx';
import LocalMusicProvider from './components/player/context/LocalMusicProvider.jsx';
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <SkeletonTheme
        baseColor='#1e293b'
        highlightColor='#334155'>
        <LocalMusicProvider>
          <MusicProvider>
            <App />
          </MusicProvider>
        </LocalMusicProvider>
      </SkeletonTheme>
    </HashRouter>
  </StrictMode>
);
