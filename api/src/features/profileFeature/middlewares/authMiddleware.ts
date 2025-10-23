import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../../utils/jwt.js";
import { Errors } from "../../../utils/enums/errorEnum.js";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        code: Errors.Err001,
      });
      return;
    }

    const decoded = verifyAccessToken(token);

    if (!decoded || !decoded.id) {
      res.status(401).json({
        code: Errors.Err011
      });
      return;
    }   

    next();
  } catch (error) {
    res.status(401).json({
      code: Errors.Err002,
    });
  }
};
