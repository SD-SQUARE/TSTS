import { createHmac, timingSafeEqual } from "crypto";
import { ResetPayload } from "../types/ResetPayload.ts";
import dotenv from "dotenv";
dotenv.config();
const RESET_SECRET = process.env.RESET_SECRET;

const b64url = (buf: Buffer | string) =>
  Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const fromB64url = (str: string) =>
  Buffer.from(
    str.replace(/-/g, "+").replace(/_/g, "/") +
      "==".slice((2 - ((str.length * 3) % 4)) % 4),
    "base64"
  );

const sign = (input: string, secret: string) =>
  createHmac("sha256", secret).update(input).digest();

const createResetToken = (email: string, ttlSeconds = 15 * 60): string => {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload: ResetPayload = { email, exp };

  const hB64 = b64url(JSON.stringify(header));
  const pB64 = b64url(JSON.stringify(payload));
  const toSign = `${hB64}.${pB64}`;

  const sig = sign(toSign, RESET_SECRET);
  const sB64 = b64url(sig);

  return `${toSign}.${sB64}`;
};

const verifyResetToken = (
  token: string
):
  | { ok: true; email: string }
  | { ok: false; reason: "invalid" | "expired" } => {
  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, reason: "invalid" };

  const [hB64, pB64, sB64] = parts;
  const toSign = `${hB64}.${pB64}`;

  // check signature
  const expected = sign(toSign, RESET_SECRET);
  const provided = fromB64url(sB64);
  if (
    expected.length !== provided.length ||
    !timingSafeEqual(expected, provided)
  ) {
    return { ok: false, reason: "invalid" };
  }

  // check exp
  const payload = JSON.parse(fromB64url(pB64).toString("utf8")) as ResetPayload;
  const now = Math.floor(Date.now() / 1000);
  if (!payload?.email || typeof payload.exp !== "number")
    return { ok: false, reason: "invalid" };
  if (payload.exp < now) return { ok: false, reason: "expired" };

  return { ok: true, email: payload.email };
};

export { createResetToken, verifyResetToken };
