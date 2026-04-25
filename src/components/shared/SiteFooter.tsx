import { Link } from "react-router-dom";
import { BRAND_NAME, FOOTER_NAV, ROUTES } from "../../constants/navigation";

const STUDIO_ADDRESS = ["14 rue des Archives", "75004 Paris"];
const INQUIRY_EMAIL = "hello@yeli.studio";
const BOOKING_NOTE = "2026 dates open.";
const COPY_LINE = "© 2026 YELI";
const CREDIT_LINE = "Photographs by the studio";

type FooterColumn = {
  heading: string;
  body: React.ReactNode;
};

const COLUMNS: FooterColumn[] = [
  {
    heading: "Studio",
    body: (
      <p>
        {STUDIO_ADDRESS.map((line, i) => (
          <span key={line}>
            {line}
            {i < STUDIO_ADDRESS.length - 1 && <br />}
          </span>
        ))}
      </p>
    ),
  },
  {
    heading: "Inquiries",
    body: <a href={`mailto:${INQUIRY_EMAIL}`}>{INQUIRY_EMAIL}</a>,
  },
  {
    heading: "Pages",
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
    heading: "Booking",
    body: <p>{BOOKING_NOTE}</p>,
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
        <span>{COPY_LINE}</span>
        <span>{CREDIT_LINE}</span>
      </div>
    </footer>
  );
}
