import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Your Profile",
  description: "Tell us about yourself to generate your personalized natal chart and cosmic forecasts. Enter your birth date and location for accurate astrological insights.",
  openGraph: {
    title: "Complete Your AstroMood Profile",
    description: "Set up your birth profile for personalized astrological insights",
    url: "/onboarding",
  },
  twitter: {
    title: "Complete Your Profile | AstroMood",
    description: "Set up your birth profile for personalized insights",
  },
  robots: {
    index: false, // Don't index onboarding page
    follow: true,
  },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
