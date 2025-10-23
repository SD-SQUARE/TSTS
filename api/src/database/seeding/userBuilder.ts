import { IUser } from "../../models/userModel/user.ts";

export class UserBuilder {
  private user: Partial<IUser> = {};

  setName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  setPassword(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }

  build(): Partial<IUser> {
    return { ...this.user };
  }
}
