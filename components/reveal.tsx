"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
  Watches every [data-reveal] element on the page and adds .is-in the first
  time it enters the viewport. Siblings are staggered automatically unless
  they set their own --d. Content is only hidden while the html element has
  the .js class, so the page reads fine without script.
*/
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
    );
    if (!els.length) return;

    els.forEach((el) => {
      if (el.style.getPropertyValue("--d")) return;
      const parent = el.parentElement;
      if (!parent) return;
      const siblings = Array.from(parent.children).filter((c) =>
        c.hasAttribute("data-reveal")
      );
      el.style.setProperty("--d", String(Math.min(siblings.indexOf(el), 6)));
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
