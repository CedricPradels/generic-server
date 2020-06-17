import UserModel from "../../models/User";
import User from "../../models/User";

import { generateAuthenticationData, testPassword } from "../authentication";

import { IUserRegister, IUserLogin } from "./user";
import { TPassword, TEmail } from "../../types/User";
import { query } from "express";

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
  async register({ email, password }: IUserRegister) {
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

      const { email: newUserEmail, _id: id, token } = newUser;
      return { email: newUserEmail, id, token };
    } catch (error) {
      throw error;
    }
  },
  async login({ email, password }: IUserLogin) {
    try {
      const queryUser = await UserModel.findOne({ email });
      if (!!!queryUser) throw new Error("User not found");

      if (!testPassword(password, queryUser.hash, queryUser.salt))
        throw new Error("Wrong password.");
      const { email: userEmail, token, _id: id } = queryUser;

      return { userEmail, token, id };
    } catch (error) {
      throw error;
    }
  },
  passwordRecovery() {},
};

export default userServices;
