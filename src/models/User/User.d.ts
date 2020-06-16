import { Document } from "mongoose";

import { TEmail, TToken, TSalt, THash } from "../../types/User";

export interface IUser extends Document {
  email: TEmail;
  token: TToken;
  salt: TSalt;
  hash: THash;
}
