import { z } from "zod";
import { FRAME_RATIOS, ROW_VARIANTS } from "../../types/gallery.types";

const imageUrl = z.string().trim().min(1);

const galleryItemSchema = z.object({
  src: imageUrl,
  ratio: z.enum(FRAME_RATIOS),
  caption: z.string().optional(),
});

const galleryRowSchema = z.object({
  variant: z.enum(ROW_VARIANTS),
  items: z.array(galleryItemSchema).min(1),
});

const collectionGallerySchema = z.object({
  pageTitle: z.string(),
  collectionLabel: z.string(),
  lede: z.string(),
  rows: z.array(galleryRowSchema),
});

export const collectionSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/, "slug must be lowercase letters, digits and dashes"),
  number: z.string(),
  frameCount: z.string(),
  cover: imageUrl,
  alt: z.string(),
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  ctaLabel: z.string(),
  /** Override the link target; defaults to `/portfolio/{slug}`. */
  href: z.string().optional(),
  /** Omit for collections that have their own page (e.g. film). */
  gallery: collectionGallerySchema.optional(),
});

export const portfolioSchema = z.object({
  collections: z.array(collectionSchema),
});
