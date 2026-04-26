import homeContent from "../../assets/strings/home.json";
import { Reveal } from "../../components/ui/Reveal";
import { RichText } from "../../components/ui/RichText";

export function ManifestoSection() {
  const { manifesto } = homeContent;

  return (
    <section
      id="about"
      className="grid grid-cols-2 items-end gap-[80px] px-[40px] pb-[140px] pt-[180px] max-md:grid-cols-1 max-md:gap-[40px] max-md:px-[22px] max-md:pt-[140px]"
    >
      <div>
        <Reveal>
          <span className="eyebrow mb-[32px]">{manifesto.eyebrow}</span>
        </Reveal>
        <Reveal as="h2" delay={1} className="display mt-[32px]">
          <RichText text={manifesto.title} />
        </Reveal>
      </div>
      <div className="space-y-[18px]">
        {manifesto.paragraphs.map((text, idx) => (
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
