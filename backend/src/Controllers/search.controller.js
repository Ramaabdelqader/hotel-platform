import { Op } from "sequelize";
import { Hotel, Room, Booking, SeasonalPrice } from "../models/index.js";
import { rangesOverlap } from "../utils/availability.js";

export async function searchAvailability(req,res,next){
  try{
    const { city, checkIn, checkOut, guests, maxPrice, type } = req.query;

    const hotels = await Hotel.findAll({ where: city ? { city } : {}, include: [Room] });

    // Collect booked roomIds overlapping the range
    const bookings = await Booking.findAll({
      where: {
        status: { [Op.in]: ["PENDING","CONFIRMED"] },
        [Op.and]: [
          { checkIn: { [Op.lte]: checkOut } },
          { checkOut: { [Op.gte]: checkIn } }
        ]
      }
    });
    const busyRoomIds = new Set(
      bookings.filter(b => rangesOverlap(b.checkIn, b.checkOut, checkIn, checkOut)).map(b => b.roomId)
    );

    const result = [];
    for (const h of hotels) {
      const availableRooms = (h.Rooms || []).filter(r => {
        if (guests && Number(guests) > r.capacity) return false;
        if (type && r.type !== type) return false;
        if (busyRoomIds.has(r.id)) return false;
        if (maxPrice && Number(maxPrice) < r.basePrice) return false; // simplified price filter
        return true;
      });
      if (availableRooms.length) {
        result.push({ hotel: h, rooms: availableRooms });
      }
    }
    res.json({ ok:true, data: result });
  } catch(e){ next(e); }
}
