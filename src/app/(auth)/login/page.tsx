'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = login(email, password);
    
    if (success) {
      router.push('/overview');
    } else {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-teal-100 px-4 sm:px-6 lg:px-8">
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-teal-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to main content
      </a>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-8">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-700 to-teal-500 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-slate-900 font-heading mb-2">
                PiracyShield Pro
              </h1>
              <p className="text-slate-600">
                Sign in to access your dashboard
              </p>
            </div>

            <main id="main-content">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <fieldset className="space-y-6">
                  <legend className="sr-only">Login credentials</legend>
                  
                  <Input
                    type="email"
                    label="Email address"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    aria-describedby={error ? 'error-message' : undefined}
                    placeholder="Enter your email"
                    error={error ? ' ' : undefined}
                  />

                  <Input
                    type="password"
                    label="Password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    aria-describedby={error ? 'error-message' : undefined}
                    placeholder="Enter your password"
                    error={error ? ' ' : undefined}
                  />

                  {error && (
                    <div
                      id="error-message"
                      role="alert"
                      aria-live="polite"
                      className="bg-red-50 border border-red-200 rounded-lg p-3"
                    >
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    isLoading={isLoading}
                    aria-label={isLoading ? 'Signing in...' : 'Sign in'}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </fieldset>
              </form>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-700 mb-1 font-medium">
                  Demo credentials:
                </p>
                <p className="text-xs text-slate-600">
                  Email: <code className="bg-slate-200 text-slate-900 px-1 rounded font-mono">admin@piracyshield.com</code>
                </p>
                <p className="text-xs text-slate-600">
                  Password: <code className="bg-slate-200 text-slate-900 px-1 rounded font-mono">demo123</code>
                </p>
              </div>
            </main>
          </div>
        </div>
      </motion.div>
    </div>
  );
}