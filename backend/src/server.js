import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import sequelize from "./config/db.js";   // ✅ جاي من db.js
import { syncModels, Booking } from "./models/index.js";
import cron from "node-cron";
import { subMinutes } from "date-fns";
import { Op } from "sequelize";

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    // ✅ connect to DB
    await sequelize.authenticate();
    console.log("✅ DB connected");

    // ✅ sync models
    await syncModels();

    // Auto-cancel unconfirmed bookings after UNCONFIRMED_CANCEL_MINUTES
    const minutes = Number(process.env.UNCONFIRMED_CANCEL_MINUTES || 30);
    cron.schedule("* * * * *", async () => {
      const cutoff = subMinutes(new Date(), minutes);
      await Booking.update(
        { status: "CANCELLED" },
        { where: { status: "PENDING", createdAt: { [Op.lte]: cutoff } } }
      );
    });

    // Start server
    app.listen(PORT, () =>
      console.log(`🚀 API on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
})();
