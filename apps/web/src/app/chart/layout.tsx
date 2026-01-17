import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Natal Chart",
  description: "Explore your complete natal chart with planetary positions, aspects, houses, and detailed astrological interpretations based on your birth data.",
  keywords: ["natal chart", "birth chart", "astrology chart", "planetary positions", "astrological aspects", "houses", "zodiac signs"],
  openGraph: {
    title: "Your Natal Chart | AstroMood",
    description: "Explore your complete natal chart with planetary positions and aspects",
    url: "/chart",
  },
  twitter: {
    title: "Your Natal Chart | AstroMood",
    description: "View your personalized natal chart and planetary positions",
  },
  robots: {
    index: false, // Don't index personal charts
    follow: true,
  },
};

export default function ChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
