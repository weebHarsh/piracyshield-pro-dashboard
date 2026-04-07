'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Button, Input } from '@/components/ui';
import { Modal } from '@/components/ui';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useContent } from '@/lib/hooks';
import type { WhitelistEntry, BlacklistEntry } from '@/types';

const mockWhitelist: WhitelistEntry[] = [
  {
    id: 'wl-001',
    title: 'The Avengers (Official)',
    type: 'Movie',
    author: 'Marvel Studios',
    platform: 'Netflix',
    addedBy: 'Admin',
    addedAt: '2025-03-01T00:00:00Z',
    reason: 'Official distributor license',
  },
  {
    id: 'wl-002',
    title: 'Taylor Swift - Albums',
    type: 'Music',
    author: 'Taylor Swift',
    platform: 'Spotify',
    addedBy: 'Admin',
    addedAt: '2025-03-05T00:00:00Z',
    reason: 'Licensed content',
  },
];

const mockBlacklist: BlacklistEntry[] = [
  {
    id: 'bl-001',
    keyword: 'CAM Rip',
    type: 'Movie',
    addedBy: 'Admin',
    addedAt: '2025-03-01T00:00:00Z',
    severity: 'high',
  },
  {
    id: 'bl-002',
    keyword: 'Cracked Software',
    type: 'Software',
    addedBy: 'Admin',
    addedAt: '2025-03-02T00:00:00Z',
    severity: 'critical',
  },
];

export default function ContentPage() {
  const { addWhitelistEntry, addBlacklistEntry, removeWhitelistEntry, removeBlacklistEntry, isLoading } = useContent();
  const [activeTab, setActiveTab] = useState<'whitelist' | 'blacklist'>('whitelist');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [whitelist] = useState<WhitelistEntry[]>(mockWhitelist);
  const [blacklist] = useState<BlacklistEntry[]>(mockBlacklist);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    platform: '',
    type: '',
    reason: '',
    keyword: '',
    severity: 'high' as 'critical' | 'high' | 'medium' | 'low',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'whitelist') {
      if (!formData.title || !formData.author || !formData.platform || !formData.type) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      const success = await addWhitelistEntry({
        title: formData.title,
        author: formData.author,
        platform: formData.platform,
        type: formData.type,
        reason: formData.reason,
      });
      
      if (success) {
        setIsAddModalOpen(false);
        setFormData({ title: '', author: '', platform: '', type: '', reason: '', keyword: '', severity: 'high' });
      }
    } else {
      if (!formData.keyword || !formData.type) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      const success = await addBlacklistEntry({
        keyword: formData.keyword,
        type: formData.type,
        severity: formData.severity,
      });
      
      if (success) {
        setIsAddModalOpen(false);
        setFormData({ title: '', author: '', platform: '', type: '', reason: '', keyword: '', severity: 'high' });
      }
    }
  };

  const handleDelete = async (id: string, type: 'whitelist' | 'blacklist') => {
    if (type === 'whitelist') {
      await removeWhitelistEntry(id);
    } else {
      await removeBlacklistEntry(id);
    }
  };

  const filteredWhitelist = whitelist.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBlacklist = blacklist.filter(entry =>
    entry.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Content Management</h1>
            <p className="text-slate-600 mt-1">Manage whitelisted and blacklisted content</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <nav className="flex -mb-px" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('whitelist')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'whitelist'
                    ? 'border-teal-700 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
                aria-selected={activeTab === 'whitelist'}
                role="tab"
              >
                Whitelist ({whitelist.length})
              </button>
              <button
                onClick={() => setActiveTab('blacklist')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'blacklist'
                    ? 'border-teal-700 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
                aria-selected={activeTab === 'blacklist'}
                role="tab"
              >
                Blacklist ({blacklist.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Input
                type="search"
                placeholder={activeTab === 'whitelist' ? 'Search whitelist...' : 'Search blacklist...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
              <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Entry
              </Button>
            </div>

            {activeTab === 'whitelist' ? (
              <div className="space-y-4">
                {isLoading ? (
                  <>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border border-slate-200 rounded-lg p-4 animate-pulse">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="h-5 bg-slate-200 rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
                            <div className="flex gap-2 mt-2">
                              <div className="h-6 bg-slate-200 rounded w-16"></div>
                              <div className="h-6 bg-slate-200 rounded w-20"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : filteredWhitelist.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-500">No whitelist entries found</p>
                  </div>
                ) : (
                  filteredWhitelist.map((entry) => (
                    <div
                      key={entry.id}
                      className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900">{entry.title}</h3>
                          <p className="text-sm text-slate-600 mt-1">{entry.author}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded">{entry.type}</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">{entry.platform}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Added by {entry.addedBy}</p>
                          <p className="text-xs text-slate-400 mt-1">{new Date(entry.addedAt).toLocaleDateString()}</p>
                          <button
                            onClick={() => handleDelete(entry.id, 'whitelist')}
                            className="mt-2 text-xs text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      {entry.reason && (
                        <p className="text-sm text-slate-600 mt-2 pt-2 border-t border-slate-200">{entry.reason}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {isLoading ? (
                  <>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border border-slate-200 rounded-lg p-4 animate-pulse">
                        <div className="h-5 bg-slate-200 rounded w-1/3 mb-2"></div>
                        <div className="flex gap-2 mt-2">
                          <div className="h-6 bg-slate-200 rounded w-16"></div>
                          <div className="h-6 bg-slate-200 rounded w-20"></div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : filteredBlacklist.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-500">No blacklist entries found</p>
                  </div>
                ) : (
                  filteredBlacklist.map((entry) => (
                    <div
                      key={entry.id}
                      className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900">{entry.keyword}</h3>
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">{entry.type}</span>
                            <span className={`px-2 py-1 text-xs rounded ${
                              entry.severity === 'critical' ? 'bg-red-100 text-red-800' :
                              entry.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {entry.severity}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Added by {entry.addedBy}</p>
                          <p className="text-xs text-slate-400 mt-1">{new Date(entry.addedAt).toLocaleDateString()}</p>
                          <button
                            onClick={() => handleDelete(entry.id, 'blacklist')}
                            className="mt-2 text-xs text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Add Entry Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={activeTab === 'whitelist' ? 'Add to Whitelist' : 'Add to Blacklist'}
        description={activeTab === 'whitelist' ? 'Add approved content to the whitelist' : 'Add blocked keyword to the blacklist'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'whitelist' ? (
            <>
              <Input
                label="Title"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Content title"
              />
              <Input
                label="Author"
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                placeholder="Author/Creator"
              />
              <Input
                label="Platform"
                id="platform"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                required
                placeholder="Platform name"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Content Type <span className="text-red-500">*</span>
                </label>
                <select
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
                </select>
              </div>
              <Input
                label="Reason (Optional)"
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Why is this whitelisted?"
              />
            </>
          ) : (
            <>
              <Input
                label="Keyword"
                id="keyword"
                value={formData.keyword}
                onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                required
                placeholder="Keyword to block"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Content Type <span className="text-red-500">*</span>
                </label>
                <select
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
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Severity <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
                >
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Entry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}