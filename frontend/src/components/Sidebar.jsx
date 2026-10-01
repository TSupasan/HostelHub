import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { NAV } from '../nav.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/logo.svg" alt="University of Vavuniya crest" />
        <div>
          <strong>HostelHub</strong>
          <span>Student</span>
        </div>
      </div>

      <nav className="nav" aria-label="Main">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <button className="logout" onClick={logout}>
        <LogOut size={18} aria-hidden="true" />
        Logout
      </button>
    </aside>
  );
}
