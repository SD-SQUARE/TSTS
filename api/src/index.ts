import express from "express";
import { connectDB } from "./database/config/db.js";
import authRoutes from "./features/authFeature/routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { ENV } from "./database/config/env.js";
import cors from "cors";
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
origin:  "http://localhost:3000", 
credentials: true,              
}));
app.use("/api", authRoutes);

app.listen(ENV.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
