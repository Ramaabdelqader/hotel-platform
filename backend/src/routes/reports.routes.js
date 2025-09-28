import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";
import { occupancy, revenue, topRooms } from "../controllers/reports.controller.js";

const r = Router();
r.get("/occupancy", authRequired, allowRoles("ADMIN","MANAGER"), occupancy);
r.get("/revenue", authRequired, allowRoles("ADMIN","MANAGER"), revenue);
r.get("/top-rooms", authRequired, allowRoles("ADMIN","MANAGER"), topRooms);
export default r;
