import { useMemo } from "react";

import heroImg from "../assets/home/hero.jpg";

import provenceImg from "../assets/weddings/provence.jpg";
import comoImg from "../assets/weddings/como.jpg";
import hudsonValleyImg from "../assets/weddings/hudson-valley.jpg";
import kyotoImg from "../assets/weddings/kyoto.jpg";
import petalsImg from "../assets/weddings/petals.jpg";

import brideImg from "../assets/portraits/bride.jpg";
import firstLookImg from "../assets/portraits/first-look.jpg";
import hourBeforeImg from "../assets/portraits/hour-before.jpg";

import longTableImg from "../assets/events/long-table.jpg";
import vernissageImg from "../assets/events/vernissage.jpg";
import brandDinnerImg from "../assets/events/brand-dinner.jpg";

import vowImg from "../assets/moments/vow.jpg";
import toastImg from "../assets/moments/toast.jpg";
import danceImg from "../assets/moments/dance.jpg";

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
