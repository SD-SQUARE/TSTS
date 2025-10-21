import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, "../../config/.env"),
});

export const ENV = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH || "default_refresh_secret",
  JWT_EXPIRES_IN_REFRESH: process.env.JWT_EXPIRES_IN_REFRESH || "8d",
};
