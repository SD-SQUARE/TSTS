import { Types } from "mongoose";

export interface IUserEntry {
  id: Types.ObjectId; //! to be done => ref the user
  name: string;
}
