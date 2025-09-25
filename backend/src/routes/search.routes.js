import { Router } from "express";
import { searchAvailability } from "../Controllers/search.controller.js";
const r = Router();
r.get("/availability", searchAvailability);
export default r;
