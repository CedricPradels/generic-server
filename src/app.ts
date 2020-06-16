import dotenv from "dotenv";
dotenv.config();

import express from "express";

const { PORT } = process.env;

const app = express();

app.all("*", (req, res) => {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server's started.");
});
