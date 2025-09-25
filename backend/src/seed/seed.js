import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db.js";
import { syncModels, User, Hotel, Room, Media, Coupon } from "../models/index.js";
import bcrypt from "bcryptjs";
import { hotels_data } from "./data.hotels.js";
import { rooms_data } from "./data.rooms.js";

async function run() {
  await connectDB();
  await syncModels();

  // Admin user
  const adminPass = await bcrypt.hash("Admin@123", 10);
  await User.findOrCreate({ where:{ email:"admin@hotel.com" }, defaults:{ name:"Admin", email:"admin@hotel.com", passwordHash:adminPass, role:"ADMIN" } });

  // Seed hotels + a few rooms + fake images
  for (const h of hotels_data) {
    const [hotel] = await Hotel.findOrCreate({ where:{ name:h.name }, defaults:h });
    // Add 3 rooms per hotel
    for (let i=0; i<3; i++){
      const r = rooms_data[(i + Math.floor(Math.random()*rooms_data.length)) % rooms_data.length];
      const room = await Room.create({ ...r, hotelId: hotel.id });
      // Add 1 sample image record (you can upload real ones later via /media)
      await Media.create({
        entityType: "room",
        entityId: room.id,
        filename: `seed-room-${room.id}.jpg`,
        url: `/uploads/seed-room-${room.id}.jpg`,
        mimeType: "image/jpeg"
      });
    }
  }

  // Sample coupons
  await Coupon.findOrCreate({ where:{ code:"WELCOME10" }, defaults:{ code:"WELCOME10", discountType:"PERCENT", amount:10 } });
  await Coupon.findOrCreate({ where:{ code:"FLAT25" }, defaults:{ code:"FLAT25", discountType:"FIXED", amount:25 } });

  console.log("✅ Seed complete");
  process.exit(0);
}

run().catch(e=>{ console.error(e); process.exit(1); });
