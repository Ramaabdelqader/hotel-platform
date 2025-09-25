import { Router } from "express";
import { listHotels, createHotel, getHotel, updateHotel, deleteHotel } from "../controllers/hotels.controller.js";
import { authRequired } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";
import { audit } from "../middleware/audit.js";
import { upload } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { hotelCreateSchema, hotelUpdateSchema } from "../validations/hotel.js";

const r = Router();
r.get("/", listHotels);
r.get("/:id", getHotel);
r.post("/", authRequired, allowRoles("ADMIN","MANAGER"), upload.single("cover"), validate(hotelCreateSchema), audit("Hotel"), createHotel);
r.put("/:id", authRequired, allowRoles("ADMIN","MANAGER"), upload.single("cover"), validate(hotelUpdateSchema), audit("Hotel"), updateHotel);
r.delete("/:id", authRequired, allowRoles("ADMIN"), audit("Hotel"), deleteHotel);
export default r;
