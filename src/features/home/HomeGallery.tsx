import { Frame } from "../../components/ui/Frame";
import { Reveal } from "../../components/ui/Reveal";
import { IMG } from "../../constants/images";

type SloganCellProps = {
  chapter: string;
  title: React.ReactNode;
  copy: string;
};

function SloganCell({ chapter, title, copy }: SloganCellProps) {
  return (
    <div className="px-[20px] max-md:px-0">
      <span className="eyebrow mb-[28px]">{chapter}</span>
      <h3 className="slogan mt-[28px] mb-[28px]">{title}</h3>
      <p className="max-w-[36ch] text-[18px] font-light italic leading-[1.55] text-ink-soft">
        {copy}
      </p>
    </div>
  );
}

export function HomeGallery() {
  return (
    <section id="work" className="px-[40px] pt-[140px] pb-[140px] max-md:px-[22px] max-md:py-[100px]">
      <div className="row r-asym-a spread">
        <Reveal variant="left">
          <Frame src={IMG.hudsonValley} ratio="wide" caption="Lawn ceremony — Hudson Valley" />
        </Reveal>
        <Reveal variant="right" delay={1}>
          <SloganCell
            chapter="Chapter I"
            title={
              <>
                Light, <em>held</em>.
              </>
            }
            copy="The hour before the door opens. The breath that no one else sees. We photograph the quiet, and let the noise pass through."
          />
        </Reveal>
      </div>

      <div className="row r-asym-a spread reverse">
        <Reveal variant="left">
          <SloganCell
            chapter="Chapter II"
            title={
              <>
                Two, <em>and a vow</em>.
              </>
            }
            copy="Five weddings a season. We arrive a day early, and we never miss the quiet hours."
          />
        </Reveal>
        <Reveal variant="right" delay={1}>
          <Frame src={IMG.petals} ratio="wide" caption="Petals — Florence" />
        </Reveal>
      </div>

      <div className="row r-1">
        <Reveal>
          <Frame src={IMG.longTable} ratio="cinema" caption="Long table — Tuscany" />
        </Reveal>
      </div>

      <div className="row r-2">
        <Reveal variant="left">
          <Frame src={IMG.como} ratio="wide" caption="The Aurelio Wedding — Como" />
        </Reveal>
        <Reveal variant="right" delay={1}>
          <Frame src={IMG.dance} ratio="wide" caption="The dance — Mallorca" />
        </Reveal>
      </div>
    </section>
  );
}
