import { Request, Response, NextFunction } from "express";
import { store } from "./loginRateLimiter.js"; 

const MAX_ATTEMPTS = 5;

function incrementHits(email: string) {
  const storeAny = store as any;
  if (!storeAny.hits) storeAny.hits = {};
  storeAny.hits[email] = (storeAny.hits[email] || 0) + 1;
  return storeAny.hits[email];
}

export const attachTrails = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const key = req.body?.email || "unknown";
  const used = incrementHits(key);
  const trails = Math.max(0, MAX_ATTEMPTS - used);

  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    if (typeof body === "object" && body !== null) {
      const data =
        typeof body.data === "object" && body.data !== null
          ? { ...body.data, trails }
          : { trails };
      const finalBody = { ...body, data };
      return originalJson(finalBody);
    }
    return originalJson(body);
  };
  next();
};
