// Runtime storage for allocations (until MongoDB is integrated)
let allocationsList = [];

// Get all room allocations
const getAllAllocations = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: allocationsList
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Allocate room to a student
const allocateRoom = (req, res) => {
  try {
    const { studentName, studentId, roomNumber } = req.body;

    if (!studentName || !studentId || !roomNumber) {
      return res.status(400).json({ success: false, message: 'Please provide student name, ID, and room number' });
    }

    const newAllocation = {
      id: allocationsList.length + 1,
      studentName,
      studentId,
      roomNumber,
      allocatedDate: new Date().toISOString().split('T')[0]
    };

    allocationsList.push(newAllocation);

    res.status(201).json({
      success: true,
      message: 'Student successfully allocated to room',
      data: newAllocation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllAllocations,
  allocateRoom
};