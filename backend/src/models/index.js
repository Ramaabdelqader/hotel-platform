import sequelize from "../config/db.js";

import UserModel from "./user.js";
import HotelModel from "./hotel.js";
import RoomModel from "./room.js";
import BookingModel from "./booking.js";
import CouponModel from "./coupon.js";
import MediaModel from "./media.js";
import AuditLogModel from "./AuditLog.js";

// init models
export const User = UserModel(sequelize);
export const Hotel = HotelModel(sequelize);
export const Room = RoomModel(sequelize);
export const Booking = BookingModel(sequelize);
export const Coupon = CouponModel(sequelize);
export const Media = MediaModel(sequelize);
export const AuditLog = AuditLogModel(sequelize);

// relations
Hotel.hasMany(Room, { foreignKey: "hotelId" });
Room.belongsTo(Hotel, { foreignKey: "hotelId" });

Room.hasMany(Booking, { foreignKey: "roomId" });
Booking.belongsTo(Room, { foreignKey: "roomId" });

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

export { sequelize };
