import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { clsx } from "../../utils/clsx";

type Variant = "primary" | "ghost";

const BASE_CLASSES =
  "group inline-flex items-center gap-[14px] border px-[28px] py-[16px] font-sans text-[11px] uppercase tracking-meta transition-[background-color,color,padding] duration-300";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "border-ink bg-ink text-bg hover:bg-transparent hover:text-ink hover:pr-[36px]",
  ghost: "border-ink bg-transparent text-ink hover:bg-ink hover:text-bg hover:pr-[36px]",
};

function Arrow() {
  return (
    <span
      aria-hidden
      className="inline-block transition-transform duration-300 group-hover:translate-x-[6px]"
    >
      →
    </span>
  );
}

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & Omit<LinkProps, "className" | "children">;

export const Button = forwardRef<HTMLAnchorElement, ButtonAsLink>(function Button(
  { variant = "primary", className, children, ...rest },
  ref,
) {
  return (
    <Link ref={ref} className={clsx(BASE_CLASSES, VARIANT_CLASSES[variant], className)} {...rest}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
});

type ExternalButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonAnchor({
  variant = "primary",
  className,
  children,
  ...rest
}: ExternalButtonProps) {
  return (
    <a className={clsx(BASE_CLASSES, VARIANT_CLASSES[variant], className)} {...rest}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}
