import homeContent from "../../components/assets/strings/home.json";
import { Frame } from "../../components/ui/Frame";
import { Reveal } from "../../components/ui/Reveal";
import { RichText } from "../../components/ui/RichText";
import { useImages } from "../../hooks/useImages";

type SloganCellProps = {
  chapter: string;
  title: string;
  copy: string;
};

function SloganCell({ chapter, title, copy }: SloganCellProps) {
  return (
    <div className="px-[20px] max-md:px-0">
      <span className="eyebrow mb-[28px]">{chapter}</span>
      <h3 className="slogan mt-[28px] mb-[28px]">
        <RichText text={title} />
      </h3>
      <p className="max-w-[36ch] text-[18px] font-light italic leading-[1.55] text-ink-soft">
        {copy}
      </p>
    </div>
  );
}

export function HomeGallery() {
  const img = useImages();
  const { gallery } = homeContent;

  return (
    <section id="work" className="px-[40px] pt-[140px] pb-[140px] max-md:px-[22px] max-md:py-[100px]">
      <div className="row r-asym-a spread">
        <Reveal variant="left">
          <Frame src={img.hudsonValley} ratio="wide" caption={gallery.chapterOne.caption} />
        </Reveal>
        <Reveal variant="right" delay={1}>
          <SloganCell
            chapter={gallery.chapterOne.chapter}
            title={gallery.chapterOne.title}
            copy={gallery.chapterOne.copy}
          />
        </Reveal>
      </div>

      <div className="row r-asym-a spread reverse">
        <Reveal variant="left">
          <SloganCell
            chapter={gallery.chapterTwo.chapter}
            title={gallery.chapterTwo.title}
            copy={gallery.chapterTwo.copy}
          />
        </Reveal>
        <Reveal variant="right" delay={1}>
          <Frame src={img.petals} ratio="wide" caption={gallery.chapterTwo.caption} />
        </Reveal>
      </div>

      <div className="row r-1">
        <Reveal>
          <Frame src={img.longTable} ratio="cinema" caption={gallery.longTableCaption} />
        </Reveal>
      </div>

      <div className="row r-2">
        <Reveal variant="left">
          <Frame src={img.como} ratio="wide" caption={gallery.comoCaption} />
        </Reveal>
        <Reveal variant="right" delay={1}>
          <Frame src={img.dance} ratio="wide" caption={gallery.danceCaption} />
        </Reveal>
      </div>
    </section>
  );
}
