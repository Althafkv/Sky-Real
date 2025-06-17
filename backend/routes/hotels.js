// routes/hotels.js - Hotel Routes
const express = require('express');
const { hotels } = require('../models/data');

const router = express.Router();

// Get all hotels with filtering
router.get('/', (req, res) => {
  try {
    const { search, minPrice, maxPrice, minRating, location } = req.query;
    
    let filteredHotels = [...hotels];

    // Apply filters
    if (search) {
      filteredHotels = filteredHotels.filter(hotel =>
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.price >= parseInt(minPrice));
    }

    if (maxPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.price <= parseInt(maxPrice));
    }

    if (minRating) {
      filteredHotels = filteredHotels.filter(hotel => hotel.rating >= parseFloat(minRating));
    }

    if (location) {
      filteredHotels = filteredHotels.filter(hotel =>
        hotel.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    res.json({
      success: true,
      hotels: filteredHotels,
      count: filteredHotels.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single hotel by ID
router.get('/:id([0-9]+)', (req, res) => {
  try {
    const hotel = hotels.find(h => h.id === parseInt(req.params.id));
    
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.json({
      success: true,
      hotel
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;