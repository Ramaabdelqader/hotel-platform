import { Router } from "express";
import { searchAvailability } from "../controllers/search.controller.js";
const r = Router();
r.get("/availability", searchAvailability);
export default r;
