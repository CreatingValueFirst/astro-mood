'use client';

import { useEffect, useState } from 'react';

export default function DebugEnvPage() {
  const [envVars, setEnvVars] = useState<any>({});

  useEffect(() => {
    setEnvVars({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NODE_ENV: process.env.NODE_ENV,
    });
  }, []);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="font-bold text-lg mb-2">NEXT_PUBLIC_SUPABASE_URL:</h2>
          <code className="text-green-400 break-all">
            {envVars.NEXT_PUBLIC_SUPABASE_URL || '❌ UNDEFINED'}
          </code>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="font-bold text-lg mb-2">NEXT_PUBLIC_SUPABASE_ANON_KEY:</h2>
          <code className="text-green-400 break-all">
            {envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
              ? envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 50) + '...'
              : '❌ UNDEFINED'}
          </code>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="font-bold text-lg mb-2">NODE_ENV:</h2>
          <code className="text-green-400">{envVars.NODE_ENV || '❌ UNDEFINED'}</code>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Status:</h2>
        {envVars.NEXT_PUBLIC_SUPABASE_URL && envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
          <div className="bg-green-900 p-4 rounded text-green-200">
            ✅ Environment variables are loaded correctly!
          </div>
        ) : (
          <div className="bg-red-900 p-4 rounded text-red-200">
            ❌ Environment variables are NOT loaded! Check your .env.local file.
          </div>
        )}
      </div>
    </div>
  );
}
