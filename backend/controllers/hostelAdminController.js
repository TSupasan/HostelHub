// Controller for Hostel Admin Dashboard summary
const getAdminDashboardSummary = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Hostel Admin Dashboard Data Retrieved Successfully",
      data: {
        totalRooms: 50,
        occupiedRooms: 35,
        pendingComplaints: 5,
        totalStudents: 120
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAdminDashboardSummary
};