import { body } from "express-validator";
import { Errors } from "../../../../utils/enums/errorEnum.js";
export const loginValidation = [
  body("email").isEmail().withMessage(Errors.Err008),
 body("password")
    .notEmpty()
    .withMessage("Password is required")

    .isLength({ min: 6 })
    .withMessage(Errors.Err005)

    .matches(/^(?=.*[a-z])(?=.*[A-Z]).+$/)
    .withMessage(Errors.Err006)

    .matches(/^(?=.*[!@#$%^&*(),.?\":{}|<>]).+$/)
    .withMessage(Errors.Err007),];