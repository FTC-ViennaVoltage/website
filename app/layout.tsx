import type { Metadata } from 'next';
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  applicationName: 'Vienna Voltage | FTC 27427',
  title: 'Vienna Voltage | FTC 27427'
};

const space = Space_Grotesk({
  variable: "--font-space-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${space.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
