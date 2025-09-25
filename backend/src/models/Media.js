import { DataTypes } from "sequelize";
export default (sequelize) =>
  sequelize.define(
    "Media",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      entityType: { type: DataTypes.ENUM("hotel", "room"), allowNull: false },
      entityId: { type: DataTypes.INTEGER, allowNull: false },
      filename: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      mimeType: { type: DataTypes.STRING }
    },
    { tableName: "media" }
  );
