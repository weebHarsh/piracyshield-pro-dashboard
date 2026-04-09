'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/appStore';

interface SearchResult {
  id: string;
  type: 'incident' | 'takedown' | 'page';
  title: string;
  subtitle: string;
  href: string;
}

const STATIC_PAGES: SearchResult[] = [
  { id: 'p-overview', type: 'page', title: 'Overview', subtitle: 'Dashboard overview', href: '/dashboard' },
  { id: 'p-incidents', type: 'page', title: 'Incidents', subtitle: 'Manage piracy incidents', href: '/incidents' },
  { id: 'p-takedowns', type: 'page', title: 'Takedowns', subtitle: 'Track takedown requests', href: '/takedowns' },
  { id: 'p-content', type: 'page', title: 'Content', subtitle: 'Manage protected content', href: '/content' },
  { id: 'p-config', type: 'page', title: 'Configuration', subtitle: 'Settings and preferences', href: '/configuration' },
  { id: 'p-users', type: 'page', title: 'Users', subtitle: 'Manage team members', href: '/users' },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeColors: Record<string, string> = {
  incident: 'bg-red-100 text-red-700',
  takedown: 'bg-amber-100 text-amber-700',
  page: 'bg-teal-100 text-teal-700',
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const incidents = useAppStore((state) => state.data.incidents);
  const takedowns = useAppStore((state) => state.data.takedowns);

  const results: SearchResult[] = query.trim()
    ? [
        ...STATIC_PAGES.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        ),
        ...incidents
          .filter(
            (i) =>
              i.title.toLowerCase().includes(query.toLowerCase()) ||
              i.platform.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5)
          .map((i) => ({
            id: `i-${i.id}`,
            type: 'incident' as const,
            title: i.title,
            subtitle: `${i.platform} · ${i.status}`,
            href: '/incidents',
          })),
        ...takedowns
          .filter((t) =>
            (t as any).title?.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 3)
          .map((t) => ({
            id: `t-${(t as any).id}`,
            type: 'takedown' as const,
            title: (t as any).title ?? 'Takedown',
            subtitle: (t as any).status ?? '',
            href: '/takedowns',
          })),
      ]
    : STATIC_PAGES;

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      router.push(result.href);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) handleSelect(results[activeIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
              <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search incidents, takedowns, pages..."
                className="flex-1 text-slate-900 placeholder-slate-400 focus:outline-none text-sm"
                aria-label="Search"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-autocomplete="list"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-slate-500 border border-slate-200 rounded">
                Esc
              </kbd>
            </div>

            <ul
              className="max-h-80 overflow-y-auto py-2"
              role="listbox"
              aria-label="Search results"
            >
              {results.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-slate-500">
                  No results for &ldquo;{query}&rdquo;
                </li>
              ) : (
                results.map((result, index) => (
                  <li
                    key={result.id}
                    role="option"
                    aria-selected={index === activeIndex}
                    onClick={() => handleSelect(result)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                      index === activeIndex ? 'bg-teal-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full shrink-0 ${typeColors[result.type]}`}>
                      {result.type}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{result.title}</p>
                      <p className="text-xs text-slate-500 truncate">{result.subtitle}</p>
                    </div>
                    {index === activeIndex && (
                      <kbd className="hidden sm:inline text-xs text-slate-400">↵</kbd>
                    )}
                  </li>
                ))
              )}
            </ul>

            <div className="px-4 py-2 border-t border-slate-100 flex gap-4 text-xs text-slate-400">
              <span><kbd className="font-mono">↑↓</kbd> navigate</span>
              <span><kbd className="font-mono">↵</kbd> select</span>
              <span><kbd className="font-mono">Esc</kbd> close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
