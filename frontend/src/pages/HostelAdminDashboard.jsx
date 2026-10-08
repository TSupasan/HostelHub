import React from 'react';

const HostelAdminDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Hostel Admin Dashboard</h1>
      <p>Welcome to the Hostel Admin Management Portal.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>Room Management</h3>
          <p>Manage hostel rooms and availability.</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>Student Accommodation</h3>
          <p>Assign rooms and manage student stays.</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>Complaints</h3>
          <p>View and resolve student complaints.</p>
        </div>
      </div>
    </div>
  );
};

export default HostelAdminDashboard;