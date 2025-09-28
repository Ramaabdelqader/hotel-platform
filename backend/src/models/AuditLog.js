import { DataTypes } from "sequelize";
export default (sequelize) =>
  sequelize.define(
    "AuditLog",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER },
      action: { type: DataTypes.ENUM("CREATE","UPDATE","DELETE","LOGIN"), allowNull: false },
      entityType: { type: DataTypes.STRING, allowNull: false },
      entityId: { type: DataTypes.INTEGER, allowNull: true },
      details: { type: DataTypes.JSON }
    },
    { tableName: "audit_logs" }
  );
