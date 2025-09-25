import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "AuditLog",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: true }, // ممكن يكون null لو عملية عامة
      entityType: { type: DataTypes.STRING, allowNull: false },
      entityId: { type: DataTypes.INTEGER, allowNull: false },
      action: { type: DataTypes.STRING, allowNull: false }, // CREATE, UPDATE, DELETE, LOGIN, إلخ
      details: { type: DataTypes.JSON },
    },
    { tableName: "audit_logs" }
  );
