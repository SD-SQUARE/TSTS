import { Router } from "express";
import {
  changePasswordController,
  forgetPasswordController,
} from "../controllers/resetPassword.controller.ts";
import {
  changePasswordValidator,
  forgetPasswordValidator,
} from "../validators/resetPassword.validator.ts";

const router = Router();

router
  .post("/forgetpassword", forgetPasswordValidator, forgetPasswordController)
  .post("/changepassword", changePasswordValidator, changePasswordController);

export default router;
