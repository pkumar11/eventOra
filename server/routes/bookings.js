const express = require('express');
const router = express.Router();
const { bookEvent, confirmBooking, getMyBookings, cancelBooking, sendBookingOTP } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

// Route to send OTP for booking confirmation
router.post('/send-otp', protect, sendBookingOTP);

// Route to book an event (requires OTP verification)
router.post('/', protect, bookEvent);

// Admin route to confirm booking after payment verification
router.put('/:id/confirm', protect, admin, confirmBooking);

// Route to get user's own bookings or all bookings for admin
router.get('/my', protect, getMyBookings);

// Route to cancel a booking (user can cancel their own booking, admin can cancel any booking)
router.delete('/:id', protect, cancelBooking);

module.exports = router;