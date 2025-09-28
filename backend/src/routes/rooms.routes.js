import { Router } from "express";
import { listRooms, createRoom, addRoomImage, addSeasonalPrice } from "../controllers/rooms.controller.js";
import { authRequired } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";
import { audit } from "../middleware/audit.js";
import { upload } from "../middleware/upload.js";

const r = Router();
r.get("/", listRooms);
r.post("/", authRequired, allowRoles("ADMIN","MANAGER"), audit("Room"), createRoom);
r.post("/:id/images", authRequired, allowRoles("ADMIN","MANAGER"), upload.single("image"), audit("Media"), addRoomImage);
r.post("/:id/seasonal-prices", authRequired, allowRoles("ADMIN","MANAGER"), audit("SeasonalPrice"), addSeasonalPrice);
export default r;
