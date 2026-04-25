import { useEffect } from "react";
import { PageBanner } from "../../components/shared/PageBanner";
import { BackLink } from "../../components/ui/BackLink";
import { Reveal } from "../../components/ui/Reveal";
import { ROUTES } from "../../constants/navigation";
import { FilmReel, type FilmReelData } from "../../features/galleries/FilmReel";
import { Link } from "react-router-dom";

const PAGE_TITLE = "Film & Cinema — YELI";

const REELS: FilmReelData[] = [
  {
    meta: "Reel 06 · Provence · 16mm",
    title: (
      <>
        Amélie & <em>Pierre</em>
      </>
    ),
    description:
      "Six minutes of a Provençal Saturday — vows in the cypresses, dinner under the bulbs, and the long walk back.",
    duration: "6:24",
    poster:
      "https://images.unsplash.com/photo-1525772764200-be829a350797?w=2000&q=80&auto=format&fit=crop",
  },
  {
    meta: "Reel 05 · Hudson Valley · Super-8",
    title: (
      <>
        The lawn <em>ceremony</em>
      </>
    ),
    description:
      "Three rolls of Super-8 in the rain, then sun, then candlelight. A film about weather, mostly.",
    duration: "5:48",
    poster:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=2000&q=80&auto=format&fit=crop",
  },
  {
    meta: "Reel 04 · Tuscany · 16mm",
    title: (
      <>
        The long <em>table</em>
      </>
    ),
    description: "Twelve courses, four hours, one thunderstorm — scored for cello and felt piano.",
    duration: "7:02",
    poster:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=2000&q=80&auto=format&fit=crop",
  },
];

export default function FilmGalleryPage() {
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  return (
    <>
      <PageBanner
        beforeContent={<BackLink to={ROUTES.portfolio}>← Back to portfolio</BackLink>}
        eyebrow="Collection 05 · Six reels"
        title={
          <>
            Film <em>&amp; cinema</em>
          </>
        }
        lede="Super-8 and 16mm transfers. Six-minute story films, scored, hand-edited from a season's footage."
      />

      <section className="px-[40px] py-[120px] max-md:px-[22px] max-md:py-[80px]">
        {REELS.map((reel, idx) => (
          <FilmReel key={reel.meta} reel={reel} reverse={idx % 2 === 1} />
        ))}
      </section>

      <section className="border-t border-line px-[40px] py-[100px] text-center max-md:px-[22px]">
        <Reveal>
          <span className="eyebrow">Back to start</span>
          <h2 className="display mt-[22px]">
            <Link to={ROUTES.portfolio} className="border-b border-accent pb-[6px]">
              View all <em>collections</em> →
            </Link>
          </h2>
        </Reveal>
      </section>
    </>
  );
}
