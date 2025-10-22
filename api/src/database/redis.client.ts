import { createClient } from "redis";
import logger from "../utils/logger.ts";

const REDIS_URL = process.env.REDIS_URL ?? "redis://127.0.0.1:6379/0";

export const redis = createClient({
  url: REDIS_URL,
  socket: {
    reconnectStrategy: false,
  },
});

redis.on("connect", () => logger.info("[redis] connecting..."));
redis.on("ready", () => logger.info("[redis] ready"));
redis.on("error", (err) => logger.error("[redis] error:", err.message));
redis.on("end", () => logger.info("[redis] connection closed"));

// Try connecting but don't block the whole server
(async () => {
  try {
    await redis.connect();
    logger.info("[redis] connected successfully");
  } catch (err) {
    logger.error(
      "[redis] failed to connect, continuing without cache",
      (err as Error).message
    );

    try {
      await redis.quit();
    } catch {
      /* ignore */
    }
  }
})();

export async function closeRedis() {
  try {
    if (redis.isOpen) {
      await redis.quit();
      logger.info("[redis] connection closed gracefully");
    }
  } catch (err) {
    logger.error("[redis] failed to close:", (err as Error).message);
  }
}
