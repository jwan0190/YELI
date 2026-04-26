import { useMemo } from "react";

import heroImg from "../components/assets/home/hero.jpg";

import provenceImg from "../components/assets/weddings/provence.jpg";
import comoImg from "../components/assets/weddings/como.jpg";
import hudsonValleyImg from "../components/assets/weddings/hudson-valley.jpg";
import kyotoImg from "../components/assets/weddings/kyoto.jpg";
import petalsImg from "../components/assets/weddings/petals.jpg";

import brideImg from "../components/assets/portraits/bride.jpg";
import firstLookImg from "../components/assets/portraits/first-look.jpg";
import hourBeforeImg from "../components/assets/portraits/hour-before.jpg";

import longTableImg from "../components/assets/events/long-table.jpg";
import vernissageImg from "../components/assets/events/vernissage.jpg";
import brandDinnerImg from "../components/assets/events/brand-dinner.jpg";

import vowImg from "../components/assets/moments/vow.jpg";
import toastImg from "../components/assets/moments/toast.jpg";
import danceImg from "../components/assets/moments/dance.jpg";

export type ImageKey =
  | "hero"
  | "provence"
  | "como"
  | "hudsonValley"
  | "kyoto"
  | "petals"
  | "bride"
  | "firstLook"
  | "hourBefore"
  | "longTable"
  | "vernissage"
  | "brandDinner"
  | "vow"
  | "toast"
  | "dance";

const IMAGES: Record<ImageKey, string> = {
  hero: heroImg,
  provence: provenceImg,
  como: comoImg,
  hudsonValley: hudsonValleyImg,
  kyoto: kyotoImg,
  petals: petalsImg,
  bride: brideImg,
  firstLook: firstLookImg,
  hourBefore: hourBeforeImg,
  longTable: longTableImg,
  vernissage: vernissageImg,
  brandDinner: brandDinnerImg,
  vow: vowImg,
  toast: toastImg,
  dance: danceImg,
};

export function useImages() {
  return useMemo(() => IMAGES, []);
}

export function useImage(key: ImageKey): string {
  return IMAGES[key];
}
