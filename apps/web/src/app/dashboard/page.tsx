import { DashboardClient } from '@/components/DashboardClient';

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
