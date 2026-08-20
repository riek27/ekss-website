'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminUsers, addAdminUser, deleteAdminUser, isAdmin } from '@/app/actions';

export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ username: '', displayName: '', password: '', role: 'editor' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkAccess() {
      const admin = await isAdmin();
      if (!admin) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }
      setIsAdminUser(true);
      await loadUsers();
      setLoading(false);
    }
    checkAccess();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAdminUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const form = new FormData();
    form.append('username', formData.username);
    form.append('displayName', formData.displayName);
    form.append('password', formData.password);
    form.append('role', formData.role);

    const result = await addAdminUser(form);
    if (result.success) {
      setMessage('✅ User added successfully');
      setFormData({ username: '', displayName: '', password: '', role: 'editor' });
      setShowForm(false);
      await loadUsers();
    } else {
      setError('❌ ' + result.error);
    }
  };

  const handleDelete = async (username: string) => {
    if (!confirm(`Delete user "${username}"?`)) return;
    const result = await deleteAdminUser(username);
    if (result.success) {
      setMessage('✅ User deleted');
      await loadUsers();
    } else {
      setError('❌ ' + result.error);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (accessDenied) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <span className="text-5xl mb-4 block">🔒</span>
        <h1 className="text-2xl font-bold text-deep-forest mb-2">Access Denied</h1>
        <p className="text-gray-500">Only administrators can manage users.</p>
        <button
          onClick={() => router.push('/admin')}
          className="mt-6 px-6 py-3 bg-emerald-green text-white rounded-full font-semibold hover:bg-deep-forest transition"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-deep-forest">Admin Users</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-emerald-green text-white rounded-full font-semibold hover:bg-deep-forest transition"
        >
          {showForm ? 'Close Form' : '+ Add User'}
        </button>
      </div>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {showForm && (
        <form onSubmit={handleAddUser} className="bg-white rounded-2xl shadow-sm border p-6 mb-6 space-y-4">
          <h2 className="font-bold text-lg text-deep-forest">New User</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Display Name</label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              minLength={8}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-green text-white rounded-full font-semibold hover:bg-deep-forest transition"
          >
            Create User
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">Username</th>
              <th className="px-6 py-3 font-medium text-gray-500">Display Name</th>
              <th className="px-6 py-3 font-medium text-gray-500">Role</th>
              <th className="px-6 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.username}>
                <td className="px-6 py-4 font-medium text-deep-forest">{user.username}</td>
                <td className="px-6 py-4">{user.displayName}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-emerald-green/10 text-emerald-green' : 'bg-gray-100 text-gray-600'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {user.username !== 'empowerkids' && (
                    <button
                      onClick={() => handleDelete(user.username)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p className="text-center py-8 text-gray-400">No users found</p>}
      </div>
    </div>
  );
}