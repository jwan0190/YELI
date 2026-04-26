import { useEffect } from "react";
import portfolioContent from "../components/assets/strings/portfolio.json";
import { PageBanner } from "../components/shared/PageBanner";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { RichText } from "../components/ui/RichText";
import { ROUTES } from "../constants/navigation";
import { CollectionRow } from "../features/portfolio/CollectionRow";
import { useCollections } from "../hooks/useCollections";

export default function PortfolioPage() {
  const collections = useCollections();

  useEffect(() => {
    document.title = portfolioContent.pageTitle;
  }, []);

  return (
    <>
      <PageBanner
        eyebrow={portfolioContent.banner.eyebrow}
        title={portfolioContent.banner.title}
        lede={portfolioContent.banner.lede}
      />

      <div className="mx-auto grid max-w-section gap-[80px] p-[40px] max-md:gap-[60px] max-md:p-[22px]">
        {collections.map((collection, idx) => (
          <CollectionRow key={collection.number} {...collection} reverse={idx % 2 === 1} />
        ))}
      </div>

      <section className="mt-[80px] border-t border-line px-[40px] py-[140px] text-center max-md:px-[22px] max-md:py-[100px]">
        <Reveal>
          <span className="eyebrow">{portfolioContent.cta.eyebrow}</span>
          <h2 className="display mb-[36px] mt-[22px]">
            <RichText text={portfolioContent.cta.title} />
          </h2>
          <Button to={ROUTES.contact} variant="ghost">
            {portfolioContent.cta.ctaLabel}
          </Button>
        </Reveal>
      </section>
    </>
  );
}
