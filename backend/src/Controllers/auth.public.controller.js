import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

// Customer register
export async function registerCustomer(req, res) {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashed, role: "CUSTOMER" });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ ok: true, user, token });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: err.message } });
  }
}

// Customer login
export async function loginCustomer(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, role: "CUSTOMER" } });
    if (!user) return res.status(401).json({ ok: false, error: { message: "Invalid credentials" } });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ ok: false, error: { message: "Invalid credentials" } });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ ok: true, user, token });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: err.message } });
  }
}

// Customer profile
export async function meCustomer(req, res) {
  res.json({ ok: true, user: req.user });
}
