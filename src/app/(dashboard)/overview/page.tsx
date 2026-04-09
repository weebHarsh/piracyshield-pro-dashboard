'use client';

import { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { KPICard } from '@/components/dashboard/KPICard';
import { LineChart, PieChart, BarChart, DonutChart } from '@/components/charts/Charts';
import type { KPIData } from '@/types';

const kpiData: KPIData[] = [
  {
    title: 'Active Incidents',
    value: 2847,
    change: '+12%',
    trend: 'up',
    variant: 'danger',
    icon: 'shield',
  },
  {
    title: 'Takedowns Issued',
    value: 1284,
    change: '+8%',
    trend: 'up',
    variant: 'warning',
    icon: 'takedown',
  },
  {
    title: 'Success Rate',
    value: 95,
    change: '+2%',
    trend: 'up',
    variant: 'success',
    icon: 'success',
  },
  {
    title: 'Revenue Protected',
    value: 48200,
    change: '+18%',
    trend: 'up',
    variant: 'primary',
    icon: 'money',
  },
];

const recentActivity = [
  { id: 1, action: 'New incident detected', detail: 'Avengers: Endgame CAM rip on Netflix', time: '2m ago', type: 'incident' },
  { id: 2, action: 'Takedown issued', detail: 'Taylor Swift album removed from YouTube', time: '15m ago', type: 'takedown' },
  { id: 3, action: 'Incident resolved', detail: 'Spider-Man: No Way Home on Facebook', time: '1h ago', type: 'resolved' },
  { id: 4, action: 'New incident detected', detail: 'Elden Ring crack on Instagram', time: '2h ago', type: 'incident' },
  { id: 5, action: 'Bulk takedown completed', detail: '12 incidents processed across 3 platforms', time: '3h ago', type: 'bulk' },
];

const activityIconColors: Record<string, string> = {
  incident: 'bg-red-100 text-red-600',
  takedown: 'bg-amber-100 text-amber-600',
  resolved: 'bg-emerald-100 text-emerald-600',
  bulk: 'bg-teal-100 text-teal-600',
};

const STORAGE_KEY = 'piracyshield-kpi-order';

export default function DashboardOverviewPage() {
  const [kpiOrder, setKpiOrder] = useState<KPIData[]>(() => {
    if (typeof window === 'undefined') return kpiData;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedTitles: string[] = JSON.parse(saved);
        const reordered = savedTitles
          .map((title) => kpiData.find((k) => k.title === title))
          .filter(Boolean) as KPIData[];
        return reordered.length === kpiData.length ? reordered : kpiData;
      }
    } catch {}
    return kpiData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(kpiOrder.map((k) => k.title)));
  }, [kpiOrder]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-slate-900 font-heading">Overview</h1>
        <p className="text-slate-600 mt-1">Real-time piracy detection and takedown status</p>
      </motion.div>

      {/* KPI Cards — draggable */}
      <Reorder.Group
        axis="x"
        values={kpiOrder}
        onReorder={setKpiOrder}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        as="div"
      >
        {kpiOrder.map((kpi, index) => (
          <Reorder.Item key={kpi.title} value={kpi} as="div">
            <KPICard data={kpi} index={index} />
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
        >
          <h3 className="text-base font-semibold text-slate-900 mb-4">Detection Trends</h3>
          <LineChart id="overview-line" className="h-64 w-full min-h-[250px]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
        >
          <h3 className="text-base font-semibold text-slate-900 mb-4">Content Distribution</h3>
          <PieChart id="overview-pie" className="h-64 w-full min-h-[250px]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
        >
          <h3 className="text-base font-semibold text-slate-900 mb-4">Top Platforms</h3>
          <BarChart id="overview-bar" className="h-64 w-full min-h-[250px]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
        >
          <h3 className="text-base font-semibold text-slate-900 mb-4">Risk Distribution</h3>
          <DonutChart id="overview-donut" className="h-64 w-full min-h-[250px]" />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
      >
        <h3 className="text-base font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <ul className="space-y-3" role="list" aria-label="Recent activity feed">
          {recentActivity.map((item) => (
            <li key={item.id} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${activityIconColors[item.type]}`}>
                {item.type === 'incident' ? '!' : item.type === 'takedown' ? '↓' : item.type === 'resolved' ? '✓' : '⚡'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{item.action}</p>
                <p className="text-xs text-slate-500 truncate">{item.detail}</p>
              </div>
              <span className="text-xs text-slate-400 shrink-0">{item.time}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
