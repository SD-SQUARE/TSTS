import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import logger from "./utils/logger.ts";
import resetPasswordRoutes from "./features/ResetPassword/routes/resetPassword.routes.ts";
import { appErrorHandler } from "./shared/middlewares/errorHandler.ts";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Morgan HTTP request logging, piped to Winston
app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => logger.http(message.trim()),
    },
  })
);

app.use("/api/auth", resetPasswordRoutes);

app.use(appErrorHandler);

// Global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    logger.error(err.stack || "Unknown error");
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
);

export default app;
