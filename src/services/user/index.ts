import UserModel from "../../models/User";
import { sendEmail } from "../../subscribers/mailgun";

import { generateAuthenticationData, testPassword } from "../authentication";

import { IUserRegister, IUserLogin, IUserUpdate } from "./user";
import { TPassword, TEmail, TRecoveryKey } from "../../types/User";

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
  passwordRecovery: {
    async resetPassword(newPassword: TPassword, recoveryKey: TRecoveryKey) {
      try {
        if (!stringP(recoveryKey))
          throw new Error("Wrong recoveryKey data type");
        const user = await UserModel.findOne({ recoveryKey });
        if (!!!user) throw new Error("User not found");
        if (!stringP(newPassword)) throw new Error("Wrong password data type");
        if (!passwordP(newPassword))
          throw new Error("Incorrect password syntax");

        const authenticationData = await generateAuthenticationData(
          newPassword
        );
        user.update(authenticationData);
        await user.save();
      } catch (error) {
        throw error;
      }
    },
    async sendRecoveryLink(email: TEmail) {
      try {
        const user = await UserModel.findOne({ email });
        if (!!!user) throw "User does not exist";

        const recoveryLink = `http://localhost/user/${user.recoveryKey}/recovery`;
        const response = await sendEmail(
          email,
          "Password recovery",
          `<h1>${recoveryLink}</h1>`
        );
      } catch (error) {
        throw error;
      }
    },
  },
  async read(id: string) {
    try {
      const user = await UserModel.findById(id);
      if (!!!user) throw new Error("User not found");
      const { email, token } = user;

      return { email, token };
    } catch (error) {
      throw error;
    }
  },
  async delete(id: string) {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      if (!!!user) throw new Error("User not found");
      const { email, token } = user;

      return { email, token };
    } catch (error) {
      throw error;
    }
  },
  async update(id: string, update: IUserUpdate) {
    const { email, password } = update;
    try {
      const user = await UserModel.findById(id);
      if (!!!user) throw new Error("User not found");

      if (!!email) {
        if (!stringP(email)) throw new Error("Incorrect email data type");
        if (!emailP(email)) throw new Error("Incorrect email syntax");
        const queryEmail = await UserModel.findOne({ email });
        if (queryFoundP(queryEmail)) throw new Error("Email already exist");
        user.email = email;
      }
      if (!!password) {
        if (!stringP(password)) throw new Error("Incorrect password data type");
        if (!passwordP(password)) throw new Error("Incorrect password syntax");
        const { salt, hash } = await generateAuthenticationData(password);
        user.hash = hash;
        user.salt = salt;
      }

      const updatedUser = await user.save();

      return { email: updatedUser.email, id };
    } catch (error) {
      throw error;
    }
  },
};

export default userServices;
