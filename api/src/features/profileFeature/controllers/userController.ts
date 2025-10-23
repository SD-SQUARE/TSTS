import { Request, Response } from "express";
import { UserBuilder } from "../utils/classes/builder.js";
import { User } from "../../../database/model/userModel/user.js";
import {Errors} from "../../../utils/enums/errorEnum.js";
import { Messages } from "../../../utils/enums/messageEnum.js";

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id); 

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userBuilder = new UserBuilder(user.name, user.email, user.password);
    const safeUser = userBuilder.build(); 

    const response = {
      code: Messages.Msg003,
      data: safeUser,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ code: Errors.Err012 });
  }
};


export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name && !email) {
      res.status(400).json({ message: "Please provide name or email to update." });
      return;
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    const userBuilder = new UserBuilder(user.name, user.email, user.password);
    const safeUser = userBuilder.build();

    const response = {
      code: Messages.Msg004,
      data: safeUser,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ code: Errors.Err012 });
  }
};

