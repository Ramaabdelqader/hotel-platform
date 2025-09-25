import { DataTypes } from "sequelize";
export default (sequelize) =>
  sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM("ADMIN", "MANAGER", "VIEWER"), defaultValue: "VIEWER" }
    },
    { tableName: "users" }
  );
