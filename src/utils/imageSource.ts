const PINTEREST_ORIGINAL = /^(https:\/\/i\.pinimg\.com\/)originals(\/.+)$/;

/** Largest resized variant Pinterest serves; originals are ~4000px and several MB each. */
const DISPLAY_WIDTH = 1200;

/** Smallest variant — enough to read an image's orientation cheaply. */
const THUMBNAIL_WIDTH = 236;

function pinterestVariant(src: string, width: number): string {
  const match = src.match(PINTEREST_ORIGINAL);
  if (!match) return src;
  return `${match[1]}${width}x${match[2]}`;
}

/**
 * Returns a display-sized URL for hosted images. Pinterest "originals" links
 * are rewritten to the 1200px variant; any other URL is returned untouched.
 */
export function displayImageUrl(src: string): string {
  return pinterestVariant(src, DISPLAY_WIDTH);
}

/** Tiny variant used only for measuring; falls back to the display URL. */
export function thumbnailImageUrl(src: string): string {
  return pinterestVariant(src, THUMBNAIL_WIDTH);
}
