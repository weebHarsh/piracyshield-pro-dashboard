'use client';

import { motion } from 'framer-motion';
import type { KPIData } from '@/types';

interface KPICardProps {
  data: KPIData;
  index: number;
}

const iconMap: Record<string, React.ReactNode> = {
  shield: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  takedown: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ),
  success: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  money: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const variantColors = {
  primary: 'from-teal-700 to-teal-500',
  warning: 'from-amber-600 to-amber-400',
  danger: 'from-red-600 to-red-400',
  success: 'from-emerald-600 to-emerald-400',
};

const trendIcons = {
  up: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  down: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V2" />
    </svg>
  ),
  neutral: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  ),
};

export function KPICard({ data, index }: KPICardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-lg hover:border-teal-200 transition-all duration-200"
      role="article"
      aria-label={`${data.title}: ${data.value}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-600 mb-1" id={`kpi-title-${index}`}>
            {data.title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-900" aria-labelledby={`kpi-title-${index}`}>
              {typeof data.value === 'number' && data.value >= 1000
                ? `${(data.value / 1000).toFixed(1)}k`
                : data.value}
            </h3>
            <div
              className={`flex items-center gap-1 text-sm ${
                data.trend === 'up'
                  ? 'text-emerald-600'
                  : data.trend === 'down'
                  ? 'text-red-600'
                  : 'text-slate-500'
              }`}
              aria-label={`${data.trend === 'up' ? 'increased' : data.trend === 'down' ? 'decreased' : 'no change'} by ${data.change}`}
            >
              {trendIcons[data.trend]}
              <span>{data.change}</span>
            </div>
          </div>
        </div>
        <div
          className={`w-12 h-12 bg-gradient-to-br ${variantColors[data.variant]} rounded-xl flex items-center justify-center text-white shadow-md`}
          aria-hidden="true"
        >
          {iconMap[data.icon] || iconMap.shield}
        </div>
      </div>
    </motion.article>
  );
}