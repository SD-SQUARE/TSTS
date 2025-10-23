import { Schema } from "mongoose";
import { IAssignEntry } from "../Interfaces/IAssigneeEntry.ts";

const AssignEntrySchema = new Schema<IAssignEntry>(
  {
    id: { type: Schema.Types.ObjectId, /*ref: "User", */ required: true },
    name: { type: String, required: true, trim: true },
  },
  { _id: false }
);
export { AssignEntrySchema };
