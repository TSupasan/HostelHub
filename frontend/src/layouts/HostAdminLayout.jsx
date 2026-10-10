import React from 'react';
import { 
  LayoutDashboard, Users, Home, BedDouble, 
  Wrench, LogOut, ShieldAlert, Bell, User 
} from 'lucide-react';
import '../App.css'; // CSS එක Import කරන්න

const HostAdminLayout = ({ children }) => {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Students', icon: Users },
    { label: 'Accommodation', icon: Home },
    { label: 'Rooms', icon: BedDouble },
    { label: 'Complaints & Maint.', icon: Wrench },
    { label: 'Entry / Exit', icon: LogOut },
    { label: 'Permissions', icon: ShieldAlert },
    { label: 'Notices', icon: Bell },
    { label: 'Profile', icon: User }
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-badge">HUB</div>
          <div>
            <h2 className="logo-title">HostelHub</h2>
            <span className="logo-subtitle">Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>

        <button className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-title-container">
            <h1 className="top-title">Hostel Admin Dashboard</h1>
            <span className="hostel-badge">Hostel A</span>
          </div>

          <div className="user-profile">
            <div className="bell-icon">
              <Bell size={20} color="#555" />
            </div>
            <div className="user-info">
              <div className="avatar">SK</div>
              <div>
                <div className="user-name">Dr. S. Kumar</div>
                <div className="user-role">Warden</div>
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default HostAdminLayout;