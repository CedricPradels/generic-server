import { Router } from "express";

import userServices from "../../services/user";

const route = Router();

route.post("/register", async (req, res) => {
  if (!!!req.fields) throw new Error("Missing body");
  const email = String(req.fields.email);
  const password = String(req.fields.password);
  try {
    const newUser = await userServices.register({ email, password });

    res.json({ user: newUser });
  } catch (error) {
    res.json({ error: error.message });
  }
});

route.post("/login", async (req, res) => {
  if (!!!req.fields) throw new Error("Missing body");
  const email = String(req.fields.email);
  const password = String(req.fields.password);
  try {
    const user = await userServices.login({ email, password });

    res.json({ user: user, login: "success" });
  } catch (error) {
    res.json({ error: error.message, login: "failed" });
  }
});

route.post("/:recoveryKey/recovery", async (req, res) => {
  const { recoveryKey } = req.params;
  if (!!!req.fields) throw new Error("Missing body");
  const newPassword = String(req.fields.newPassword);

  try {
    await userServices.passwordRecovery.resetPassword(newPassword, recoveryKey);
    res.json({ recovery: "success" });
  } catch (error) {
    res.json({ recovery: "failed", error: error.message });
  }
});

route.post("/recovery", async (req, res) => {
  if (!!!req.fields) throw new Error("Missing body");
  const email = String(req.fields.email);

  try {
    await userServices.passwordRecovery.sendRecoveryLink(email);
    res.json({ emailSent: "success" });
  } catch (error) {
    res.json({ emailSent: "failed", error: error.message });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userServices.read(id);

    res.json({ user });
  } catch (error) {
    res.json({ error: error.message });
  }
});

route.get("/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userServices.delete(id);
    res.json({ deletion: "success", deletedUser });
  } catch (error) {
    res.json({ deletion: "failed", error: error.message });
  }
});

route.post("/:id/update", async (req, res) => {
  const { id } = req.params;
  if (!!!req.fields) throw new Error("Missing body");
  const email = req.fields.email ? String(req.fields.email) : undefined;
  const password = req.fields.password
    ? String(req.fields.password)
    : undefined;
  const update = { email, password };
  try {
    const updatedUser = await userServices.update(id, update);
    res.json({ update: "success", updatedUser });
  } catch (error) {
    res.json({ update: "failed", error: error.message });
  }
});
export default route;
