import homeContent from "../../assets/strings/home.json";
import { Frame } from "../../components/ui/Frame";
import { Reveal } from "../../components/ui/Reveal";
import { RichText } from "../../components/ui/RichText";
import { useCollectionCover } from "../../hooks/usePortfolio";
import { useImages, type ImageKey } from "../../hooks/useImages";
import { clsx } from "../../utils/clsx";

type Chapter = {
  chapter: string;
  title: string;
  copy: string;
  caption: string;
  /** Slug of a collection in portfolio.json — uses that collection's flagged cover. */
  collection?: string;
  /** Hosted image URL or a key from `useImages`; used when `collection` is not set. */
  image?: string;
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
  reverse: boolean;
};

/** Image + slogan pair; `reverse` puts the slogan first (image on the right). */
function ChapterRow({ chapter, reverse }: ChapterRowProps) {
  const img = useImages();
  const { data: cover } = useCollectionCover(chapter.collection);

  const localImage = chapter.image
    ? isRemoteImage(chapter.image)
      ? chapter.image
      : img[chapter.image as ImageKey]
    : undefined;
  const src = chapter.collection ? cover : localImage;

  const image = (
    <Reveal variant={reverse ? "right" : "left"} delay={reverse ? 1 : 0}>
      {/* Empty frame keeps the layout stable while a collection cover is still loading. */}
      {src ? (
        <Frame src={src} ratio="wide" caption={chapter.caption} />
      ) : (
        <div className="frame wide" aria-hidden />
      )}
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
  return (
    <section id="work" className="px-[40px] pt-[140px] pb-[140px] max-md:px-[22px] max-md:py-[100px]">
      {CHAPTERS.map((chapter, idx) => (
        <ChapterRow key={chapter.chapter} chapter={chapter} reverse={idx % 2 === 1} />
      ))}
    </section>
  );
}
