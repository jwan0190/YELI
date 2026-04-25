import { Reveal } from "../../components/ui/Reveal";

type Principle = {
  number: string;
  title: string;
  description: string;
};

const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Slowly",
    description:
      "We arrive a day early and stay until the last guest leaves. We never bring more than two cameras.",
  },
  {
    number: "02",
    title: "Honestly",
    description: "No staged moments. No tableaux. We document what is, not what looks well.",
  },
  {
    number: "03",
    title: "Quietly",
    description: "The room is the subject. We are not.",
  },
  {
    number: "04",
    title: "Permanently",
    description: "Every couple receives an heirloom album, hand-bound in Florence.",
  },
];

export function PrinciplesSection() {
  return (
    <section className="px-[40px] py-[120px] max-md:px-[22px] max-md:py-[80px]">
      <div className="mx-auto max-w-section">
        <Reveal className="mb-[40px]">
          <span className="eyebrow">Principles</span>
          <h2 className="display mt-[22px]">
            How we <em>work</em>.
          </h2>
        </Reveal>

        <ul>
          {PRINCIPLES.map((principle, idx) => (
            <Reveal
              key={principle.number}
              as="li"
              className={[
                "grid grid-cols-[60px_1fr_2fr] items-baseline gap-[30px] border-t border-line py-[32px] max-md:grid-cols-[40px_1fr]",
                idx === PRINCIPLES.length - 1 ? "border-b" : "",
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
