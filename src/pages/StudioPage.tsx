import { useEffect } from "react";
import { PageBanner } from "../components/shared/PageBanner";
import { ApproachSection } from "../features/studio/ApproachSection";
import { PrinciplesSection } from "../features/studio/PrinciplesSection";

const PAGE_TITLE = "Studio — YELI";

export default function StudioPage() {
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  return (
    <>
      <PageBanner
        eyebrow="Section 03 — Studio"
        title={
          <>
            A small
            <br />
            <em>practice</em>, since 2014.
          </>
        }
        lede="Four photographers, one studio in the Marais, three continents a year. We photograph weddings and editorial events with film, light, and a great deal of patience."
      />

      <ApproachSection />
      <PrinciplesSection />
    </>
  );
}
