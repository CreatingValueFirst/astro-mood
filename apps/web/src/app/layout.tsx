import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SkipLink } from "@/components/SkipLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a0b2e" },
    { media: "(prefers-color-scheme: light)", color: "#7c3aed" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://astro-mood-wheat.vercel.app"),
  title: {
    default: "AstroMood - Your Cosmic Mood Companion",
    template: "%s | AstroMood",
  },
  description: "Discover personalized monthly mood forecasts powered by real astronomical calculations. Understand how planetary transits influence your energy, focus, and emotions.",
  keywords: ["astrology", "mood forecast", "planetary transits", "horoscope", "astronomy", "natal chart", "birth chart", "zodiac", "daily horoscope", "astrology app"],
  authors: [{ name: "AstroMood" }],
  creator: "AstroMood",
  publisher: "AstroMood",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AstroMood",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://astro-mood-wheat.vercel.app",
    siteName: "AstroMood",
    title: "AstroMood - Your Cosmic Mood Companion",
    description: "Discover personalized monthly mood forecasts powered by real astronomical calculations. Track planetary transits and understand their influence on your energy and emotions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AstroMood - Your Cosmic Mood Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroMood - Your Cosmic Mood Companion",
    description: "Personalized mood forecasts based on real astronomical data. Track planetary transits and natal charts.",
    images: ["/og-image.png"],
    creator: "@astromood",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
