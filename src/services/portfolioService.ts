import { imageLibrarySchema, rawPortfolioSchema } from "../features/portfolio/portfolio.schema";
import type {
  Collection,
  ImageLibrary,
  Portfolio,
  PortfolioFrame,
  RawCollection,
  RawPortfolio,
} from "../types/portfolio.types";

/** Both files live in /public — edit them directly, no rebuild needed. */
const DATA_BASE = `${import.meta.env.BASE_URL}data/`;
const PORTFOLIO_URL = `${DATA_BASE}portfolio.json`;
const IMAGES_URL = `${DATA_BASE}images.json`;

const BRAND_SUFFIX = " — YELI";

async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal, cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Request for ${url} failed (${response.status})`);
  }
  return response.json();
}

type ResolvedGroup = { frames: PortfolioFrame[]; cover?: string };

/** Flattens an image group to ordered frames and finds the flagged cover. */
function resolveGroup(library: ImageLibrary, key: string): ResolvedGroup {
  const group = library[key];
  if (!group) {
    throw new Error(`images.json has no group named "${key}"`);
  }
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

function buildCollection(raw: RawCollection, library: ImageLibrary): Collection {
  const group = raw.images ? resolveGroup(library, raw.images) : { frames: [] };
  const cover = raw.cover ?? group.cover ?? group.frames[0]?.src;
  if (!cover) {
    throw new Error(`Collection "${raw.slug}" has no cover image`);
  }

  const frameCount = raw.frameCount ?? `${group.frames.length} frames`;
  const hasGallery = raw.images !== undefined && raw.href === undefined;

  return {
    slug: raw.slug,
    number: raw.number,
    frameCount,
    cover,
    alt: raw.alt,
    eyebrow: raw.eyebrow,
    title: raw.title,
    description: raw.description,
    ctaLabel: raw.ctaLabel,
    href: raw.href,
    gallery: hasGallery
      ? {
          pageTitle: raw.gallery?.pageTitle ?? `${stripMarkup(raw.title)}${BRAND_SUFFIX}`,
          collectionLabel: raw.gallery?.collectionLabel ?? `${raw.eyebrow} · ${frameCount}`,
          lede: raw.gallery?.lede ?? raw.description,
          frames: group.frames,
        }
      : undefined,
  };
}

export function buildPortfolio(raw: RawPortfolio, library: ImageLibrary): Portfolio {
  return { collections: raw.collections.map((collection) => buildCollection(collection, library)) };
}

export async function fetchPortfolio(signal?: AbortSignal): Promise<Portfolio> {
  const [rawPortfolio, rawLibrary] = await Promise.all([
    fetchJson(PORTFOLIO_URL, signal),
    fetchJson(IMAGES_URL, signal),
  ]);
  return buildPortfolio(rawPortfolioSchema.parse(rawPortfolio), imageLibrarySchema.parse(rawLibrary));
}
