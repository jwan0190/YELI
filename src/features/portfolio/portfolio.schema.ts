import { z } from "zod";
import { FRAME_RATIOS } from "../../types/gallery.types";

const imageUrl = z.string().trim().min(1);

/**
 * One entry in public/data/images.json. A bare URL string is the common case;
 * use the object form to flag the cover or override the frame ratio.
 */
const imageEntrySchema = z.union([
  imageUrl,
  z.object({
    url: imageUrl,
    cover: z.boolean().optional(),
    ratio: z.enum(FRAME_RATIOS).optional(),
    caption: z.string().optional(),
  }),
]);

/** A group is either an ordered list or a name → entry map (order preserved). */
const imageGroupSchema = z.union([z.array(imageEntrySchema), z.record(imageEntrySchema)]);

export const imageLibrarySchema = z.record(imageGroupSchema);

const galleryTextSchema = z.object({
  pageTitle: z.string().optional(),
  collectionLabel: z.string().optional(),
  lede: z.string().optional(),
});

/** One collection in public/data/portfolio.json — text only, images live in images.json. */
export const rawCollectionSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/, "slug must be lowercase letters, digits and dashes"),
  /** Group key in images.json. Its flagged (or first) image is the cover. */
  images: z.string().optional(),
  /** Explicit cover URL; overrides the flagged image. */
  cover: imageUrl.optional(),
  number: z.string(),
  frameCount: z.string().optional(),
  alt: z.string(),
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  ctaLabel: z.string(),
  /** Override the link target; defaults to `/portfolio/{slug}`. */
  href: z.string().optional(),
  gallery: galleryTextSchema.optional(),
});

export const rawPortfolioSchema = z.object({
  collections: z.array(rawCollectionSchema),
});
