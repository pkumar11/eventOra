const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getEvents);

// Public route to get event details by ID
router.get('/:id', getEventById);

// Admin route for creating a new event
router.post('/', protect, admin, createEvent);

// Admin routes for updating and deleting events
router.put('/:id', protect, admin, updateEvent);

// Admin route for deleting an event
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;