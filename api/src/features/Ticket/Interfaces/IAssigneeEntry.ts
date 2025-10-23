import { Types } from "mongoose";

export interface IAssignEntry {
  id: Types.ObjectId; //! to be done => ref the user
  name: string;
}

