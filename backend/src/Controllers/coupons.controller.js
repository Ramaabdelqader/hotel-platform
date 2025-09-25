import { Coupon } from "../models/index.js";

export async function listCoupons(req, res, next) {
  try {
    const items = await Coupon.findAll({ order:[["id","DESC"]] });
    res.json({ ok:true, data: items });
  } catch (e) { next(e); }
}

export async function createCoupon(req, res, next) {
  try {
    const c = await Coupon.create(req.body);
    res.locals.entityId = c.id;
    res.json({ ok:true, data: c });
  } catch (e) { next(e); }
}

export async function updateCoupon(req, res, next) {
  try {
    const c = await Coupon.findByPk(req.params.id);
    if(!c) return res.status(404).json({ ok:false, error:{message:"Not found"}});
    await c.update(req.body);
    res.locals.entityId = c.id;
    res.json({ ok:true, data: c });
  } catch (e) { next(e); }
}

export async function deleteCoupon(req, res, next) {
  try {
    const c = await Coupon.findByPk(req.params.id);
    if(!c) return res.status(404).json({ ok:false, error:{message:"Not found"}});
    await c.destroy();
    res.locals.entityId = c.id;
    res.json({ ok:true, data: true });
  } catch (e) { next(e); }
}
