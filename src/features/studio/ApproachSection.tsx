import studioContent from "../../components/assets/strings/studio.json";
import { Reveal } from "../../components/ui/Reveal";
import { RichText } from "../../components/ui/RichText";
import { useImage } from "../../hooks/useImages";

export function ApproachSection() {
  const approachSrc = useImage("longTable");
  const { approach } = studioContent;

  return (
    <section className="px-[40px] py-[120px] max-md:px-[22px] max-md:py-[80px]">
      <div className="mx-auto grid max-w-section grid-cols-2 items-center gap-[80px] max-md:grid-cols-1 max-md:gap-[40px]">
        <Reveal variant="left">
          <div className="frame portrait">
            <img src={approachSrc} alt="" />
          </div>
        </Reveal>

        <Reveal variant="right" delay={1}>
          <span className="eyebrow">{approach.eyebrow}</span>
          <h2 className="display mt-[22px]">
            <RichText text={approach.title} />
          </h2>
          <div className="mt-[32px] max-w-[46ch] space-y-[18px] text-[19px] font-light leading-[1.6] text-ink-soft">
            {approach.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
