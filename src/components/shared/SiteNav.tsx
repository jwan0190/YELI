import { Link } from "react-router-dom";
import { BRAND_NAME, PRIMARY_NAV, ROUTES } from "../../constants/navigation";

export function SiteNav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[40px] py-[22px] text-[#f5f1ea] max-md:px-[22px] max-md:py-[18px]"
      style={{ mixBlendMode: "difference" }}
    >
      <div className="flex items-center gap-[56px]">
        <Link
          to={ROUTES.home}
          className="font-display text-[26px] font-medium uppercase tracking-brand transition-opacity hover:opacity-70"
        >
          {BRAND_NAME}
        </Link>
        <ul className="flex gap-[36px] font-sans text-[13px] font-normal uppercase tracking-eyebrow max-md:hidden">
          {PRIMARY_NAV.map((link) => (
            <li key={link.href}>
              <Link to={link.href} className="transition-opacity hover:opacity-70">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link
        to={ROUTES.contact}
        className="border-b border-current pb-[2px] font-sans text-[13px] font-normal uppercase tracking-eyebrow transition-opacity hover:opacity-70"
      >
        Get in touch
      </Link>
    </nav>
  );
}
