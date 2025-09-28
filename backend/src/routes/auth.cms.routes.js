import { Router } from "express";
import { registerStaff, loginStaff, meStaff } from "../controllers/auth.cms.controller.js";
import { authRequired } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";

const r = Router();

// Admin-only staff registration
r.post("/register-staff", authRequired, allowRoles("ADMIN"), registerStaff);

// Staff/admin login
r.post("/login", loginStaff);

// Logged-in staff/admin profile
r.get("/me", authRequired, meStaff);

export default r;
