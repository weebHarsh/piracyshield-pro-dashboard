'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Button, Input, TextArea } from '@/components/ui';

interface EditIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: {
    id: string;
    title: string;
    platform: string;
    type: string;
    url: string;
    status: string;
    description?: string;
  };
  onSave: (id: string, updates: any) => Promise<boolean>;
}

export function EditIncidentModal({ isOpen, onClose, incident, onSave }: EditIncidentModalProps) {
  const [formData, setFormData] = useState({
    title: incident.title,
    platform: incident.platform,
    type: incident.type,
    url: incident.url,
    status: incident.status,
    description: incident.description || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.platform || !formData.type || !formData.url) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    const success = await onSave(incident.id, formData);
    setIsSubmitting(false);
    
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          id="edit-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder="Enter incident title"
        />

        <div className="space-y-2">
          <label htmlFor="edit-platform" className="block text-sm font-medium text-slate-700">
            Platform <span className="text-red-500">*</span>
          </label>
          <select
            id="edit-platform"
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
          <label htmlFor="edit-type" className="block text-sm font-medium text-slate-700">
            Content Type <span className="text-red-500">*</span>
          </label>
          <select
            id="edit-type"
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
          id="edit-url"
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
          placeholder="https://example.com/pirated-content"
        />

        <div className="space-y-2">
          <label htmlFor="edit-status" className="block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            id="edit-status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <TextArea
          label="Description"
          id="edit-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Additional details about the incident..."
          rows={3}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}