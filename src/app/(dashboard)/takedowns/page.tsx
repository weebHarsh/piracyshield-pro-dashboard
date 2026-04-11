'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Table, Column } from '@/components/table';
import { Button, Modal } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useTakedowns } from '@/lib/hooks';
import { resolveStatusKey } from '@/lib/status';
import type { Takedown } from '@/types';

const selectClass = [
  'px-3 py-1.5 rounded-lg text-sm',
  'bg-[var(--surface-2)] border border-[var(--border)]',
  'text-[var(--text)]',
  'focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]',
].join(' ');

const mockTakedowns: Takedown[] = [
  {
    id: 'tk-001',
    incidentId: 'INC-0041',
    userId: 'user-1',
    platform: 'Other',
    status: 'Completed',
    submittedAt: '2026-04-01T10:30:00Z',
    completedAt: '2026-04-02T14:00:00Z',
    reason: 'Pre-release leak — Studio Alpha S02E04',
    notes: 'Removed within 27 hours of submission.',
  },
  {
    id: 'tk-002',
    incidentId: 'INC-0039',
    userId: 'user-1',
    platform: 'Other',
    status: 'Submitted',
    submittedAt: '2026-04-02T14:20:00Z',
    reason: 'Project Helios OST — full album, no license',
    notes: 'Awaiting platform acknowledgment.',
  },
  {
    id: 'tk-003',
    incidentId: 'INC-0038',
    userId: 'user-1',
    platform: 'Other',
    status: 'Pending',
    submittedAt: '2026-04-03T09:15:00Z',
    reason: 'Meridian Suite installer — crack distribution',
    notes: 'DMCA request being processed.',
  },
  {
    id: 'tk-004',
    incidentId: 'INC-0035',
    userId: 'user-1',
    platform: 'Other',
    status: 'Approved',
    submittedAt: '2026-04-04T16:45:00Z',
    reason: 'Studio Alpha S01E08 — 2160p rip, wide distribution',
    notes: 'Takedown approved. Awaiting de-index confirmation.',
  },
];

const takedownColumns: Column<Takedown>[] = [
  {
    key: 'id',
    header: 'ID',
    sortable: true,
    accessor: (item) => (
      <span className="tabular text-sm text-[var(--text-muted)]">{item.id}</span>
    ),
  },
  {
    key: 'platform',
    header: 'Platform',
    sortable: true,
    accessor: (item) => (
      <span className="text-sm text-[var(--text)]">{item.platform}</span>
    ),
  },
  {
    key: 'reason',
    header: 'Reason',
    accessor: (item) => (
      <span className="text-sm text-[var(--text-muted)] line-clamp-1">{item.reason}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    accessor: (item) => (
      <Badge status={resolveStatusKey(item.status)} label={item.status} />
    ),
  },
  {
    key: 'submittedAt',
    header: 'Submitted',
    sortable: true,
    type: 'number',
    accessor: (item) => (
      <span className="tabular text-sm text-[var(--text-muted)]">
        {new Date(item.submittedAt).toLocaleDateString()}
      </span>
    ),
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

  const filteredTakedowns = mockTakedowns.filter((t) =>
    filterStatus === 'all' || t.status === filterStatus
  );

  const handleRowClick = (takedown: Takedown) => {
    setSelectedTakedown(takedown);
    setIsDetailModalOpen(true);
  };

  const handleCreateTakedown = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.platform || !formData.reason) {
      toast.error('Platform and reason are required');
      return;
    }
    const success = await createTakedown({ platform: formData.platform, reason: formData.reason, notes: formData.notes });
    if (success) {
      setIsCreateModalOpen(false);
      setFormData({ platform: '', reason: '', notes: '' });
    }
  };

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[var(--text-2xl)] font-medium text-[var(--text)]">Takedowns</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Track and manage DMCA takedown requests</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          New Takedown
        </Button>
      </div>

      {/* Table */}
      <div className="surface-flat rounded-lg p-4">
        <div className="flex items-center gap-3 mb-4">
          <label htmlFor="status-filter" className="sr-only">Filter by status</label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={selectClass}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {isLoading ? (
          <SkeletonTable rows={8} />
        ) : (
          <Table
            data={filteredTakedowns}
            columns={takedownColumns}
            searchable
            searchPlaceholder="Search takedowns..."
            selectable
            onRowSelect={setSelectedRows}
            getRowId={(row) => row.id}
            onRowClick={handleRowClick}
            emptyMessage="No takedown requests match the current filter"
            pageSize={15}
            aria-label="Takedowns table"
          />
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => { setIsDetailModalOpen(false); setSelectedTakedown(null); }}
        title="Takedown Details"
        description={selectedTakedown ? `${selectedTakedown.id} · ${selectedTakedown.platform}` : undefined}
        size="lg"
        footer={
          <div className="flex justify-end">
            <Button variant="ghost" size="sm"
              onClick={() => { setIsDetailModalOpen(false); setSelectedTakedown(null); }}>
              Close
            </Button>
          </div>
        }
      >
        {selectedTakedown && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-[var(--text-subtle)] mb-1">Platform</p>
                <p className="text-[var(--text)]">{selectedTakedown.platform}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-subtle)] mb-1">Status</p>
                <Badge status={resolveStatusKey(selectedTakedown.status)} label={selectedTakedown.status} />
              </div>
              <div>
                <p className="text-xs text-[var(--text-subtle)] mb-1">Submitted</p>
                <p className="tabular text-[var(--text)]">{new Date(selectedTakedown.submittedAt).toLocaleString()}</p>
              </div>
              {selectedTakedown.completedAt && (
                <div>
                  <p className="text-xs text-[var(--text-subtle)] mb-1">Completed</p>
                  <p className="tabular text-[var(--text)]">{new Date(selectedTakedown.completedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-[var(--text-subtle)] mb-1">Reason</p>
              <p className="text-sm text-[var(--text)]">{selectedTakedown.reason}</p>
            </div>
            {selectedTakedown.notes && (
              <div>
                <p className="text-xs text-[var(--text-subtle)] mb-1">Notes</p>
                <p className="text-sm text-[var(--text-muted)]">{selectedTakedown.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Create Takedown Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="New Takedown Request"
        description="Submit a DMCA takedown request"
        size="md"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit" form="create-takedown-form">Submit Request</Button>
          </div>
        }
      >
        <form id="create-takedown-form" onSubmit={handleCreateTakedown} className="space-y-3">
          <div>
            <label htmlFor="td-platform" className="block text-xs font-medium text-[var(--text-muted)] mb-1">
              Platform <span className="text-[var(--status-critical)]">*</span>
            </label>
            <select id="td-platform" value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className={`w-full ${selectClass}`} required>
              <option value="">Select platform</option>
              <option value="YouTube">YouTube</option>
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="td-reason" className="block text-xs font-medium text-[var(--text-muted)] mb-1">
              Reason <span className="text-[var(--status-critical)]">*</span>
            </label>
            <textarea id="td-reason" value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className={`w-full ${selectClass} resize-none`} rows={3}
              placeholder="Describe the copyright violation..." required />
          </div>
          <div>
            <label htmlFor="td-notes" className="block text-xs font-medium text-[var(--text-muted)] mb-1">Notes</label>
            <textarea id="td-notes" value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className={`w-full ${selectClass} resize-none`} rows={2}
              placeholder="Additional context..." />
          </div>
        </form>
      </Modal>
    </div>
  );
}
