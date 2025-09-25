import { Router } from "express";
import { Coupon } from "../models/index.js";
import { authRequired } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";
import { audit } from "../middleware/audit.js";

const r = Router();
r.get("/", authRequired, allowRoles("ADMIN","MANAGER"), async (req,res)=> {
  const items = await Coupon.findAll({ order:[["id","DESC"]] });
  res.json({ ok:true, data: items });
});
r.post("/", authRequired, allowRoles("ADMIN","MANAGER"), audit("Coupon"), async (req,res)=> {
  const c = await Coupon.create(req.body);
  res.json({ ok:true, data: c });
});
r.put("/:id", authRequired, allowRoles("ADMIN","MANAGER"), audit("Coupon"), async (req,res)=> {
  const c = await Coupon.findByPk(req.params.id);
  if(!c) return res.status(404).json({ ok:false, error:{message:"Not found"}});
  await c.update(req.body);
  res.json({ ok:true, data: c });
});
r.delete("/:id", authRequired, allowRoles("ADMIN"), audit("Coupon"), async (req,res)=> {
  const c = await Coupon.findByPk(req.params.id);
  if(!c) return res.status(404).json({ ok:false, error:{message:"Not found"}});
  await c.destroy();
  res.json({ ok:true, data: true });
});
export default r;
