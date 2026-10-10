import React, { useState, useEffect } from 'react';
import { fetchRooms, addRoomApi } from '../services/roomService';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [loading, setLoading] = useState(true);

  // Load existing rooms from backend on initial mount
  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const res = await fetchRooms();
      if (res.success) {
        setRooms(res.data);
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (!roomNumber || !capacity) return;

    try {
      const newRoomData = { roomNumber, capacity };
      const res = await addRoomApi(newRoomData);

      if (res.success) {
        setRooms([...rooms, res.data]);
        setRoomNumber('');
        setCapacity('');
      }
    } catch (err) {
      console.error("Error adding room:", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Room Management</h2>
      
      {/* Add Room Form */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Add New Room</h3>
        <form onSubmit={handleAddRoom}>
          <input
            type="text"
            placeholder="Room Number (e.g. A-101)"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            style={{ padding: '8px', marginRight: '10px' }}
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            style={{ padding: '8px', marginRight: '10px' }}
            required
          />
          <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Add Room
          </button>
        </form>
      </div>

      {/* Rooms Table */}
      <h3>Hostel Rooms List</h3>
      {loading ? (
        <p>Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <p>No rooms added yet. Add a room using the form above.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>ID</th>
              <th>Room Number</th>
              <th>Capacity</th>
              <th>Occupied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.roomNumber}</td>
                <td>{room.capacity}</td>
                <td>{room.occupied}</td>
                <td>
                  <span style={{ color: room.status === 'Available' ? 'green' : 'red' }}>
                    {room.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoomManagement;