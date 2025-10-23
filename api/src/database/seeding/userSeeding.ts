import { User } from "../../models/userModel/user.js";
import { UserBuilder } from "./userBuilder.ts";
import bcrypt from "bcrypt";

export const seedUsers = async (): Promise<void> => {
  try {
    const users = [];
    const existingEmails = new Set();

    // Check existing users to avoid duplicates
    const existingUsers = await User.find({}, { email: 1 });
    existingUsers.forEach((user) => existingEmails.add(user.email));

    for (let i = 1; i <= 15; i++) {
      const email = `user${i}@example.com`;

      // Skip if user already exists
      if (existingEmails.has(email)) {
        continue;
      }
      const hashedPassword = await bcrypt.hash("Pass@123", 10);
      const user = new UserBuilder()
        .setName(`User ${i}`)
        .setEmail(email)
        .setPassword(hashedPassword)
        .build();

      users.push(user);
    }

    if (users.length > 0) {
      await User.insertMany(users);
      console.log(
        ` ${users.length} users generated and saved to the database.`
      );
    } else {
      console.log("No new users to create, all users already exist.");
    }
  } catch (err) {
    console.error("Error generating users:", err);
    throw err;
  }
};
