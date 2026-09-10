import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import galleriesContent from "../assets/strings/galleries.json";
import portfolioContent from "../assets/strings/portfolio.json";
import { ROUTES } from "../constants/navigation";
import type { CollectionRowProps } from "../features/portfolio/CollectionRow";
import { fetchPortfolio } from "../services/portfolioService";
import type { GalleryPageData } from "../types/gallery.types";
import type { Collection, Portfolio } from "../types/portfolio.types";

export const PORTFOLIO_QUERY_KEY = ["portfolio"] as const;

export type CollectionSummary = Omit<CollectionRowProps, "reverse">;

function collectionHref(collection: Collection): string {
  return collection.href ?? ROUTES.collection(collection.slug);
}

function toSummary(collection: Collection): CollectionSummary {
  return {
    number: collection.number,
    frameCount: collection.frameCount,
    cover: collection.cover,
    alt: collection.alt,
    eyebrow: collection.eyebrow,
    title: collection.title,
    description: collection.description,
    ctaLabel: collection.ctaLabel,
    href: collectionHref(collection),
  };
}

function toGalleryPage(collections: Collection[], index: number): GalleryPageData | null {
  const collection = collections[index];
  if (!collection?.gallery) return null;

  const following = collections[index + 1];
  const next = following
    ? { title: following.title, href: collectionHref(following) }
    : { title: portfolioContent.allCollectionsTitle, href: ROUTES.portfolio };

  return {
    slug: collection.slug,
    banner: collection.gallery.pageTitle,
    collectionLabel: collection.gallery.collectionLabel,
    title: collection.title,
    lede: collection.gallery.lede,
    rows: collection.gallery.rows,
    next: { label: galleriesContent.common.nextLabel, ...next },
  };
}

function usePortfolioQuery<T>(select: (data: Portfolio) => T) {
  return useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: ({ signal }) => fetchPortfolio(signal),
    select,
  });
}

/** Collections in display order, shaped for `CollectionRow`. */
export function useCollections() {
  const select = useCallback(
    (data: Portfolio): CollectionSummary[] => data.collections.map(toSummary),
    [],
  );
  return usePortfolioQuery(select);
}

/** A single collection's gallery; `data` is `null` when the slug is unknown or has no gallery. */
export function useCollectionGallery(slug: string | undefined) {
  const select = useCallback(
    (data: Portfolio): GalleryPageData | null => {
      const index = data.collections.findIndex((collection) => collection.slug === slug);
      return index === -1 ? null : toGalleryPage(data.collections, index);
    },
    [slug],
  );
  return usePortfolioQuery(select);
}
