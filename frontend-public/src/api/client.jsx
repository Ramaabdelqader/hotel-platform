import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

// Attach token before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // If token expired or invalid, clear and redirect
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;

// Example API helpers (optional, but recommended)
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);
export const getHotels = (params) => api.get("/hotels", { params });
export const getHotelDetails = (id) => api.get(`/hotels/${id}`);
export const createBooking = (data) => api.post("/bookings", data);
export const getMyBookings = () => api.get("/bookings/me");
export const cancelBooking = (id) => api.patch(`/bookings/${id}/cancel`);
