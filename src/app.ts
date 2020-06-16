import dotenv from "dotenv";
dotenv.config();

import express from "express";

import mongoose from "mongoose";

const { PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/generic-server", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.all("*", (req, res) => {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server's started.");
});
