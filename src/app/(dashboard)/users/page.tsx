'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Table, Column } from '@/components/table';
import { Button, Input } from '@/components/ui';
import { Modal } from '@/components/ui';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useUsers } from '@/lib/hooks';
import type { User } from '@/types';

const mockUsers: User[] = [
  {
    id: 'user-001',
    email: 'admin@piracyshield.com',
    name: 'Admin User',
    role: 'admin',
    accountTier: 'enterprise',
    createdAt: '2025-01-01T00:00:00Z',
    lastLogin: '2025-04-07T10:30:00Z',
  },
  {
    id: 'user-002',
    email: 'john@example.com',
    name: 'John Smith',
    role: 'moderator',
    accountTier: 'pro',
    createdAt: '2025-02-15T00:00:00Z',
    lastLogin: '2025-04-06T14:20:00Z',
  },
  {
    id: 'user-003',
    email: 'jane@example.com',
    name: 'Jane Doe',
    role: 'viewer',
    accountTier: 'starter',
    createdAt: '2025-03-10T00:00:00Z',
    lastLogin: '2025-04-05T09:15:00Z',
  },
];

const userColumns: Column<User>[] = [
  {
    key: 'name',
    header: 'User',
    sortable: true,
    accessor: (user) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-700 to-teal-500 rounded-full flex items-center justify-center text-white font-medium">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-slate-900">{user.name}</p>
          <p className="text-sm text-slate-600">{user.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    accessor: (user) => (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
        user.role === 'moderator' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {user.role}
      </span>
    ),
  },
  {
    key: 'accountTier',
    header: 'Plan',
    sortable: true,
    accessor: (user) => (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        user.accountTier === 'enterprise' ? 'bg-teal-100 text-teal-800' :
        user.accountTier === 'pro' ? 'bg-blue-100 text-blue-800' :
        user.accountTier === 'starter' ? 'bg-green-100 text-green-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {user.accountTier.charAt(0).toUpperCase() + user.accountTier.slice(1)}
      </span>
    ),
  },
  {
    key: 'lastLogin',
    header: 'Last Login',
    sortable: true,
    accessor: (user) => user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never',
  },
];

export default function UsersPage() {
  const { createUser, editUser, isLoading } = useUsers();
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    plan: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.role || !formData.plan) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const success = await createUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: formData.role,
      plan: formData.plan,
    });
    
    if (success) {
      setIsModalOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', role: '', plan: '' });
    }
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (id: string, updates: any) => {
    const success = await editUser(id, updates);
    if (success) {
      setIsEditModalOpen(false);
      setSelectedUser(null);
    }
    return success;
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
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Users</h1>
            <p className="text-slate-600 mt-1">Manage team members and their permissions</p>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Add User
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {isLoading ? (
            <SkeletonTable rows={5} />
          ) : (
            <Table
              data={mockUsers}
              columns={userColumns}
              searchable
              searchPlaceholder="Search users by name or email..."
              selectable
              onRowSelect={setSelectedRows}
              getRowId={(row) => row.id}
              onRowClick={handleRowClick}
              emptyMessage="No users found"
              aria-label="Users table"
            />
          )}
        </div>
      </motion.div>

      {/* User Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedUser(null);
        }}
        title="User Details"
        description={`Viewing profile for ${selectedUser?.name}`}
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-700 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{selectedUser.name}</h3>
                <p className="text-slate-600">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <label className="text-sm font-medium text-slate-600">Role</label>
                <p className="mt-1">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    selectedUser.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    selectedUser.role === 'moderator' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </span>
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <label className="text-sm font-medium text-slate-600">Plan</label>
                <p className="mt-1">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    selectedUser.accountTier === 'enterprise' ? 'bg-teal-100 text-teal-800' :
                    selectedUser.accountTier === 'pro' ? 'bg-blue-100 text-blue-800' :
                    selectedUser.accountTier === 'starter' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedUser.accountTier.charAt(0).toUpperCase() + selectedUser.accountTier.slice(1)}
                  </span>
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <label className="text-sm font-medium text-slate-600">Member Since</label>
                <p className="mt-1 text-slate-900">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <label className="text-sm font-medium text-slate-600">Last Login</label>
                <p className="mt-1 text-slate-900">
                  {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={handleEditUser}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-lg"
              >
                Edit User
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New User"
        description="Create a new team member account"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              id="first-name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="John"
              required
            />
            <Input
              label="Last Name"
              id="last-name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Smith"
              required
            />
          </div>
          <Input
            label="Email"
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            required
          />
          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-slate-700">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              required
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="plan" className="block text-sm font-medium text-slate-700">
              Plan <span className="text-red-500">*</span>
            </label>
            <select
              id="plan"
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              required
            >
              <option value="">Select plan</option>
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create User
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        title="Edit User"
        description={`Editing user ${selectedUser?.name}`}
        size="md"
      >
        {selectedUser && (
          <form className="space-y-4">
            <Input
              label="Name"
              id="edit-name"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              id="edit-email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              required
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Role</label>
              <select
                value={selectedUser.role}
                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value as any })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              >
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Plan</label>
              <select
                value={selectedUser.accountTier}
                onChange={(e) => setSelectedUser({ ...selectedUser, accountTier: e.target.value as any })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              >
                <option value="free">Free</option>
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)} type="button">
                Cancel
              </Button>
              <Button variant="primary" onClick={() => handleSaveEdit(selectedUser.id, selectedUser)}>
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}