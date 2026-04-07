'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Button, Input } from '@/components/ui';
import { Modal } from '@/components/ui';
import { Skeleton } from '@/components/ui/Skeleton';
import { useConfiguration } from '@/lib/hooks';
import type { Keyword } from '@/types';

const mockKeywords: Keyword[] = [
  {
    id: 'kw-001',
    keyword: 'CAM Rip',
    category: 'Movie',
    addedBy: 'Admin',
    addedAt: '2025-03-01T00:00:00Z',
  },
  {
    id: 'kw-002',
    keyword: 'Cracked',
    category: 'Software',
    addedBy: 'Admin',
    addedAt: '2025-03-02T00:00:00Z',
  },
  {
    id: 'kw-003',
    keyword: 'Full Album',
    category: 'Music',
    addedBy: 'Admin',
    addedAt: '2025-03-03T00:00:00Z',
  },
];

const initialPlatforms = [
  { id: 'pf-001', name: 'Netflix', enabled: true, scanFrequency: 'Daily' },
  { id: 'pf-002', name: 'YouTube', enabled: true, scanFrequency: 'Daily' },
  { id: 'pf-003', name: 'Twitter', enabled: true, scanFrequency: 'Daily' },
  { id: 'pf-004', name: 'Facebook', enabled: false, scanFrequency: 'Weekly' },
  { id: 'pf-005', name: 'Instagram', enabled: true, scanFrequency: 'Daily' },
];

export default function ConfigurationPage() {
  const { keywords, createKeyword, deleteKeyword, isLoading } = useConfiguration();
  const [activeTab, setActiveTab] = useState<'keywords' | 'platforms'>('keywords');
  const [searchQuery, setSearchQuery] = useState('');
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [keywordToDelete, setKeywordToDelete] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    keyword: '',
    category: '',
  });

  const filteredKeywords = mockKeywords.filter(keyword =>
    keyword.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
    keyword.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.keyword || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const success = await createKeyword({
      keyword: formData.keyword,
      category: formData.category,
    });
    
    if (success) {
      setIsAddModalOpen(false);
      setFormData({ keyword: '', category: '' });
    }
  };

  const handleDeleteKeyword = async (id: string) => {
    const success = await deleteKeyword(id);
    if (success) {
      setKeywordToDelete(null);
    }
  };

  const handleTogglePlatform = (platformId: string) => {
    setPlatforms(platforms.map(p =>
      p.id === platformId ? { ...p, enabled: !p.enabled } : p
    ));
    const platform = platforms.find(p => p.id === platformId);
    toast.success(`${platform?.name} ${platform?.enabled ? 'disabled' : 'enabled'}`);
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
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Configuration</h1>
            <p className="text-slate-600 mt-1">Manage detection keywords and platform settings</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <nav className="flex -mb-px" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('keywords')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'keywords'
                    ? 'border-teal-700 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
                aria-selected={activeTab === 'keywords'}
                role="tab"
              >
                Keywords ({mockKeywords.length})
              </button>
              <button
                onClick={() => setActiveTab('platforms')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'platforms'
                    ? 'border-teal-700 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
                aria-selected={activeTab === 'platforms'}
                role="tab"
              >
                Platforms ({platforms.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'keywords' ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <Input
                    type="search"
                    placeholder="Search keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-md"
                  />
                  <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Keyword
                  </Button>
                </div>

                <div className="space-y-3">
                  {isLoading ? (
                    <>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg animate-pulse">
                          <div className="flex-1">
                            <div className="h-5 bg-slate-200 rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : filteredKeywords.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-slate-500">No keywords found</p>
                    </div>
                  ) : (
                    filteredKeywords.map((keyword) => (
                      <div
                        key={keyword.id}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900">{keyword.keyword}</h3>
                          <p className="text-sm text-slate-600">Category: {keyword.category}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-slate-400">
                            Added {new Date(keyword.addedAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => setKeywordToDelete(keyword.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {isLoading ? (
                  <>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg animate-pulse">
                        <div className="flex-1">
                          <div className="h-5 bg-slate-200 rounded w-1/4 mb-2"></div>
                          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  platforms.map((platform) => (
                    <div
                      key={platform.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">{platform.name}</h3>
                        <p className="text-sm text-slate-600">Scan frequency: {platform.scanFrequency}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={platform.enabled}
                          onChange={() => handleTogglePlatform(platform.id)}
                          className="sr-only peer"
                          aria-label={`Toggle ${platform.name} monitoring`}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-900">
                          {platform.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </label>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Add Keyword Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Detection Keyword"
        description="Add a new keyword to detect piracy incidents"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Keyword"
            id="keyword"
            value={formData.keyword}
            onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
            required
            placeholder="Enter keyword"
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              required
            >
              <option value="">Select category</option>
              <option value="Movie">Movie</option>
              <option value="Music">Music</option>
              <option value="Software">Software</option>
              <option value="Game">Game</option>
              <option value="Book">Book</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Keyword
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!keywordToDelete}
        onClose={() => setKeywordToDelete(null)}
        title="Delete Keyword"
        description="Are you sure you want to delete this keyword?"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-600">This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setKeywordToDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => keywordToDelete && handleDeleteKeyword(keywordToDelete)}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}