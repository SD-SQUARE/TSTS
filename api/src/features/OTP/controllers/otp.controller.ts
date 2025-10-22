import type { Request, Response } from "express";
import asyncWrapper from "../../../middlewares/asyncWrapper.ts";
import {
  forgetPasswordService,
  resendOTPService,
  verifyOtpService,
} from "../Services/otp.services.ts";
import { InfoMessages } from "../../../utils/Enums/infoEnums.ts";
import ApiResponse from "../../../utils/BaseApiResponse.ts";
import { handleValidation } from "../utils/handleValidation.ts";
import { Errors } from "../../../utils/Enums/errorENums.ts";

const forgetPassword = asyncWrapper((req, res) => {
  forgetPasswordService();
  res.status(200).json({ message: "Forget password initiated." });
});

const verifiyOtp = asyncWrapper(async (req: Request, res: Response) => {
  const { oid, otp } = req.body as { oid?: string; otp?: string };

  if (handleValidation(req, res)) return;

  const result = await verifyOtpService({ oid, otp });

  // Map service codes to HTTP responses
  switch (result.code) {
    case Errors.Err003: // OTP Expired
      return res
        .status(400)
        .json(new ApiResponse(result.code, { oid: oid ?? null }));

    case Errors.Err004: // OTP Invalid
      return res.status(400).json(new ApiResponse(result.code, {}));

    case Errors.Err012: // Failed Operation (no email / internal state)
      return res.status(500).json(new ApiResponse(result.code, null));

    case InfoMessages.Msg003: // Success
      return res
        .status(200)
        .json(
          new ApiResponse(InfoMessages.Msg003, { token: result.token ?? null })
        );

    default:
      return res.status(500).json(new ApiResponse(Errors.Err012, {}));
  }
});

const resendOtp = asyncWrapper(async (req: Request, res: Response) => {
  if (handleValidation(req, res)) return;
  const { oid } = req.query as { oid: string };

  const success = await resendOTPService(oid);
  if (!success) {
    return res.status(400).json(new ApiResponse(Errors.Err012, null));
  }

  // OTP Sent, it will expire in 2 min
  return res.status(200).json(new ApiResponse(InfoMessages.Msg005, null));
});

export { forgetPassword, verifiyOtp, resendOtp };
