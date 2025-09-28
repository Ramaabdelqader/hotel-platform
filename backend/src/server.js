import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import { subMinutes, formatISO } from "date-fns";

import { connectDB } from "./config/db.js";
import { syncModels, Booking } from "./models/index.js";

// 🔹 Import routes
import publicAuthRoutes from "./routes/auth.public.routes.js";
import cmsAuthRoutes from "./routes/auth.cms.routes.js";

dotenv.config();

const app = express();

// ✅ Security middlewares
app.use(helmet());
app.use(
  cors({
    origin: true,       // in production, replace with an array of allowed URLs
    credentials: true
  })
);

// ✅ JSON body parser
app.use(express.json());

// ✅ Routes
app.use("/api/auth", publicAuthRoutes);      // Customer frontend
app.use("/api/cms/auth", cmsAuthRoutes);     // CMS frontend

const PORT = process.env.PORT || 4000;

// ✅ Database + Cron + Server start
(async () => {
  await connectDB();
  await syncModels();

  // Auto-cancel unconfirmed bookings after X minutes
  const minutes = Number(process.env.UNCONFIRMED_CANCEL_MINUTES || 30);
  cron.schedule("* * * * *", async () => {
    const cutoff = subMinutes(new Date(), minutes);
    await Booking.update(
      { status: "EXPIRED" },
      { where: { status: "PENDING", createdAt: { lte: formatISO(cutoff) } } }
    );
  });

  app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
})();
