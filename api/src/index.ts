import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.ts";
import logger from "./utils/logger.ts";
import app from "./app.ts";

dotenv.config();

// Connect to the database
dbConnection();

// Start the server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
