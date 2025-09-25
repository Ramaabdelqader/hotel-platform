import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

// Register (anyone can register, default role = VIEWER)
export async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, error: { message: "Missing fields" } });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ ok: false, error: { message: "Email already in use" } });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      role: role || "VIEWER",
    });

    res.json({
      ok: true,
      data: { id: user.id, email: user.email, role: user.role },
    });
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ ok: false, error: { message: "Invalid credentials" } });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ ok: false, error: { message: "Invalid credentials" } });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ ok: true, data: { token } });
  } catch (e) {
    next(e);
  }
}

export async function me(req, res) {
  res.json({ ok: true, data: req.user });
}
