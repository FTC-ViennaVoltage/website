import Link from "next/link";

const pages = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/seasons", label: "Seasons" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/donate", label: "Donate" },
  { href: "/get-involved", label: "Get Involved" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-navy-ink min-h-[100svh] grid grid-rows-[auto_1fr_auto] wrap pt-10 pb-5">
      <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
        <div className="lg:col-span-3">
          <p className="font-semibold">Vienna Voltage</p>
          <p className="text-navy-soft">FIRST Tech Challenge Team 27427</p>
          <p className="text-navy-soft">Vienna &amp; McLean, Virginia</p>
        </div>
        <div className="lg:col-span-3">
          <p className="font-semibold">Pages</p>
          <ul className="text-navy-soft">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="hover:text-yellow transition-colors">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="font-semibold">Write to us</p>
          <a
            href="mailto:ftcviennavoltage@gmail.com"
            className="text-navy-soft hover:text-yellow transition-colors [overflow-wrap:anywhere]"
          >
            ftcviennavoltage@gmail.com
          </a>
        </div>
        <div className="lg:col-span-3">
          <p className="font-semibold">Follow along</p>
          <a
            href="https://instagram.com/viennavoltagerobotics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-soft hover:text-yellow transition-colors [overflow-wrap:anywhere]"
          >
            Instagram, @viennavoltagerobotics
          </a>
        </div>
      </div>

      <div />

      <div>
        <p aria-hidden className="whitespace-nowrap select-none">
          <span className="hidden md:block font-extrabold tracking-[-0.06em] leading-[0.8] text-[13.4vw]">Vienna Voltage</span>
          <span className="md:hidden block font-extrabold tracking-[-0.06em] leading-[0.82] text-[27vw]">Vienna</span>
          <span className="md:hidden block font-extrabold tracking-[-0.06em] leading-[0.82] text-[27vw]">Voltage</span>
        </p>
        <p className="t-small text-navy-soft mt-5">
          © 2026 Vienna Voltage · FTC Team 27427
        </p>
      </div>
    </footer>
  );
}
