import { NextFunction, Request, Response } from "express";
import {
  sendOtpToEmail,
  verifyTokenAndChangePassword,
} from "../service/resetPassword.service.ts";
import { INFO_MESSAGES } from "../../../shared/enums/systemEnums.ts";
import ApiResponse from "../../../utils/baseApiResponse.ts";
import asyncWrapper from "../../../shared/middlewares/asyncWrapper.ts";
import { token } from "morgan";

export const forgetPasswordController = asyncWrapper(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const result = await sendOtpToEmail(email);

    const response = new ApiResponse(INFO_MESSAGES.OTP_SENT, {
      oid: result.oid,
    });

    return res.status(200).json(response);
  }
);

export const changePasswordController = asyncWrapper(
  async (req: Request, res: Response) => {
    const { password } = req.body;
    const { token } = req.query;

    await verifyTokenAndChangePassword(token.toString(), password);

    return res
      .status(200)
      .json(new ApiResponse(INFO_MESSAGES.UPDATED_SUCCESSFULLY));
  }
);
