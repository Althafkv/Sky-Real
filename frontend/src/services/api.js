import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '/api' : 'https://sky-real.vercel.app/api');

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

export const hotelAPI = {
  getHotels: (params) => api.get('/hotels', { params }),
  getHotel: (id) => api.get(`/hotels/${id}`),
};

export const bookingAPI = {
  createGuestBooking: (details) => api.post('/bookings/guest', details),
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getBookings: () => api.get('/bookings'),
  getBooking: (id) => api.get(`/bookings/${id}`),
};

export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (hotelId) => api.post(`/wishlist/${hotelId}`),
  removeFromWishlist: (hotelId) => api.delete(`/wishlist/${hotelId}`),
};

export default api;
