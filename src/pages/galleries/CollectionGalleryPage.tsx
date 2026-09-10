import { useMemo, type ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";

import galleriesContent from "../../assets/strings/galleries.json";
import { BackLink } from "../../components/ui/BackLink";
import { RetryButton, StatusNotice } from "../../components/ui/StatusNotice";
import { ROUTES } from "../../constants/navigation";
import { GalleryPage } from "../../features/galleries/GalleryPage";
import { buildGalleryRows } from "../../features/galleries/galleryLayout";
import { useImageOrientations } from "../../hooks/useImageOrientations";
import { useCollectionGallery, type CollectionGalleryData } from "../../hooks/usePortfolio";
import type { GalleryPageData } from "../../types/gallery.types";

const COMMON = galleriesContent.common;

type PlaceholderProps = {
  children: ReactNode;
};

/** Keeps the back link in place while the gallery is loading or has failed. */
function GalleryPlaceholder({ children }: PlaceholderProps) {
  return (
    <div className="px-[40px] pb-[120px] pt-[200px] max-md:px-[22px] max-md:pb-[80px] max-md:pt-[140px]">
      <BackLink to={ROUTES.portfolio}>{COMMON.backLabel}</BackLink>
      {children}
    </div>
  );
}

type LaidOutGalleryProps = {
  gallery: CollectionGalleryData;
};

/** Measures the photos, then arranges them into rows that suit their orientation. */
function LaidOutGallery({ gallery }: LaidOutGalleryProps) {
  const srcs = useMemo(() => gallery.frames.map((frame) => frame.src), [gallery.frames]);
  const { orientations, ready } = useImageOrientations(srcs);

  const data = useMemo<GalleryPageData | null>(() => {
    if (!ready) return null;
    return {
      slug: gallery.slug,
      title: gallery.title,
      banner: gallery.pageTitle,
      collectionLabel: gallery.collectionLabel,
      lede: gallery.lede,
      rows: buildGalleryRows(gallery.frames, orientations),
      next: gallery.next,
    };
  }, [gallery, orientations, ready]);

  if (!data) {
    return (
      <GalleryPlaceholder>
        <StatusNotice message={COMMON.loading} />
      </GalleryPlaceholder>
    );
  }
  return <GalleryPage data={data} />;
}

/** Renders any collection from public/data via /portfolio/:slug. */
export default function CollectionGalleryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isPending, isError, refetch } = useCollectionGallery(slug);

  if (isPending) {
    return (
      <GalleryPlaceholder>
        <StatusNotice message={COMMON.loading} />
      </GalleryPlaceholder>
    );
  }

  if (isError) {
    return (
      <GalleryPlaceholder>
        <StatusNotice
          isError
          message={COMMON.error}
          action={<RetryButton label={COMMON.retry} onClick={() => refetch()} />}
        />
      </GalleryPlaceholder>
    );
  }

  if (!data) {
    return <Navigate to={ROUTES.portfolio} replace />;
  }

  return <LaidOutGallery gallery={data} />;
}
