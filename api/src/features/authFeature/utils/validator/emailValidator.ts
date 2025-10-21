import { User } from "../../../../database/model/userModel/user.js"

export const findUserByEmail = async (email: string, res: any) => {
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "Invalid email" });
    return null; // so caller knows there's no user
  }
  return user;
}; 
