import type { FrameRatio } from "../../types/gallery.types";
import { clsx } from "../../utils/clsx";
import { displayImageUrl } from "../../utils/imageSource";

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
      <img
        src={displayImageUrl(src)}
        alt={alt || caption || ""}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
      {caption && <span className="caption">{caption}</span>}
    </div>
  );
}
