import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rotaract Club NIET — Lead. Serve. Inspire.",
  description:
    "Rotaract Club NIET empowers students through leadership, community service, innovation, and lifelong friendships. Part of Rotary International District 3012.",
  keywords: ["Rotaract", "Rotaract Club NIET", "Rotary", "NIET", "community service", "student leadership"],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Rotaract Club NIET — Lead. Serve. Inspire.",
    description:
      "A student-led network for leadership, professional development, fellowship, and community service at NIET.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} grain antialiased bg-[var(--color-bg)]`}>
        <SmoothScrollProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
