import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../../utils/jwt.js"; 

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = verifyToken(token); 
    if (!decoded) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};
