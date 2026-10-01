import { Outlet, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import Sidebar from './Sidebar.jsx';
import { NAV } from '../nav.js';
import { useAuth } from '../context/AuthContext.jsx';

const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

export default function StudentLayout() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const title = NAV.find((n) => n.to === pathname)?.label ?? 'Dashboard';

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">
        <header className="topbar">
          <h1>{title}</h1>
          <div className="topbar-right">
            <button className="icon-btn" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <div className="avatar" aria-hidden="true">{initials(user.name)}</div>
            <div className="who">
              <strong>{user.name}</strong>
              <span>{user.role[0].toUpperCase() + user.role.slice(1)}</span>
            </div>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
