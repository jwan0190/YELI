import type { ReactNode } from "react";
import { Reveal } from "../ui/Reveal";

type PageBannerProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  beforeContent?: ReactNode;
};

export function PageBanner({ eyebrow, title, lede, beforeContent }: PageBannerProps) {
  return (
    <header className="border-b border-line px-[40px] pb-[80px] pt-[200px] max-md:px-[22px] max-md:pb-[60px] max-md:pt-[140px]">
      {beforeContent}
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal
        as="h1"
        delay={1}
        className="mt-[36px] max-w-[14ch] font-display font-light leading-[0.95] [letter-spacing:-0.01em] [&_em]:italic [&_em]:text-accent"
        style={{ fontSize: "clamp(56px, 9vw, 140px)" }}
      >
        {title}
      </Reveal>
      {lede && (
        <Reveal
          as="p"
          delay={2}
          className="mt-[40px] max-w-[50ch] text-[19px] font-light leading-[1.55] text-ink-soft"
        >
          {lede}
        </Reveal>
      )}
    </header>
  );
}
