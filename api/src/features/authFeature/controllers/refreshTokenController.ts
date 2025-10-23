import {  Response } from "express";
import { generateToken } from "../../../utils/jwt.js";
import { Messages } from "../../../utils/enums/messageEnum.js";
import { Errors } from "../../../utils/enums/errorEnum.js";

export const refreshToken = (req: any, res: Response): void => {
  try {
    const user = req.user;

    if (!user || !user.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const newAccessToken = generateToken(user.id);

    res.status(200).json({
      code: Messages.Msg003,
      data: { token: newAccessToken },
    });
  } catch (err: any) {
    res.status(500).json({ code: Errors.Err012 });
  }
};
