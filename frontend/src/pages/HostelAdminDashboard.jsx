import React from 'react';
import HostAdminLayout from '../layouts/HostAdminLayout';
import { Users, Building, BedDouble, Home, ArrowRight, Clock } from 'lucide-react';
import '../App.css';

const HostelAdminDashboard = () => {
  return (
    <HostAdminLayout>
      {/* Hero Banner */}
      <div className="hero-banner">
        <h2>Hostel A — Hostel Administration</h2>
        <p>Overview and monitoring dashboard</p>
        <span className="date-badge">Hostel Management Portal</span>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid-4">
        <div className="card">
          <div className="stat-icon" style={{ backgroundColor: '#cbb26a20' }}>
            <Users size={20} color="#cbb26a" />
          </div>
          <div className="stat-label">Total Residents</div>
          <div className="stat-value">--</div>
        </div>

        <div className="card">
          <div className="stat-icon" style={{ backgroundColor: '#2d144220' }}>
            <Building size={20} color="#2d1442" />
          </div>
          <div className="stat-label">Total Rooms</div>
          <div className="stat-value">--</div>
        </div>

        <div className="card">
          <div className="stat-icon" style={{ backgroundColor: '#cbb26a20' }}>
            <BedDouble size={20} color="#cbb26a" />
          </div>
          <div className="stat-label">Available Spaces</div>
          <div className="stat-value">--</div>
        </div>

        <div className="card">
          <div className="stat-icon" style={{ backgroundColor: '#2d144220' }}>
            <Home size={20} color="#2d1442" />
          </div>
          <div className="stat-label">Current Occupancy</div>
          <div className="stat-value">--%</div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid-2">
        {/* Floor Occupancy */}
        <div className="card">
          <div className="card-header">
            <h3>Floor Occupancy</h3>
            <span className="link-btn">View Rooms</span>
          </div>
          <p className="empty-text">No floor occupancy data available.</p>
        </div>

        {/* Attention Required */}
        <div className="card">
          <div className="card-header">
            <h3>Attention Required</h3>
          </div>
          <p className="empty-text">No pending action items.</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid-2">
        {/* Hostel Alerts */}
        <div className="card">
          <div className="card-header">
            <h3>Hostel Alerts</h3>
            <span className="link-btn">View All</span>
          </div>
          <p className="empty-text">No recent alerts.</p>
        </div>

        {/* Today's Activity */}
        <div className="card">
          <div className="card-header">
            <h3>Today's Hostel Activity</h3>
          </div>
          <p className="empty-text">No activities recorded for today.</p>
        </div>
      </div>

      {/* Recent Notices */}
      <div className="card">
        <div className="card-header">
          <h3>Recent Notices</h3>
          <span className="link-btn">View All Notices</span>
        </div>
        <p className="empty-text">No published notices.</p>
      </div>
    </HostAdminLayout>
  );
};

export default HostelAdminDashboard;