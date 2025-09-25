import { Op } from "sequelize";
import sequelize from "../config/db.js";
import { Booking, Room, SeasonalPrice, Coupon } from "../models/index.js";
import { rangesOverlap } from "../utils/availability.js";
import { computeRoomPrice } from "../utils/pricing.js";

export async function createBooking(req, res, next) {
  const t = await sequelize.transaction();
  try {
    const { roomId, checkIn, checkOut, guests, couponCode } = req.body;

    const room = await Room.findByPk(roomId, { include: [SeasonalPrice], transaction: t, lock: t.LOCK.UPDATE });
    if (!room) { await t.rollback(); return res.status(404).json({ ok:false, error:{message:"Room not found"}}); }
    if (guests > room.capacity) { await t.rollback(); return res.status(400).json({ ok:false, error:{message:"Exceeds capacity"}}); }

    // Availability check (no overlapping bookings in [PENDING, CONFIRMED])
    const overlaps = await Booking.findAll({
      where: {
        roomId,
        status: { [Op.in]: ["PENDING","CONFIRMED"] },
        [Op.and]: [
          { checkIn: { [Op.lte]: checkOut } },
          { checkOut: { [Op.gte]: checkIn } }
        ]
      },
      transaction: t,
      lock: t.LOCK.UPDATE
    });
    const conflict = overlaps.some(b => rangesOverlap(b.checkIn, b.checkOut, checkIn, checkOut));
    if (conflict) { await t.rollback(); return res.status(409).json({ ok:false, error:{message:"Room not available for selected dates"}}); }

    // Compute price
    let totalPrice = computeRoomPrice(room.basePrice, room.SeasonalPrices || [], checkIn, checkOut);

    // Apply coupon
    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ where: { code: couponCode }, transaction: t, lock: t.LOCK.UPDATE });
      if (!coupon) { await t.rollback(); return res.status(400).json({ ok:false, error:{message:"Invalid coupon"}}); }

      // Optional: enforce validity window / usage caps
      const nights = Math.max(1, (new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24));
      if (coupon.validFrom && new Date(checkIn) < new Date(coupon.validFrom)) { await t.rollback(); return res.status(400).json({ ok:false, error:{message:"Coupon not yet valid"}}); }
      if (coupon.validTo && new Date(checkOut) > new Date(coupon.validTo)) { await t.rollback(); return res.status(400).json({ ok:false, error:{message:"Coupon expired"}}); }
      if (coupon.minNights && nights < coupon.minNights) { await t.rollback(); return res.status(400).json({ ok:false, error:{message:`Minimum nights ${coupon.minNights}`}}); }
      if (coupon.maxUses && coupon.uses >= coupon.maxUses) { await t.rollback(); return res.status(400).json({ ok:false, error:{message:"Coupon usage limit reached"}}); }

      if (coupon.discountType === "PERCENT") totalPrice *= (1 - coupon.amount / 100);
      else totalPrice = Math.max(0, totalPrice - coupon.amount);

      await coupon.update({ uses: coupon.uses + 1 }, { transaction: t });
    }

    const booking = await Booking.create({
      userId: req.user.id, roomId, checkIn, checkOut, guests,
      status: "PENDING", totalPrice, couponId: coupon?.id || null
    }, { transaction: t });

    await t.commit();
    res.locals.entityId = booking.id;
    res.json({ ok:true, data: booking });
  } catch (e) {
    await t.rollback();
    next(e);
  }
}

export async function confirmBooking(req, res, next) {
  try {
    const b = await Booking.findByPk(req.params.id);
    if (!b) return res.status(404).json({ ok:false, error:{message:"Not found"}});
    // Re-check availability just before confirming
    const overlaps = await Booking.findAll({
      where: {
        roomId: b.roomId,
        id: { [Op.ne]: b.id },
        status: { [Op.in]: ["CONFIRMED"] },
        [Op.and]: [{ checkIn: { [Op.lte]: b.checkOut } }, { checkOut: { [Op.gte]: b.checkIn } }]
      }
    });
    const conflict = overlaps.some(x => rangesOverlap(x.checkIn, x.checkOut, b.checkIn, b.checkOut));
    if (conflict) return res.status(409).json({ ok:false, error:{message:"Conflict on confirm"}});
    await b.update({ status: "CONFIRMED" });
    res.locals.entityId = b.id;
    res.json({ ok:true, data: b });
  } catch(e){ next(e); }
}

export async function cancelBooking(req, res, next) {
  try {
    const b = await Booking.findByPk(req.params.id);
    if(!b) return res.status(404).json({ ok:false, error:{message:"Not found"}});
    await b.update({ status:"CANCELLED" });
    res.locals.entityId = b.id;
    res.json({ ok:true, data: b });
  } catch(e){ next(e); }
}

export async function listBookings(req, res, next) {
  try {
    const { status, userId, hotelId, from, to, page=1, limit=20 } = req.query;
    const where = {};
    if (status) where.status = status;
    if (userId) where.userId = userId;
    if (from || to) {
      where[Op.and] = [
        from ? { checkIn: { [Op.gte]: from } } : {},
        to ? { checkOut: { [Op.lte]: to } } : {},
      ];
    }
    if (hotelId) {
      // Join via Room
      const rooms = await Room.findAll({ where: { hotelId }, attributes: ["id"] });
      const roomIds = rooms.map(r => r.id);
      where.roomId = { [Op.in]: roomIds.length ? roomIds : [0] };
    }

    const items = await Booking.findAll({
      where,
      order:[["id","DESC"]],
      limit: Number(limit),
      offset: (Number(page)-1) * Number(limit)
    });
    res.json({ ok:true, data: items, meta: { page: Number(page), limit: Number(limit) } });
  } catch(e){ next(e); }
}

export async function myBookings(req,res,next){
  try{
    const items = await Booking.findAll({ where:{ userId: req.user.id }, order:[["id","DESC"]] });
    res.json({ ok:true, data: items });
  }catch(e){ next(e); }
}
