import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger.ts";
import { seedUsers } from "./seeding/userSeeding.ts";

dotenv.config();

const dbConnection = async (): Promise<void> => {
  try {
    const mongoURL = process.env.MONGO_URL;

    if (!mongoURL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    await mongoose.connect(mongoURL);
    logger.info("Database connected successfully");
    await seedUsers();
  } catch (error: any) {
    logger.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () =>
    logger.warn("Database disconnected")
  );
  mongoose.connection.on("reconnected", () =>
    logger.info("Database reconnected")
  );
  mongoose.connection.on("error", (err) =>
    logger.error(`Database error: ${err}`)
  );
};

export default dbConnection;
