import React, { useState, useEffect } from 'react';
import HostAdminLayout from '../layouts/HostAdminLayout';
import '../App.css';

const StudentAccommodation = () => {
  const [allocations, setAllocations] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllocations();
  }, []);

  const loadAllocations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hostel-admin/accommodation');
      const res = await response.json();
      if (res.success) {
        setAllocations(res.data);
      }
    } catch (err) {
      console.error("Error fetching allocations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAllocate = async (e) => {
    e.preventDefault();
    if (!studentName || !studentId || !roomNumber) return;

    try {
      const response = await fetch('http://localhost:5000/api/hostel-admin/accommodation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName, studentId, roomNumber })
      });
      const res = await response.json();

      if (res.success) {
        setAllocations([...allocations, res.data]);
        setStudentName('');
        setStudentId('');
        setRoomNumber('');
      }
    } catch (err) {
      console.error("Error allocating room:", err);
    }
  };

  return (
    <HostAdminLayout>
      <div className="card" style={{ marginBottom: '25px' }}>
        <h2>Student Accommodation & Room Allocation</h2>
        <p style={{ color: '#666' }}>Assign rooms to students and monitor active stays.</p>
      </div>

      {/* Allocation Form */}
      <div className="card" style={{ marginBottom: '25px' }}>
        <h3>Allocate Room to Student</h3>
        <form onSubmit={handleAllocate} style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', flex: 1 }}
            required
          />
          <input
            type="text"
            placeholder="Student ID (e.g. ST/2023/001)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', flex: 1 }}
            required
          />
          <input
            type="text"
            placeholder="Room Number (e.g. A-101)"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', flex: 1 }}
            required
          />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2d1442', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Allocate Room
          </button>
        </form>
      </div>

      {/* Allocations Table */}
      <div className="card">
        <h3>Current Room Allocations</h3>
        {loading ? (
          <p className="empty-text">Loading allocations...</p>
        ) : allocations.length === 0 ? (
          <p className="empty-text">No active room allocations found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f5f7', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>Student Name</th>
                <th style={{ padding: '12px' }}>Student ID</th>
                <th style={{ padding: '12px' }}>Room Number</th>
                <th style={{ padding: '12px' }}>Allocated Date</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{item.id}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.studentName}</td>
                  <td style={{ padding: '12px' }}>{item.studentId}</td>
                  <td style={{ padding: '12px', color: '#cbb26a', fontWeight: 'bold' }}>{item.roomNumber}</td>
                  <td style={{ padding: '12px', color: '#777' }}>{item.allocatedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </HostAdminLayout>
  );
};

export default StudentAccommodation;