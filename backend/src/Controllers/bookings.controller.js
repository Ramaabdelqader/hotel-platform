import { Booking, Room, SeasonalPrice, Coupon } from "../models/index.js";
import { computeRoomPrice } from "../utils/pricing.js";

export async function createBooking(req,res,next){
  try{
    const { roomId, checkIn, checkOut, guests, couponCode } = req.body;
    const room = await Room.findByPk(roomId, { include: [SeasonalPrice] });
    if (!room) return res.status(404).json({ ok:false, error:{message:"Room not found"}});
    if (guests > room.capacity) return res.status(400).json({ ok:false, error:{message:"Exceeds capacity"}});
    // TODO: availability check omitted here; use search controller for full check

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ where:{ code: couponCode } });
      if (!coupon) return res.status(400).json({ ok:false, error:{message:"Invalid coupon"}});
    }

    let totalPrice = computeRoomPrice(room.basePrice, room.SeasonalPrices || [], checkIn, checkOut);
    if (coupon) {
      if (coupon.discountType === "PERCENT") totalPrice *= (1 - coupon.amount/100);
      else totalPrice = Math.max(0, totalPrice - coupon.amount);
      await coupon.update({ uses: coupon.uses + 1 });
    }

    const booking = await Booking.create({
      userId: req.user.id, roomId, checkIn, checkOut, guests,
      status: "PENDING", totalPrice, couponId: coupon?.id || null
    });
    res.locals.entityId = booking.id;
    res.json({ ok:true, data: booking });
  } catch(e){ next(e); }
}

export async function confirmBooking(req,res,next){
  try{
    const b = await Booking.findByPk(req.params.id);
    if(!b) return res.status(404).json({ ok:false, error:{message:"Not found"}});
    await b.update({ status:"CONFIRMED" });
    res.locals.entityId = b.id;
    res.json({ ok:true, data: b });
  }catch(e){ next(e); }
}

export async function cancelBooking(req,res,next){
  try{
    const b = await Booking.findByPk(req.params.id);
    if(!b) return res.status(404).json({ ok:false, error:{message:"Not found"}});
    await b.update({ status:"CANCELLED" });
    res.locals.entityId = b.id;
    res.json({ ok:true, data: b });
  }catch(e){ next(e); }
}

export async function listBookings(req,res,next){
  try{
    const where = {};
    if (req.query.status) where.status = req.query.status;
    if (req.query.userId) where.userId = req.query.userId;
    const items = await Booking.findAll({ where, order:[["id","DESC"]] });
    res.json({ ok:true, data: items });
  }catch(e){ next(e); }
}

export async function myBookings(req,res,next){
  try{
    const items = await Booking.findAll({ where:{ userId: req.user.id }, order:[["id","DESC"]] });
    res.json({ ok:true, data: items });
  }catch(e){ next(e); }
}
