import React from 'react'
import { FiUpload } from 'react-icons/fi'
import { useLocalMusic } from '../../../Hooks/useLocalMusic'
import { parseBlob } from "music-metadata-browser"

export const formatTime = (seconds) => {
  if (!seconds) return "--:--";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const ImportMusicButton = () => {
  const { songs, setSongs } = useLocalMusic();



  const handleImport = async (e) => {
    const files = Array.from(e.target.files);
    const importedSongs = await Promise.all(
      files.map(async (file, index) => {
        let metadata = {};

        try {
          metadata = await parseBlob(file);
        } catch (error) {
          console.log("Metadata error:", error);
        }
        let artwork = null;

        if (metadata.common?.picture?.length) {
          const pic = metadata.common.picture[0];

          artwork = URL.createObjectURL(
            new Blob([pic.data], {
              type: pic.format,
            })
          );
        }
        return {
          id: crypto.randomUUID(),

          title:
            metadata.common.title ||
            file.name.replace(/\.[^/.]+$/, ""),

          artist:
            metadata.common.artist ||
            "Unknown Artist",

          album:
            metadata.common.album ||
            "Unknown Album",

          genre:
            metadata.common.genre?.[0] ??
            "Unknown",

          year:
            metadata.common.year ?? "",

          duration:
            metadata.format.duration ?? 0,

          cover: artwork,

          size: file.size,

          type: file.type,

          file,

          url: URL.createObjectURL(file),
        };
      })
    )
    setSongs((prev) => [...prev, ...importedSongs])
  }

  return (
    <>
      <input
        accept='audio/*'
        multiple
        hidden
        id='music-input'
        onChange={handleImport}
        type="file" />
      <label
        htmlFor='music-input'
        className='flex cursor-pointer items-center gap-3 rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white transition hover:scale-105'
      >
        <FiUpload />
        Import Music
      </label>
    </>
  )
}

export default ImportMusicButton