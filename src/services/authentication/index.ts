import UserModel from "../../models/User";
import randomstring from "randomstring";
import SHA256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

import { TPassword, THash, TToken, TSalt } from "../../types/User";
import { IAuthenticationData } from "./authentication";

const generateRandomStr = (length: number): string =>
  randomstring.generate(length);
const encryptStr = (str: string): string => SHA256(str).toString(Base64);

const generateSalt = (): TSalt => generateRandomStr(64);
const generateToken = (): TToken => generateRandomStr(64);
const generateHash = (password: TPassword, salt: TSalt): THash =>
  encryptStr(password + salt);

export const generateAuthenticationData = async (
  password: TPassword
): Promise<IAuthenticationData> => {
  let token;
  let queryToken;

  do {
    token = generateToken();
    queryToken = await UserModel.findOne({ token });
  } while (!!queryToken);

  const salt = generateSalt();
  const hash = generateHash(password, salt);
  return {
    token,
    salt,
    hash,
  };
};

export const testPassword = (
  testedPassword: TPassword,
  userHash: THash,
  userSalt: TSalt
) => {
  const testedHash = generateHash(testedPassword, userSalt);
  return testedHash === userHash;
};
