import { useEffect } from "react";
import privacyContent from "../assets/strings/privacy.json";
import { PageBanner } from "../components/shared/PageBanner";
import { Reveal } from "../components/ui/Reveal";

type PolicySection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  closing?: string;
};

const SECTIONS: PolicySection[] = privacyContent.sections;
const EMAIL = privacyContent.contactEmail;

const PARAGRAPH_CLASS = "max-w-[62ch] text-[18px] font-light leading-[1.65] text-ink-soft";

function PolicyBlock({ section, index }: { section: PolicySection; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <Reveal
      as="section"
      className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] gap-[60px] border-t border-line py-[48px] max-md:grid-cols-1 max-md:gap-[18px] max-md:py-[36px]"
    >
      <h2 className="font-display text-[30px] font-light leading-[1.15] max-md:text-[26px]">
        <span className="mb-[10px] block font-sans text-[11px] uppercase tracking-meta text-ink-soft">
          {number}
        </span>
        {section.heading}
      </h2>
      <div className="space-y-[18px]">
        {section.paragraphs?.map((text) => (
          <p key={text} className={PARAGRAPH_CLASS}>
            {text}
          </p>
        ))}
        {section.items && (
          <ul className="max-w-[62ch] list-disc space-y-[10px] pl-[22px] text-[18px] font-light leading-[1.65] text-ink-soft marker:text-accent">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {section.closing && <p className={PARAGRAPH_CLASS}>{section.closing}</p>}
      </div>
    </Reveal>
  );
}

export default function PrivacyPage() {
  useEffect(() => {
    document.title = privacyContent.pageTitle;
  }, []);

  return (
    <>
      <PageBanner
        eyebrow={privacyContent.banner.eyebrow}
        title={privacyContent.banner.title}
        lede={privacyContent.banner.lede}
      />

      <div className="mx-auto max-w-section px-[40px] pb-[140px] pt-[60px] max-md:px-[22px] max-md:pb-[100px]">
        <p className="mb-[40px] font-sans text-[11px] uppercase tracking-meta text-ink-soft">
          {privacyContent.updatedLabel} · {privacyContent.updated}
        </p>

        {SECTIONS.map((section, idx) => (
          <PolicyBlock key={section.heading} section={section} index={idx} />
        ))}

        <Reveal className="border-t border-line pt-[48px]">
          <p className={PARAGRAPH_CLASS}>
            Contact:{" "}
            <a href={`mailto:${EMAIL}`} className="border-b border-accent text-ink transition-opacity hover:opacity-70">
              {EMAIL}
            </a>
          </p>
        </Reveal>
      </div>
    </>
  );
}
