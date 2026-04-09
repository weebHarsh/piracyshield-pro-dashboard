'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/appStore';
import { Sidebar, Header } from '@/components/layout';
import { ToastProvider } from '@/components/ToastProvider';
import { PageTransition } from '@/lib/animations';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50">
        <a
          href="#main-content"
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-teal-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to main content
        </a>

        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        <div className="md:ml-60">
          <Header onMobileMenuToggle={() => setMobileSidebarOpen(true)} />

          <main
            id="main-content"
            role="main"
            className="p-6"
            tabIndex={-1}
          >
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}