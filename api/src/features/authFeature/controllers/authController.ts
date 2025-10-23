import { Request, Response } from "express";
import { generateToken, generateRefreshToken } from "../../../utils/jwt.js";
import { validationResult } from "express-validator";
import { findUserByEmail } from "../utils/validator/emailValidator.js";
import { attachTrails } from "../middlewares/attachRemainingAttempts.js";
import { loginRateLimiter } from "../middlewares/loginRateLimiter.js";
import { Errors} from "../../../utils/enums/errorEnum.js";
import { Messages } from "../../../utils/enums/messageEnum.js";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
          res.status(400).json({
            code: errors.array()[0].msg
      });
      return;
    }

    const { email, password } = req.body;

    const user = await findUserByEmail(email, res);

    if (!user) {
          res.status(400).json({
            code:Errors.Err008,
          });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      loginRateLimiter(req, res, () => {
        attachTrails(req, res, () => {
          res.status(400).json({
            code:Errors.Err010,
          });
        });
      });
      return;
    }

    const token = generateToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 8 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      code:Messages.Msg003, 
      data: { token },
    });

  } catch (err: any) {
    res.status(500).json({ code: Errors.Err012 });
  }
};
