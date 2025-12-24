'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Issue {
  id: string;
  title: string;
  description: string;
  type: string;
  priority: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Cloud Security', // Default
    priority: 'Medium'
  });

  // 1. Load User & Issues on Mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchIssues();
  }, [router]);

  // 2. Fetch Issues from API
  const fetchIssues = async () => {
    try {
      const res = await fetch('/api/issues');
      if (res.ok) {
        const data = await res.json();
        setIssues(data);
      }
    } catch (error) {
      console.error("Failed to load issues", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Create Issue
  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ title: '', description: '', type: 'Cloud Security', priority: 'Medium' }); // Reset form
        fetchIssues(); // Refresh list
      } else {
        alert("Failed to create issue");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-500">ApniSec Dashboard</h1>
            <p className="text-slate-400">Welcome, {user.name}</p>
          </div>
          <div className="flex gap-4">
             <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              {showForm ? 'Cancel' : '+ New Issue'}
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('user');
                // Optional: Call logout API to clear cookie
                router.push('/login');
              }}
              className="bg-red-500/10 text-red-400 border border-red-500/50 px-4 py-2 rounded-lg hover:bg-red-500/20 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-sm font-medium">Total Issues</h3>
            <p className="text-3xl font-bold text-white mt-1">{issues.length}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-sm font-medium">Open Issues</h3>
            <p className="text-3xl font-bold text-yellow-500 mt-1">
              {issues.filter(i => i.status === 'Open').length}
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
             <h3 className="text-slate-400 text-sm font-medium">Security Score</h3>
             <p className="text-3xl font-bold text-green-500 mt-1">
               {Math.max(100 - (issues.length * 5), 0)}%
             </p>
          </div>
        </div>

        {/* Create Issue Form (Conditional) */}
        {showForm && (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-xl font-semibold mb-4">Report New Security Issue</h2>
            <form onSubmit={handleCreateIssue} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-1">Title</label>
                <input 
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Type</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option>Cloud Security</option>
                  <option>Reteam Assessment</option>
                  <option>VAPT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Priority</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  value={formData.priority}
                  onChange={e => setFormData({...formData, priority: e.target.value})}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-1">Description</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition">
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Issues List */}
        <h2 className="text-xl font-semibold mb-4">Recent Issues</h2>
        <div className="space-y-4">
          {loading ? (
            <p className="text-slate-500">Loading issues...</p>
          ) : issues.length === 0 ? (
            <div className="text-center p-8 bg-slate-800/50 rounded-xl border border-slate-700 border-dashed">
              <p className="text-slate-400">No issues found. Good job!</p>
            </div>
          ) : (
            issues.map((issue) => (
              <div key={issue.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center hover:border-blue-500/50 transition">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      issue.type === 'VAPT' ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 
                      issue.type === 'Cloud Security' ? 'bg-blue-500/10 border-blue-500 text-blue-400' :
                      'bg-orange-500/10 border-orange-500 text-orange-400'
                    }`}>
                      {issue.type}
                    </span>
                    <h3 className="font-semibold text-white">{issue.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400">{issue.description}</p>
                </div>
                <div className="text-right">
                   <span className={`text-xs font-bold ${
                     issue.priority === 'High' || issue.priority === 'Critical' ? 'text-red-400' : 'text-slate-500'
                   }`}>
                     {issue.priority}
                   </span>
                   <p className="text-xs text-slate-500 mt-1">
                     {new Date(issue.createdAt).toLocaleDateString()}
                   </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}