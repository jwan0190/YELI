import { useEffect } from "react";

const SELECTOR = ".reveal";
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -8% 0px",
};

/**
 * Observes `.reveal` elements and toggles `.in` when they scroll into view.
 * Elements added later (e.g. after data has been fetched) are picked up by a
 * MutationObserver, so async pages animate the same way as static ones.
 * Pass a `key` (e.g. route key) so the observers re-bind on navigation.
 */
export function useReveal(key?: string) {
  useEffect(() => {
    const intersection = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          intersection.unobserve(entry.target);
        }
      });
    }, OBSERVER_OPTIONS);

    const observeWithin = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => intersection.observe(el));
    };

    const observeAdded = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches(SELECTOR)) intersection.observe(node);
      observeWithin(node);
    };

    observeWithin(document);

    const mutation = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(observeAdded));
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutation.disconnect();
      intersection.disconnect();
    };
  }, [key]);
}
