import type { ReactNode } from "react";
import { clsx } from "../../utils/clsx";

type StatusNoticeProps = {
  message: string;
  /** Marks an error so assistive tech announces it. */
  isError?: boolean;
  action?: ReactNode;
  className?: string;
};

/** Centered inline notice for loading / error / empty states. */
export function StatusNotice({ message, isError, action, className }: StatusNoticeProps) {
  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={clsx("py-[80px] text-center", className)}
    >
      <p className="font-sans text-[11px] uppercase tracking-meta text-ink-soft">{message}</p>
      {action && <div className="mt-[28px] flex justify-center">{action}</div>}
    </div>
  );
}

type RetryButtonProps = {
  label: string;
  onClick: () => void;
};

export function RetryButton({ label, onClick }: RetryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-ink px-[28px] py-[16px] font-sans text-[11px] uppercase tracking-meta text-ink transition-colors duration-300 hover:bg-ink hover:text-bg"
    >
      {label}
    </button>
  );
}
