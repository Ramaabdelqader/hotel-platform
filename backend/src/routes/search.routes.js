import { Router } from "express";
import { searchAvailability } from "../controllers/search.controller.js";
import { validate } from "../middleware/validate.js";
import { searchAvailabilityQuery } from "../validations/search.js";

const r = Router();
r.get("/availability", validate(searchAvailabilityQuery, "query"), searchAvailability);
export default r;
