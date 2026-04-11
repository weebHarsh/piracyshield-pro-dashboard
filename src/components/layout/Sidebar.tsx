'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './Navigation';
import { useAppStore } from '@/stores/appStore';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const currentUser = useAppStore((state) => state.currentUser);
  const logout = useAppStore((state) => state.logout);

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-4 py-4 border-b border-[var(--border)]">
        <Link
          href="/overview"
          className="flex items-center gap-3 group"
          aria-label="PiracyShield Pro — go to overview"
          onClick={onClose}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[var(--brand)] text-[var(--bg)]"
            aria-hidden="true"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <span className="text-sm font-medium text-[var(--text)]">PiracyShield</span>
            <span className="block text-xs text-[var(--text-subtle)]">Pro</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto">
        <Navigation onItemClick={onClose} />
      </div>

      {/* User footer */}
      {currentUser && (
        <div className="px-3 py-3 border-t border-[var(--border)]">
          <div className="px-2 py-1.5 mb-1">
            <p className="text-xs text-[var(--text-subtle)] truncate">{currentUser.email}</p>
          </div>
          <button
            onClick={() => logout()}
            className={[
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm',
              'text-[var(--text-muted)] hover:text-[var(--status-critical)]',
              'hover:bg-[var(--status-critical-bg)]',
              'transition-colors duration-[var(--dur-ui-fast)]',
            ].join(' ')}
            aria-label="Sign out"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 bg-[var(--surface)] border-r border-[var(--border)] flex-col z-30"
        role="complementary"
        aria-label="Application sidebar"
      >
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-[oklch(0_0_0_/_0.5)] z-40 md:hidden"
              onClick={onMobileClose}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed left-0 top-0 bottom-0 w-60 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col z-50 md:hidden"
              role="complementary"
              aria-label="Application sidebar"
            >
              <SidebarContent onClose={onMobileClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
