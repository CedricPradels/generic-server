import { Router } from "express";

import userServices from "../../services/user";

const route = Router();

route.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await userServices.register({ email, password });

    res.json({ user: newUser });
  } catch (error) {
    res.json({ error: error.message });
  }
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userServices.login({ email, password });
    console.log(user);

    res.json({ user: user });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default route;
