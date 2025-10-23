import mongoose, { Schema, Types, Document, Model } from "mongoose";
import { ITicket } from "../Interfaces/ITicket.ts";
import { TicketStatus } from "../../../utils/Enums/Tickets/TicketStatus.ts";
import { TicketPriority } from "../../../utils/Enums/Tickets/TicketPriority.ts";
import { AssignEntrySchema } from "./AssignEntrySchema.ts";
import { UserEntrySchema } from "./UserEntrySchema.ts";
import { KeyValueSchema } from "./KeyValueSchema.ts";

const ticketSchema: Schema<ITicket> = new Schema<ITicket>(
  {
    title: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: Object.values(TicketStatus),
      default: TicketStatus.Pending,
      index: true,
    },
    priority: {
      type: String,
      enum: Object.values(TicketPriority),
      default: TicketPriority.NotImportantNotUrgent,
      index: true,
    },
    activeHours: { type: Number, min: 0 },
    assignee: { type: AssignEntrySchema },
    assigns: { type: [AssignEntrySchema], default: [] },
    user: { type: UserEntrySchema, required: true },
    isDeleted: { type: Boolean, default: false },
    tags: { type: [KeyValueSchema], default: [] },
  },
  {
    timestamps: {
      createdAt: "creationDate",
      updatedAt: "modificationDate",
    },
  }
);
export const Ticket = mongoose.model<ITicket>("Ticket", ticketSchema);
