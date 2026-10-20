// Runtime storage for notices
let noticesList = [
  { id: 1, title: 'Water Supply Maintenance', tag: 'Urgent', description: 'Water supply will be interrupted on Sep 20.', date: '2026-09-19' },
  { id: 2, title: 'Hostel Day Celebration', tag: 'Event', description: 'Annual hostel celebration on Oct 5.', date: '2026-09-18' }
];

// Get all notices
const getAllNotices = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: noticesList
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Create a new notice
const createNotice = (req, res) => {
  try {
    const { title, tag, description } = req.body;

    if (!title || !tag || !description) {
      return res.status(400).json({ success: false, message: 'Please provide all details' });
    }

    const newNotice = {
      id: noticesList.length + 1,
      title,
      tag,
      description,
      date: new Date().toISOString().split('T')[0]
    };

    noticesList.push(newNotice);

    res.status(201).json({
      success: true,
      message: 'Notice published successfully',
      data: newNotice
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllNotices,
  createNotice
};