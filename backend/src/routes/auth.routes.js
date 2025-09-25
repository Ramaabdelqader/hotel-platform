import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { authRequired } from "../middleware/auth.js";

const r = Router();

r.post("/register", register);   // anyone can register
r.post("/login", login);         // anyone can login
r.get("/me", authRequired, me);  // protected

export default r;
