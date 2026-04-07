'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Input, TextArea } from '@/components/ui';

interface CreateIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IncidentFormData) => void;
}

interface IncidentFormData {
  title: string;
  platform: string;
  type: string;
  url: string;
  description: string;
}

export function CreateIncidentModal({ isOpen, onClose, onSubmit }: CreateIncidentModalProps) {
  const [formData, setFormData] = useState<IncidentFormData>({
    title: '',
    platform: '',
    type: '',
    url: '',
    description: '',
  });
  const [errors, setErrors] = useState<Partial<IncidentFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<IncidentFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.platform) {
      newErrors.platform = 'Platform is required';
    }
    if (!formData.type) {
      newErrors.type = 'Type is required';
    }
    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onSubmit(formData);
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      platform: '',
      type: '',
      url: '',
      description: '',
    });
    setErrors({});
    onClose();
  };

  return {
    isOpen,
    onClose: handleClose,
    title: 'Report New Incident',
    description: 'Fill in the details to report a new piracy incident',
    children: (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          id="incident-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          required
          placeholder="Enter incident title"
          aria-describedby={errors.title ? 'title-error' : undefined}
        />

        <div className="space-y-2">
          <label htmlFor="platform" className="block text-sm font-medium text-slate-700">
            Platform <span className="text-red-500">*</span>
          </label>
          <select
            id="platform"
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900"
            aria-required
            aria-invalid={!!errors.platform}
          >
            <option value="">Select platform</option>
            <option value="netflix">Netflix</option>
            <option value="youtube">YouTube</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="other">Other</option>
          </select>
          {errors.platform && (
            <p id="platform-error" className="text-sm text-red-600" role="alert">
              {errors.platform}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="type" className="block text-sm font-medium text-slate-700">
            Content Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900"
            aria-required
            aria-invalid={!!errors.type}
          >
            <option value="">Select type</option>
            <option value="movie">Movie</option>
            <option value="music">Music</option>
            <option value="software">Software</option>
            <option value="game">Game</option>
            <option value="book">Book</option>
            <option value="other">Other</option>
          </select>
          {errors.type && (
            <p id="type-error" className="text-sm text-red-600" role="alert">
              {errors.type}
            </p>
          )}
        </div>

        <Input
          label="URL"
          id="incident-url"
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          error={errors.url}
          required
          placeholder="https://example.com/pirated-content"
          aria-describedby={errors.url ? 'url-error' : undefined}
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
          <Button variant="outline" onClick={handleClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting}>
            Submit Incident
          </Button>
        </div>
      </form>
    ),
  };
}