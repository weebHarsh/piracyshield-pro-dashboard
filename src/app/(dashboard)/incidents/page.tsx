'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Table } from '@/components/table';
import { Button, Input, TextArea } from '@/components/ui';
import { Modal } from '@/components/ui';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useIncidents } from '@/lib/hooks';
import { mockIncidents, columns } from '@/lib/mockData';
import type { Incident } from '@/types';

export default function IncidentsPage() {
  const { incidents, createIncident, editIncident, initiateTakedown, bulkTakedown, isLoading, isSubmitting } = useIncidents();
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  // Form state
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

  const handleRowSelect = (ids: Set<string>) => {
    setSelectedRows(ids);
  };

  const filteredIncidents = mockIncidents.filter(incident => {
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

  const handleSaveEdit = async (id: string, updates: any) => {
    const success = await editIncident(id, updates);
    if (success) {
      setIsEditModalOpen(false);
      setSelectedIncident(null);
    }
    return success;
  };

  const handleBulkTakedown = async () => {
    if (selectedRows.size === 0) {
      toast.error('Please select at least one incident');
      return;
    }
    
    const success = await bulkTakedown(Array.from(selectedRows));
    if (success) {
      setSelectedRows(new Set());
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
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Incidents</h1>
            <p className="text-slate-600 mt-1">Monitor and manage piracy incidents</p>
          </div>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Report Incident
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
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Risk Levels</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            {selectedRows.size > 0 && (
              <Button variant="danger" onClick={handleBulkTakedown} isLoading={isSubmitting}>
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Bulk Takedown ({selectedRows.size})
              </Button>
            )}
          </div>

          {isLoading ? (
            <SkeletonTable rows={5} />
          ) : (
            <Table
              data={filteredIncidents}
              columns={columns}
              searchable
              searchPlaceholder="Search incidents by title, platform, or type..."
              selectable
              onRowSelect={handleRowSelect}
              getRowId={(row) => row.id}
              onRowClick={handleRowClick}
              emptyMessage="No incidents found matching your criteria"
              aria-label="Incidents table"
            />
          )}
        </div>
      </motion.div>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedIncident(null);
        }}
        title={selectedIncident?.title || 'Incident Details'}
        description={`Viewing details for incident ${selectedIncident?.id}`}
        size="lg"
      >
        {selectedIncident && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{selectedIncident.title}</h3>
                <p className="text-sm text-slate-600">{selectedIncident.platform} • {selectedIncident.type}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedIncident.risk === 'Critical' ? 'bg-red-100 text-red-800' :
                selectedIncident.risk === 'High' ? 'bg-orange-100 text-orange-800' :
                selectedIncident.risk === 'Medium' ? 'bg-amber-100 text-amber-800' :
                'bg-green-100 text-green-800'
              }`}>
                {selectedIncident.risk}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Similarity</p>
                <p className="font-medium text-slate-900">{selectedIncident.similarity}%</p>
              </div>
              <div>
                <p className="text-slate-600">Status</p>
                <p className="font-medium text-slate-900">{selectedIncident.status}</p>
              </div>
              <div>
                <p className="text-slate-600">Date</p>
                <p className="font-medium text-slate-900">{new Date(selectedIncident.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-slate-600">ID</p>
                <p className="font-medium text-slate-900">{selectedIncident.id}</p>
              </div>
            </div>

            <div>
              <p className="text-slate-600 text-sm">URL</p>
              <a
                href={selectedIncident.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 underline text-sm break-all"
              >
                {selectedIncident.url}
              </a>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setSelectedIncident(null);
                }}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={handleEditIncident}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Edit
              </button>
              {selectedIncident.status !== 'Resolved' && (
                <button
                  onClick={handleInitiateTakedown}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Initiate Takedown'}
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Create Incident Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Report New Incident"
        description="Fill in the details to report a new piracy incident"
        size="lg"
      >
        <form onSubmit={handleCreateIncident} className="space-y-4">
          <Input
            label="Title"
            id="incident-title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="Enter incident title"
          />

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
            <label htmlFor="type" className="block text-sm font-medium text-slate-700">
              Content Type <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              required
            >
              <option value="">Select type</option>
              <option value="Movie">Movie</option>
              <option value="Music">Music</option>
              <option value="Software">Software</option>
              <option value="Game">Game</option>
              <option value="Book">Book</option>
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
            placeholder="https://example.com/pirated-content"
          />

          <TextArea
            label="Description"
            id="incident-description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Additional details about the incident..."
            rows={3}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Submit Incident
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Incident Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedIncident(null);
        }}
        title="Edit Incident"
        description={`Editing incident ${selectedIncident?.id}`}
        size="lg"
      >
        {selectedIncident && (
          <div className="space-y-4">
            <Input
              label="Title"
              id="edit-title"
              value={selectedIncident.title}
              onChange={(e) => setSelectedIncident({ ...selectedIncident, title: e.target.value })}
              required
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Platform</label>
              <select
                value={selectedIncident.platform}
                onChange={(e) => setSelectedIncident({ ...selectedIncident, platform: e.target.value as any })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              >
                <option value="Netflix">Netflix</option>
                <option value="YouTube">YouTube</option>
                <option value="Twitter">Twitter</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Status</label>
              <select
                value={selectedIncident.status}
                onChange={(e) => setSelectedIncident({ ...selectedIncident, status: e.target.value as any })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedIncident(null);
                }}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveEdit(selectedIncident.id, selectedIncident)}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}