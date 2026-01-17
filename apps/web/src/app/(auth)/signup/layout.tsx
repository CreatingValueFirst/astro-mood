import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your free AstroMood account and start exploring personalized astrological insights based on your natal chart and daily planetary transits.",
  openGraph: {
    title: "Create Your AstroMood Account",
    description: "Start your cosmic journey with personalized astrological insights and daily forecasts",
    url: "/signup",
  },
  twitter: {
    title: "Join AstroMood",
    description: "Create your free account and discover personalized astrological insights",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
