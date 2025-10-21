import rateLimit, { MemoryStore } from "express-rate-limit";
import { Request, Response } from "express";

export const store = new MemoryStore(); // Export store for sharing!
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000;

export const loginRateLimiter = rateLimit({
  store,
  windowMs: WINDOW_MS,
  max: MAX_ATTEMPTS,
  standardHeaders: false,
  legacyHeaders: false,

  keyGenerator: (req: Request): string => req.body?.email || "unknown",

  handler: (req: Request, res: Response) => {
    const key = req.body?.email || "unknown";
    const storeAny = store as any;
    const used = storeAny.hits?.[key] ?? MAX_ATTEMPTS;
    const remaining = Math.max(0, MAX_ATTEMPTS - used);

    res.status(429).json({
      message: "Too many login attempts. Please try again after 5 minutes.",
      attemptsUsed: used,
      trails: remaining,
    });
  },
});
