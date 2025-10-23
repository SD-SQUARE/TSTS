export interface IUser {
  name: string;
  email: string;
  password: string;
}

type userSafeFields = Omit<IUser, "password">;

export { userSafeFields };