import { Router } from "express";
import {
  forgetPassword,
  resendOtp,
  verifiyOtp,
} from "../controllers/otp.controller.ts";
import { validateVerifiyOTP } from "../validators/verifiyOTP.ts";
import { validateResendOTP } from "../validators/resendOTP.ts";

export const otpRouter = Router();
otpRouter
  .post("/forget", forgetPassword)
  .post("/verifiyotp", validateVerifiyOTP, verifiyOtp);

otpRouter.put("/resendotp", validateResendOTP, resendOtp);
