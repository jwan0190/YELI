const PINTEREST_ORIGINAL = /^(https:\/\/i\.pinimg\.com\/)originals(\/.+)$/;

/** Largest resized variant Pinterest serves; originals are ~4000px and several MB each. */
const DISPLAY_WIDTH = 1200;

/**
 * Returns a display-sized URL for hosted images. Pinterest "originals" links
 * are rewritten to the 1200px variant; any other URL is returned untouched.
 */
export function displayImageUrl(src: string): string {
  const match = src.match(PINTEREST_ORIGINAL);
  if (!match) return src;
  return `${match[1]}${DISPLAY_WIDTH}x${match[2]}`;
}
