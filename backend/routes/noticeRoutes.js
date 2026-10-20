const express = require('express');
const router = express.Router();
const { getAllNotices, createNotice } = require('../controllers/noticeController');

router.get('/', getAllNotices);
router.post('/', createNotice);

module.exports = router;