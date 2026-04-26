import contactContent from "../../components/assets/strings/contact.json";

type SocialLink = { label: string; href: string };

type StudioBlock = {
  heading: string;
  type: "address" | "email" | "appointment" | "social";
  lines?: string[];
  email?: string;
  links?: SocialLink[];
  big?: boolean;
};

const STUDIO_INFO = contactContent.studioInfo as StudioBlock[];

function renderBlockBody(block: StudioBlock) {
  const big = block.big ? "big" : undefined;

  if (block.type === "email" && block.email) {
    return (
      <p className={big}>
        <a href={`mailto:${block.email}`}>{block.email}</a>
      </p>
    );
  }

  if (block.type === "social" && block.links) {
    return (
      <p className={big}>
        {block.links.map((link, i) => (
          <span key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
            {i < block.links!.length - 1 ? " · " : null}
          </span>
        ))}
      </p>
    );
  }

  const lines = block.lines ?? [];
  return (
    <p className={big}>
      {lines.map((line, i) => (
        <span key={line}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

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
          {renderBlockBody(block)}
        </div>
      ))}
    </div>
  );
}
