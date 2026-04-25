import { Link, type To } from "react-router-dom";

type BackLinkProps = {
  to: To;
  children: React.ReactNode;
};

export function BackLink({ to, children }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="mb-[30px] inline-flex items-center gap-[10px] font-sans text-[11px] uppercase tracking-meta text-ink-soft transition-colors hover:text-ink"
    >
      {children}
    </Link>
  );
}
