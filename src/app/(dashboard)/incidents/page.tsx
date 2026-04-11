'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Table } from '@/components/table';
import { Button, Input, TextArea, Modal } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useIncidents } from '@/lib/hooks';
import { mockIncidents, columns } from '@/lib/mockData';
import { resolveStatusKey } from '@/lib/status';
import type { Incident } from '@/types';

const selectClass = [
  'px-3 py-1.5 rounded-lg text-sm',
  'bg-[var(--surface-2)] border border-[var(--border)]',
  'text-[var(--text)]',
  'focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]',
  'transition-colors duration-[var(--dur-ui-fast)]',
].join(' ');

export default function IncidentsPage() {
  const { incidents, createIncident, editIncident, initiateTakedown, bulkTakedown, isLoading, isSubmitting } = useIncidents();
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    type: '',
    url: '',
    description: '',
  });

  const handleRowClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsDetailModalOpen(true);
  };

  const filteredIncidents = mockIncidents.filter((incident) => {
    if (filterStatus !== 'all' && incident.status !== filterStatus) return false;
    if (filterRisk !== 'all' && incident.risk !== filterRisk) return false;
    return true;
  });

  const handleCreateIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.platform || !formData.type || !formData.url) {
      toast.error('Please fill in all required fields');
      return;
    }
    const success = await createIncident(formData);
    if (success) {
      setIsCreateModalOpen(false);
      setFormData({ title: '', platform: '', type: '', url: '', description: '' });
    }
  };

  const handleInitiateTakedown = async () => {
    if (!selectedIncident) return;
    const success = await initiateTakedown(selectedIncident.id);
    if (success) {
      setIsDetailModalOpen(false);
      setSelectedIncident(null);
    }
  };

  const handleEditIncident = () => {
    if (!selectedIncident) return;
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (id: string, updates: Partial<Incident>) => {
    const success = await editIncident(id, updates);
    if (success) {
      setIsEditModalOpen(false);
      setSelectedIncident(null);
    }
    return success;
  };

  const handleBulkTakedown = async () => {
    if (selectedRows.size === 0) {
      toast.error('Select at least one incident');
      return;
    }
    const success = await bulkTakedown(Array.from(selectedRows));
    if (success) setSelectedRows(new Set());
  };

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[var(--text-2xl)] font-medium text-[var(--text)]">Incidents</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Monitor and manage piracy incidents</p>
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
          Report Incident
        </Button>
      </div>

      {/* Table card */}
      <div className="surface-flat rounded-lg p-4">
        {/* Filters */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <label htmlFor="status-filter" className="sr-only">Filter by status</label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={selectClass}
            >
              <option value="all">All Status</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="risk-filter" className="sr-only">Filter by risk</label>
            <select
              id="risk-filter"
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className={selectClass}
            >
              <option value="all">All Risk Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          {selectedRows.size > 0 && (
            <Button variant="danger" size="sm" onClick={handleBulkTakedown} isLoading={isSubmitting}>
              Bulk Takedown ({selectedRows.size})
            </Button>
          )}
        </div>

        {isLoading ? (
          <SkeletonTable rows={8} />
        ) : (
          <Table
            data={filteredIncidents}
            columns={columns}
            searchable
            searchPlaceholder="Search incidents..."
            selectable
            onRowSelect={setSelectedRows}
            getRowId={(row) => row.id}
            onRowClick={handleRowClick}
            emptyMessage="No incidents match the current filters"
            pageSize={15}
            aria-label="Incidents table"
          />
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => { setIsDetailModalOpen(false); setSelectedIncident(null); }}
        title={selectedIncident?.title ?? 'Incident Details'}
        description={selectedIncident ? `ID ${selectedIncident.id} · ${selectedIncident.platform}` : undefined}
        size="lg"
        footer={
          selectedIncident ? (
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm"
                onClick={() => { setIsDetailModalOpen(false); setSelectedIncident(null); }}>
                Close
              </Button>
              <Button variant="secondary" size="sm" onClick={handleEditIncident}>
                Edit
              </Button>
              {selectedIncident.status !== 'Resolved' && (
                <Button variant="primary" size="sm" onClick={handleInitiateTakedown} isLoading={isSubmitting}>
                  Initiate Takedown
                </Button>
              )}
            </div>
          ) : undefined
        }
      >
        {selectedIncident && (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-[var(--text-muted)]">{selectedIncident.type}</p>
              <Badge status={resolveStatusKey(selectedIncident.risk)} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-[var(--text-subtle)] mb-1">Similarity</p>
                <p className="tabular font-medium text-[var(--text)]">{selectedIncident.similarity}%</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-subtle)] mb-1">Status</p>
                <Badge status={resolveStatusKey(selectedIncident.status)} label={selectedIncident.status} />
              </div>
              <div>
                <p className="text-xs text-[var(--text-subtle)] mb-1">Detected</p>
                <p className="tabular text-[var(--text)]">{new Date(selectedIncident.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-subtle)] mb-1">ID</p>
                <p className="tabular text-[var(--text)]">{selectedIncident.id}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-[var(--text-subtle)] mb-1">URL</p>
              <a
                href={selectedIncident.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand)] hover:text-[var(--brand-strong)] underline text-sm break-all"
              >
                {selectedIncident.url}
              </a>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Incident Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Report New Incident"
        description="Fill in the details to log a new piracy incident"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" form="create-incident-form" isLoading={isSubmitting}>
              Submit
            </Button>
          </div>
        }
      >
        <form id="create-incident-form" onSubmit={handleCreateIncident} className="space-y-3">
          <Input
            label="Title"
            id="incident-title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g. Studio Alpha — S02E04 leak"
          />
          <div>
            <label htmlFor="platform" className="block text-xs font-medium text-[var(--text-muted)] mb-1">
              Platform <span className="text-[var(--status-critical)]">*</span>
            </label>
            <select id="platform" value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className={`w-full ${selectClass}`} required>
              <option value="">Select platform</option>
              <option value="YouTube">YouTube</option>
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block text-xs font-medium text-[var(--text-muted)] mb-1">
              Content Type <span className="text-[var(--status-critical)]">*</span>
            </label>
            <select id="type" value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className={`w-full ${selectClass}`} required>
              <option value="">Select type</option>
              <option value="Video">Video</option>
              <option value="Music">Music</option>
              <option value="Software">Software</option>
              <option value="Game">Game</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <Input
            label="URL"
            id="incident-url"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            required
            placeholder="https://stream-vault-0412.net/..."
          />
          <TextArea
            label="Description"
            id="incident-description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Additional context..."
            rows={3}
          />
        </form>
      </Modal>

      {/* Edit Incident Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setSelectedIncident(null); }}
        title="Edit Incident"
        description={selectedIncident ? `Editing ${selectedIncident.id}` : undefined}
        size="lg"
        footer={
          selectedIncident ? (
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm"
                onClick={() => { setIsEditModalOpen(false); setSelectedIncident(null); }}>
                Cancel
              </Button>
              <Button variant="primary" size="sm"
                onClick={() => handleSaveEdit(selectedIncident.id, selectedIncident)}>
                Save Changes
              </Button>
            </div>
          ) : undefined
        }
      >
        {selectedIncident && (
          <div className="space-y-3">
            <Input
              label="Title"
              id="edit-title"
              value={selectedIncident.title}
              onChange={(e) => setSelectedIncident({ ...selectedIncident, title: e.target.value })}
              required
            />
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Platform</label>
              <select
                value={selectedIncident.platform}
                onChange={(e) => setSelectedIncident({ ...selectedIncident, platform: e.target.value as Incident['platform'] })}
                className={`w-full ${selectClass}`}
              >
                <option value="YouTube">YouTube</option>
                <option value="Twitter">Twitter</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Status</label>
              <select
                value={selectedIncident.status}
                onChange={(e) => setSelectedIncident({ ...selectedIncident, status: e.target.value as Incident['status'] })}
                className={`w-full ${selectClass}`}
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
