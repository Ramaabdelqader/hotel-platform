import { DataTypes } from "sequelize";
export default (sequelize) =>
  sequelize.define(
    "Hotel",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      starRating: { type: DataTypes.INTEGER, defaultValue: 3 },
      address: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      manager: { type: DataTypes.STRING },
      coverImage: { type: DataTypes.STRING },
      amenities: { type: DataTypes.JSON } // array of strings
    },
    { tableName: "hotels" }
  );
