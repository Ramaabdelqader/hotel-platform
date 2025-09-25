import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";
import { audit } from "../middleware/audit.js";
import { validate } from "../middleware/validate.js";
import { couponCreateSchema, couponUpdateSchema } from "../validations/coupon.js";
import { listCoupons, createCoupon, updateCoupon, deleteCoupon } from "../controllers/coupons.controller.js";

const r = Router();
r.get("/", authRequired, allowRoles("ADMIN","MANAGER"), listCoupons);
r.post("/", authRequired, allowRoles("ADMIN","MANAGER"), validate(couponCreateSchema), audit("Coupon"), createCoupon);
r.put("/:id", authRequired, allowRoles("ADMIN","MANAGER"), validate(couponUpdateSchema), audit("Coupon"), updateCoupon);
r.delete("/:id", authRequired, allowRoles("ADMIN"), audit("Coupon"), deleteCoupon);
export default r;
