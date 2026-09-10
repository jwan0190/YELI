import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import galleriesContent from "../assets/strings/galleries.json";
import portfolioContent from "../assets/strings/portfolio.json";
import { ROUTES } from "../constants/navigation";
import type { CollectionRowProps } from "../features/portfolio/CollectionRow";
import { fetchPortfolio } from "../services/portfolioService";
import type { Collection, CollectionGallery, Portfolio } from "../types/portfolio.types";

export const PORTFOLIO_QUERY_KEY = ["portfolio"] as const;

export type CollectionSummary = Omit<CollectionRowProps, "reverse">;

/** Gallery text plus its photos and the link to the following collection. */
export type CollectionGalleryData = CollectionGallery & {
  slug: string;
  title: string;
  next: { label: string; title: string; href: string };
};

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

function toGalleryData(collections: Collection[], index: number): CollectionGalleryData | null {
  const collection = collections[index];
  if (!collection?.gallery) return null;

  const following = collections[index + 1];
  const next = following
    ? { title: following.title, href: collectionHref(following) }
    : { title: portfolioContent.allCollectionsTitle, href: ROUTES.portfolio };

  return {
    ...collection.gallery,
    slug: collection.slug,
    title: collection.title,
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
    (data: Portfolio): CollectionGalleryData | null => {
      const index = data.collections.findIndex((collection) => collection.slug === slug);
      return index === -1 ? null : toGalleryData(data.collections, index);
    },
    [slug],
  );
  return usePortfolioQuery(select);
}

/** Cover image of a collection by slug, for pages that reference one (e.g. the home chapters). */
export function useCollectionCover(slug: string | undefined) {
  const select = useCallback(
    (data: Portfolio): string | null =>
      data.collections.find((collection) => collection.slug === slug)?.cover ?? null,
    [slug],
  );
  return usePortfolioQuery(select);
}
