import mongoose from "mongoose";
import { generateUsers } from "../seeding/userSeeding/generateUser.js";
import { ENV } from "./env.js";  

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected to:", ENV.MONGO_URI);
    await generateUsers();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
