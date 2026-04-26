import { useMemo } from "react";

import portfolioData from "../components/assets/strings/portfolio.json";
import type { CollectionRowProps } from "../features/portfolio/CollectionRow";
import { useImages, type ImageKey } from "./useImages";

export function useCollections(): ReadonlyArray<Omit<CollectionRowProps, "reverse">> {
  const img = useImages();

  return useMemo(
    () =>
      portfolioData.collections.map((collection) => ({
        number: collection.number,
        frameCount: collection.frameCount,
        cover: img[collection.image as ImageKey],
        alt: collection.alt,
        eyebrow: collection.eyebrow,
        title: collection.title,
        description: collection.description,
        ctaLabel: collection.ctaLabel,
        href: collection.href,
      })),
    [img],
  );
}
