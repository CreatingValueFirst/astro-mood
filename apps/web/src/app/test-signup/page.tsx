'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function TestSignupPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('TestPassword123');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testSignup = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      console.log('🔍 Environment check:');
      console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...');

      const supabase = createClient();
      console.log('✅ Supabase client created');

      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        console.error('❌ Signup error:', signupError);
        setError({
          message: signupError.message,
          status: signupError.status,
          code: (signupError as any).code,
          details: JSON.stringify(signupError, null, 2),
        });
      } else {
        console.log('✅ Signup success:', data);
        setResult({
          userId: data.user?.id,
          email: data.user?.email,
          session: data.session ? 'Present' : 'None',
          confirmed: data.user?.email_confirmed_at ? 'Yes' : 'No',
        });
      }
    } catch (err: any) {
      console.error('❌ Unexpected error:', err);
      setError({
        message: err.message,
        stack: err.stack,
        details: JSON.stringify(err, null, 2),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Signup Test Page</h1>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <button
            onClick={testSignup}
            disabled={loading}
            className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded font-bold disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Signup'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Environment Variables:</h2>
            <pre className="text-sm text-green-400">
              URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || '❌ UNDEFINED'}
              {'\n'}
              Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 50) + '...'
                : '❌ UNDEFINED'}
            </pre>
          </div>

          {result && (
            <div className="bg-green-900 border border-green-500 p-4 rounded">
              <h2 className="text-xl font-bold mb-2">✅ Success!</h2>
              <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          {error && (
            <div className="bg-red-900 border border-red-500 p-4 rounded">
              <h2 className="text-xl font-bold mb-2">❌ Error</h2>
              <div className="space-y-2">
                <div>
                  <strong>Message:</strong> {error.message}
                </div>
                {error.status && (
                  <div>
                    <strong>Status:</strong> {error.status}
                  </div>
                )}
                {error.code && (
                  <div>
                    <strong>Code:</strong> {error.code}
                  </div>
                )}
                <details className="mt-4">
                  <summary className="cursor-pointer">Full Details</summary>
                  <pre className="text-xs mt-2 overflow-auto">{error.details}</pre>
                </details>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-gray-800 rounded">
          <h2 className="font-bold mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Open browser console (F12)</li>
            <li>Click "Test Signup" button</li>
            <li>Check the result above</li>
            <li>Check console for detailed logs</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
