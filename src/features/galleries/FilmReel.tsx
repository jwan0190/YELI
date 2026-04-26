import { Reveal } from "../../components/ui/Reveal";
import { RichText } from "../../components/ui/RichText";
import { clsx } from "../../utils/clsx";

export type FilmReelData = {
  meta: string;
  title: string;
  description: string;
  duration: string;
  poster: string;
};

type FilmReelProps = {
  reel: FilmReelData;
  reverse?: boolean;
  playLabel: string;
};

export function FilmReel({ reel, reverse, playLabel }: FilmReelProps) {
  return (
    <Reveal
      as="article"
      className={clsx(
        "mx-auto mb-[60px] grid max-w-section items-center gap-[60px] grid-cols-[1.4fr_1fr] max-md:grid-cols-1 max-md:gap-[24px]",
        reverse && "[direction:rtl] [&>*]:[direction:ltr] grid-cols-[1fr_1.4fr] max-md:[direction:ltr]",
      )}
    >
      <div className="relative aspect-[21/9] overflow-hidden bg-black">
        <img
          src={reel.poster}
          alt=""
          className="h-full w-full object-cover opacity-85 transition-transform duration-[1600ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:scale-[1.04]"
        />
        <div className="absolute inset-0 grid place-items-center text-white">
          <div className="grid h-[92px] w-[92px] place-items-center rounded-full border border-white/70 font-sans text-[10px] uppercase tracking-meta backdrop-blur-md transition-colors duration-300 hover:bg-white/15">
            {playLabel} · {reel.duration}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-[14px] font-sans text-[11px] uppercase tracking-meta text-ink-soft">
          {reel.meta}
        </div>
        <h3
          className="mb-[18px] font-display font-light leading-[1.05] [&_em]:italic [&_em]:text-accent"
          style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
        >
          <RichText text={reel.title} />
        </h3>
        <p className="max-w-[42ch] text-[17px] font-light leading-[1.55] text-ink-soft">
          {reel.description}
        </p>
      </div>
    </Reveal>
  );
}
