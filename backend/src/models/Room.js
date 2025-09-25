import { DataTypes } from "sequelize";
export default (sequelize) =>
  sequelize.define(
    "Room",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      hotelId: { type: DataTypes.INTEGER, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      capacity: { type: DataTypes.INTEGER, allowNull: false },
      basePrice: { type: DataTypes.FLOAT, allowNull: false },
      size: { type: DataTypes.INTEGER }
    },
    { tableName: "rooms" }
  );
