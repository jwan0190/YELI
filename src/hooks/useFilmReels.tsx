import { useMemo } from "react";

import filmData from "../components/assets/strings/film.json";
import type { FilmReelData } from "../features/galleries/FilmReel";
import { useImages, type ImageKey } from "./useImages";

export function useFilmReels(): FilmReelData[] {
  const img = useImages();

  return useMemo(
    () =>
      filmData.reels.map((reel) => ({
        meta: reel.meta,
        title: reel.title,
        description: reel.description,
        duration: reel.duration,
        poster: img[reel.image as ImageKey],
      })),
    [img],
  );
}
