import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { authRequired } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validations/auth.js";

const r = Router();
r.post("/register", validate(registerSchema), register);
r.post("/login", validate(loginSchema), login);
r.get("/me", authRequired, me);
export default r;
