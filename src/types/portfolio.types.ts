import type { z } from "zod";
import type {
  imageLibrarySchema,
  rawCollectionSchema,
  rawPortfolioSchema,
} from "../features/portfolio/portfolio.schema";
import type { FrameRatio } from "./gallery.types";

/** Shapes exactly as they appear on disk. */
export type ImageLibrary = z.infer<typeof imageLibrarySchema>;
export type RawCollection = z.infer<typeof rawCollectionSchema>;
export type RawPortfolio = z.infer<typeof rawPortfolioSchema>;

/** One photo, resolved from the library. */
export type PortfolioFrame = {
  src: string;
  ratio?: FrameRatio;
  caption?: string;
};

export type CollectionGallery = {
  pageTitle: string;
  collectionLabel: string;
  lede: string;
  frames: PortfolioFrame[];
};

/** A collection after the two JSON files have been merged. */
export type Collection = {
  slug: string;
  number: string;
  frameCount: string;
  cover: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  href?: string;
  gallery?: CollectionGallery;
};

export type Portfolio = {
  collections: Collection[];
};
