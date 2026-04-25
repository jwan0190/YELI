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

export const PRIMARY_NAV: NavLink[] = [
  { label: "Portfolio", href: ROUTES.portfolio },
  { label: "Studio", href: ROUTES.studio },
  { label: "Contact", href: ROUTES.contact },
];

export const FOOTER_NAV: NavLink[] = PRIMARY_NAV;

export const BRAND_NAME = "YELI";
