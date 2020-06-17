import UserModel from "../../models/User";
import User from "../../models/User";

import { generateAuthenticationData } from "../authentication";

import { IUserRegister } from "./user";

const userServices = () => ({
  async register(userRegister: IUserRegister) {
    const { password, email } = userRegister;
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
});

export default userServices;
