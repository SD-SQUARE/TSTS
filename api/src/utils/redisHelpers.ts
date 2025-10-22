import {
  TTL_EMAIL,
  TTL_OTP,
  TTL_RESET,
} from "../shared/consts/OTP_TTL_Consts.ts";
import { redis } from "../database/redis.client.ts";
import { Types } from "mongoose";

export const generateOid = (): string => {
  return new Types.ObjectId().toString();
};

const kEmail = (oid: string) => `${oid}:email`;
const kOtp = (oid: string) => `${oid}:otp`;
const kReset = (oid: string) => `${oid}:reset`;

// One-liner setters (NX prevents overwrite; drop it if you want upsert)
export const setEmail = (oid: string, email: string) =>
  redis.set(kEmail(oid), email, { EX: TTL_EMAIL });

export const setOtp = (oid: string, otp: string) =>
  redis.set(kOtp(oid), otp, { EX: TTL_OTP });

export const setReset = (oid: string, token: string) =>
  redis.set(kReset(oid), token, { EX: TTL_RESET });

// Gets
export const getEmail = (oid: string) => redis.get(kEmail(oid));
export const getOtp = (oid: string) => redis.get(kOtp(oid));
export const getReset = (oid: string) => redis.get(kReset(oid));

// Optional: TTL checks (seconds) & deletes
export const ttlEmail = (oid: string) => redis.ttl(kEmail(oid));
export const ttlOtp = (oid: string) => redis.ttl(kOtp(oid));
export const ttlReset = (oid: string) => redis.ttl(kReset(oid));

export const delOtp = (oid: string) => redis.del(kOtp(oid));
export const delReset = (oid: string) => redis.del(kReset(oid));
