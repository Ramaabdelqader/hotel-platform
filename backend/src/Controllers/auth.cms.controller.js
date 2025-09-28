import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

// Admin creates staff
export async function registerStaff(req, res) {
  try {
    const { email, password, role } = req.body; 
    // role can be STAFF, MANAGER, etc. but must not be CUSTOMER
    if (role === "CUSTOMER") {
      return res.status(400).json({ ok: false, error: { message: "Invalid role for staff" } });
    }

    const hashed = await bcrypt.hash(password, 10);

    const staff = await User.create({ email, password: hashed, role });

    res.status(201).json({ ok: true, staff });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: err.message } });
  }
}

// Staff login
export async function loginStaff(req, res) {
  try {
    const { email, password } = req.body;

    const staff = await User.findOne({ where: { email, role: ["STAFF", "ADMIN", "MANAGER"] } });
    if (!staff) return res.status(401).json({ ok: false, error: { message: "Invalid credentials" } });

    const match = await bcrypt.compare(password, staff.password);
    if (!match) return res.status(401).json({ ok: false, error: { message: "Invalid credentials" } });

    const token = jwt.sign({ id: staff.id, email: staff.email, role: staff.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ ok: true, staff, token });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: err.message } });
  }
}

// Staff/admin profile
export async function meStaff(req, res) {
  res.json({ ok: true, staff: req.user });
}
