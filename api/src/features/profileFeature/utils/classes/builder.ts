
import { IUser, userSafeFields} from "../interfaces/IUser.js";

export class UserBuilder {
  private user: IUser;

  constructor(name: string, email: string, password: string) {
    this.user = { name, email, password };
  }

  setName(name: string): this {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  setPassword(password: string): this {
    this.user.password = password;
    return this;
  }

  build(): userSafeFields {
    const { password, ...safeUser } = this.user;
    return safeUser; 
  }
}