type InfoBlock = {
  heading: string;
  body: React.ReactNode;
};

const STUDIO_INFO: InfoBlock[] = [
  {
    heading: "Studio",
    body: (
      <p className="big">
        14 rue des Archives
        <br />
        75004 Paris, France
      </p>
    ),
  },
  {
    heading: "Email",
    body: (
      <p className="big">
        <a href="mailto:hello@yeli.studio">hello@yeli.studio</a>
      </p>
    ),
  },
  {
    heading: "By appointment",
    body: (
      <p>
        +33 1 00 00 00 00
        <br />
        Tuesday — Friday, 10h — 18h
      </p>
    ),
  },
  {
    heading: "Follow",
    body: (
      <p>
        <a href="https://instagram.com/yeli.studio" target="_blank" rel="noreferrer">
          Instagram
        </a>{" "}
        ·{" "}
        <a href="https://pinterest.com" target="_blank" rel="noreferrer">
          Pinterest
        </a>{" "}
        ·{" "}
        <a href="https://vimeo.com" target="_blank" rel="noreferrer">
          Vimeo
        </a>
      </p>
    ),
  },
];

export function StudioInfo() {
  return (
    <div className="[&_.big]:font-display [&_.big]:text-[28px] [&_.big]:font-normal [&_p]:max-w-[38ch] [&_p]:text-[18px] [&_p]:font-light [&_p]:leading-[1.6] [&_p]:text-ink-soft">
      {STUDIO_INFO.map((block, idx) => (
        <div key={block.heading}>
          <h4
            className={`mb-[12px] font-sans text-[11px] uppercase tracking-meta text-ink-soft ${
              idx === 0 ? "" : "mt-[40px]"
            }`}
          >
            {block.heading}
          </h4>
          {block.body}
        </div>
      ))}
    </div>
  );
}
