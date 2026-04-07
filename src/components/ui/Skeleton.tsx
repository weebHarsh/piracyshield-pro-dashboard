'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className = '', variant = 'text', width, height }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-slate-200';
  
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Skeleton variant="text" width="60%" height={16} className="mb-2" />
          <Skeleton variant="text" width="40%" height={12} />
        </div>
        <Skeleton variant="circular" width={48} height={48} />
      </div>
      <Skeleton variant="text" width="80%" height={14} />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
        <Skeleton variant="rectangular" width={20} height={20} />
        <Skeleton variant="text" width="25%" height={14} />
        <Skeleton variant="text" width="15%" height={14} />
        <Skeleton variant="text" width="15%" height={14} />
        <Skeleton variant="text" width="10%" height={14} />
        <Skeleton variant="text" width="10%" height={14} />
        <Skeleton variant="text" width="15%" height={14} />
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex gap-4 p-4 border border-slate-200 rounded-lg"
        >
          <Skeleton variant="rectangular" width={20} height={20} />
          <div className="flex-1">
            <Skeleton variant="text" width="30%" height={14} className="mb-1" />
            <Skeleton variant="text" width="20%" height={12} />
          </div>
          <Skeleton variant="rectangular" width={60} height={24} />
          <Skeleton variant="rectangular" width={50} height={20} />
          <Skeleton variant="rectangular" width={40} height={20} />
          <Skeleton variant="text" width="12%" height={12} />
        </motion.div>
      ))}
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <Skeleton variant="text" width="40%" height={20} className="mb-4" />
      <div className="h-64 flex items-end justify-around gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${Math.random() * 60 + 40}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}