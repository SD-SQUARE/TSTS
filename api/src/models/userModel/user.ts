import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongoose";
import { hashPassword, comparePassword } from "./userUtils.ts";

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", hashPassword);
userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<IUser>("User", userSchema);
