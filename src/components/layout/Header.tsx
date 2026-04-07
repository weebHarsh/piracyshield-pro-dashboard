'use client';

import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui';

export function Header() {
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <header
      className="sticky top-0 z-20 bg-white border-b border-slate-200"
      role="banner"
    >
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 font-heading">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-4">
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
  );
}