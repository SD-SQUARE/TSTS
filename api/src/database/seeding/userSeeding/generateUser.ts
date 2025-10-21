import bcrypt from "bcrypt";
import { User } from "../../model/userModel/user.js";
import { SeedUser } from "./seedingInterface.js";



export const generateUsers = async (): Promise<void> => {
  try {
    const count = await User.countDocuments();
    if (count > 0) {
      console.log("Users already exist — skipping generation.");
      return;
    }

    const users: SeedUser[] = [];

    for (let i = 1; i <= 15; i++) {
      const hashedPassword = await bcrypt.hash("password", 10);
      users.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword,
      });
    }
    // Add an admin user
    const adminHashedPassword = await bcrypt.hash("password", 10);
    users.push({
      name: "Admin User",
      email: "admin@example.com" ,
      password: adminHashedPassword,
    });

    await User.insertMany(users);
    console.log("Users generated and saved to the database.");
  } catch (err) {
    console.error("Error generating users:", err);
  }
};
