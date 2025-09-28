import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";
import { createBooking, confirmBooking, cancelBooking, listBookings, myBookings } from "../controllers/bookings.controller.js";
import { audit } from "../middleware/audit.js";

const r = Router();
r.get("/", authRequired, allowRoles("ADMIN","MANAGER"), listBookings);
r.get("/mine", authRequired, myBookings);
r.post("/", authRequired, audit("Booking"), createBooking);
r.post("/:id/confirm", authRequired, allowRoles("ADMIN","MANAGER"), audit("Booking"), confirmBooking);
r.post("/:id/cancel", authRequired, audit("Booking"), cancelBooking);
export default r;
