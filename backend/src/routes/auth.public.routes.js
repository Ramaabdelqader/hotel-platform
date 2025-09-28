import { Router } from "express";
import { registerCustomer, loginCustomer, meCustomer } from "../controllers/auth.public.controller.js";
import { authRequired } from "../middleware/auth.js";

const r = Router();

// Public registration & login (no token required)
r.post("/register", registerCustomer);
r.post("/login", loginCustomer);

// Logged-in customer profile
r.get("/me", authRequired, meCustomer);

export default r;
