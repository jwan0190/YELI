import type { Orientation, OrientationMap } from "../../hooks/useImageOrientations";
import type { FrameRatio, GalleryItem, GalleryRow } from "../../types/gallery.types";
import type { PortfolioFrame } from "../../types/portfolio.types";

const PORTRAIT_RATIOS: ReadonlySet<FrameRatio> = new Set(["tall", "portrait"]);

const orientationOfRatio = (ratio: FrameRatio): Orientation =>
  PORTRAIT_RATIOS.has(ratio) ? "portrait" : "landscape";

type RunKind = Orientation | "mixed";
type Run = { kind: RunKind; items: GalleryItem[] };

/** Groups consecutive frames that share an orientation. */
function toRuns(frames: PortfolioFrame[], orientations: OrientationMap): Run[] {
  const runs: Run[] = [];
  for (const frame of frames) {
    const orientation = frame.ratio
      ? orientationOfRatio(frame.ratio)
      : (orientations[frame.src] ?? "landscape");
    const defaultRatio: FrameRatio = orientation === "portrait" ? "tall" : "wide";
    const item: GalleryItem = { src: frame.src, ratio: frame.ratio ?? defaultRatio, caption: frame.caption };

    const last = runs[runs.length - 1];
    if (last && last.kind === orientation) {
      last.items.push(item);
    } else {
      runs.push({ kind: orientation, items: [item] });
    }
  }
  return runs;
}

/**
 * A portrait on its own would sit in one third of a row. Pair it with a
 * landscape borrowed from the neighbouring run instead (landscape first, so it
 * takes the wider column of the asymmetric row).
 */
function pairLonePortraits(runs: Run[]): Run[] {
  runs.forEach((run, idx) => {
    if (run.kind !== "portrait" || run.items.length !== 1) return;

    const next = runs[idx + 1];
    const previous = runs[idx - 1];
    const donor =
      next?.kind === "landscape" ? next : previous?.kind === "landscape" ? previous : undefined;
    if (!donor) return;

    const landscape = donor === next ? donor.items.shift() : donor.items.pop();
    if (!landscape) return;
    run.kind = "mixed";
    run.items = [landscape, run.items[0]];
  });
  return runs.filter((run) => run.items.length > 0);
}

/** Portraits: threes, with a trailing four split into two pairs so nothing sits alone. */
function layoutPortraits(items: GalleryItem[]): GalleryRow[] {
  const rows: GalleryRow[] = [];
  let rest = items;
  while (rest.length > 0) {
    const take = rest.length === 4 || rest.length === 2 ? 2 : Math.min(3, rest.length);
    rows.push({ variant: take === 2 || take === 1 ? "r-2" : "r-3", items: rest.slice(0, take) });
    rest = rest.slice(take);
  }
  return rows;
}

const withRatio = (item: GalleryItem, ratio: FrameRatio): GalleryItem =>
  item.ratio === ratio ? item : { ...item, ratio };

/** Landscapes: an odd run opens full-width, then pairs alternate even and asymmetric. */
function layoutLandscapes(items: GalleryItem[]): GalleryRow[] {
  const rows: GalleryRow[] = [];
  let rest = items;
  if (rest.length % 2 === 1) {
    rows.push({ variant: "r-1", items: [withRatio(rest[0], "cinema")] });
    rest = rest.slice(1);
  }
  rest.forEach((item, idx) => {
    if (idx % 2 === 0) {
      rows.push({ variant: rows.length % 2 === 0 ? "r-2" : "r-asym-a", items: [item] });
    } else {
      rows[rows.length - 1].items.push(item);
    }
  });
  return rows;
}

function layoutRun(run: Run): GalleryRow[] {
  switch (run.kind) {
    case "portrait":
      return layoutPortraits(run.items);
    case "landscape":
      return layoutLandscapes(run.items);
    case "mixed":
      return [{ variant: "r-asym-a", items: run.items }];
  }
}

/**
 * Turns an ordered list of photos into gallery rows, choosing row shapes from
 * each photo's orientation so portraits never get cropped into wide frames.
 */
export function buildGalleryRows(
  frames: PortfolioFrame[],
  orientations: OrientationMap,
): GalleryRow[] {
  return pairLonePortraits(toRuns(frames, orientations)).flatMap(layoutRun);
}
