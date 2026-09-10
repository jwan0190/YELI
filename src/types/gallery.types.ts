export const FRAME_RATIOS = ["tall", "portrait", "square", "wide", "cinema"] as const;
export type FrameRatio = (typeof FRAME_RATIOS)[number];

export const ROW_VARIANTS = ["r-3", "r-2", "r-asym-a", "r-asym-b", "r-1"] as const;
export type RowVariant = (typeof ROW_VARIANTS)[number];

export type GalleryItem = {
  src: string;
  caption?: string;
  ratio: FrameRatio;
};

export type GalleryRow = {
  variant: RowVariant;
  items: GalleryItem[];
};

export type GalleryPageData = {
  slug: string;
  title: string;
  collectionLabel: string;
  banner: string;
  lede: string;
  rows: GalleryRow[];
  next: {
    label: string;
    title: string;
    href: string;
  };
};
