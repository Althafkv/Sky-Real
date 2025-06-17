import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Heart,
  Filter,
  Menu,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { MdHomeWork } from "react-icons/md";

// Toast Component
const Toast = ({ message, type, onClose, show }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
          type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-80">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Booking Success Page Component
const BookingSuccessPage = ({ booking, onBackToHome }) => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={32} className="text-white" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Booking Confirmed!
      </h1>
      <p className="text-gray-600 mb-8">
        Your reservation has been successfully processed.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
        <h3 className="font-bold text-lg mb-4">Booking Details</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Hotel:</span> {booking.hotelName}
          </p>
          <p>
            <span className="font-medium">Location:</span> {booking.location}
          </p>
          <p>
            <span className="font-medium">Guest Name:</span> {booking.guestName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {booking.email}
          </p>
          <p>
            <span className="font-medium">Check-in:</span> {booking.checkIn}
          </p>
          <p>
            <span className="font-medium">Check-out:</span> {booking.checkOut}
          </p>
          <p>
            <span className="font-medium">Guests:</span> {booking.guests}
          </p>
          <p>
            <span className="font-medium">Booking ID:</span> {booking.bookingId}
          </p>
          <p className="text-lg font-bold text-green-600">
            Total: ${booking.totalPrice}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          A confirmation email has been sent to {booking.email}
        </p>
        <button
          onClick={onBackToHome}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
);

// Wishlist Component
const WishlistPage = ({
  wishlist,
  hotels,
  onRemoveFromWishlist,
  onBookHotel,
  onBackToHome,
}) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Wishlist ({wishlist.length})
        </h1>
        <button
          onClick={onBackToHome}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
        >
          Back to Home
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={64} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
          <p className="text-gray-400">Start adding hotels you love!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((hotelId) => {
            const hotel = hotels.find((h) => h.id === hotelId);
            if (!hotel) return null;

            return (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => onRemoveFromWishlist(hotel.id)}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {hotel.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        ${hotel.price}
                      </div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-gray-600">{hotel.location}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-current"
                      />
                      <span className="font-medium">{hotel.rating}</span>
                    </div>
                    <span className="text-gray-500">
                      ({hotel.reviews} reviews)
                    </span>
                  </div>

                  <button
                    onClick={() => onBookHotel(hotel)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

// Main App Component
const SkyReal = () => {
  // State management
  const [currentPage, setCurrentPage] = useState("home"); // 'home', 'wishlist', 'booking-success'
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Sample hotel data (would come from API in real app)
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
  ];

  // Filter hotels based on search and filters
  useEffect(() => {
    let filtered = hotels.filter((hotel) => {
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const matchesRating =
        selectedRating === 0 || hotel.rating >= selectedRating;
      return matchesSearch && matchesPrice && matchesRating;
    });
    setFilteredHotels(filtered);
  }, [searchQuery, priceRange, selectedRating]);

  // Wishlist functions
  const toggleWishlist = (hotelId) => {
    setWishlist((prev) => {
      const isInWishlist = prev.includes(hotelId);
      const newWishlist = isInWishlist
        ? prev.filter((id) => id !== hotelId)
        : [...prev, hotelId];

      // Show toast
      setToast({
        show: true,
        message: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
        type: "success",
      });

      return newWishlist;
    });
  };

  const removeFromWishlist = (hotelId) => {
    setWishlist((prev) => prev.filter((id) => id !== hotelId));
    setToast({
      show: true,
      message: "Removed from wishlist",
      type: "success",
    });
  };

  // Booking functions
  const handleBooking = (hotel) => {
    setSelectedHotel(hotel);
    setShowBooking(true);
  };

  const submitBooking = async (formData) => {
    try {
      // Simulate API call
      const bookingId = "BK" + Date.now();
      const nights =
        checkIn && checkOut
          ? Math.ceil(
              (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
            )
          : 1;

      const booking = {
        bookingId,
        hotelName: selectedHotel.name,
        location: selectedHotel.location,
        guestName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        checkIn: checkIn || "TBD",
        checkOut: checkOut || "TBD",
        guests,
        totalPrice: selectedHotel.price * nights,
      };

      // Close booking modal
      setShowBooking(false);

      // Show success toast
      setToast({
        show: true,
        message: "Booking confirmed successfully!",
        type: "success",
      });

      // Redirect to success page after toast
      setTimeout(() => {
        setBookingData(booking);
        setCurrentPage("booking-success");
      }, 1000);
    } catch (error) {
      setToast({
        show: true,
        message: "Booking failed. Please try again.",
        type: "error",
      });
    }
  };

  // Utility functions
  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: <Wifi size={16} />,
      parking: <Car size={16} />,
      restaurant: <Coffee size={16} />,
      gym: <Dumbbell size={16} />,
    };
    return icons[amenity] || <div></div>;
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: "", type: "success" });
  };

  // Booking Modal Component
  const BookingModal = ({ hotel, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.fullName || !formData.email) {
        showToast("Please fill in all required fields", "error");
        return;
      }
      onSubmit(formData);
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Book {hotel.name}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">
                Check-in: {checkIn || "Not selected"}
              </p>
              <p className="text-gray-600">
                Check-out: {checkOut || "Not selected"}
              </p>
              <p className="text-gray-600">Guests: {guests}</p>
              <p className="font-bold text-lg mt-2">${hotel.price}/night</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all cursor-pointer"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Render different pages based on current page
  if (currentPage === "booking-success" && bookingData) {
    return (
      <>
        <BookingSuccessPage
          booking={bookingData}
          onBackToHome={() => setCurrentPage("home")}
        />
        <Toast {...toast} onClose={hideToast} />
      </>
    );
  }

  if (currentPage === "wishlist") {
    return (
      <>
        <WishlistPage
          wishlist={wishlist}
          hotels={hotels}
          onRemoveFromWishlist={removeFromWishlist}
          onBookHotel={handleBooking}
          onBackToHome={() => setCurrentPage("home")}
        />
        <Toast {...toast} onClose={hideToast} />
        {showBooking && selectedHotel && (
          <BookingModal
            hotel={selectedHotel}
            onClose={() => setShowBooking(false)}
            onSubmit={submitBooking}
          />
        )}
      </>
    );
  }

  // Main Home Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Toast {...toast} onClose={hideToast} />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <MdHomeWork color="white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sky Real
              </h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentPage("wishlist")}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <Heart size={16} />
                Wishlist ({wishlist.length})
              </button>
            </nav>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <button
                onClick={() => {
                  setCurrentPage("wishlist");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-blue-600"
              >
                <Heart size={16} />
                Wishlist ({wishlist.length})
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Discover Your Perfect Stay
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Book luxury hotels worldwide with unbeatable prices and exceptional
            service
          </p>

          {/* Search Form */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Users
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} Guest{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:shadow-md transition-shadow"
          >
            <Filter size={16} />
            Filters
          </button>

          {showFilters && (
            <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-lg">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-32"
                  />
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Min Rating</label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(Number(e.target.value))}
                  className="px-3 py-1 border rounded-md"
                >
                  <option value={0}>Any</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.8}>4.8+ Stars</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hotels Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleWishlist(hotel.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors cursor-pointer"
                >
                  <Heart
                    size={20}
                    className={
                      wishlist.includes(hotel.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-600"
                    }
                  />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {hotel.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ${hotel.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-600">{hotel.location}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="font-medium">{hotel.rating}</span>
                  </div>
                  <span className="text-gray-500">
                    ({hotel.reviews} reviews)
                  </span>
                </div>

                <p className="text-gray-600 mb-4 text-sm">
                  {hotel.description}
                </p>

                <div className="flex items-center gap-3 mb-6">
                  {hotel.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-1 text-gray-500"
                    >
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleBooking(hotel)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No hotels found matching your criteria.
            </p>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {showBooking && selectedHotel && (
        <BookingModal
          hotel={selectedHotel}
          onClose={() => setShowBooking(false)}
          onSubmit={submitBooking}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-gray-700 text-center text-gray-400">
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-4 justify-center cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center ">
                  <MdHomeWork color="white" />
                </div>
                <h3 className="text-xl font-bold text-white">Sky Real</h3>
              </div>
              <p className="text-gray-400">
                Your gateway to extraordinary travel experiences worldwide.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sky Real. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkyReal;
