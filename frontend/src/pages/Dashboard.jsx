import { useCallback, useEffect, useState } from 'react';
import { BedSingle, Building2, ClipboardList, Wrench } from 'lucide-react';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import StatCard from '../components/StatCard.jsx';
import FormModal from '../components/FormModal.jsx';

const BADGE = { Urgent: 'red', Event: 'gold', Info: 'plum', 'In Progress': 'gold', Submitted: 'plum', Resolved: 'green' };

const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const COMPLAINT_FIELDS = [
  { name: 'title', label: 'What is the problem?', type: 'text', required: true },
  { name: 'description', label: 'Details (optional)', type: 'textarea' },
];

const PERMISSION_FIELDS = [
  { name: 'type', label: 'Permission type', type: 'select', options: ['Late Entry', 'Guest Visit', 'Leave'] },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'reason', label: 'Reason', type: 'textarea', required: true },
];

export default function Dashboard() {
  const { logout } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null); // 'complaint' | 'permission' | null

  const load = useCallback(() => {
    api('/student/dashboard')
      .then(setData)
      .catch((err) => (err.status === 401 ? logout() : setError(err.message)));
  }, [logout]);

  useEffect(() => {
    load();
  }, [load]);

  if (error) return <p className="form-error" role="alert">{error}</p>;
  if (!data) return <p className="muted">Loading your dashboard...</p>;

  const { user, stats, notices, complaints } = data;
  const fmtStatus = (s) => <span className={`badge ${BADGE[s]}`}>{s}</span>;

  return (
    <>
      <section className="welcome">
        <h2>Welcome back, {user.name.split(' ')[0]}!</h2>
        <p>Here is your hostel overview for today.</p>
        <time>{today}</time>
      </section>

      <section className="stats" aria-label="Summary">
        <StatCard icon={BedSingle} label="Room Number" value={stats.room} tone="gold" />
        <StatCard icon={Building2} label="Block / Hall" value={stats.block} tone="plum" />
        <StatCard icon={Wrench} label="Active Complaints" value={stats.activeComplaints} tone="gold" />
        <StatCard icon={ClipboardList} label="Pending Permissions" value={stats.pendingPermissions} tone="plum" />
      </section>

      <div className="columns">
        <section className="card">
          <div className="card-head">
            <h3 className="card-title">Recent Notices</h3>
            <span className="muted small">{notices.length} updates</span>
          </div>
          <ul className="list">
            {notices.map((n) => (
              <li key={n._id} className="item">
                <div className="item-head">
                  <strong>{n.title}</strong>
                  <span className={`badge ${BADGE[n.category]}`}>{n.category}</span>
                </div>
                <p>{n.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="side">
          <section className="card">
            <div className="card-head">
              <h3 className="card-title">My Complaints</h3>
              <span className="muted small">{complaints.length} recent</span>
            </div>
            <ul className="list">
              {complaints.length === 0 && <li className="muted small">No complaints yet.</li>}
              {complaints.map((c) => (
                <li key={c._id} className="item">
                  <div className="item-head">
                    <strong>{c.title}</strong>
                    {fmtStatus(c.status)}
                  </div>
                  <p>{c.note}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h3 className="card-title">Quick Actions</h3>
            <div className="actions">
              <button className="btn btn-primary" onClick={() => setModal('complaint')}>Submit Complaint</button>
              <button className="btn btn-outline" onClick={() => setModal('permission')}>Request Permission</button>
            </div>
          </section>
        </div>
      </div>

      {modal === 'complaint' && (
        <FormModal
          title="Submit Complaint"
          fields={COMPLAINT_FIELDS}
          submitLabel="Submit complaint"
          onClose={() => setModal(null)}
          onSubmit={async (v) => {
            await api('/student/complaints', { method: 'POST', body: v });
            load();
          }}
        />
      )}
      {modal === 'permission' && (
        <FormModal
          title="Request Permission"
          fields={PERMISSION_FIELDS}
          submitLabel="Send request"
          onClose={() => setModal(null)}
          onSubmit={async (v) => {
            await api('/student/permissions', { method: 'POST', body: v });
            load();
          }}
        />
      )}
    </>
  );
}
