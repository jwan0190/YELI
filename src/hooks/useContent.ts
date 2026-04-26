import nav from "../assets/strings/nav.json";
import home from "../assets/strings/home.json";
import portfolio from "../assets/strings/portfolio.json";
import studio from "../assets/strings/studio.json";
import contact from "../assets/strings/contact.json";
import galleries from "../assets/strings/galleries.json";
import film from "../assets/strings/film.json";

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
