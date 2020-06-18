import { RequestHandler } from "express";

import userServices from "../../services/user";

const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers) throw new Error("Missing headers");
    if (!req.headers.authorization) throw new Error("Missing authorization");
    const token = req.headers.authorization.replace("Bearer ", "");

    const user = await userServices.checkToken(token);

    req.body = { ...req.body, user };

    next();
  } catch (error) {
    res.json({ authentication: "failed", error: error.message });
  }
};

export default isAuthenticated;
