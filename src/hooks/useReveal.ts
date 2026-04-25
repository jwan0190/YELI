import { useEffect } from "react";

const SELECTOR = ".reveal";
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -8% 0px",
};

/**
 * Observes `.reveal` elements and toggles `.in` when they scroll into view.
 * Pass a `key` (e.g. route pathname) so the observer re-binds whenever
 * the page content changes.
 */
export function useReveal(key?: string) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(SELECTOR);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, OBSERVER_OPTIONS);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);
}
