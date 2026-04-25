import type { FrameRatio } from "../../types/gallery.types";
import { clsx } from "../../utils/clsx";

type FrameProps = {
  src: string;
  alt?: string;
  caption?: string;
  ratio?: FrameRatio;
  className?: string;
};

export function Frame({ src, alt = "", caption, ratio = "tall", className }: FrameProps) {
  return (
    <div className={clsx("frame", ratio, className)}>
      <img src={src} alt={alt || caption || ""} loading="lazy" />
      {caption && <span className="caption">{caption}</span>}
    </div>
  );
}
