import { useEffect } from "react";
import portfolioContent from "../assets/strings/portfolio.json";
import { PageBanner } from "../components/shared/PageBanner";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { RichText } from "../components/ui/RichText";
import { RetryButton, StatusNotice } from "../components/ui/StatusNotice";
import { ROUTES } from "../constants/navigation";
import { CollectionRow } from "../features/portfolio/CollectionRow";
import { useCollections, type CollectionSummary } from "../hooks/usePortfolio";

const STATES = portfolioContent.states;

type CollectionListProps = {
  collections: CollectionSummary[];
};

function CollectionList({ collections }: CollectionListProps) {
  if (collections.length === 0) {
    return <StatusNotice message={STATES.empty} />;
  }
  return (
    <>
      {collections.map((collection, idx) => (
        <CollectionRow key={collection.href} {...collection} reverse={idx % 2 === 1} />
      ))}
    </>
  );
}

export default function PortfolioPage() {
  const { data, isPending, isError, refetch } = useCollections();

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
        {isPending && <StatusNotice message={STATES.loading} />}
        {isError && (
          <StatusNotice
            isError
            message={STATES.error}
            action={<RetryButton label={STATES.retry} onClick={() => refetch()} />}
          />
        )}
        {data && <CollectionList collections={data} />}
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
