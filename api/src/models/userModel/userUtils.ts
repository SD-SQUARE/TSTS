import bcrypt from "bcrypt";
import { IUser } from "./user.ts";

export async function hashPassword(this: IUser, next: Function) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
}

export async function comparePassword(
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
}
