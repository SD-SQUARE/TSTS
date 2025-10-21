import express from "express";
import { login } from "../controllers/authController.js";
import { refreshToken } from "../controllers/refreshTokenController.js";
import { loginValidation } from "../utils/validator/loginValidator.js";
import { verifyRefreshToken } from "../middlewares/verifyRefreshToken .js";

const router = express.Router();

router.post("/login", loginValidation,login);
router.post("/refresh-token", verifyRefreshToken,refreshToken);

export default router;
