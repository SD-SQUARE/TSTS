import jwt from "jsonwebtoken";
import { ENV } from "../database/config/env.js";


export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, ENV.JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId },ENV.JWT_SECRET_REFRESH, { expiresIn: "8d" });
};


export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET_REFRESH);
  } catch (error) {
    return null;
  }};
export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch (error) {
    return null;
  }

};


