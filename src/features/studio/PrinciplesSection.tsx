import studioContent from "../../components/assets/strings/studio.json";
import { Reveal } from "../../components/ui/Reveal";
import { RichText } from "../../components/ui/RichText";

export function PrinciplesSection() {
  const { principles } = studioContent;

  return (
    <section className="px-[40px] py-[120px] max-md:px-[22px] max-md:py-[80px]">
      <div className="mx-auto max-w-section">
        <Reveal className="mb-[40px]">
          <span className="eyebrow">{principles.eyebrow}</span>
          <h2 className="display mt-[22px]">
            <RichText text={principles.title} />
          </h2>
        </Reveal>

        <ul>
          {principles.items.map((principle, idx) => (
            <Reveal
              key={principle.number}
              as="li"
              className={[
                "grid grid-cols-[60px_1fr_2fr] items-baseline gap-[30px] border-t border-line py-[32px] max-md:grid-cols-[40px_1fr]",
                idx === principles.items.length - 1 ? "border-b" : "",
              ].join(" ")}
            >
              <span className="font-sans text-[11px] tracking-[0.2em] text-ink-soft">
                {principle.number}
              </span>
              <h3 className="font-display text-[32px] font-normal">{principle.title}</h3>
              <p className="text-[17px] font-light leading-[1.5] text-ink-soft max-md:col-span-full">
                {principle.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
