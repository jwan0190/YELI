import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import navContent from "../../assets/strings/nav.json";
import { BRAND_NAME, NAV_CTA_LABEL, PRIMARY_NAV, ROUTES } from "../../constants/navigation";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[40px] py-[22px] text-[#f5f1ea] max-md:px-[22px] max-md:py-[18px]"
        style={open ? undefined : { mixBlendMode: "difference" }}
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
          className="border-b border-current pb-[2px] font-sans text-[13px] font-normal uppercase tracking-eyebrow transition-opacity hover:opacity-70 max-md:hidden"
        >
          {NAV_CTA_LABEL}
        </Link>
        <button
          type="button"
          aria-label={open ? navContent.menu.close : navContent.menu.open}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="hidden h-[28px] w-[32px] items-center justify-center max-md:flex"
        >
          <span className="relative block h-[14px] w-full">
            <span
              className={`absolute left-0 right-0 block h-px bg-current transition-transform duration-300 ease-reveal ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 right-0 block h-px bg-current transition-transform duration-300 ease-reveal ${
                open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 hidden bg-ink text-bg transition-opacity duration-300 ease-reveal max-md:block ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-[22px] pb-[40px] pt-[88px]">
          <ul className="flex flex-col gap-[24px] font-display text-[40px] font-medium uppercase tracking-[0.08em]">
            {PRIMARY_NAV.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="transition-opacity hover:opacity-70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to={ROUTES.contact}
            onClick={() => setOpen(false)}
            className="mt-auto inline-block self-start border-b border-current pb-[2px] font-sans text-[13px] font-normal uppercase tracking-eyebrow transition-opacity hover:opacity-70"
          >
            {NAV_CTA_LABEL}
          </Link>
        </div>
      </div>
    </>
  );
}
