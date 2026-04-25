import { useEffect } from "react";
import { HeroSection } from "../features/home/HeroSection";
import { HomeGallery } from "../features/home/HomeGallery";
import { ManifestoSection } from "../features/home/ManifestoSection";
import { PullQuote } from "../features/home/PullQuote";

const PAGE_TITLE = "YELI — Wedding & Event Photography";

export default function HomePage() {
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <HomeGallery />
      <PullQuote />
    </>
  );
}
