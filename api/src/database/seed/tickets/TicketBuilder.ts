import { ITicket } from "features/Ticket/Interfaces/ITicket.ts";
import { Types } from "mongoose";
import { TicketPriority } from "../../../utils/Enums/Tickets/TicketPriority.ts";
import { TicketStatus } from "../../../utils/Enums/Tickets/TicketStatus.ts";

type NamedUser = { id: Types.ObjectId; name: string };

const pick = <T>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const chance = (p: number) => Math.random() < p; // p in [0,1]
const randInt = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a + 1)) + a;

export class TicketBuilder {
  private ticket: Partial<ITicket> = {
    assigns: [],
    tags: [],
  };

  setTitle(title: string): TicketBuilder {
    this.ticket.title = title;
    return this;
  }
  setStatus(status: TicketStatus): TicketBuilder {
    this.ticket.status = status;
    return this;
  }
  setPriority(priority: TicketPriority): TicketBuilder {
    this.ticket.priority = priority;
    return this;
  }
  setActiveHours(hours?: number): TicketBuilder {
    this.ticket.activeHours = hours;
    return this;
  }
  setUser(id: Types.ObjectId, name: string): TicketBuilder {
    this.ticket.user = { id, name };
    return this;
  }
  setAssignee(id: Types.ObjectId, name: string): TicketBuilder {
    this.ticket.assignee = { id, name };
    return this;
  }
  addAssign(id: Types.ObjectId, name: string): TicketBuilder {
    (this.ticket.assigns ||= []).push({ id, name });
    return this;
  }
  addTag(key: string, value: string): TicketBuilder {
    (this.ticket.tags ||= []).push({ key, value });
    return this;
  }
  setCreatedAt(dt: Date): TicketBuilder {
    this.ticket.creationDate = dt;
    return this;
  }
  setUpdatedAt(dt: Date): TicketBuilder {
    this.ticket.modificationDate = dt;
    return this;
  }
  setDeleted(v = true): TicketBuilder {
    this.ticket.isDeleted = v;
    return this;
  }

  /** Randomize isDeleted, status, priority, tags, and activeHours */
  randomizeCore(): TicketBuilder {
    this.ticket.isDeleted = chance(0.05);

    const weightedPriority: TicketPriority[] = [
      TicketPriority.Important,
      TicketPriority.ImportantAndUrgent,
      TicketPriority.NotImportantNotUrgent,
      TicketPriority.Urgent,
    ];

    this.ticket.priority = pick(weightedPriority);

    // Random status
    this.ticket.status = pick(Object.values(TicketStatus));

    // Active hours 0–40
    this.ticket.activeHours = randInt(0, 40);

    // Random tags (0–3) from pools
    const tagKeys = ["env", "module", "browser", "platform"];
    const tagVals: Record<string, string[]> = {
      env: ["prod", "staging", "dev"],
      module: ["auth", "billing", "ui", "ops", "quota"],
      browser: ["chrome", "edge", "firefox"],
      platform: ["web", "mobile", "backend"],
    };
    const howMany = randInt(0, 3);
    const chosenKeys = [...tagKeys]
      .sort(() => 0.5 - Math.random())
      .slice(0, howMany);
    this.ticket.tags = chosenKeys.map((k) => ({
      key: k,
      value: pick(tagVals[k]),
    }));

    return this;
  }

  /**
   * Randomize assignment history and current assignee.
   * Assumes setUser(reporter) was called first.
   */
  randomizeAssignments(users: NamedUser[]): TicketBuilder {
    if (!this.ticket.user)
      throw new Error(
        "Call setUser(reporterId) before randomizeAssignments()."
      );

    const reporter = users.find(
      (u) => String(u.id) === String(this.ticket.user.id)
    )!;
    // length 1–3 assignment hops
    const hops = randInt(1, 3);

    const chain: NamedUser[] = [];
    // often start with reporter as first assignee
    if (chance(0.7)) chain.push(reporter);

    while (chain.length < hops) {
      const u = pick(users);
      if (
        !chain.length ||
        String(chain[chain.length - 1].id) !== String(u.id)
      ) {
        chain.push(u);
      }
    }

    // write assigns (append-only) and set current assignee to last
    this.ticket.assigns = chain.map(({ id, name }) => ({ id, name }));
    const last = chain[chain.length - 1];
    this.ticket.assignee = { id: last.id, name: last.name };

    return this;
  }

  build(): Partial<ITicket> {
    return { ...this.ticket };
  }
}
