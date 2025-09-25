import { Router } from "express";
import { roomCalendar, hotelCalendar } from "../controllers/calendar.controller.js";

const r = Router();
r.get("/rooms/:roomId", roomCalendar);
r.get("/hotels/:hotelId", hotelCalendar);
export default r;
