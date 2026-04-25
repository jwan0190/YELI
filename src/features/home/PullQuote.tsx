import { Reveal } from "../../components/ui/Reveal";

const QUOTE = "Photographs are how we stay in the rooms we leave.";
const SIGNATURE = "— The Studio";

export function PullQuote() {
  return (
    <section className="border-y border-line px-[40px] py-[220px] text-center max-md:px-[22px] max-md:py-[140px]">
      <Reveal>
        <blockquote
          className="mx-auto max-w-[22ch] font-display font-light italic"
          style={{ fontSize: "clamp(32px, 4.4vw, 68px)", lineHeight: 1.18 }}
        >
          “{QUOTE}”
        </blockquote>
      </Reveal>
      <Reveal delay={1}>
        <div className="mt-[40px] font-sans text-[13px] uppercase tracking-meta text-ink-soft">
          {SIGNATURE}
        </div>
      </Reveal>
    </section>
  );
}
