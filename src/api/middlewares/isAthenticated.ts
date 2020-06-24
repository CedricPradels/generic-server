import { RequestHandler } from "express";

import { ErrorHandler } from "../Error";

import userServices from "../../services/user";

const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers) throw new ErrorHandler(400, "Missing headers");
    if (!req.headers.authorization)
      throw new ErrorHandler(400, "Missing authorization");
    const token = req.headers.authorization.replace("Bearer ", "");

    const user = await userServices.checkToken(token);
    if (!!!user) throw new ErrorHandler(400, "Wrong token");

    req.body = { ...req.body, user };

    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;
