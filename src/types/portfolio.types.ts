import type { z } from "zod";
import type { collectionSchema, portfolioSchema } from "../features/portfolio/portfolio.schema";

export type Collection = z.infer<typeof collectionSchema>;
export type CollectionGallery = NonNullable<Collection["gallery"]>;
export type Portfolio = z.infer<typeof portfolioSchema>;
