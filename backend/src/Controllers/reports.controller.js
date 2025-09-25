import { Op, fn, col, literal } from "sequelize";
import { Booking, Room } from "../models/index.js";
import { toCSV, toPDF } from "../utils/exports.js";
import { eachDayOfInterval, parseISO, addDays } from "date-fns";

export async function occupancy(req,res,next){
  try{
    const { start, end } = req.query;

    // Total room-nights in range
    const totalRooms = await Room.count();
    const nights = eachDayOfInterval({ start: parseISO(start), end: addDays(parseISO(end), -1) }).length;
    const totalRoomNights = totalRooms * nights;

    // Booked room-nights = sum over confirmed bookings of overlap nights with [start,end)
    const confirmed = await Booking.findAll({
      where:{ status:"CONFIRMED",
        [Op.and]: [
          { checkIn: { [Op.lte]: end } },
          { checkOut: { [Op.gte]: start } }
        ]
      }
    });

    let bookedNights = 0;
    for (const b of confirmed) {
      const s = parseISO(b.checkIn);
      const e = parseISO(b.checkOut);
      const overlapStart = s > parseISO(start) ? s : parseISO(start);
      const overlapEnd = e < parseISO(end) ? e : parseISO(end);
      const days = eachDayOfInterval({ start: overlapStart, end: addDays(overlapEnd, -1) }).length;
      bookedNights += Math.max(0, days);
    }

    const occupancyPercent = totalRoomNights ? Number(((bookedNights / totalRoomNights) * 100).toFixed(2)) : 0;
    const row = { start, end, rooms: totalRooms, nights, totalRoomNights, bookedNights, occupancyPercent };

    if (req.query.format === "csv") return toCSV(res, "occupancy.csv", [row]);
    if (req.query.format === "pdf") return toPDF(res, "occupancy.pdf", "Occupancy Report", [row]);
    res.json({ ok:true, data: row });
  }catch(e){ next(e); }
}

export async function revenue(req,res,next){
  try{
    const { start, end } = req.query;
    const rows = await Booking.findAll({
      where:{ status:"CONFIRMED",
        [Op.and]: [
          { checkIn: { [Op.lte]: end } },
          { checkOut: { [Op.gte]: start } }
        ]
      },
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
      where:{ status:"CONFIRMED",
        [Op.and]: [
          { checkIn: { [Op.lte]: end } },
          { checkOut: { [Op.gte]: start } }
        ]
      },
      attributes: ["roomId", [fn("COUNT", col("id")), "bookings"]],
      group: ["roomId"],
      order: [[literal("bookings"), "DESC"]],
      limit: Number(limit)
    });
    res.json({ ok:true, data: rows });
  }catch(e){ next(e); }
}
