const express = require('express');
const router = express.Router();
const { getAdminDashboardSummary } = require('../controllers/hostelAdminController');

// Route for admin dashboard summary
router.get('/dashboard-summary', getAdminDashboardSummary);

module.exports = router;