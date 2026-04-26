import { useEffect } from "react";
import studioContent from "../components/assets/strings/studio.json";
import { PageBanner } from "../components/shared/PageBanner";
import { ApproachSection } from "../features/studio/ApproachSection";
import { PrinciplesSection } from "../features/studio/PrinciplesSection";

export default function StudioPage() {
  useEffect(() => {
    document.title = studioContent.pageTitle;
  }, []);

  return (
    <>
      <PageBanner
        eyebrow={studioContent.banner.eyebrow}
        title={studioContent.banner.title}
        lede={studioContent.banner.lede}
      />

      <ApproachSection />
      <PrinciplesSection />
    </>
  );
}
