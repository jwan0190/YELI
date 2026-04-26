import nav from "../components/assets/strings/nav.json";
import home from "../components/assets/strings/home.json";
import portfolio from "../components/assets/strings/portfolio.json";
import studio from "../components/assets/strings/studio.json";
import contact from "../components/assets/strings/contact.json";
import galleries from "../components/assets/strings/galleries.json";
import film from "../components/assets/strings/film.json";

export const content = {
  nav,
  home,
  portfolio,
  studio,
  contact,
  galleries,
  film,
} as const;

export type Content = typeof content;

export function useContent(): Content {
  return content;
}
