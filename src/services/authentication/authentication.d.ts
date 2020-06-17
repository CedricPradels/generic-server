import { THash, TToken, TSalt } from "../../types/User";

export interface IAuthenticationData {
  token: TToken;
  hash: THash;
  salt: TSalt;
}
