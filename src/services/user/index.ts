import UserModel from "../../models/User";
import { sendEmail } from "../../subscribers/mailgun";
import { ErrorHandler } from "../../api/Error";

import { generateAuthenticationData, testPassword } from "../authentication";

import { IUserRegister, IUserLogin, IUserUpdate } from "./user";
import { TPassword, TEmail, TRecoveryKey, TToken } from "../../types/User";

const userServices = {
  async register({ email, password }: IUserRegister) {
    checkEmail(email);
    checkPassword(password);

    const queryEmail = await UserModel.findOne({ email });
    if (queryFoundP(queryEmail))
      throw new ErrorHandler(400, "Email already exist");

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
      if (!!!queryUser) throw new ErrorHandler(400, "User not found");

      if (!testPassword(password, queryUser.hash, queryUser.salt))
        throw new ErrorHandler(400, "Wrong password.");
      const { email: userEmail, token, _id: id } = queryUser;

      return { userEmail, token, id };
    } catch (error) {
      throw error;
    }
  },

  passwordRecovery: {
    async resetPassword(newPassword: TPassword, recoveryKey: TRecoveryKey) {
      try {
        checkRecoveryKey(recoveryKey);
        const user = await UserModel.findOne({ recoveryKey });
        if (!!!user) throw new ErrorHandler(400, "User not found");
        checkPassword(newPassword);

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
        // const response = await sendEmail(
        //   email,
        //   "Password recovery",
        //   `<h1>${recoveryLink}</h1>`
        // );
        return recoveryLink;
      } catch (error) {
        throw error;
      }
    },
  },

  async read(id: string) {
    try {
      const user = await UserModel.findById(id);
      if (!!!user) throw new ErrorHandler(400, "User not found");
      const { email, token } = user;

      return { email, token };
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string) {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      if (!!!user) throw new ErrorHandler(400, "User not found");
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
      if (!!!user) throw new ErrorHandler(400, "User not found");

      if (!!email) {
        checkEmail(email);
        const queryEmail = await UserModel.findOne({ email });
        if (queryFoundP(queryEmail))
          throw new ErrorHandler(400, "Email already exist");
        user.email = email;
      }
      if (!!password) {
        checkPassword(password);
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

  async checkToken(token: TToken) {
    try {
      const user = await UserModel.findOne({ token });
      if (!user) throw new ErrorHandler(403, "Invalid token.");

      const { _id: id, email } = user;

      return { id, email };
    } catch (error) {
      throw error;
    }
  },
};

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

const checkPassword = (password: any) => {
  if (!stringP(password))
    throw new ErrorHandler(400, "Incorrect password data type");
  if (!passwordP(password))
    throw new ErrorHandler(400, "Incorrect password syntax");
};

const checkEmail = (email: any) => {
  if (!stringP(email)) throw new ErrorHandler(400, "Incorrect email data type");
  if (!emailP(email)) throw new ErrorHandler(400, "Incorrect email syntax");
};

const checkRecoveryKey = (recoveryKey: any) => {
  if (!stringP(recoveryKey))
    throw new ErrorHandler(400, "Wrong recoveryKey data type");
};

export default userServices;
