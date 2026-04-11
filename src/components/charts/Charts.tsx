'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { getStatusColor } from '@/lib/status';

interface BaseChartProps {
  id: string;
  title?: string;
  className?: string;
  'aria-label'?: string;
}

// ── Token reader — called at chart-init time on the client ──
function token(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function chartColors() {
  return {
    brand:       token('--brand',        '#3daa88'),
    brandStrong: token('--brand-strong', '#2d8a6e'),
    border:      token('--border',       '#2e3240'),
    textMuted:   token('--text-muted',   '#8a919e'),
    textSubtle:  token('--text-subtle',  '#566070'),
    surface:     token('--surface',      '#1e2230'),
    surface2:    token('--surface-2',    '#252a3a'),
    critical:    getStatusColor('critical'),
    high:        getStatusColor('high'),
    medium:      getStatusColor('medium'),
    low:         getStatusColor('low'),
    info:        getStatusColor('info'),
  };
}

const MONO_FONT = '"PP Fraktion Mono", ui-monospace, monospace';
const SANS_FONT = '"PP Neue Montreal", system-ui, sans-serif';

export function useChart<T extends HTMLElement>(option: EChartsOption, deps: React.DependencyList = []) {
  const chartRef = useRef<T>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, null, { renderer: 'svg' });
    }

    chartInstance.current.setOption(option);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { chartInstance.current?.resize(); }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, deps);

  return chartRef;
}

// Shared style helpers — built once per chart mount
function tooltipStyle(c: ReturnType<typeof chartColors>) {
  return {
    backgroundColor: c.surface2,
    borderColor: c.border,
    borderWidth: 1,
    textStyle: { color: c.textMuted, fontFamily: SANS_FONT, fontSize: 12 },
    extraCssText: 'box-shadow: 0 8px 24px -8px rgba(0,0,0,0.5)',
  };
}

function axisLabelStyle(c: ReturnType<typeof chartColors>) {
  return { color: c.textSubtle, fontFamily: MONO_FONT, fontSize: 11 };
}

function splitLineStyle(c: ReturnType<typeof chartColors>) {
  return { lineStyle: { color: c.border, type: 'dashed' as const } };
}

export function LineChart({ id, title, className, 'aria-label': ariaLabel }: BaseChartProps) {
  const c = chartColors();

  const chartRef = useChart<HTMLDivElement>(
    {
      animation: true,
      animationDuration: 200,
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', ...tooltipStyle(c) },
      legend: {
        bottom: 8,
        textStyle: { color: c.textMuted, fontFamily: SANS_FONT, fontSize: 12 },
      },
      grid: {
        left: '2%', right: '3%', bottom: '18%',
        top: title ? '18%' : '8%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: { lineStyle: { color: c.border } },
        axisLabel: axisLabelStyle(c),
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: axisLabelStyle(c),
        splitLine: splitLineStyle(c),
      },
      series: [
        {
          name: 'Detections',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: { width: 2, color: c.brand },
          areaStyle: {
            color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [{ offset: 0, color: c.brand + '30' }, { offset: 1, color: c.brand + '00' }] },
          },
          data: [132, 145, 128, 167, 142, 165, 178],
        },
        {
          name: 'Takedowns',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: { width: 2, color: c.high },
          areaStyle: {
            color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [{ offset: 0, color: c.high + '30' }, { offset: 1, color: c.high + '00' }] },
          },
          data: [45, 52, 38, 61, 48, 55, 62],
        },
      ],
    },
    []
  );

  return (
    <div
      ref={chartRef}
      id={id}
      className={className ?? 'h-64 w-full'}
      role="img"
      aria-label={ariaLabel ?? title ?? 'Line chart showing detections and takedowns over time'}
    />
  );
}

export function PieChart({ id, title, className, 'aria-label': ariaLabel }: BaseChartProps) {
  const c = chartColors();

  const chartRef = useChart<HTMLDivElement>(
    {
      animation: true,
      animationDuration: 200,
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        ...tooltipStyle(c),
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        bottom: 8,
        textStyle: { color: c.textMuted, fontFamily: SANS_FONT, fontSize: 12 },
      },
      color: [c.brand, c.high, c.info, c.medium, c.low],
      series: [
        {
          type: 'pie',
          radius: ['38%', '68%'],
          center: ['50%', '52%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor: c.surface,
            borderWidth: 2,
          },
          label: { show: false },
          emphasis: {
            label: { show: true, fontSize: 14, fontFamily: MONO_FONT, color: c.textMuted },
            itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.3)' },
          },
          labelLine: { show: false },
          data: [
            { value: 1048, name: 'Video' },
            { value: 735, name: 'Music' },
            { value: 580, name: 'Software' },
            { value: 484, name: 'Games' },
            { value: 300, name: 'Other' },
          ],
        },
      ],
    },
    []
  );

  return (
    <div
      ref={chartRef}
      id={id}
      className={className ?? 'h-64 w-full'}
      role="img"
      aria-label={ariaLabel ?? title ?? 'Pie chart showing content distribution by type'}
    />
  );
}

export function BarChart({ id, title, className, 'aria-label': ariaLabel }: BaseChartProps) {
  const c = chartColors();

  const chartRef = useChart<HTMLDivElement>(
    {
      animation: true,
      animationDuration: 200,
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, ...tooltipStyle(c) },
      grid: {
        left: '2%', right: '3%', bottom: '3%',
        top: title ? '18%' : '8%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: axisLabelStyle(c),
        splitLine: splitLineStyle(c),
      },
      yAxis: {
        type: 'category',
        data: ['YouTube', 'Twitter', 'Facebook', 'Instagram', 'Other'],
        axisLine: { lineStyle: { color: c.border } },
        axisLabel: { ...axisLabelStyle(c), fontFamily: SANS_FONT },
        axisTick: { show: false },
      },
      series: [
        {
          type: 'bar',
          data: [287, 198, 142, 121, 98],
          itemStyle: {
            borderRadius: [0, 4, 4, 0],
            color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: c.brandStrong },
                { offset: 1, color: c.brand },
              ],
            },
          },
        },
      ],
    },
    []
  );

  return (
    <div
      ref={chartRef}
      id={id}
      className={className ?? 'h-64 w-full'}
      role="img"
      aria-label={ariaLabel ?? title ?? 'Bar chart showing incident volume by platform'}
    />
  );
}

export function DonutChart({ id, title, className, 'aria-label': ariaLabel }: BaseChartProps) {
  const c = chartColors();

  const chartRef = useChart<HTMLDivElement>(
    {
      animation: true,
      animationDuration: 200,
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        ...tooltipStyle(c),
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        bottom: 8,
        textStyle: { color: c.textMuted, fontFamily: SANS_FONT, fontSize: 12 },
      },
      series: [
        {
          type: 'pie',
          radius: ['48%', '68%'],
          center: ['50%', '52%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: c.surface,
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'center',
            formatter: '{total|Total}\n{value|846}',
            rich: {
              total: {
                fontSize: 11,
                fontFamily: SANS_FONT,
                color: c.textSubtle,
                padding: [0, 0, 4, 0] as [number, number, number, number],
              },
              value: {
                fontSize: 22,
                fontFamily: MONO_FONT,
                fontWeight: 500 as const,
                color: c.textMuted,
              },
            },
          },
          emphasis: {
            label: { show: true, fontSize: 13, fontFamily: MONO_FONT },
          },
          labelLine: { show: false },
          // Canonical status colors — matches incidents table and takedowns badges
          data: [
            { value: 156, name: 'Critical', itemStyle: { color: c.critical } },
            { value: 287, name: 'High',     itemStyle: { color: c.high } },
            { value: 245, name: 'Medium',   itemStyle: { color: c.medium } },
            { value: 158, name: 'Low',      itemStyle: { color: c.low } },
          ],
        },
      ],
    },
    []
  );

  return (
    <div
      ref={chartRef}
      id={id}
      className={className ?? 'h-64 w-full'}
      role="img"
      aria-label={ariaLabel ?? title ?? 'Donut chart showing risk distribution'}
    />
  );
}
