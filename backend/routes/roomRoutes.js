const express = require('express');
const router = express.Router();
const { getAllRooms, createRoom } = require('../controllers/roomController');

router.get('/', getAllRooms);
router.post('/', createRoom);

module.exports = router;