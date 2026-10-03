import React from "react";
import { FiUpload } from "react-icons/fi";
import { parseBlob } from "music-metadata-browser";

import { useLocalMusic } from "../../../Hooks/useLocalMusic";

export const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(Number(seconds))) {
    return "--:--";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const ImportMusicButton = () => {
  const { setSongs } = useLocalMusic();

  const handleImport = async (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const importedSongs = await Promise.all(
      files.map(async (file) => {
        let metadata = {};

        try {
          metadata = await parseBlob(file);
        } catch (error) {
          console.warn("Metadata error:", error);
        }

        // Create temporary artwork URL
        let artwork = null;

        if (metadata.common?.picture?.length) {
          const picture = metadata.common.picture[0];

          artwork = URL.createObjectURL(
            new Blob([picture.data], {
              type: picture.format,
            })
          );
        }

        // Create temporary audio URL
        const audioUrl = URL.createObjectURL(file);

        const song = {
          id: crypto.randomUUID(),

          title:
            metadata.common?.title ||
            file.name.replace(/\.[^/.]+$/, ""),

          artist:
            metadata.common?.artist ||
            "Unknown Artist",

          album:
            metadata.common?.album ||
            "Unknown Album",

          genre:
            metadata.common?.genre?.[0] ||
            "Unknown",

          year:
            metadata.common?.year ||
            "",

          duration:
            metadata.format?.duration ||
            0,

          cover: artwork,

          size: file.size,

          type: file.type,

          // Keep the original File for the current session
          file,

          // Temporary browser URL used by the audio player
          url: audioUrl,
        };

        console.log("Imported local song:", song);
        console.log("Audio URL:", audioUrl);

        return song;
      })
    );

    setSongs((prev) => [
      ...prev,
      ...importedSongs,
    ]);

    // Allows the same file to be selected again
    e.target.value = "";
  };

  return (
    <label
      className="
        inline-flex
        cursor-pointer
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-green-500
        px-4
        py-2.5
        font-semibold
        text-white
        shadow-lg
        shadow-green-500/20
        transition
        hover:bg-green-400
        hover:scale-[1.02]
        active:scale-95
        sm:px-5
        sm:py-3
      "
    >
      <FiUpload className="text-lg" />

      <span>
        Import Music
      </span>

      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={handleImport}
        className="hidden"
      />
    </label>
  );
};

export default ImportMusicButton;