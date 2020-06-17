import UserModel from "../../models/User";
import User from "../../models/User";

import { generateAuthenticationData } from "../authentication";

import { IUserRegister } from "./user";
import { TPassword, TEmail } from "../../types/User";

// PREDICATES
const queryFoundP = (query: any): boolean => query !== null;
const passwordP = (password: TPassword): boolean => {
  const passwordExp = /^[a-zA-Z0-9]{6,50}/;
  return passwordExp.test(password);
};
const emailP = (email: TEmail): boolean => {
  const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailExp.test(email);
};
const stringP = (str: string): boolean => typeof str === "string";

const userServices = {
  async register(userRegister: IUserRegister) {
    const { password, email } = userRegister;

    // ERRORS
    if (!stringP(email)) throw new Error("Incorrect email data type");
    if (!stringP(password)) throw new Error("Incorrect password data type");
    if (!emailP(email)) throw new Error("Incorrect email syntax");
    if (!passwordP(password)) throw new Error("Incorrect password syntax");
    const queryEmail = await UserModel.findOne({ email });
    if (queryFoundP(queryEmail)) throw new Error("Email already exist");

    const authenticationData = await generateAuthenticationData(password);
    try {
      const newUser = await UserModel.create({ ...authenticationData, email });

      const { email: newUserEmail, _id: id } = newUser;
      return { email: newUserEmail, id };
    } catch (error) {
      return error;
    }
  },
  login() {},
  passwordRecovery() {},
};

export default userServices;
