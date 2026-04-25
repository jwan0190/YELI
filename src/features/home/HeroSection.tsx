import { Reveal } from "../../components/ui/Reveal";
import { IMG } from "../../constants/images";

const HERO_TAGLINE = "Event Photography";
const HERO_LINE_1 = "Light, held";
const HERO_LINE_2 = "still.";
const HERO_META = "EST. 2014 — NEW YORK · PARIS · KYOTO";

export function HeroSection() {
  return (
    <header className="relative h-[72vh] min-h-[520px] max-h-[760px] overflow-hidden bg-ink">
      <img
        src={IMG.hero}
        alt=""
        className="hero-img absolute inset-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.78)", transform: "scale(1.05)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,.45))",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 px-[40px] pb-[50px] text-[#f5f1ea] max-md:px-[22px] max-md:pb-[60px]">
        <Reveal
          as="span"
          className="mb-[22px] inline-flex items-center font-sans text-[13px] uppercase tracking-eyebrow text-[#f5f1ea]"
        >
          <span aria-hidden className="mr-[14px] inline-block h-px w-[28px] bg-[#f5f1ea]" />
          {HERO_TAGLINE}
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="max-w-[12ch] font-display font-light italic [letter-spacing:-0.01em] [&_em]:font-normal [&_em]:not-italic"
          style={{
            fontSize: "clamp(44px, 6.5vw, 110px)",
            lineHeight: 0.92,
          }}
        >
          {HERO_LINE_1}
          <br />
          <em>{HERO_LINE_2}</em>
        </Reveal>
        <div className="mt-[36px] flex items-end justify-between font-sans text-[13px] uppercase tracking-meta text-[#f5f1ea] opacity-85 max-md:flex-col max-md:items-start max-md:gap-[18px]">
          <Reveal delay={2} as="span">
            {HERO_META}
          </Reveal>
          <Reveal delay={3} className="flex items-center gap-[10px]">
            <span>SCROLL</span>
            <span aria-hidden className="scroll-line h-px w-[40px] bg-[#f5f1ea]" />
          </Reveal>
        </div>
      </div>
    </header>
  );
}
