import { useEffect, useState } from "react";
import {
  getMusic,
  getPopularMusic,
} from "../Api/musicApi";

let cachedMusic = null;
let loadingPromise = null;

export const useHomeMusic = () => {
  const [music, setMusic] = useState(cachedMusic || []);
  const [loading, setLoading] = useState(!cachedMusic);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadMusic = async () => {
      try {
        setError("");

        if (cachedMusic) {
          if (mounted) {
            setMusic(cachedMusic);
            setLoading(false);
          }

          return;
        }

        if (!loadingPromise) {
          loadingPromise = Promise.all([
            getPopularMusic(30),
            getMusic(30),
          ]).then(([popular, recent]) => {
            const combined = [
              ...popular,
              ...recent,
            ];

            const unique = Array.from(
              new Map(
                combined.map((song) => [
                  song.id,
                  song,
                ])
              ).values()
            );

            cachedMusic = unique;

            return unique;
          });
        }

        const result = await loadingPromise;

        if (mounted) {
          setMusic(result);
        }
      } catch (err) {
        console.error("Home music error:", err);

        if (mounted) {
          setError(
            "Unable to load music right now."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMusic();

    return () => {
      mounted = false;
    };
  }, []);

  const trending = music.filter(
    (song) => song.trending
  );

  const recent = music.filter(
    (song) => song.recent
  );

  return {
    music,
    trending,
    recent,
    loading,
    error,
  };
};