import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Reveal } from "../../components/ui/Reveal";
import { clsx } from "../../utils/clsx";

export type CollectionRowProps = {
  number: string;
  frameCount: string;
  cover: string;
  alt: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  ctaLabel: string;
  href: string;
  reverse?: boolean;
};

export function CollectionRow({
  number,
  frameCount,
  cover,
  alt,
  eyebrow,
  title,
  description,
  ctaLabel,
  href,
  reverse,
}: CollectionRowProps) {
  return (
    <Reveal
      as="article"
      className={clsx(
        "grid grid-cols-2 items-center gap-[80px] max-md:grid-cols-1 max-md:gap-[32px]",
        reverse && "[direction:rtl] [&>*]:[direction:ltr] max-md:[direction:ltr]",
      )}
    >
      <Link
        to={href}
        className="relative block aspect-[4/5] overflow-hidden bg-bg-alt"
        aria-label={ctaLabel}
      >
        <img
          src={cover}
          alt={alt}
          className="h-full w-full object-cover transition-[transform,filter] duration-[1600ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:scale-[1.04] hover:brightness-90"
        />
        <span
          className="absolute left-[20px] top-[20px] font-sans text-[11px] uppercase tracking-meta text-white"
          style={{ mixBlendMode: "difference" }}
        >
          {number}
        </span>
        <span
          className="absolute bottom-[20px] right-[20px] font-sans text-[11px] uppercase tracking-meta text-white"
          style={{ mixBlendMode: "difference" }}
        >
          {frameCount}
        </span>
      </Link>

      <div className="px-[20px] max-md:px-0">
        <span className="eyebrow mb-[24px]">{eyebrow}</span>
        <h2
          className="mb-[24px] mt-[24px] font-display font-light leading-none [letter-spacing:-0.01em] [&_em]:italic [&_em]:text-accent"
          style={{ fontSize: "clamp(40px, 5.4vw, 80px)" }}
        >
          {title}
        </h2>
        <p className="mb-[36px] max-w-[42ch] text-[18px] font-light leading-[1.6] text-ink-soft">
          {description}
        </p>
        <Button to={href}>{ctaLabel}</Button>
      </div>
    </Reveal>
  );
}
