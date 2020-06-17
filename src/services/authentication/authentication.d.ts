import { THash, TToken, TSalt, TRecoveryKey } from "../../types/User";

export interface IAuthenticationData {
  token: TToken;
  hash: THash;
  salt: TSalt;
  recoveryKey: TRecoveryKey;
}
