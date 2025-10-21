import { User } from "../../../../database/model/userModel/user.js"
import {Errors} from "../../../../utils/enums/errorEnum.js";

export const findUserByEmail = async (email: string, res: any) => {
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ code: Errors.Err008 });
    return null; 
  }
  return user;
}; 
