// src/config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

export default sequelize;   // ✅ default export
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
};
