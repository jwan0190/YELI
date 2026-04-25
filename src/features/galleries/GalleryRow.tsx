import { Frame } from "../../components/ui/Frame";
import { Reveal } from "../../components/ui/Reveal";
import type { GalleryRow as GalleryRowData } from "../../types/gallery.types";
import { clsx } from "../../utils/clsx";

type RevealVariant = "up" | "left" | "right";
type RevealDelay = 0 | 1 | 2;

const ROW_VARIANTS: Array<RevealVariant> = ["left", "up", "right"];
const ROW_DELAYS: Array<RevealDelay> = [0, 1, 2];

type GalleryRowProps = {
  row: GalleryRowData;
  className?: string;
};

export function GalleryRow({ row, className }: GalleryRowProps) {
  return (
    <div className={clsx("row", row.variant, className)}>
      {row.items.map((item, idx) => (
        <Reveal
          key={`${item.src}-${idx}`}
          variant={ROW_VARIANTS[idx] ?? "up"}
          delay={ROW_DELAYS[idx] ?? 0}
        >
          <Frame src={item.src} ratio={item.ratio} caption={item.caption} />
        </Reveal>
      ))}
    </div>
  );
}
