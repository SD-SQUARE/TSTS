import { Request, Response } from "express";
import { generateToken ,generateRefreshToken} from "../../../utils/jwt.js";
import {  validationResult } from "express-validator";
import { findUserByEmail } from "../utils/validator/emailValidator.js";



export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    const user = await findUserByEmail(email, res);;
    if (!user) return;
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password" });
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
      message: "Login successful",
      data: { token },
    });
  } catch (err: any) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

