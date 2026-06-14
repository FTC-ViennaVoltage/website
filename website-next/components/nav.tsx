import Link from "next/link"

export default function Nav() {
  return (
    <nav>
      <div className="max-w-7xl flex mx-auto justify-between items-center py-4.5 px-7.5">
        <Link href="/" className="flex items-center gap-2.5 text-xl text-voltage-primary font-bold">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="#3b82f6" stroke="#3b82f6" stroke-width="1.5" stroke-linejoin="round"/></svg>
          Vienna Voltage
        </Link>
        <div className="hidden lg:flex items-center gap-8 ">
          <Link href="#about">About</Link>
          <Link href="/team">Team</Link>
          <Link href="/seasons">Seasons</Link>
          <Link href="/sponsors">Sponsors</Link>
          <Link href="/donate">Donate</Link>
          <Link href="/get-involved" className="bg-blue-500 px-5 py-1.5 rounded-md hover:bg-blue-400 transition-all duration-200">Get Involved</Link>
        </div>
      </div>
    </nav>
  )
}
