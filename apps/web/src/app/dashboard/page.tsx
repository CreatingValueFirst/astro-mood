import type { Metadata } from 'next';
import { DashboardClient } from '@/components/DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your daily astrological transits, energy levels, and personalized cosmic insights. Discover how planetary movements affect your mood and energy today.',
  keywords: ['daily horoscope', 'transits', 'planetary transits', 'daily astrology', 'cosmic energy', 'astrological insights'],
  openGraph: {
    title: 'Your Dashboard | AstroMood',
    description: 'View your daily transits and personalized cosmic insights',
    url: '/dashboard',
  },
  twitter: {
    title: 'Dashboard | AstroMood',
    description: 'Your daily astrological insights and transits',
  },
  robots: {
    index: false, // Don't index personal dashboards
    follow: true,
  },
};

export default async function DashboardPage() {
  // AUTHENTICATION DISABLED - Using mock data for public demo
  const mockProfile = {
    name: 'Demo User',
    birth_date: '1990-06-15', // Gemini sun sign
  };

  const mockEmail = 'demo@astromood.app';

  const handleSignOut = async () => {
    'use server';
    // No-op for public demo
  };

  return (
    <DashboardClient
      profile={mockProfile}
      userEmail={mockEmail}
      onSignOut={handleSignOut}
    />
  );
}
