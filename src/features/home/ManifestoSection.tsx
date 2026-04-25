import { Reveal } from "../../components/ui/Reveal";

const PARAGRAPHS = [
  "YELI is a small studio of four photographers documenting weddings, private celebrations, and editorial events across three continents.",
  "Our work is unhurried — closer to a film still than a snapshot. We arrive early, stay late, and trust the day to give us its best moments.",
];

export function ManifestoSection() {
  return (
    <section
      id="about"
      className="grid grid-cols-2 items-end gap-[80px] px-[40px] pb-[140px] pt-[180px] max-md:grid-cols-1 max-md:gap-[40px] max-md:px-[22px] max-md:pt-[140px]"
    >
      <div>
        <Reveal>
          <span className="eyebrow mb-[32px]">001 — The Studio</span>
        </Reveal>
        <Reveal as="h2" delay={1} className="display mt-[32px]">
          We photograph
          <br />
          the <em>quiet hours</em>
          <br />
          between the vows.
        </Reveal>
      </div>
      <div className="space-y-[18px]">
        {PARAGRAPHS.map((text, idx) => (
          <Reveal
            key={text}
            as="p"
            delay={(idx + 1) as 1 | 2}
            className="max-w-[46ch] text-[20px] font-light leading-[1.55] text-ink-soft"
          >
            {text}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
