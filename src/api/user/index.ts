import { Router } from "express";

import userServices from "../../services/user";

import { ErrorHandler } from "../Error";

import isAuthenticated from "../middlewares/isAthenticated";

const route = Router();

route.post("/register", async (req, res, next) => {
  if (!!!req.body) throw new ErrorHandler(400, "Missing body");
  const { email, password } = req.body;

  try {
    const newUser = await userServices.register({ email, password });

    res.json({ user: newUser });
  } catch (error) {
    next(error);
  }
});

route.post("/login", async (req, res, next) => {
  if (!!!req.body) throw new ErrorHandler(400, "Missing body");
  const { email, password } = req.body;

  try {
    const user = await userServices.login({ email, password });

    res.json({ user: user, login: "success" });
  } catch (error) {
    next(error);
  }
});

route.patch("/:recoveryKey/recovery", async (req, res, next) => {
  const { recoveryKey } = req.params;
  if (!!!req.body) throw new ErrorHandler(400, "Missing body");
  const { newPassword } = req.body;

  try {
    await userServices.passwordRecovery.resetPassword(newPassword, recoveryKey);
    res.json({ recovery: "success" });
  } catch (error) {
    next(error);
  }
});

route.post("/recovery", async (req, res, next) => {
  if (!!!req.body) throw new ErrorHandler(400, "Missing body");
  const { email } = req.body;

  try {
    const recoveryLink = await userServices.passwordRecovery.sendRecoveryLink(
      email
    );
    res.json({ emailSent: "success" });
  } catch (error) {
    next(error);
  }
});

route.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userServices.read(id);

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

route.delete("/:id/delete", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await userServices.delete(id);
    res.json({ deletion: "success", deletedUser });
  } catch (error) {
    next(error);
  }
});

route.patch("/:id/update", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  if (!!!req.body) throw new ErrorHandler(400, "Missing body");
  const { email, password } = req.body;
  const update = { email, password };
  try {
    const updatedUser = await userServices.update(id, update);
    res.json({ update: "success", updatedUser });
  } catch (error) {
    next(error);
  }
});
export default route;
