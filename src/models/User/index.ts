import mongoose from "mongoose";
import { IUser } from "./User";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, index: true },
  token: { type: String, unique: true, required: true, index: true },
  salt: { type: String, unique: true, required: true, index: true },
  hash: { type: String, unique: true, required: true, index: true },
  recoveryKey: { type: String, unique: true, required: true, index: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
