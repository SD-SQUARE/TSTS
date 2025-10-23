import "dotenv/config";
import { Types } from "mongoose";
import { TicketBuilder } from "./TicketBuilder.ts";
import { Ticket } from "../../../features/Ticket/Models/Ticket.ts";

const pick = <T>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const rand = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a + 1)) + a;

function randomTitle() {
  const verbs = [
    "Fix",
    "Investigate",
    "Implement",
    "Refactor",
    "Verify",
    "Document",
  ];
  const areas = [
    "login",
    "payment flow",
    "API quota",
    "cache issue",
    "UI",
    "webhook",
  ];
  return `${pick(verbs)} ${pick(areas)}`;
}

function buildSyntheticUsers(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: new Types.ObjectId(),
    name: `user${i + 1}`,
  }));
}

export async function seedTickets(count = 50): Promise<number> {
  const exists = await Ticket.exists({});
  if (exists) {
    // collection already has data; skip seeding
    return 0;
  }
  const users = buildSyntheticUsers(20);
  const docs: any[] = [];

  for (let i = 0; i < count; i++) {
    const created = new Date();
    created.setDate(created.getDate() - rand(0, 30));
    const updated = new Date(created.getTime() + rand(0, 5) * 24 * 3600 * 1000);
    const user = pick(users);
    const t = new TicketBuilder()
      .setTitle(randomTitle())
      .setUser(user.id, user.name)
      .randomizeCore()
      .randomizeAssignments(users) // uses user1..user10
      .setCreatedAt(created)
      .setUpdatedAt(updated)
      .build();

    docs.push(t);
  }

  await Ticket.deleteMany({});
  const res = await Ticket.insertMany(docs);
  return res.length;
}
