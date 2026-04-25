import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { clsx } from "../../utils/clsx";

type Variant = "up" | "left" | "right";
type Delay = 0 | 1 | 2 | 3;

type RevealProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  delay?: Delay;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

const VARIANT_CLASS: Record<Variant, string> = {
  up: "",
  left: "slide-l",
  right: "slide-r",
};

const DELAY_CLASS: Record<Delay, string> = {
  0: "",
  1: "delay-1",
  2: "delay-2",
  3: "delay-3",
};

export function Reveal<T extends ElementType = "div">({
  as,
  variant = "up",
  delay = 0,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={clsx("reveal", VARIANT_CLASS[variant], DELAY_CLASS[delay], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
