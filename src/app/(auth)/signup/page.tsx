'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button, Input } from '@/components/ui';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Enter a valid email address';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8)
        newErrors.password = 'Password must be at least 8 characters';
    }
    if (step === 2) {
      if (!formData.name) newErrors.name = 'Full name is required';
      if (!formData.company) newErrors.company = 'Company name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push('/login?registered=1');
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
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-700 to-teal-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 font-heading mb-1">Create Account</h1>
              <p className="text-slate-600 text-sm">Step {step} of 2 — {step === 1 ? 'Your credentials' : 'About you'}</p>
              <div className="flex gap-2 mt-3 justify-center">
                <div className={`h-1 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-teal-600' : 'bg-slate-200'}`} />
                <div className={`h-1 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-teal-600' : 'bg-slate-200'}`} />
              </div>
            </div>

            <main id="main-content">
              {step === 1 ? (
                <form onSubmit={handleNext} className="space-y-5" noValidate>
                  <Input
                    type="email"
                    label="Email address"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    error={errors.email}
                  />
                  <Input
                    type="password"
                    label="Password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    autoComplete="new-password"
                    placeholder="Minimum 8 characters"
                    error={errors.password}
                  />
                  <Button type="submit" variant="primary" className="w-full">
                    Continue
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <Input
                    type="text"
                    label="Full name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    error={errors.name}
                  />
                  <Input
                    type="text"
                    label="Company"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    autoComplete="organization"
                    placeholder="Acme Corp"
                    error={errors.company}
                  />
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" variant="primary" isLoading={isLoading} className="flex-1">
                      {isLoading ? 'Creating...' : 'Create Account'}
                    </Button>
                  </div>
                </form>
              )}

              <p className="mt-5 text-center text-sm text-slate-600">
                Already have an account?{' '}
                <Link href="/login" className="text-teal-700 font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </main>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
