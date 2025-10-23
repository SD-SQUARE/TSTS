import { TicketPriority } from "utils/Enums/Tickets/TicketPriority.ts";
import { TicketStatus } from "utils/Enums/Tickets/TicketStatus.ts";
import { IAssignEntry } from "./IAssigneeEntry.ts";
import { IKeyValue } from "./IKeyValue.ts";
import { IUserEntry } from "./IUserEntry.ts";

export interface ITicket {
  isDeleted: boolean;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  activeHours?: number;
  assignee?: IAssignEntry;
  assigns: IAssignEntry[];
  user: IUserEntry;
  domain?: string;
  tags?: IKeyValue[];
  modificationDate?: Date;
  creationDate?: Date;
}
