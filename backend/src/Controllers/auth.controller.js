import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, AuditLog } from "../models/index.js";

export async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ ok: false, error: { message: "Email already in use" } });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, passwordHash: hash, role: role || "VIEWER",
    });

    // Audit: REGISTER
    await AuditLog.create({
      userId: user.id, action: "CREATE", entityType: "User", entityId: user.id,
      details: { event: "REGISTER" }
    });

    res.json({ ok: true, data: { id: user.id, email: user.email, role: user.role } });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ ok: false, error: { message: "Invalid credentials" } });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ ok: false, error: { message: "Invalid credentials" } });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Audit: LOGIN
    await AuditLog.create({
      userId: user.id, action: "LOGIN", entityType: "User", entityId: user.id,
      details: { event: "LOGIN" }
    });

    res.json({ ok: true, data: { token } });
  } catch (e) { next(e); }
}

export async function me(req, res) {
  res.json({ ok: true, data: req.user });
}
