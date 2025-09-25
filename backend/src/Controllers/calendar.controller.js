import { Booking, Room } from "../models/index.js";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

export async function roomCalendar(req, res, next) {
  try {
    const { month } = req.query; // YYYY-MM
    const start = startOfMonth(new Date(month + "-01"));
    const end = endOfMonth(start);
    const bookings = await Booking.findAll({ where: { roomId: req.params.roomId } });
    const days = eachDayOfInterval({ start, end }).map(d => {
      const day = format(d, "yyyy-MM-dd");
      const count = bookings.filter(b => b.checkIn <= day && b.checkOut > day).length;
      return { date: day, bookings: count };
    });
    res.json({ ok:true, data: days });
  } catch (e) { next(e); }
}

export async function hotelCalendar(req, res, next) {
  try {
    const { month } = req.query; // YYYY-MM
    const start = startOfMonth(new Date(month + "-01"));
    const end = endOfMonth(start);
    const rooms = await Room.findAll({ where: { hotelId: req.params.hotelId }, attributes: ["id"] });
    const roomIds = rooms.map(r => r.id);
    const bookings = roomIds.length
      ? await Booking.findAll({ where: { roomId: roomIds } })
      : [];
    const days = eachDayOfInterval({ start, end }).map(d => {
      const day = format(d, "yyyy-MM-dd");
      const count = bookings.filter(b => b.checkIn <= day && b.checkOut > day).length;
      return { date: day, bookings: count, rooms: roomIds.length, occupancyPercent: roomIds.length ? Number(((count / roomIds.length) * 100).toFixed(2)) : 0 };
    });
    res.json({ ok:true, data: days });
  } catch (e) { next(e); }
}
