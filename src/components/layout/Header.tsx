'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui';
import { SearchModal } from '@/components/modals/SearchModal';

const routeTitles: Record<string, string> = {
  '/incidents': 'Incidents',
  '/takedowns': 'Takedowns',
  '/content': 'Content',
  '/configuration': 'Configuration',
  '/users': 'Users',
  '/dashboard': 'Dashboard',
  '/overview': 'Overview',
};

export function Header() {
  const pathname = usePathname();
  const currentUser = useAppStore((state) => state.currentUser);
  const pageTitle = routeTitles[pathname] ?? 'Dashboard';
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <header
        className="sticky top-0 z-20 bg-white border-b border-slate-200"
        role="banner"
      >
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 font-heading">
            {pageTitle}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 border border-slate-200 rounded-lg hover:border-teal-300 hover:text-slate-700 transition-colors"
            aria-label="Search (Cmd+K)"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
            <kbd className="text-xs bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>

          <nav aria-label="Quick actions">
            <Button
              variant="ghost"
              size="md"
              aria-label="Notifications"
              className="relative"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-700 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white" aria-hidden="true">
                {currentUser?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{currentUser?.name || 'Admin User'}</p>
              <p className="text-xs text-slate-500">{currentUser?.role || 'Admin'}</p>
            </div>
          </div>
        </div>
      </div>
      </header>
    </>
  );
}