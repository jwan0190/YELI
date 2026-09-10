import homeContent from "../../assets/strings/home.json";
import { Frame } from "../../components/ui/Frame";
import { Reveal } from "../../components/ui/Reveal";
import { RichText } from "../../components/ui/RichText";
import { useImages, type ImageKey } from "../../hooks/useImages";
import { clsx } from "../../utils/clsx";

type Chapter = {
  chapter: string;
  title: string;
  copy: string;
  /** Either a hosted image URL or a key from `useImages`. */
  image: string;
  caption: string;
};

const CHAPTERS: Chapter[] = homeContent.gallery.chapters;

const isRemoteImage = (value: string) => /^https?:\/\//.test(value);

type SloganCellProps = Pick<Chapter, "chapter" | "title" | "copy">;

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

type ChapterRowProps = {
  chapter: Chapter;
  src: string;
  reverse: boolean;
};

/** Image + slogan pair; `reverse` puts the slogan first (image on the right). */
function ChapterRow({ chapter, src, reverse }: ChapterRowProps) {
  const image = (
    <Reveal variant={reverse ? "right" : "left"} delay={reverse ? 1 : 0}>
      <Frame src={src} ratio="wide" caption={chapter.caption} />
    </Reveal>
  );
  const slogan = (
    <Reveal variant={reverse ? "left" : "right"} delay={reverse ? 0 : 1}>
      <SloganCell chapter={chapter.chapter} title={chapter.title} copy={chapter.copy} />
    </Reveal>
  );

  return (
    <div className={clsx("row r-asym-a spread", reverse && "reverse")}>
      {reverse ? slogan : image}
      {reverse ? image : slogan}
    </div>
  );
}

export function HomeGallery() {
  const img = useImages();
  const resolveImage = (image: string) => (isRemoteImage(image) ? image : img[image as ImageKey]);

  return (
    <section id="work" className="px-[40px] pt-[140px] pb-[140px] max-md:px-[22px] max-md:py-[100px]">
      {CHAPTERS.map((chapter, idx) => (
        <ChapterRow
          key={chapter.chapter}
          chapter={chapter}
          src={resolveImage(chapter.image)}
          reverse={idx % 2 === 1}
        />
      ))}
    </section>
  );
}
