import { useEffect, useState } from "react";
import { thumbnailImageUrl } from "../utils/imageSource";

export type Orientation = "portrait" | "landscape";

export type OrientationMap = Readonly<Record<string, Orientation>>;

/** Survives navigation so revisiting a gallery does not re-measure. */
const cache = new Map<string, Orientation>();

function measure(src: string): Promise<Orientation> {
  const cached = cache.get(src);
  if (cached) return Promise.resolve(cached);

  return new Promise((resolve) => {
    const image = new Image();
    const finish = (orientation: Orientation) => {
      cache.set(src, orientation);
      resolve(orientation);
    };
    image.onload = () => finish(image.naturalHeight > image.naturalWidth ? "portrait" : "landscape");
    image.onerror = () => finish("landscape");
    image.referrerPolicy = "no-referrer";
    image.src = thumbnailImageUrl(src);
  });
}

/**
 * Loads a thumbnail of each image to learn whether it is portrait or landscape.
 * `ready` flips true once every source has been measured.
 */
export function useImageOrientations(srcs: readonly string[]) {
  const [orientations, setOrientations] = useState<OrientationMap>({});
  const key = srcs.join("\n");

  useEffect(() => {
    let cancelled = false;
    setOrientations({});

    Promise.all(srcs.map(async (src) => [src, await measure(src)] as const)).then((pairs) => {
      if (!cancelled) setOrientations(Object.fromEntries(pairs));
    });

    return () => {
      cancelled = true;
    };
    // `key` captures the list contents; `srcs` itself may be a fresh array each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const ready = srcs.every((src) => src in orientations);
  return { orientations, ready };
}
