import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SiteFooter } from "../components/shared/SiteFooter";
import { SiteNav } from "../components/shared/SiteNav";
import { useReveal } from "../hooks/useReveal";

export function SiteLayout() {
  const { pathname, key } = useLocation();
  useReveal(key);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <>
      <SiteNav />
      <main key={key}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
