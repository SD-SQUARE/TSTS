import { getUserById,updateUser } from "../controllers/userController.js";
import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
export const userRouter = Router();

userRouter.get("/user/:id", protect, getUserById);

userRouter.put("/user/:id", protect,updateUser);


