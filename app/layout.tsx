import type { Metadata } from 'next';
import { Schibsted_Grotesk } from "next/font/google";
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

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
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
      <body className="min-h-full">
        <Nav />
        <main className="relative z-[1] bg-bg">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
