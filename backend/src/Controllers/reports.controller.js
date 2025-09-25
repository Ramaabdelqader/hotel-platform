import { Op, fn, col, literal } from "sequelize";
import { Booking, Room, Hotel } from "../models/index.js";
import { toCSV, toPDF } from "../utils/exports.js";

export async function occupancy(req,res,next){
  try{
    const { start, end } = req.query;
    const totalRooms = await Room.count();
    const confirmed = await Booking.count({
      where:{ status:"CONFIRMED", checkIn:{[Op.gte]:start}, checkOut:{[Op.lte]:end} }
    });
    const rate = totalRooms ? (confirmed / totalRooms) * 100 : 0;
    const row = { start, end, totalRooms, confirmedBookings: confirmed, occupancyPercent: Number(rate.toFixed(2)) };
    if (req.query.format === "csv") return toCSV(res, "occupancy.csv", [row]);
    if (req.query.format === "pdf") return toPDF(res, "occupancy.pdf", "Occupancy Report", [row]);
    res.json({ ok:true, data: row });
  }catch(e){ next(e); }
}

export async function revenue(req,res,next){
  try{
    const { start, end } = req.query;
    const rows = await Booking.findAll({
      where:{ status:"CONFIRMED", checkIn:{[Op.gte]:start}, checkOut:{[Op.lte]:end} },
      attributes: [[fn("SUM", col("totalPrice")), "revenue"]]
    });
    const revenue = Number(rows?.[0]?.get("revenue") || 0);
    const row = { start, end, revenue };
    if (req.query.format === "csv") return toCSV(res, "revenue.csv", [row]);
    if (req.query.format === "pdf") return toPDF(res, "revenue.pdf", "Revenue Report", [row]);
    res.json({ ok:true, data: row });
  }catch(e){ next(e); }
}

export async function topRooms(req,res,next){
  try{
    const { start, end, limit = 5 } = req.query;
    const rows = await Booking.findAll({
      where:{ status:"CONFIRMED", checkIn:{[Op.gte]:start}, checkOut:{[Op.lte]:end} },
      attributes: ["roomId", [fn("COUNT", col("id")), "bookings"]],
      group: ["roomId"],
      order: [[literal("bookings"), "DESC"]],
      limit: Number(limit)
    });
    res.json({ ok:true, data: rows });
  }catch(e){ next(e); }
}
