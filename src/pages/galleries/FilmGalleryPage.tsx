import { useEffect } from "react";
import { Link } from "react-router-dom";

import filmContent from "../../assets/strings/film.json";
import { PageBanner } from "../../components/shared/PageBanner";
import { BackLink } from "../../components/ui/BackLink";
import { Reveal } from "../../components/ui/Reveal";
import { RichText } from "../../components/ui/RichText";
import { ROUTES } from "../../constants/navigation";
import { FilmReel } from "../../features/galleries/FilmReel";
import { useFilmReels } from "../../hooks/useFilmReels";

export default function FilmGalleryPage() {
  const reels = useFilmReels();

  useEffect(() => {
    document.title = filmContent.pageTitle;
  }, []);

  return (
    <>
      <PageBanner
        beforeContent={
          <BackLink to={ROUTES.portfolio}>{filmContent.banner.backLabel}</BackLink>
        }
        eyebrow={filmContent.banner.eyebrow}
        title={filmContent.banner.title}
        lede={filmContent.banner.lede}
      />

      <section className="px-[40px] py-[120px] max-md:px-[22px] max-md:py-[80px]">
        {reels.map((reel, idx) => (
          <FilmReel
            key={reel.meta}
            reel={reel}
            reverse={idx % 2 === 1}
            playLabel={filmContent.playLabel}
          />
        ))}
      </section>

      <section className="border-t border-line px-[40px] py-[100px] text-center max-md:px-[22px]">
        <Reveal>
          <span className="eyebrow">{filmContent.back.eyebrow}</span>
          <h2 className="display mt-[22px]">
            <Link to={filmContent.back.href} className="border-b border-accent pb-[6px]">
              <RichText text={filmContent.back.title} />
            </Link>
          </h2>
        </Reveal>
      </section>
    </>
  );
}
