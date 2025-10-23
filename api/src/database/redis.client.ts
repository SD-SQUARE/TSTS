import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL ?? "redis://127.0.0.1:6379/0";

export const redis = createClient({ url: REDIS_URL });

redis.on("connect", () => console.log("[redis] connecting..."));
redis.on("ready", () => console.log("[redis] ready"));
redis.on("error", (err) => console.error("[redis] error:", err));
redis.on("end", () => console.log("[redis] connection closed"));

await redis.connect();

export async function closeRedis() {
  try {
    await redis.quit();
  } catch {
    /* ignore */
  }
}
