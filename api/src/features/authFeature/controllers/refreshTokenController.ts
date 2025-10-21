import {  Response } from "express";
import { generateToken } from "../../../utils/jwt.js";

export const refreshToken = (req: any, res: Response): void => {
  try {
    const user = req.user;

    if (!user || !user.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const newAccessToken = generateToken(user.id);

    res.status(200).json({
      message: "Token refreshed successfully",
      data: { token: newAccessToken },
    });
  } catch (err: any) {
    console.error("Refresh Token Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
