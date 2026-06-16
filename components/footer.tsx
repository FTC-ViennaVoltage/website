import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/seasons", label: "Seasons" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/donate", label: "Donate" },
  { href: "/get-involved", label: "Get Involved" },
];

export default function Footer() {
  return (
    <footer className="bg-voltage-bg">
      <div className="text-lg font-bold flex items-center gap-2 justify-center pt-8 pb-4 border-t border-[rgba(59,130,246,.18)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round"/></svg>
        Vienna Voltage
      </div>
      <div className="flex gap-6 justify-center mb-6 flex-wrap">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-blue-500 transition duration-200 text-muted text-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <p className="text-muted text-sm flex justify-center pb-8">© 2026 Vienna Voltage · FTC Team 27427 · ftcviennavoltage@gmail.com</p>
    </footer>
  )
}
