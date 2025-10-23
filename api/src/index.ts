import express from "express";
import cors from "cors";
import { otpRouter } from "./routes/index.ts";
import dbConnection from "./database/dbConnection.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/otp", otpRouter);

// Connect to the database
dbConnection();

app.listen(process.env.PORT || 4001, () => {
  console.log("listening on port: 4001");
});
