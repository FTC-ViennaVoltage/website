import Link from "next/link"

const links = [
  { href: "/#about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/seasons", label: "Seasons" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/donate", label: "Donate" },
];

export default function Nav() {
  return (
    <nav className="fixed w-full z-10 bg-nav-bg backdrop-blur-lg border-b border-solid border-[rgba(59,130,246,.18)]">
      <div className="max-w-7xl flex mx-auto justify-between items-center py-4.5 px-7.5">
        <Link href="/" className="flex items-center gap-2.5 text-xl text-voltage-primary font-bold">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round"/></svg>
          Vienna Voltage
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-blue-500 transition duration-200 text-muted"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/get-involved"
            className="bg-blue-500 py-1.5 px-5.5 font-semibold rounded-md hover:bg-blue-400 transition-all duration-200"
          >
            Get Involved
          </Link>
        </div>
      </div>
    </nav>
  )
}
