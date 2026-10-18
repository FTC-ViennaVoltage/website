"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/seasons", label: "Seasons" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/donate", label: "Donate" },
];

export function Mark({ size = 28 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center bg-navy shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24">
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="#ffd200" />
      </svg>
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    !href.startsWith("/#") && pathname.startsWith(href);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-bg">
      <nav className="wrap grid12 items-center h-[72px]" aria-label="Main">
        <Link
          href="/"
          className="col-span-8 lg:col-span-5 flex items-center gap-3 font-extrabold text-[1.2rem] tracking-[-0.04em]"
        >
          <Mark />
          Vienna Voltage
        </Link>

        <ul className="hidden lg:flex col-start-6 col-span-5 items-center gap-7 font-semibold">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="py-2 underline-offset-[6px] decoration-2 decoration-transparent hover:decoration-yellow underline transition-[text-decoration-color] duration-200 aria-[current=page]:decoration-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex col-span-2 justify-end">
          <Link href="/get-involved" className="btn !min-h-[44px] !px-5">
            Get involved
          </Link>
        </div>

        <div className="col-span-4 flex justify-end lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="min-h-[44px] px-1 font-semibold text-[1.05rem] link"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-navy text-navy-ink wrap pt-10 pb-10 flex flex-col panel-in"
        >
          <ul className="flex flex-col gap-1">
            {[...links, { href: "/get-involved", label: "Get involved" }].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 t-head hover:text-yellow transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-auto t-small text-navy-soft">
            FTC Team 27427 · ftcviennavoltage@gmail.com
          </p>
        </div>
      )}
    </header>
  );
}
