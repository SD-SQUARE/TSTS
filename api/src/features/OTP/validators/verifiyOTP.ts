import { body } from "express-validator";
import { Errors } from "../../../utils/Enums/errorENums.ts";

const validateVerifiyOTP = [
  body("oid")
    .isString()
    .withMessage(Errors.Err015) // missing/invalid oid
    .trim()
    .notEmpty()
    .withMessage(Errors.Err015),

  body("otp")
    .trim()
    .notEmpty()
    .matches(/^\d{6}$/)
    .withMessage(`${Errors.Err004}`),
];

export { validateVerifiyOTP };
