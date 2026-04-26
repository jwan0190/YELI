import navContent from "../assets/strings/nav.json";

export type NavLink = {
  label: string;
  href: string;
};

export const ROUTES = {
  home: "/",
  portfolio: "/portfolio",
  studio: "/studio",
  contact: "/contact",
  galleries: {
    weddings: "/portfolio/weddings",
    events: "/portfolio/events",
    elopements: "/portfolio/elopements",
    portraits: "/portfolio/portraits",
    film: "/portfolio/film",
  },
} as const;

export const PRIMARY_NAV: NavLink[] = navContent.primary;

export const FOOTER_NAV: NavLink[] = PRIMARY_NAV;

export const BRAND_NAME: string = navContent.brand;

export const NAV_CTA_LABEL: string = navContent.ctaLabel;
