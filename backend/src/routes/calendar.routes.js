import { Router } from "express";
import { Booking } from "../models/index.js";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

const r = Router();
r.get("/rooms/:roomId", async (req,res,next)=>{
  try{
    const { month } = req.query; // YYYY-MM
    const start = startOfMonth(new Date(month+"-01"));
    const end = endOfMonth(start);
    const bookings = await Booking.findAll({ where:{ roomId: req.params.roomId }});
    const days = eachDayOfInterval({ start, end }).map(d => ({
      date: format(d, "yyyy-MM-dd"),
      bookings: bookings.filter(b => b.checkIn <= format(d,"yyyy-MM-dd") && b.checkOut > format(d,"yyyy-MM-dd")).length
    }));
    res.json({ ok:true, data: days });
  }catch(e){ next(e); }
});
export default r;
