import { ROUTES } from "../../constants/navigation";
import type { GalleryPageData } from "../../types/gallery.types";

const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const WEDDINGS_GALLERY: GalleryPageData = {
  slug: "weddings",
  banner: "Weddings — YELI",
  collectionLabel: "Collection 01 · 42 frames",
  title: (
    <>
      Wedding <em>days</em>
    </>
  ),
  lede: "Twelve weddings, one season. Provence, Como, Kyoto, Mallorca. Documented on medium-format film and digital, hand-edited by the lead photographer.",
  rows: [
    {
      variant: "r-3",
      items: [
        { src: U("photo-1583939003579-730e3918a45a"), ratio: "tall", caption: "Amélie & Pierre — Provence" },
        { src: U("photo-1465495976277-4387d4b0b4c6"), ratio: "tall", caption: "The Aurelio Wedding — Como" },
        { src: U("photo-1519225421980-715cb0215aed"), ratio: "tall", caption: "Quiet vows — Kyoto" },
      ],
    },
    {
      variant: "r-asym-a",
      items: [
        { src: U("photo-1591604466107-ec97de577aff", 2000), ratio: "wide", caption: "Lawn ceremony — Hudson Valley" },
        { src: U("photo-1511285560929-80b456fea0bc"), ratio: "wide", caption: "Petals — Florence" },
      ],
    },
    {
      variant: "r-3",
      items: [
        { src: U("photo-1524863479829-916d8e77f114"), ratio: "portrait", caption: "The Bride — Loire" },
        { src: U("photo-1525772764200-be829a350797"), ratio: "portrait", caption: "First look — Marrakech" },
        { src: U("photo-1606800052052-a08af7148866"), ratio: "portrait", caption: "The Hour Before — Mallorca" },
      ],
    },
    {
      variant: "r-3",
      items: [
        { src: U("photo-1519671482749-fd09be7ccebf"), ratio: "square", caption: "Held hands" },
        { src: U("photo-1507504031003-b417219a0fde"), ratio: "square", caption: "The toast" },
        { src: U("photo-1530023367847-a683933f4172"), ratio: "square", caption: "The dance" },
      ],
    },
  ],
  next: {
    label: "Next collection",
    title: (
      <>
        Editorial <em>events</em>
      </>
    ),
    href: ROUTES.galleries.events,
  },
};

export const EVENTS_GALLERY: GalleryPageData = {
  slug: "events",
  banner: "Events — YELI",
  collectionLabel: "Collection 02 · 28 frames",
  title: (
    <>
      Editorial <em>events</em>
    </>
  ),
  lede: "Brand dinners, gallery openings, private salons. The room as it is — laughter, glances, the unhurried hour after.",
  rows: [
    {
      variant: "r-1",
      items: [
        { src: U("photo-1606216794074-735e91aa2c92", 2400), ratio: "cinema", caption: "Long table — Tuscany" },
      ],
    },
    {
      variant: "r-3",
      items: [
        { src: U("photo-1530023367847-a683933f4172"), ratio: "tall", caption: "Salon — Paris" },
        { src: U("photo-1509927083803-4bd519298ac4"), ratio: "tall", caption: "Vernissage — Brussels" },
        { src: U("photo-1532712938310-34cb3982ef74"), ratio: "tall", caption: "Brand dinner — Milan" },
      ],
    },
    {
      variant: "r-asym-a",
      items: [
        { src: U("photo-1507504031003-b417219a0fde"), ratio: "wide", caption: "The toast" },
        { src: U("photo-1525772764200-be829a350797"), ratio: "wide", caption: "After hours" },
      ],
    },
    {
      variant: "r-3",
      items: [
        { src: U("photo-1511285560929-80b456fea0bc"), ratio: "square", caption: "Petals" },
        { src: U("photo-1606800052052-a08af7148866"), ratio: "square", caption: "Quiet corner" },
        { src: U("photo-1519671482749-fd09be7ccebf"), ratio: "square", caption: "Hands" },
      ],
    },
  ],
  next: {
    label: "Next collection",
    title: (
      <>
        Quiet <em>elopements</em>
      </>
    ),
    href: ROUTES.galleries.elopements,
  },
};

export const ELOPEMENTS_GALLERY: GalleryPageData = {
  slug: "elopements",
  banner: "Elopements — YELI",
  collectionLabel: "Collection 03 · 19 frames",
  title: (
    <>
      Quiet <em>elopements</em>
    </>
  ),
  lede: "Twelve guests or fewer — the smaller the room, the closer the photograph.",
  rows: [
    {
      variant: "r-2",
      items: [
        { src: U("photo-1519225421980-715cb0215aed"), ratio: "tall", caption: "Tea-house — Higashiyama" },
        { src: U("photo-1606800052052-a08af7148866"), ratio: "tall", caption: "Cliff vows — Mallorca" },
      ],
    },
    {
      variant: "r-3",
      items: [
        { src: U("photo-1525772764200-be829a350797"), ratio: "portrait", caption: "First look" },
        { src: U("photo-1519671482749-fd09be7ccebf"), ratio: "portrait", caption: "The vow" },
        { src: U("photo-1524863479829-916d8e77f114"), ratio: "portrait", caption: "After" },
      ],
    },
    {
      variant: "r-1",
      items: [
        { src: U("photo-1591604466107-ec97de577aff", 2400), ratio: "cinema", caption: "Garden ceremony — Provence" },
      ],
    },
  ],
  next: {
    label: "Next collection",
    title: (
      <>
        Bridal <em>portraits</em>
      </>
    ),
    href: ROUTES.galleries.portraits,
  },
};

export const PORTRAITS_GALLERY: GalleryPageData = {
  slug: "portraits",
  banner: "Portraits — YELI",
  collectionLabel: "Collection 04 · 24 frames",
  title: (
    <>
      Bridal <em>portraits</em>
    </>
  ),
  lede: "Studio sittings and on-location portraits before the day begins. Available light only.",
  rows: [
    {
      variant: "r-3",
      items: [
        { src: U("photo-1524863479829-916d8e77f114"), ratio: "portrait", caption: "The Bride — Loire" },
        { src: U("photo-1525772764200-be829a350797"), ratio: "portrait", caption: "Veil — Paris" },
        { src: U("photo-1606800052052-a08af7148866"), ratio: "portrait", caption: "The hour before" },
      ],
    },
    {
      variant: "r-asym-a",
      items: [
        { src: U("photo-1465495976277-4387d4b0b4c6"), ratio: "wide", caption: "Studio — Marais" },
        { src: U("photo-1583939003579-730e3918a45a"), ratio: "wide", caption: "Garden — Provence" },
      ],
    },
    {
      variant: "r-3",
      items: [
        { src: U("photo-1519225421980-715cb0215aed"), ratio: "tall", caption: "Quiet" },
        { src: U("photo-1511285560929-80b456fea0bc"), ratio: "tall", caption: "Florals" },
        { src: U("photo-1519671482749-fd09be7ccebf"), ratio: "tall", caption: "Hands" },
      ],
    },
  ],
  next: {
    label: "Next collection",
    title: (
      <>
        Film <em>&amp; cinema</em>
      </>
    ),
    href: ROUTES.galleries.film,
  },
};
