import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your AstroMood account to access your personalized astrological insights, daily transits, and natal chart.",
  openGraph: {
    title: "Sign In to AstroMood",
    description: "Access your personalized astrological insights and daily cosmic forecasts",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
