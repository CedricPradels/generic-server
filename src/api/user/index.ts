import { Router } from "express";

import userServices from "../../services/user";

const route = Router();

route.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await userServices.register({ email, password });

    res.json(newUser);
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default route;
