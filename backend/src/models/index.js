import sequelize from "../config/db.js";
import UserModel from "./user.js";
import HotelModel from "./hotel.js";
import RoomModel from "./room.js";
import BookingModel from "./booking.js";
// لو عندك Media أو SeasonalPrice أو AuditLog ضيفهم هنا بنفس الطريقة

// ✅ عرّف الموديلات
export const User = UserModel(sequelize);
export const Hotel = HotelModel(sequelize);
export const Room = RoomModel(sequelize);
export const Booking = BookingModel(sequelize);

// ✅ العلاقات
Hotel.hasMany(Room, { foreignKey: "hotelId" });
Room.belongsTo(Hotel, { foreignKey: "hotelId" });

Room.hasMany(Booking, { foreignKey: "roomId" });
Booking.belongsTo(Room, { foreignKey: "roomId" });

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

// ✅ syncModels function
export async function syncModels() {
  await sequelize.sync({ alter: true }); // يستعمل alter عشان يحدث الجداول بدون drop
  console.log("✅ All models synced successfully");
}

// ✅ export default لو حبيت تستعمل كل الموديلات مره وحدة
export default {
  sequelize,
  User,
  Hotel,
  Room,
  Booking,
};
