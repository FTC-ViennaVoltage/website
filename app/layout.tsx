import type { Metadata } from 'next';
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  applicationName: 'Vienna Voltage | FTC 27427',
  title: 'Vienna Voltage | FTC 27427',
  description:
    'Vienna Voltage is FIRST Tech Challenge team 27427, a student robotics team from Northern Virginia that builds competition robots and teaches younger students to build their own.',
};

/* Bundled in the repo (OFL-1.1, see app/fonts) so building the site
   never depends on reaching Google Fonts. */
const schibsted = localFont({
  src: "./fonts/SchibstedGrotesk-Variable.woff2",
  variable: "--font-schibsted",
  weight: "400 900",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${schibsted.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide reveal-on-scroll content only when script runs */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className={`${schibsted.className} min-h-full`}>
        <Nav />
        <main className="relative z-[1] bg-bg">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
