'use client';

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
    value: '94.7%',
    change: '+2.1%',
    trend: 'up',
    variant: 'success',
    icon: 'success',
  },
  {
    title: 'Revenue Protected',
    value: '$48,214',
    change: '+18.3%',
    trend: 'up',
    variant: 'primary',
    icon: 'money',
  },
];

const recentActivity = [
  { id: 1, action: 'New incident detected', detail: 'Studio Alpha — S02E04 pre-release leak on stream-vault-0412.net', time: '2m ago', type: 'incident' },
  { id: 2, action: 'Takedown issued', detail: 'Project Helios OST removed from bayshore-mirror.io', time: '17m ago', type: 'takedown' },
  { id: 3, action: 'Incident resolved', detail: 'Meridian Suite installer on filehost-cdn.cc — confirmed removed', time: '1h ago', type: 'resolved' },
  { id: 4, action: 'New incident detected', detail: 'Studio Alpha — S02E01 repost on 4 indexers', time: '2h ago', type: 'incident' },
  { id: 5, action: 'Bulk takedown completed', detail: '17 incidents processed across 6 platforms', time: '3h ago', type: 'bulk' },
];

const activityDotColor: Record<string, string> = {
  incident: 'bg-[var(--status-critical)]',
  takedown: 'bg-[var(--status-high)]',
  resolved: 'bg-[var(--status-low)]',
  bulk:     'bg-[var(--brand)]',
};

const activityIconPaths: Record<string, string> = {
  incident: 'M12 8v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
  takedown: 'M6 18L18 6M6 6l12 12',
  resolved: 'M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3',
  bulk:     'M13 10V3L4 14h7v7l9-11h-7z',
};

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-4">
      {/* Page header */}
      <div>
        <h1 className="text-[var(--text-2xl)] font-medium text-[var(--text)]">Overview</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Real-time detection and takedown status</p>
      </div>

      {/* KPI Cards — static grid, no drag */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {kpiData.map((kpi, index) => (
          <KPICard key={kpi.title} data={kpi} index={index} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="surface-flat rounded-lg p-4">
          <h3 className="text-sm font-medium text-[var(--text)] mb-3">Detection Trends</h3>
          <LineChart id="overview-line" className="h-56 w-full min-h-[220px]" />
        </div>

        <div className="surface-flat rounded-lg p-4">
          <h3 className="text-sm font-medium text-[var(--text)] mb-3">Content Distribution</h3>
          <PieChart id="overview-pie" className="h-56 w-full min-h-[220px]" />
        </div>

        <div className="surface-flat rounded-lg p-4">
          <h3 className="text-sm font-medium text-[var(--text)] mb-3">Top Platforms</h3>
          <BarChart id="overview-bar" className="h-56 w-full min-h-[220px]" />
        </div>

        <div className="surface-flat rounded-lg p-4">
          <h3 className="text-sm font-medium text-[var(--text)] mb-3">Risk Distribution</h3>
          <DonutChart id="overview-donut" className="h-56 w-full min-h-[220px]" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="surface-flat rounded-lg p-4">
        <h3 className="text-sm font-medium text-[var(--text)] mb-3">Recent Activity</h3>
        <ul className="divide-y divide-[var(--border)]" role="list" aria-label="Recent activity">
          {recentActivity.map((item) => (
            <li key={item.id} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
              {/* Status dot + icon */}
              <div
                className={[
                  'w-7 h-7 rounded-md flex items-center justify-center shrink-0',
                  activityDotColor[item.type],
                  'bg-opacity-20',
                ].join(' ')}
                style={{ background: 'transparent', border: '1px solid currentColor' }}
                aria-hidden="true"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: `var(--status-${item.type === 'incident' ? 'critical' : item.type === 'takedown' ? 'high' : item.type === 'resolved' ? 'low' : 'info'})` }}
                >
                  <path d={activityIconPaths[item.type] ?? activityIconPaths.bulk} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text)]">{item.action}</p>
                <p className="text-xs text-[var(--text-subtle)] truncate mt-0.5">{item.detail}</p>
              </div>
              <span className="tabular text-xs text-[var(--text-subtle)] shrink-0">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
