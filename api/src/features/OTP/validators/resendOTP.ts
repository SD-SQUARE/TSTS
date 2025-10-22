import { query } from "express-validator";
import { Errors } from "../../../utils/Enums/errorENums.ts";

export const validateResendOTP = [
  query("oid")
    .isString()
    .withMessage(Errors.Err012) // missing/invalid oid
    .trim()
    .notEmpty()
    .withMessage(Errors.Err012),
];

export const OtpValidators = { validateResendOTP };
