import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-head",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "THEUNOiA — Independence starts here",
  description:
    "Bharat's student-first freelance ecosystem. Where beautiful thinking meets real opportunity — before graduation, not after.",
  keywords: [
    "THEUNOiA",
    "student freelancing",
    "Hunhar",
    "India",
    "Bharat",
    "mentorship",
    "freelance platform",
  ],
  openGraph: {
    title: "THEUNOiA — Independence starts here",
    description:
      "Bharat's student-first freelance ecosystem. Where beautiful thinking meets real opportunity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body className="font-body">
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
