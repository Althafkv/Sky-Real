// routes/bookings.js - Booking Routes
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { hotels, bookings } = require('../models/data');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create a new booking
router.post('/', authenticateToken, (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, guests, guestName, email, phone } = req.body;

    // Validate hotel exists
    const hotel = hotels.find(h => h.id === parseInt(hotelId));
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // Calculate nights and total price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = hotel.price * nights;

    // Create booking
    const booking = {
      id: uuidv4(),
      bookingId: 'BK' + Date.now(),
      userId: req.user.userId,
      hotelId: parseInt(hotelId),
      hotelName: hotel.name,
      location: hotel.location,
      checkIn,
      checkOut,
      guests: parseInt(guests),
      nights,
      pricePerNight: hotel.price,
      totalPrice,
      guestName,
      email,
      phone,
      status: 'confirmed',
      createdAt: new Date()
    };

    bookings.push(booking);

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all bookings for authenticated user
router.get('/', authenticateToken, (req, res) => {
  try {
    const userBookings = bookings.filter(booking => booking.userId === req.user.userId);
    
    res.json({
      success: true,
      bookings: userBookings
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single booking by ID
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = bookings.find(b => b.id === bookingId && b.userId === req.user.userId);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;