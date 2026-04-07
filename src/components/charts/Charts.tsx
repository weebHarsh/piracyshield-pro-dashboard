'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

interface BaseChartProps {
  id: string;
  title?: string;
  className?: string;
  'aria-label'?: string;
}

export function useChart<T extends HTMLElement>(option: EChartsOption, deps: React.DependencyList = []) {
  const chartRef = useRef<T>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    chartInstance.current.setOption(option);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, deps);

  return chartRef;
}

const chartTheme = {
  color: ['#14b8a6', '#f59e0b', '#e11d48', '#10b981'],
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'Inter, sans-serif',
    color: '#475569',
  },
  title: {
    textStyle: {
      fontFamily: 'Poppins, sans-serif',
      color: '#0f766e',
      fontWeight: 600,
    },
  },
};

echarts.registerTheme('piracyshield', chartTheme);

export function LineChart({ id, title, className, 'aria-label': ariaLabel }: BaseChartProps) {
  const chartRef = useChart<HTMLDivElement>(
    {
      title: {
        text: title || '',
        left: 'center',
        top: 10,
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
        },
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        textStyle: {
          color: '#374151',
        },
      },
      legend: {
        bottom: 10,
        textStyle: {
          color: '#6b7280',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: title ? '20%' : '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          lineStyle: {
            color: '#d1d5db',
          },
        },
        axisLabel: {
          color: '#6b7280',
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: '#6b7280',
        },
        splitLine: {
          lineStyle: {
            color: '#e5e7eb',
            type: 'dashed',
          },
        },
      },
      series: [
        {
          name: 'Detections',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#14b8a6',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(20, 184, 166, 0.3)' },
                { offset: 1, color: 'rgba(20, 184, 166, 0)' },
              ],
            },
          },
          data: [132, 145, 128, 167, 142, 165, 178],
        },
        {
          name: 'Takedowns',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#f59e0b',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(245, 158, 11, 0.3)' },
                { offset: 1, color: 'rgba(245, 158, 11, 0)' },
              ],
            },
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
      className={className || 'h-80 w-full'}
      role="img"
      aria-label={ariaLabel || title || 'Line chart showing detections and takedowns over time'}
    />
  );
}

export function PieChart({ id, title, className, 'aria-label': ariaLabel }: BaseChartProps) {
  const chartRef = useChart<HTMLDivElement>(
    {
      title: {
        text: title || '',
        left: 'center',
        top: 10,
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
        },
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        textStyle: {
          color: '#374151',
        },
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        bottom: 10,
        textStyle: {
          color: '#6b7280',
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '55%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Movies' },
            { value: 735, name: 'Music' },
            { value: 580, name: 'Software' },
            { value: 484, name: 'Games' },
            { value: 300, name: 'Books' },
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
      className={className || 'h-80 w-full'}
      role="img"
      aria-label={ariaLabel || title || 'Pie chart showing content distribution'}
    />
  );
}

export function BarChart({ id, title, className, 'aria-label': ariaLabel }: BaseChartProps) {
  const chartRef = useChart<HTMLDivElement>(
    {
      title: {
        text: title || '',
        left: 'center',
        top: 10,
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        textStyle: {
          color: '#374151',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: title ? '20%' : '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: '#6b7280',
        },
        splitLine: {
          lineStyle: {
            color: '#e5e7eb',
            type: 'dashed',
          },
        },
      },
      yAxis: {
        type: 'category',
        data: ['Netflix', 'YouTube', 'Twitter', 'Facebook', 'Instagram'],
        axisLine: {
          lineStyle: {
            color: '#d1d5db',
          },
        },
        axisLabel: {
          color: '#6b7280',
        },
      },
      series: [
        {
          type: 'bar',
          data: [287, 198, 142, 121, 98],
          itemStyle: {
            borderRadius: [0, 4, 4, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#0d9488' },
                { offset: 1, color: '#14b8a6' },
              ],
            },
          },
          emphasis: {
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: '#0f766e' },
                  { offset: 1, color: '#10b981' },
                ],
              },
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
      className={className || 'h-80 w-full'}
      role="img"
      aria-label={ariaLabel || title || 'Bar chart showing platform performance'}
    />
  );
}

export function DonutChart({ id, title, className, 'aria-label': ariaLabel }: BaseChartProps) {
  const chartRef = useChart<HTMLDivElement>(
    {
      title: {
        text: title || '',
        left: 'center',
        top: 10,
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
        },
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        textStyle: {
          color: '#374151',
        },
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        bottom: 10,
        textStyle: {
          color: '#6b7280',
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '55%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'center',
            formatter: '{total|Total}\n{value|846}',
            rich: {
              total: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#6b7280',
                padding: [0, 0, 5, 0],
              },
              value: {
                fontSize: 28,
                fontWeight: 'bold',
                color: '#0f766e',
              },
            },
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 156, name: 'Critical', itemStyle: { color: '#dc2626' } },
            { value: 287, name: 'High', itemStyle: { color: '#ea580c' } },
            { value: 245, name: 'Medium', itemStyle: { color: '#d97706' } },
            { value: 158, name: 'Low', itemStyle: { color: '#65a30d' } },
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
      className={className || 'h-80 w-full'}
      role="img"
      aria-label={ariaLabel || title || 'Donut chart showing risk distribution'}
    />
  );
}