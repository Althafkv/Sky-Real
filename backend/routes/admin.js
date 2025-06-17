// routes/admin.js - Admin Routes
const express = require('express');
const { users, hotels, bookings, wishlists } = require('../models/data');

const router = express.Router();

// Get system statistics (for testing/management)
router.get('/stats', (req, res) => {
  try {
    res.json({
      success: true,
      stats: {
        totalUsers: users.length,
        totalHotels: hotels.length,
        totalBookings: bookings.length,
        totalWishlists: wishlists.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;