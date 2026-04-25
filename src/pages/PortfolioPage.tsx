import { useEffect } from "react";
import { PageBanner } from "../components/shared/PageBanner";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { ROUTES } from "../constants/navigation";
import { CollectionRow } from "../features/portfolio/CollectionRow";
import { COLLECTIONS } from "../features/portfolio/collections.data";

const PAGE_TITLE = "Portfolio — YELI";

export default function PortfolioPage() {
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  return (
    <>
      <PageBanner
        eyebrow="Portfolio — Five Collections"
        title={
          <>
            A year
            <br />
            in <em>frames</em>.
          </>
        }
        lede="Selected weddings, events, and editorial work — each collection opens to its own gallery."
      />

      <div className="mx-auto grid max-w-section gap-[80px] p-[40px] max-md:gap-[60px] max-md:p-[22px]">
        {COLLECTIONS.map((collection, idx) => (
          <CollectionRow key={collection.number} {...collection} reverse={idx % 2 === 1} />
        ))}
      </div>

      <section className="mt-[80px] border-t border-line px-[40px] py-[140px] text-center max-md:px-[22px] max-md:py-[100px]">
        <Reveal>
          <span className="eyebrow">Commissions open · 2026</span>
          <h2 className="display mb-[36px] mt-[22px]">
            Tell us about <em>the day</em>.
          </h2>
          <Button to={ROUTES.contact} variant="ghost">
            Begin an inquiry
          </Button>
        </Reveal>
      </section>
    </>
  );
}
