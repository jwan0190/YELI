import { ROUTES } from "../../constants/navigation";
import type { CollectionRowProps } from "./CollectionRow";

export const COLLECTIONS: ReadonlyArray<Omit<CollectionRowProps, "reverse">> = [
  {
    number: "№ 01",
    frameCount: "42 frames",
    cover:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=80&auto=format&fit=crop",
    alt: "Weddings",
    eyebrow: "Collection 01",
    title: (
      <>
        Wedding <em>days</em>
      </>
    ),
    description:
      "Twelve weddings from this season — Provence, Como, Kyoto, Mallorca. Documented slowly, with film and patience.",
    ctaLabel: "View weddings",
    href: ROUTES.galleries.weddings,
  },
  {
    number: "№ 02",
    frameCount: "28 frames",
    cover:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1600&q=80&auto=format&fit=crop",
    alt: "Events",
    eyebrow: "Collection 02",
    title: (
      <>
        Editorial <em>events</em>
      </>
    ),
    description:
      "Brand dinners, gallery openings, private salons. Eight stories from rooms briefly occupied.",
    ctaLabel: "View events",
    href: ROUTES.galleries.events,
  },
  {
    number: "№ 03",
    frameCount: "19 frames",
    cover:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80&auto=format&fit=crop",
    alt: "Elopements",
    eyebrow: "Collection 03",
    title: (
      <>
        Quiet <em>elopements</em>
      </>
    ),
    description:
      "Twelve guests or fewer. Anywhere on the map — the smaller the room, the closer the photograph.",
    ctaLabel: "View elopements",
    href: ROUTES.galleries.elopements,
  },
  {
    number: "№ 04",
    frameCount: "24 frames",
    cover:
      "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=1600&q=80&auto=format&fit=crop",
    alt: "Portraits",
    eyebrow: "Collection 04",
    title: (
      <>
        Bridal <em>portraits</em>
      </>
    ),
    description:
      "The hour before the door opens. Studio sittings and on-location portraits before the day begins.",
    ctaLabel: "View portraits",
    href: ROUTES.galleries.portraits,
  },
  {
    number: "№ 05",
    frameCount: "16mm · 6 reels",
    cover:
      "https://images.unsplash.com/photo-1525772764200-be829a350797?w=1600&q=80&auto=format&fit=crop",
    alt: "Film & Cinema",
    eyebrow: "Collection 05",
    title: (
      <>
        Film <em>&amp; cinema</em>
      </>
    ),
    description:
      "Super-8 and 16mm transfers — six-minute story films, scored, hand-edited from a season's footage.",
    ctaLabel: "View films",
    href: ROUTES.galleries.film,
  },
];
