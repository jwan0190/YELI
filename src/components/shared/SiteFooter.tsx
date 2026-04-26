import { Link } from "react-router-dom";
import navContent from "../assets/strings/nav.json";
import { BRAND_NAME, FOOTER_NAV, ROUTES } from "../../constants/navigation";

const FOOTER = navContent.footer;

type FooterColumn = {
  heading: string;
  body: React.ReactNode;
};

const COLUMNS: FooterColumn[] = [
  {
    heading: FOOTER.studio.heading,
    body: (
      <p>
        {FOOTER.studio.lines.map((line, i) => (
          <span key={line}>
            {line}
            {i < FOOTER.studio.lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    ),
  },
  {
    heading: FOOTER.inquiries.heading,
    body: <a href={`mailto:${FOOTER.inquiries.email}`}>{FOOTER.inquiries.email}</a>,
  },
  {
    heading: FOOTER.pages.heading,
    body: (
      <>
        {FOOTER_NAV.map((link) => (
          <Link key={link.href} to={link.href} className="block">
            {link.label}
          </Link>
        ))}
      </>
    ),
  },
  {
    heading: FOOTER.booking.heading,
    body: <p>{FOOTER.booking.note}</p>,
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink px-[40px] pb-[40px] pt-[140px] text-bg max-md:px-[22px]">
      <Link
        to={ROUTES.home}
        className="block text-center font-display font-light"
        style={{
          fontSize: "clamp(64px, 14vw, 240px)",
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          marginBottom: 80,
        }}
      >
        {BRAND_NAME}
      </Link>

      <div className="grid grid-cols-4 gap-[40px] border-t border-white/[0.18] pt-[40px] max-md:grid-cols-2">
        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h5 className="mb-[18px] font-sans text-[11px] font-normal uppercase tracking-meta opacity-55">
              {col.heading}
            </h5>
            <div className="space-y-1 font-display text-[17px] leading-[1.5] [&_a]:block [&_a:hover]:opacity-70 [&_p]:block">
              {col.body}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[80px] flex justify-between border-t border-white/[0.18] pt-[24px] font-sans text-[10px] uppercase tracking-meta opacity-60">
        <span>{FOOTER.copy}</span>
        <span>{FOOTER.credit}</span>
      </div>
    </footer>
  );
}
