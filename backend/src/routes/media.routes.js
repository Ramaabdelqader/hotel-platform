import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";
import { audit } from "../middleware/audit.js";
import { upload } from "../middleware/upload.js";
import { uploadToEntity, removeMedia } from "../Controllers/media.controller.js";

const r = Router();
r.post("/", authRequired, allowRoles("ADMIN","MANAGER"), upload.single("file"), audit("Media"), uploadToEntity);
r.delete("/:id", authRequired, allowRoles("ADMIN","MANAGER"), audit("Media"), removeMedia);
export default r;
