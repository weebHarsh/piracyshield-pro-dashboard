'use client';

import Link from 'next/link';
import { Navigation } from './Navigation';
import { useAppStore } from '@/stores/appStore';

export function Sidebar() {
  const currentUser = useAppStore((state) => state.currentUser);
  const logout = useAppStore((state) => state.logout);

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-slate-200 flex flex-col z-30"
      role="complementary"
      aria-label="Application sidebar"
    >
      <div className="px-6 py-5 border-b border-slate-200">
        <Link
          href="/overview"
          className="flex items-center gap-3 group"
          aria-label="PiracyShield Pro - Go to dashboard"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-teal-700 to-teal-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <svg
              className="w-6 h-6 text-white"
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
          <div>
            <h1 className="text-lg font-bold text-slate-900 font-heading">PiracyShield</h1>
            <p className="text-xs text-slate-500">Pro Dashboard</p>
          </div>
        </Link>
      </div>

      <Navigation />

      {currentUser && (
        <div className="px-3 py-4 border-t border-slate-200">
          <div className="px-3 py-2 text-xs text-slate-500">
            <p className="mb-1">Logged in as:</p>
            <p className="font-medium text-slate-700 truncate">{currentUser.email}</p>
          </div>
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Sign out of dashboard"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </aside>
  );
}