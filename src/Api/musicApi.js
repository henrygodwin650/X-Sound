const JAMENDO_API_URL = "https://api.jamendo.com/v3.0/tracks/";
const JAMENDO_ARTISTS_URL = "https://api.jamendo.com/v3.0/artists/";

const CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID;

const requestMusic = async (params = "") => {
  const response = await fetch(
    `${JAMENDO_API_URL}?client_id=${CLIENT_ID}&format=json${params}`
  );

  if (!response.ok) {
    throw new Error(`Jamendo request failed: ${response.status}`);
  }

  const data = await response.json();

  return data.results || [];
};

const requestArtists = async (params = "") => {
  const response = await fetch(
    `${JAMENDO_ARTISTS_URL}?client_id=${CLIENT_ID}&format=json${params}`
  );

  if (!response.ok) {
    throw new Error(`Jamendo artist request failed: ${response.status}`);
  }

  const data = await response.json();

  return data.results || [];
};

const formatDuration = (seconds) => {
  if (!seconds || Number.isNaN(Number(seconds))) {
    return "0:00";
  }

  const minutes = Math.floor(Number(seconds) / 60);
  const remainingSeconds = Math.floor(Number(seconds) % 60);

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export const normalizeSong = (song) => ({
  id: song.id,
  title: song.name,
  artist: song.artist_name,
  artistId: song.artist_id,
  album: song.album_name,
  albumId: song.album_id,
  cover: song.image,
  audio: song.audio,
  genre:
    song.musicinfo?.tags?.genres?.[0] ||
    song.musicinfo?.tags?.instruments?.[0] ||
    "Music",
  duration: formatDuration(song.duration),
  trending: false,
  recent: true,
  source: "jamendo",
  originalData: song,
});

export const getMusic = async (limit = 40) => {
  const songs = await requestMusic(
    `&order=releasedate_desc&limit=${limit}&imagesize=500&include=musicinfo`
  );

  return songs.map(normalizeSong);
};

export const getPopularMusic = async (limit = 40) => {
  const songs = await requestMusic(
    `&order=popularity_total&limit=${limit}&imagesize=500&include=musicinfo`
  );

  return songs.map((song) => ({
    ...normalizeSong(song),
    trending: true,
    recent: false,
  }));
};

export const searchMusic = async (query) => {
  if (!query?.trim()) return [];

  const songs = await requestMusic(
    `&namesearch=${encodeURIComponent(
      query.trim()
    )}&limit=20&imagesize=500&include=musicinfo`
  );

  return songs.map(normalizeSong);
};

export const getPopularArtists = async (limit = 10) => {
  const artists = await requestArtists(
    `&order=popularity_total&limit=${limit}&imagesize=300&hasimage=true`
  );

  return artists.map((artist) => ({
    id: artist.id,
    name: artist.name,
    image: artist.image,
    popularity: artist.popularity_total || 0,
  }));
};