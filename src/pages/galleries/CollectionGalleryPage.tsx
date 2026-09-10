import type { ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";

import galleriesContent from "../../assets/strings/galleries.json";
import { BackLink } from "../../components/ui/BackLink";
import { RetryButton, StatusNotice } from "../../components/ui/StatusNotice";
import { ROUTES } from "../../constants/navigation";
import { GalleryPage } from "../../features/galleries/GalleryPage";
import { useCollectionGallery } from "../../hooks/usePortfolio";

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

/** Renders any collection from public/data/portfolio.json via /portfolio/:slug. */
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

  return <GalleryPage data={data} />;
}
