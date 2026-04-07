'use client';

import type { Incident } from '@/types';

interface IncidentDetailsModalProps {
  incident: Incident;
  isOpen: boolean;
  onClose: () => void;
  onTakedown?: (incident: Incident) => void;
}

export function IncidentDetailsModal({ incident, isOpen, onClose, onTakedown }: IncidentDetailsModalProps) {
  const getRiskBadgeColor = (risk: string) => {
    const colors = {
      Critical: 'bg-red-100 text-red-800 border-red-200',
      High: 'bg-orange-100 text-orange-800 border-orange-200',
      Medium: 'bg-amber-100 text-amber-800 border-amber-200',
      Low: 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[risk as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      New: 'bg-blue-100 text-blue-800 border-blue-200',
      'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Resolved: 'bg-green-100 text-green-800 border-green-200',
      Closed: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return {
    isOpen,
    onClose,
    title: 'Incident Details',
    description: `Viewing details for incident ${incident.id}`,
    size: 'lg' as const,
    children: (
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{incident.title}</h3>
            <p className="text-sm text-slate-600 mt-1">ID: {incident.id}</p>
          </div>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskBadgeColor(incident.risk)}`}>
              {incident.risk}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(incident.status)}`}>
              {incident.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Platform</label>
            <p className="mt-1 text-slate-900">{incident.platform}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Content Type</label>
            <p className="mt-1 text-slate-900">{incident.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Similarity</label>
            <p className="mt-1 text-slate-900">{incident.similarity}%</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Date Detected</label>
            <p className="mt-1 text-slate-900">{new Date(incident.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600">URL</label>
          <a
            href={incident.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-teal-600 hover:text-teal-700 underline break-all"
          >
            {incident.url}
          </a>
        </div>

        {incident.description && (
          <div>
            <label className="text-sm font-medium text-slate-600">Description</label>
            <p className="mt-1 text-slate-900">{incident.description}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
          {onTakedown && incident.status !== 'Resolved' && (
            <button
              onClick={() => onTakedown(incident)}
              className="px-4 py-2 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
            >
              Initiate Takedown
            </button>
          )}
        </div>
      </div>
    ),
  };
}