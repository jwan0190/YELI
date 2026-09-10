import navContent from "../assets/strings/nav.json";

export type NavLink = {
  label: string;
  href: string;
};

const PORTFOLIO_PATH = "/portfolio";

export const ROUTES = {
  home: "/",
  portfolio: PORTFOLIO_PATH,
  studio: "/studio",
  contact: "/contact",
  film: `${PORTFOLIO_PATH}/film`,
  /** Route pattern for data-driven collection galleries. */
  collectionPattern: `${PORTFOLIO_PATH}/:slug`,
  collection: (slug: string) => `${PORTFOLIO_PATH}/${slug}`,
} as const;

export const PRIMARY_NAV: NavLink[] = navContent.primary;

export const FOOTER_NAV: NavLink[] = PRIMARY_NAV;

export const BRAND_NAME: string = navContent.brand;

export const NAV_CTA_LABEL: string = navContent.ctaLabel;
