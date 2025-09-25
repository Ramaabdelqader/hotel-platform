import { DataTypes } from "sequelize";
export default (sequelize) =>
  sequelize.define(
    "Coupon",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      code: { type: DataTypes.STRING, unique: true, allowNull: false },
      discountType: { type: DataTypes.ENUM("PERCENT", "FIXED"), allowNull: false },
      amount: { type: DataTypes.FLOAT, allowNull: false },
      validFrom: { type: DataTypes.DATEONLY },
      validTo: { type: DataTypes.DATEONLY },
      minNights: { type: DataTypes.INTEGER, defaultValue: 0 },
      maxUses: { type: DataTypes.INTEGER, defaultValue: 0 },
      uses: { type: DataTypes.INTEGER, defaultValue: 0 }
    },
    { tableName: "coupons" }
  );
