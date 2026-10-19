import { Link } from 'react-router-dom';
import { BedDouble, Building2, Wrench, ClipboardList } from 'lucide-react';
import { api } from '../services/studentApi';
import { Card, Stat, Load, useAsync, Badge, Empty } from '../components/ui';
import { useAuth } from '../context/auth';
import { fmtDate } from '../services/util';

export default function Dashboard() {
  const { user } = useAuth(); const st = useAsync(() => api.get('/dashboard/student'), []);
  const first = ((user.profile && user.profile.name) || user.username).split(' ')[0];
  return (
    <Load state={st}>{(d) => (
      <>
        <div className="hero"><h2>Welcome back, {first}!</h2><p>Here is your hostel overview for today.</p><small>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</small></div>
        <div className="grid g4">
          <Stat icon={BedDouble} label="Room Number" value={d.room || 'Not allocated'} />
          <Stat icon={Building2} tone="purple" label="Block / Hall" value={d.hostel ? d.hostel.name : '—'} />
          <Stat icon={Wrench} label="Active Complaints" value={d.activeComplaints} />
          <Stat icon={ClipboardList} tone="purple" label="Pending Permissions" value={d.pendingPermissions} />
        </div>
        <div className="grid g21">
          <Card title="Recent Notices" action={<Link className="link" to="/student/notices">View all</Link>}>
            {d.notices.length === 0 ? <Empty text="No notices right now." /> : <div className="stack">{d.notices.map((n) => (
              <div className="item" key={n._id}><div className="row"><strong>{n.title}</strong><Badge tone={n.noticeType === 'Emergency' ? 'red' : n.noticeType === 'Meeting' ? 'gold' : 'purple'}>{n.noticeType}</Badge></div><p>{n.content}</p></div>))}</div>}
          </Card>
          <div className="stack">
            <Card title="My Complaints" action={<span className="muted">{d.complaints.length} recent</span>}>
              {d.complaints.length === 0 ? <Empty text="No complaints submitted." /> : <div className="stack">{d.complaints.map((c) => (
                <div className="item" key={c._id}><div className="row"><strong>{c.title}</strong><Badge>{c.status}</Badge></div><p>Submitted {fmtDate(c.submittedAt)}{c.remarks ? ` · ${c.remarks}` : ''}</p></div>))}</div>}
            </Card>
            <Card title="Quick Actions"><div className="row"><Link to="/student/complaints?new=1"><button className="btn primary">Submit Complaint</button></Link><Link to="/student/permissions?new=1"><button className="btn outline">Request Permission</button></Link></div></Card>
          </div>
        </div>
      </>)}</Load>
  );
}
