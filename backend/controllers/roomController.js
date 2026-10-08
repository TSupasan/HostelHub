// Global memory storage during runtime (replaces database until MongoDB is added)
let roomsList = [];

// Get all rooms
const getAllRooms = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: roomsList
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Create a new room dynamically
const createRoom = (req, res) => {
  try {
    const { roomNumber, capacity } = req.body;

    if (!roomNumber || !capacity) {
      return res.status(400).json({ success: false, message: 'Please provide all details' });
    }

    const newRoom = {
      id: roomsList.length + 1,
      roomNumber,
      capacity: Number(capacity),
      occupied: 0,
      status: 'Available'
    };

    roomsList.push(newRoom);

    res.status(201).json({
      success: true,
      message: 'Room added successfully',
      data: newRoom
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllRooms,
  createRoom
};