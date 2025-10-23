import { Schema } from "mongoose";
import type { KeyValue } from "../Interfaces/IKeyValue.ts";

const KeyValueSchema = new Schema<KeyValue>(
  {
    key: { type: String, required: true, trim: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

export { KeyValueSchema };
