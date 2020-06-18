import { TEmail, TPassword } from "../../types/User";

export interface IUserRegister {
  email: TEmail;
  password: TPassword;
}

export interface IUserLogin {
  email: TEmail;
  password: TPassword;
}

export interface IUserUpdate {
  email?: TEmail;
  password?: TPassword;
}
