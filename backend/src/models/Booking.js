import { DataTypes } from "sequelize";
export default (sequelize) =>
  sequelize.define(
    "Booking",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      roomId: { type: DataTypes.INTEGER, allowNull: false },
      checkIn: { type: DataTypes.DATEONLY, allowNull: false },
      checkOut: { type: DataTypes.DATEONLY, allowNull: false },
      guests: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"), defaultValue: "PENDING" },
      totalPrice: { type: DataTypes.FLOAT, allowNull: false },
      couponId: { type: DataTypes.INTEGER, allowNull: true }
    },
    { tableName: "bookings" }
  );
