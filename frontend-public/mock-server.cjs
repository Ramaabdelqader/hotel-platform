// mock-server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());

/* --- In-memory seed data --- */
let users = [
  { id: 1, name: "Rama", email: "rama@example.com", password: "pass123", role: "USER" },
  { id: 2, name: "Manager", email: "manager@example.com", password: "pass123", role: "MANAGER" },
  { id: 3, name: "Admin", email: "admin@example.com", password: "pass123", role: "ADMIN" }
];

let hotels = [
  { id: 1, name: "Amman Grand", city: "Amman", address: "Street 1, Amman", description: "Luxury hotel in Amman", coverImage: "", managerId: 2 },
  { id: 2, name: "Petra Inn", city: "Wadi Musa", address: "Petra Rd", description: "Nearby Petra", coverImage: "" },
  { id: 3, name: "Aqaba Beach Resort", city: "Aqaba", address: "Beach St", description: "Seaside resort", coverImage: "" }
];

let rooms = [
  { id: 101, hotelId: 1, type: "Double", capacity: 2, basePrice: 80, seasonalPrices: [], images: [] },
  { id: 102, hotelId: 1, type: "Family", capacity: 4, basePrice: 140, seasonalPrices: [{ season: "Summer", price: 180 }], images: [] },
  { id: 201, hotelId: 2, type: "Double", capacity: 2, basePrice: 60, seasonalPrices: [], images: [] },
  { id: 301, hotelId: 3, type: "Suite", capacity: 3, basePrice: 200, seasonalPrices: [], images: [] }
];

let bookings = [
  { id: 1, userId: 1, roomId: 101, hotelId: 1, checkIn: "2025-10-01", checkOut: "2025-10-03", guests: 2, status: "CONFIRMED", totalPrice: 160 },
  { id: 2, userId: 1, roomId: 201, hotelId: 2, checkIn: "2025-11-05", checkOut: "2025-11-07", guests: 2, status: "PENDING", totalPrice: 120 }
];

let nextBookingId = 3;

/* --- Helpers --- */
function makeToken(user) { return `mock-token-${user.id}`; }
function getUserFromToken(authHeader) {
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const m = token.match(/^mock-token-(\d+)$/);
  if (!m) return null;
  return users.find(u => u.id === Number(m[1])) || null;
}

/* --- Routes --- */

// POST /api/auth/login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: { message: "Invalid credentials" }});
  return res.json({ data: { token: makeToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role }}});
});

// GET /api/auth/me
app.get("/api/auth/me", (req, res) => {
  const user = getUserFromToken(req.headers.authorization);
  if (!user) return res.status(401).json({ error: { message: "Unauthorized" }});
  return res.json({ data: { id: user.id, name: user.name, email: user.email, role: user.role }});
});

// GET /api/hotels
app.get("/api/hotels", (req, res) => {
  return res.json({ data: hotels });
});

// GET /api/hotels/:id
app.get("/api/hotels/:id", (req, res) => {
  const id = Number(req.params.id);
  const h = hotels.find(x => x.id === id);
  if (!h) return res.status(404).json({ error: { message: "Hotel not found" }});
  return res.json({ data: h });
});

// GET /api/rooms (optional hotelId filter)
app.get("/api/rooms", (req, res) => {
  const hotelId = req.query.hotelId ? Number(req.query.hotelId) : null;
  const result = hotelId ? rooms.filter(r => r.hotelId === hotelId) : rooms;
  return res.json({ data: result });
});

// GET /api/search/availability?city=&checkIn=&checkOut=&guests=
app.get("/api/search/availability", (req, res) => {
  const city = (req.query.city || "").toLowerCase();
  const guests = Number(req.query.guests) || 1;

  // naive filter: hotels by city and at least one room matching capacity
  const matched = hotels
    .filter(h => !city || (h.city || "").toLowerCase().includes(city))
    .map(h => {
      const hotelRooms = rooms.filter(r => r.hotelId === h.id && r.capacity >= guests);
      return { hotel: h, rooms: hotelRooms, id: h.id, name: h.name, city: h.city, description: h.description, coverImage: h.coverImage };
    })
    .filter(h => h.rooms.length > 0);

  return res.json({ data: matched });
});

// POST /api/bookings
app.post("/api/bookings", (req, res) => {
  const user = getUserFromToken(req.headers.authorization);
  if (!user) return res.status(401).json({ error: { message: "Unauthorized" }});

  const { roomId, checkIn, checkOut, guests } = req.body || {};
  const room = rooms.find(r => r.id === Number(roomId));
  if (!room) return res.status(400).json({ error: { message: "Invalid room" }});

  const booking = {
    id: nextBookingId++,
    userId: user.id,
    roomId: room.id,
    hotelId: room.hotelId,
    checkIn: checkIn || new Date().toISOString().slice(0,10),
    checkOut: checkOut || new Date().toISOString().slice(0,10),
    guests: Number(guests) || 1,
    status: "PENDING",
    totalPrice: (room.basePrice) * Math.max(1, Math.ceil((new Date(checkOut || Date.now()) - new Date(checkIn || Date.now()))/ (1000*60*60*24))) || room.basePrice
  };
  bookings.push(booking);
  return res.status(201).json({ data: booking });
});

// GET /api/bookings/mine
app.get("/api/bookings/mine", (req, res) => {
  const user = getUserFromToken(req.headers.authorization);
  if (!user) return res.status(401).json({ error: { message: "Unauthorized" }});
  const mine = bookings.filter(b => b.userId === user.id);
  return res.json({ data: mine });
});

// POST /api/bookings/:id/cancel
app.post("/api/bookings/:id/cancel", (req, res) => {
  const user = getUserFromToken(req.headers.authorization);
  if (!user) return res.status(401).json({ error: { message: "Unauthorized" }});
  const id = Number(req.params.id);
  const b = bookings.find(x => x.id === id && x.userId === user.id);
  if (!b) return res.status(404).json({ error: { message: "Booking not found" }});
  b.status = "CANCELLED";
  return res.json({ data: b });
});

// Admin-ish endpoints (no auth check for convenience)
app.get("/api/debug/data", (req, res) => res.json({ users, hotels, rooms, bookings }));

/* --- Start server --- */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Mock server running at http://localhost:${PORT}/api`));
