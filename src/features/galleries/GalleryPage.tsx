import { useEffect } from "react";
import { PageBanner } from "../../components/shared/PageBanner";
import { BackLink } from "../../components/ui/BackLink";
import { ROUTES } from "../../constants/navigation";
import type { GalleryPageData } from "../../types/gallery.types";
import { GalleryRow } from "./GalleryRow";
import { NextCollection } from "./NextCollection";

type GalleryPageProps = {
  data: GalleryPageData;
};

export function GalleryPage({ data }: GalleryPageProps) {
  useEffect(() => {
    document.title = data.banner;
  }, [data.banner]);

  return (
    <>
      <PageBanner
        beforeContent={<BackLink to={ROUTES.portfolio}>← Back to portfolio</BackLink>}
        eyebrow={data.collectionLabel}
        title={data.title}
        lede={data.lede}
      />

      <section className="px-[40px] py-[120px] max-md:px-[22px] max-md:py-[80px]">
        {data.rows.map((row, idx) => (
          <GalleryRow key={idx} row={row} />
        ))}
      </section>

      <NextCollection eyebrow="Next collection" title={data.next.title} href={data.next.href} />
    </>
  );
}
