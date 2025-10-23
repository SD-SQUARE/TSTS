import { InfoMessages } from "../../../utils/Enums/infoEnums.ts";
import { VerifyOtpResult } from "../types/otpResult.ts";
import {
  delOtp,
  getEmail,
  getOtp,
  setEmail,
  setOtp,
  setReset,
} from "../utils/redisHelpers.ts";
import { createResetToken } from "./resetToken.services.ts";
import { generateOtp6NonZero } from "../../../utils/otp/OtpHelper.ts";
import { sendMail } from "../../Email/mailer.ts";
import { otpHtmlTemplate } from "../../Email/templates/otpTemplate.ts";
import { TTL_OTP } from "../consts/OTP_TTL_Consts.ts";
import dotenv from "dotenv";
import { Errors } from "../../../utils/Enums/errorENums.ts";
dotenv.config();

const verifyOtpService = async ({
  oid,
  otp,
}: {
  oid: string;
  otp: string;
}): Promise<VerifyOtpResult> => {
  const storedOtp = await getOtp(oid);

  // Expired or missing
  if (!storedOtp) {
    // Expired otp
    return { code: Errors.Err003, token: null };
  }
  // Mismatch
  if (storedOtp !== String(otp).trim()) {
    return { code: Errors.Err004, token: null };
  }

  // OTP is valid — consume it (one-time use)
  await delOtp(oid);

  const email = await getEmail(oid);
  if (!email) {
    return { code: Errors.Err012, token: null };
  }

  const resetToken = createResetToken(email.toString());
  await setReset(oid, resetToken);

  return { code: InfoMessages.Msg003, token: resetToken };
};

const resendOTPService = async (oid: string): Promise<boolean> => {
  const email = await getEmail(oid);
  if (!email) {
    return false;
  }

  const OTP = generateOtp6NonZero();
  await setOtp(oid, OTP);
  await setEmail(oid, email.toString());

  const minutes = Math.max(1, Math.ceil(TTL_OTP / 60));
  const subject = "Your verification code";
  const html = otpHtmlTemplate({ otp: OTP, minutes });
  const text = `Your verification code is ${OTP}. It expires in ${minutes} minutes.`;

  await sendMail({ to: String(email), subject, html, text });

  return true;
};

// for testing purposes
const forgetPasswordService = async () => {
  await setEmail("amir123", "amir.khaledmohamed2003@gmail.com");
  await setOtp("amir123", "654321");
};

export { verifyOtpService, forgetPasswordService, resendOTPService };
