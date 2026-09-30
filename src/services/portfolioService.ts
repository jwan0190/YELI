import { imageLibrarySchema, rawPortfolioSchema } from "../features/portfolio/portfolio.schema";
import type {
  Collection,
  ImageLibrary,
  Portfolio,
  PortfolioFrame,
  RawCollection,
  RawPortfolio,
} from "../types/portfolio.types";

/**
 * Photos come live from the Pinterest board through /api/pinterest (a Netlify
 * Function in production, a Vite middleware in development). The saved
 * images.json is only a fallback for when Pinterest cannot be reached, and a
 * source of cover flags for sections that have no pin titled "cover".
 * Collection text lives in portfolio.json.
 */
const DATA_BASE = `${import.meta.env.BASE_URL}data/`;
const PORTFOLIO_URL = `${DATA_BASE}portfolio.json`;
const LIVE_IMAGES_URL = `${import.meta.env.BASE_URL}api/pinterest`;
const SNAPSHOT_IMAGES_URL = `${DATA_BASE}images.json`;

const BRAND_SUFFIX = " — YELI";
const SAFE_SLUG = /^[a-z0-9-]+$/;

async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal, cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Request for ${url} failed (${response.status})`);
  }
  return response.json();
}

type ResolvedGroup = { frames: PortfolioFrame[]; cover?: string };

/** Flattens an image group to ordered frames and finds the flagged cover. */
function resolveGroup(library: ImageLibrary, key: string | undefined): ResolvedGroup {
  const group = key ? library[key] : undefined;
  if (!group) return { frames: [] };
  const entries = Array.isArray(group) ? group : Object.values(group);

  let cover: string | undefined;
  const frames = entries.map((entry): PortfolioFrame => {
    if (typeof entry === "string") return { src: entry };
    if (entry.cover && !cover) cover = entry.url;
    return { src: entry.url, ratio: entry.ratio, caption: entry.caption };
  });

  return { frames, cover };
}

const stripMarkup = (text: string) => text.replace(/<[^>]+>/g, "");
const twoDigits = (n: number) => String(n).padStart(2, "0");

/** "editorial-portrait" → "Editorial portrait"; non-Latin names pass through. */
function humanize(key: string): string {
  const words = key.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Board sections not yet described in portfolio.json still get a collection,
 * so a new Pinterest section appears on the site without any code change.
 */
function describeNewSections(raw: RawPortfolio, library: ImageLibrary): RawCollection[] {
  const referenced = new Set(raw.collections.map((collection) => collection.images));
  const takenSlugs = new Set(raw.collections.map((collection) => collection.slug));

  return Object.keys(library)
    .filter((key) => !referenced.has(key) && resolveGroup(library, key).frames.length > 0)
    .map((key, idx) => {
      const name = humanize(key);
      const candidate = key.toLowerCase();
      const slug =
        SAFE_SLUG.test(candidate) && !takenSlugs.has(candidate) ? candidate : `collection-${idx + 1}`;
      takenSlugs.add(slug);
      return {
        slug,
        images: key,
        alt: name,
        title: name,
        description: `${name} — selected frames from the studio.`,
        ctaLabel: `View ${name.toLowerCase()}`,
      };
    });
}

function buildCollection(raw: RawCollection, library: ImageLibrary, position: number): Collection | null {
  const group = resolveGroup(library, raw.images);
  const cover = raw.cover ?? group.cover ?? group.frames[0]?.src;
  const hasGallery = raw.href === undefined;

  // A gallery with no photos yet (or a section emptied on Pinterest) is hidden, not broken.
  if (!cover || (hasGallery && group.frames.length === 0)) return null;

  const eyebrow = raw.eyebrow ?? `Collection ${twoDigits(position)}`;
  const frameCount = raw.frameCount ?? `${group.frames.length} frames`;

  return {
    slug: raw.slug,
    number: raw.number ?? `№ ${twoDigits(position)}`,
    frameCount,
    cover,
    alt: raw.alt,
    eyebrow,
    title: raw.title,
    description: raw.description,
    ctaLabel: raw.ctaLabel,
    href: raw.href,
    gallery: hasGallery
      ? {
          pageTitle: raw.gallery?.pageTitle ?? `${stripMarkup(raw.title)}${BRAND_SUFFIX}`,
          collectionLabel: raw.gallery?.collectionLabel ?? `${eyebrow} · ${frameCount}`,
          lede: raw.gallery?.lede ?? raw.description,
          frames: group.frames,
        }
      : undefined,
  };
}

export function buildPortfolio(raw: RawPortfolio, library: ImageLibrary): Portfolio {
  const described = [...raw.collections];
  // New sections go before a trailing link-out entry (e.g. Film) so it stays last.
  const insertAt = described.length > 0 && described[described.length - 1].href ? described.length - 1 : described.length;
  described.splice(insertAt, 0, ...describeNewSections(raw, library));

  const collections: Collection[] = [];
  for (const entry of described) {
    const built = buildCollection(entry, library, collections.length + 1);
    if (built) collections.push(built);
  }
  return { collections };
}

const entryUrl = (entry: string | { url: string }) => (typeof entry === "string" ? entry : entry.url);

/**
 * For live sections without a pin titled "cover", reuse a cover flagged in the
 * snapshot — as long as that photo is still on the board.
 */
function applySnapshotCovers(live: ImageLibrary, snapshot: ImageLibrary | null): ImageLibrary {
  if (!snapshot) return live;
  const merged: ImageLibrary = {};

  for (const [key, group] of Object.entries(live)) {
    const entries = Object.entries(group);
    const hasCover = entries.some(([, entry]) => typeof entry !== "string" && entry.cover);
    const snapshotCover = resolveGroup(snapshot, key).cover;

    merged[key] =
      hasCover || !snapshotCover
        ? group
        : Object.fromEntries(
            entries.map(([name, entry]) =>
              entryUrl(entry) === snapshotCover ? [name, { url: snapshotCover, cover: true }] : [name, entry],
            ),
          );
  }
  return merged;
}

async function fetchLibrary(url: string, signal?: AbortSignal): Promise<ImageLibrary | null> {
  try {
    return imageLibrarySchema.parse(await fetchJson(url, signal));
  } catch (error) {
    if (signal?.aborted) throw error;
    return null;
  }
}

export async function fetchPortfolio(signal?: AbortSignal): Promise<Portfolio> {
  const [rawPortfolio, live, snapshot] = await Promise.all([
    fetchJson(PORTFOLIO_URL, signal),
    fetchLibrary(LIVE_IMAGES_URL, signal),
    fetchLibrary(SNAPSHOT_IMAGES_URL, signal),
  ]);

  const library = live ? applySnapshotCovers(live, snapshot) : snapshot;
  if (!library) {
    throw new Error("Portfolio images are unavailable");
  }
  return buildPortfolio(rawPortfolioSchema.parse(rawPortfolio), library);
}
