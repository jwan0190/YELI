import { useMemo } from "react";

import galleriesData from "../components/assets/strings/galleries.json";
import type { FrameRatio, GalleryPageData, GalleryRow, RowVariant } from "../types/gallery.types";
import { useImages, type ImageKey } from "./useImages";

export type GallerySlug = "weddings" | "events" | "elopements" | "portraits";

type RawItem = { image: string; ratio: string; caption?: string };
type RawRow = { variant: string; items: RawItem[] };
type RawSection = {
  banner: string;
  collectionLabel: string;
  title: string;
  lede: string;
  rows: RawRow[];
  next: { title: string; href: string };
};

export function useGalleries(): Record<GallerySlug, GalleryPageData> {
  const img = useImages();

  return useMemo(() => {
    const buildRows = (rows: RawRow[]): GalleryRow[] =>
      rows.map((row) => ({
        variant: row.variant as RowVariant,
        items: row.items.map((item) => ({
          src: img[item.image as ImageKey],
          ratio: item.ratio as FrameRatio,
          caption: item.caption,
        })),
      }));

    const buildPage = (slug: GallerySlug, raw: RawSection): GalleryPageData => ({
      slug,
      banner: raw.banner,
      collectionLabel: raw.collectionLabel,
      title: raw.title,
      lede: raw.lede,
      rows: buildRows(raw.rows),
      next: {
        label: galleriesData.common.nextLabel,
        title: raw.next.title,
        href: raw.next.href,
      },
    });

    return {
      weddings: buildPage("weddings", galleriesData.weddings as RawSection),
      events: buildPage("events", galleriesData.events as RawSection),
      elopements: buildPage("elopements", galleriesData.elopements as RawSection),
      portraits: buildPage("portraits", galleriesData.portraits as RawSection),
    };
  }, [img]);
}

export function useGallery(slug: GallerySlug): GalleryPageData {
  return useGalleries()[slug];
}
