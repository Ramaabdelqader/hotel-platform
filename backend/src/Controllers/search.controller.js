import { Op } from "sequelize";
import { Hotel, Room, Booking } from "../models/index.js";
import { rangesOverlap } from "../utils/availability.js";

export async function searchAvailability(req, res, next) {
  try {
    const { city, checkIn, checkOut, guests, maxPrice, type } = req.query;

    // Step 1: Hotels (filter by city if provided)
const where = {};
if (city && city.trim() !== "") {
  where.city = { [Op.like]: `%${city}%` }; // MySQL LIKE
}

const hotels = await Hotel.findAll({
  where,
  include: [Room],
});


    let busyRoomIds = new Set();
 

    // Step 2: If checkIn/checkOut given → find busy rooms
    if (checkIn && checkOut) {
      const bookings = await Booking.findAll({
        where: {
          status: { [Op.in]: ["PENDING", "CONFIRMED"] },
          [Op.and]: [
            { checkIn: { [Op.lte]: checkOut } },
            { checkOut: { [Op.gte]: checkIn } },
          ],
        },
      });

      busyRoomIds = new Set(
        bookings
          .filter((b) => rangesOverlap(b.checkIn, b.checkOut, checkIn, checkOut))
          .map((b) => b.roomId)
      );
    }

    // Step 3: Filter hotels → rooms
    const result = [];
    for (const h of hotels) {
      const availableRooms = (h.Rooms || []).filter((r) => {
        if (guests && Number(guests) > r.capacity) return false;
        if (type && r.type !== type) return false;
        if (busyRoomIds.has(r.id)) return false;
        if (maxPrice && r.basePrice > Number(maxPrice)) return false;
        return true;
      });

      if (availableRooms.length) {
        result.push({
          hotel: {
            id: h.id,
            name: h.name,
            city: h.city,
            starRating: h.starRating,
            description: h.description,
          },
          rooms: availableRooms,
        });
      }
    }

    res.json({ ok: true, data: result });
  } catch (e) {
    next(e);
  }
}
