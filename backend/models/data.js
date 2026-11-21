// models/data.js - In-memory data storage (replace with MongoDB in production)

// Users storage
let users = [];

// Hotels storage with sample data
const hotels = [
    {
      id: 1,
      name: "Luxury Paradise Resort",
      location: "Maldives",
      price: 450,
      rating: 4.9,
      reviews: 1247,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      amenities: ["wifi", "parking", "restaurant", "gym"],
      description:
        "Overwater villas with pristine ocean views and world-class service.",
    },
    {
      id: 2,
      name: "Urban Sky Tower",
      location: "New York, USA",
      price: 280,
      rating: 4.7,
      reviews: 892,
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
      amenities: ["wifi", "restaurant", "gym"],
      description:
        "Modern luxury in the heart of Manhattan with skyline views.",
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Swiss Alps, Switzerland",
      price: 320,
      rating: 4.8,
      reviews: 654,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      amenities: ["wifi", "parking", "restaurant"],
      description: "Cozy alpine retreat with breathtaking mountain panoramas.",
    },
    {
      id: 4,
      name: "Beachfront Oasis",
      location: "Santorini, Greece",
      price: 380,
      rating: 4.6,
      reviews: 1023,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      amenities: ["wifi", "restaurant", "gym"],
      description: "Whitewashed elegance overlooking the Aegean Sea.",
    },
    {
      id: 5,
      name: "Desert Mirage Hotel",
      location: "Dubai, UAE",
      price: 520,
      rating: 4.9,
      reviews: 876,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      amenities: ["wifi", "parking", "restaurant", "gym"],
      description: "Opulent desert luxury with gold-class amenities.",
    },
    {
      id: 6,
      name: "Tropical Garden Resort",
      location: "Bali, Indonesia",
      price: 195,
      rating: 4.5,
      reviews: 743,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww",
      amenities: ["wifi", "parking", "restaurant"],
      description: "Serene tropical paradise surrounded by lush gardens.",
    },
    {
      id: 7,
      name: "Indian Cruiz",
      location: "Mumbai, India",
      price: 240,
      rating: 4.8,
      reviews: 863,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww",
      amenities: ["pool", "restaurant", "gym"],
      description: "Best Scenario and Indian Foods.",
    },
    {
      id: 8,
      name: "Leyband Hotel",
      location: "Dubai, UAE",
      price: 600,
      rating: 4.9,
      reviews: 300,
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww",
      amenities: ["wifi", "parking", "restaurant", "gym"],
      description: "Opulent desert luxury with gold-class amenities.",
    },
    {
      id: 9,
      name: "Drake Stan",
      location: "Liverpool, England",
      price: 670,
      rating: 4.5,
      reviews: 743,
      image:
        "https://images.unsplash.com/photo-1590447158019-883d8d5f8bc7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      amenities: ["wifi", "parking", "restaurant"],
      description: "Serene tropical paradise surrounded by lush gardens.",
    },
  ].map(hotel => ({ ...hotel, availability: true }));

// Bookings storage
let bookings = [];

// Wishlists storage
let wishlists = []; // { userId, hotelIds: [] }

module.exports = {
  users,
  hotels,
  bookings,
  wishlists
};
