export type FrameRatio = "tall" | "portrait" | "square" | "wide" | "cinema";

export type GalleryItem = {
  src: string;
  caption?: string;
  ratio: FrameRatio;
};

export type RowVariant = "r-3" | "r-2" | "r-asym-a" | "r-1";

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
