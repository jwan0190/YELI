import { Reveal } from "../../components/ui/Reveal";

const APPROACH_IMAGE =
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1600&q=80&auto=format&fit=crop";

export function ApproachSection() {
  return (
    <section className="px-[40px] py-[120px] max-md:px-[22px] max-md:py-[80px]">
      <div className="mx-auto grid max-w-section grid-cols-2 items-center gap-[80px] max-md:grid-cols-1 max-md:gap-[40px]">
        <Reveal variant="left">
          <div className="frame portrait">
            <img src={APPROACH_IMAGE} alt="" />
          </div>
        </Reveal>

        <Reveal variant="right" delay={1}>
          <span className="eyebrow">Approach</span>
          <h2 className="display mt-[22px]">
            We are <em>quiet</em>
            <br />
            in the room.
          </h2>
          <div className="mt-[32px] max-w-[46ch] space-y-[18px] text-[19px] font-light leading-[1.6] text-ink-soft">
            <p>
              We don't direct, and we rarely interrupt. The work we love best is the kind that
              happens when the room forgets we're there — the held breath before the door opens,
              the long look across a table, the late hour when the band has gone home.
            </p>
            <p>
              Every wedding is documented on a mix of medium-format film and digital. Every gallery
              is hand-edited by the lead photographer.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
