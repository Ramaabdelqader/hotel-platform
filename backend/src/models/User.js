import sequelize from "../config/db.js";   // ✅ default
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("CUSTOMER", "STAFF", "MANAGER", "ADMIN"),
    allowNull: false,
    defaultValue: "CUSTOMER"
  }
});

export default User;
