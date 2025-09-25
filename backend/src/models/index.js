import { sequelize } from "../config/db.js";
import UserModel from "./user.js";
import HotelModel from "./hotel.js";
import RoomModel from "./room.js";
import SeasonalPriceModel from "./SeasonalPrice.js";
import BookingModel from "./booking.js";
import CouponModel from "./coupon.js";
import MediaModel from "./media.js";
import AuditLogModel from "./AuditLog.js";

export const User = UserModel(sequelize);
export const Hotel = HotelModel(sequelize);
export const Room = RoomModel(sequelize);
export const SeasonalPrice = SeasonalPriceModel(sequelize);
export const Booking = BookingModel(sequelize);
export const Coupon = CouponModel(sequelize);
export const Media = MediaModel(sequelize);
export const AuditLog = AuditLogModel(sequelize);

// Associations
Hotel.hasMany(Room, { foreignKey: "hotelId", onDelete: "CASCADE" });
Room.belongsTo(Hotel, { foreignKey: "hotelId" });

Room.hasMany(SeasonalPrice, { foreignKey: "roomId", onDelete: "CASCADE" });
SeasonalPrice.belongsTo(Room, { foreignKey: "roomId" });

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

Room.hasMany(Booking, { foreignKey: "roomId" });
Booking.belongsTo(Room, { foreignKey: "roomId" });

Coupon.hasMany(Booking, { foreignKey: "couponId" });
Booking.belongsTo(Coupon, { foreignKey: "couponId" });

// Media polymorphic (entityType + entityId)

export async function syncModels() {
  await sequelize.sync({ alter: true }); // استخدمي migrations لاحقًا للإنتاج
}
