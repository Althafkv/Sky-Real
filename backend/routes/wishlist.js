// routes/wishlist.js - Wishlist Routes
const express = require('express');
const { hotels, wishlists } = require('../models/data');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user's wishlist
router.get('/', authenticateToken, (req, res) => {
  try {
    const userWishlist = wishlists.find(w => w.userId === req.user.userId);
    const hotelIds = userWishlist ? userWishlist.hotelIds : [];
    
    // Get hotel details for wishlist items
    const wishlistHotels = hotels.filter(hotel => hotelIds.includes(hotel.id));

    res.json({
      success: true,
      wishlist: hotelIds,
      hotels: wishlistHotels
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add hotel to wishlist
router.post('/:hotelId([0-9]+)', authenticateToken, (req, res) => {
  try {
    const hotelId = parseInt(req.params.hotelId);
    const userId = req.user.userId;

    // Check if hotel exists
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // Find or create user wishlist
    let userWishlist = wishlists.find(w => w.userId === userId);
    if (!userWishlist) {
      userWishlist = { userId, hotelIds: [] };
      wishlists.push(userWishlist);
    }

    // Add to wishlist if not already present
    if (!userWishlist.hotelIds.includes(hotelId)) {
      userWishlist.hotelIds.push(hotelId);
      res.json({
        success: true,
        message: 'Hotel added to wishlist',
        wishlist: userWishlist.hotelIds
      });
    } else {
      res.json({
        success: true,
        message: 'Hotel already in wishlist',
        wishlist: userWishlist.hotelIds
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove hotel from wishlist
router.delete('/:hotelId([0-9]+)', authenticateToken, (req, res) => {
  try {
    const hotelId = parseInt(req.params.hotelId);
    const userId = req.user.userId;

    // Find user wishlist
    const userWishlist = wishlists.find(w => w.userId === userId);
    if (!userWishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    // Remove from wishlist
    userWishlist.hotelIds = userWishlist.hotelIds.filter(id => id !== hotelId);

    res.json({
      success: true,
      message: 'Hotel removed from wishlist',
      wishlist: userWishlist.hotelIds
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;