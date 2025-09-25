import { DataTypes } from "sequelize";
export default (sequelize) =>
  sequelize.define(
    "SeasonalPrice",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      roomId: { type: DataTypes.INTEGER, allowNull: false },
      startDate: { type: DataTypes.DATEONLY, allowNull: false },
      endDate: { type: DataTypes.DATEONLY, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false }
    },
    { tableName: "seasonal_prices" }
  );
