import { Schema } from "mongoose";
import { IUserEntry } from "../Interfaces/IUserEntry.ts";

//  same like AssignEntrySchema to be able to add othe keys in it
const UserEntrySchema = new Schema<IUserEntry>(
  {
    id: { type: Schema.Types.ObjectId, /*ref: "User", */ required: true },
    name: { type: String, required: true, trim: true },
  },
  { _id: false }
);
export { UserEntrySchema };
