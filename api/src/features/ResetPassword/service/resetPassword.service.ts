import { generateOtp6NonZero } from "../../../utils/otpHelper.ts";
import { User } from "../../../models/userModel/user.ts";
import { sendMail } from "../../../features/Email/mailer.ts";
import { otpHtmlTemplate } from "../../../features/Email/templates/otpTemplate.ts";
import { SystemError } from "../../../utils/customErrors.ts";
import { ERRORS } from "../../../shared/enums/systemEnums.ts";
import logger from "../../../utils/logger.ts";
import { generateOid, setEmail, setOtp } from "../../../utils/redisHelpers.ts";
import {
  createResetToken,
  verifyResetToken,
} from "../../../shared/services/auth/resetToken.services.ts";
import bcrypt from "bcrypt";

export const sendOtpToEmail = async (email: string) => {
  try {
    logger.info(`[sendOtpToEmail] Starting OTP send process for: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`[sendOtpToEmail] No user found for email: ${email}`);
      throw new SystemError(ERRORS.INVALID_EMAIL);
    }

    // Generate unique oid for Redis keys
    const oid = generateOid();
    logger.info(`[sendOtpToEmail] Generated OID ${oid} for user ${user._id}`);

    // Generate 6-digit non-zero OTP
    const otp = generateOtp6NonZero();
    logger.info(`[sendOtpToEmail] Generated OTP ${otp} for user ${user._id}`);

    // Store OTP and email in Redis with TTL
    await setEmail(oid, user.email);
    logger.info(
      `[sendOtpToEmail] Stored email ${user.email} in Redis with OID ${oid}`
    );

    await setOtp(oid, otp);
    logger.info(`[sendOtpToEmail] Stored OTP in Redis with OID ${oid}`);

    // Send email
    logger.info(`[sendOtpToEmail] Sending OTP email to ${email}...`);
    await sendMail({
      to: email,
      subject: "Password Reset OTP",
      html: otpHtmlTemplate({ otp, minutes: 5 }),
    });
    logger.info(`[sendOtpToEmail] OTP email successfully sent to ${email}`);

    // Return the OID for verification step
    logger.info(
      `[sendOtpToEmail] Returning OID ${oid} for subsequent verification`
    );
    return { oid };
  } catch (err) {
    logger.error(
      `[sendOtpToEmail] Failed to send OTP to ${email} — ${err instanceof Error ? err.message : err}`
    );
    throw err;
  }
};

export const verifyTokenAndChangePassword = async (
  token: string,
  password: string
): Promise<void> => {
  logger.info(`[verifyTokenAndChangePassword] Starting password change flow`);

  if (!token || typeof token !== "string") {
    logger.warn(`[verifyTokenAndChangePassword] Missing or invalid token`);
    throw new SystemError(ERRORS.USER_NOT_AUTHENTICATED);
  }

  // Verify reset token
  logger.info(`[verifyTokenAndChangePassword] Verifying reset token`);
  const verification = verifyResetToken(token);

  if (!verification.ok || !verification.email) {
    logger.warn(
      `[verifyTokenAndChangePassword] Token verification failed for token: ${token}`
    );
    throw new SystemError(ERRORS.USER_NOT_AUTHENTICATED);
  }

  const email = verification.email;
  logger.info(
    `[verifyTokenAndChangePassword] Token verified successfully for ${email}`
  );

  const hashedPassword = await bcrypt.hash(password, 12);
  logger.debug(`[verifyTokenAndChangePassword] Password hashed for ${email}`);

  // Update user password
  const user = await User.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true }
  );

  if (!user) {
    logger.warn(
      `[verifyTokenAndChangePassword] No user found for email: ${email}`
    );
    throw new SystemError(ERRORS.INVALID_EMAIL);
  }

  logger.info(
    `[verifyTokenAndChangePassword] Password successfully changed for ${user.email}`
  );
};
