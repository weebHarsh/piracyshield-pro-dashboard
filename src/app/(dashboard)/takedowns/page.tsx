'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Table, Column } from '@/components/table';
import { Button } from '@/components/ui';
import { Modal } from '@/components/ui';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useTakedowns } from '@/lib/hooks';
import type { Takedown } from '@/types';

const mockTakedowns: Takedown[] = [
  {
    id: 'tk-001',
    incidentId: '1',
    userId: 'user-1',
    platform: 'Netflix',
    status: 'Completed',
    submittedAt: '2025-04-01T10:30:00Z',
    completedAt: '2025-04-02T14:00:00Z',
    reason: 'Copyright infringement - CAM recording',
    notes: 'Successfully removed from platform within 24 hours',
  },
  {
    id: 'tk-002',
    incidentId: '2',
    userId: 'user-1',
    platform: 'YouTube',
    status: 'Submitted',
    submittedAt: '2025-04-02T14:20:00Z',
    reason: 'Music album copyright violation',
    notes: 'Awaiting platform response',
  },
  {
    id: 'tk-003',
    incidentId: '3',
    userId: 'user-1',
    platform: 'Twitter',
    status: 'Pending',
    submittedAt: '2025-04-03T09:15:00Z',
    reason: 'Software crack distribution',
    notes: 'Processing DMCA request',
  },
  {
    id: 'tk-004',
    incidentId: '4',
    userId: 'user-1',
    platform: 'Facebook',
    status: 'Approved',
    submittedAt: '2025-04-04T16:45:00Z',
    reason: 'Movie piracy - high quality rip',
    notes: 'Takedown approved by platform',
  },
];

const takedownColumns: Column<Takedown>[] = [
  {
    key: 'id',
    header: 'ID',
    sortable: true,
    accessor: (item) => (
      <span className="font-mono text-sm text-slate-900">{item.id}</span>
    ),
  },
  {
    key: 'platform',
    header: 'Platform',
    sortable: true,
  },
  {
    key: 'reason',
    header: 'Reason',
    sortable: false,
    accessor: (item) => (
      <span className="text-sm text-slate-700 line-clamp-2">{item.reason}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    accessor: (item) => {
      const colors = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Submitted: 'bg-blue-100 text-blue-800',
        Approved: 'bg-purple-100 text-purple-800',
        Rejected: 'bg-red-100 text-red-800',
        Completed: 'bg-green-100 text-green-800',
      };
      return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${colors[item.status]}`}>
          {item.status}
        </span>
      );
    },
  },
  {
    key: 'submittedAt',
    header: 'Submitted',
    sortable: true,
    accessor: (item) => new Date(item.submittedAt).toLocaleDateString(),
  },
];

export default function TakedownsPage() {
  const { createTakedown, isLoading } = useTakedowns();
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedTakedown, setSelectedTakedown] = useState<Takedown | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    platform: '',
    reason: '',
    notes: '',
  });

  const filteredTakedowns = mockTakedowns.filter(takedown => {
    if (filterStatus !== 'all' && takedown.status !== filterStatus) return false;
    return true;
  });

  const handleRowClick = (takedown: Takedown) => {
    setSelectedTakedown(takedown);
    setIsDetailModalOpen(true);
  };

  const handleRowSelect = (ids: Set<string>) => {
    setSelectedRows(ids);
  };

  const handleCreateTakedown = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.platform || !formData.reason) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const success = await createTakedown({
      platform: formData.platform,
      reason: formData.reason,
      notes: formData.notes,
    });
    
    if (success) {
      setIsCreateModalOpen(false);
      setFormData({ platform: '', reason: '', notes: '' });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Takedowns</h1>
            <p className="text-slate-600 mt-1">Track and manage content takedown requests</p>
          </div>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Takedown
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="status-filter" className="sr-only">Filter by status</label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Submitted">Submitted</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <SkeletonTable rows={5} />
          ) : (
            <Table
              data={filteredTakedowns}
              columns={takedownColumns}
              searchable
              searchPlaceholder="Search takedowns..."
              selectable
              onRowSelect={handleRowSelect}
              getRowId={(row) => row.id}
              onRowClick={handleRowClick}
              emptyMessage="No takedown requests found"
              aria-label="Takedowns table"
            />
          )}
        </div>
      </motion.div>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTakedown(null);
        }}
        title="Takedown Details"
        description={`Viewing takedown request ${selectedTakedown?.id}`}
        size="lg"
      >
        {selectedTakedown && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Platform</label>
                <p className="mt-1 text-slate-900">{selectedTakedown.platform}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Status</label>
                <p className="mt-1">
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    selectedTakedown.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    selectedTakedown.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    selectedTakedown.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                    selectedTakedown.status === 'Approved' ? 'bg-purple-100 text-purple-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedTakedown.status}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Submitted</label>
                <p className="mt-1 text-slate-900">{new Date(selectedTakedown.submittedAt).toLocaleString()}</p>
              </div>
              {selectedTakedown.completedAt && (
                <div>
                  <label className="text-sm font-medium text-slate-600">Completed</label>
                  <p className="mt-1 text-slate-900">{new Date(selectedTakedown.completedAt).toLocaleString()}</p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Reason</label>
              <p className="mt-1 text-slate-900">{selectedTakedown.reason}</p>
            </div>

            {selectedTakedown.notes && (
              <div>
                <label className="text-sm font-medium text-slate-600">Notes</label>
                <p className="mt-1 text-slate-900">{selectedTakedown.notes}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setSelectedTakedown(null);
                }}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Takedown Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="New Takedown Request"
        description="Submit a new content takedown request"
        size="md"
      >
        <form onSubmit={handleCreateTakedown} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="platform" className="block text-sm font-medium text-slate-700">
              Platform <span className="text-red-500">*</span>
            </label>
            <select
              id="platform"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              required
            >
              <option value="">Select platform</option>
              <option value="Netflix">Netflix</option>
              <option value="YouTube">YouTube</option>
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="reason" className="block text-sm font-medium text-slate-700">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              rows={3}
              placeholder="Reason for takedown request..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              rows={2}
              placeholder="Additional notes..."
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}