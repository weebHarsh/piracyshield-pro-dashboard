'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { TabId } from '@/types';
import { useAppStore } from '@/stores/appStore';

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'incidents',
    label: 'Incidents',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    id: 'takedowns',
    label: 'Takedowns',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    id: 'content',
    label: 'Content',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 'configuration',
    label: 'Configuration',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.056 1.676-1.056 2.102 0l1.711 4.146 4.333.379c1.119.098 1.574 1.476.805 2.212l-3.268 3.053.983 4.192c.265 1.128-.944 1.998-1.933 1.462l-3.853-2.116-3.853 2.116c-.989.536-2.198-.334-1.933-1.462l.983-4.192-3.268-3.053c-.769-.736-.314-2.114.805-2.212l4.333-.379 1.711-4.146z" />
      </svg>
    ),
  },
  {
    id: 'users',
    label: 'Users',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

interface NavigationProps {
  onItemClick?: () => void;
}

export function Navigation({ onItemClick }: NavigationProps = {}) {
  const pathname = usePathname();
  const currentTab = useAppStore((state) => state.currentTab);
  const setCurrentTab = useAppStore((state) => state.setCurrentTab);

  const routeMap: Record<TabId, string> = {
    dashboard: '/overview',
    incidents: '/incidents',
    takedowns: '/takedowns',
    content: '/content',
    configuration: '/configuration',
    users: '/users',
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="flex flex-col h-full"
    >
      <div className="flex-1 px-3 py-4 space-y-1">
        {navigationItems.map((item) => {
          const isActive = currentTab === item.id;
          
          return (
            <Link
              key={item.id}
              href={routeMap[item.id]}
              onClick={() => { setCurrentTab(item.id); onItemClick?.(); }}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-lg
                font-medium text-sm transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2
                ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                }
              `}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-600'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 w-1 h-8 bg-teal-500 rounded-r"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}