import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AstroMood - Your Cosmic Mood Companion",
  description: "Discover personalized monthly mood forecasts powered by real astronomical calculations. Understand how planetary transits influence your energy, focus, and emotions.",
  keywords: ["astrology", "mood forecast", "planetary transits", "horoscope", "astronomy"],
  authors: [{ name: "AstroMood" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a0b2e" },
    { media: "(prefers-color-scheme: light)", color: "#7c3aed" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AstroMood",
  },
  openGraph: {
    title: "AstroMood - Your Cosmic Mood Companion",
    description: "Personalized mood forecasts based on real astronomical data",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
