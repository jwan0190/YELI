import { useEffect } from "react";
import homeContent from "../assets/strings/home.json";
import { HeroSection } from "../features/home/HeroSection";
import { HomeGallery } from "../features/home/HomeGallery";
import { ManifestoSection } from "../features/home/ManifestoSection";
import { PullQuote } from "../features/home/PullQuote";

export default function HomePage() {
  useEffect(() => {
    document.title = homeContent.pageTitle;
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
