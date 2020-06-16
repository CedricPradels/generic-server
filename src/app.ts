import dotenv from "dotenv";
dotenv.config();

import express from "express";

import mongoose from "mongoose";

import api from "./api";

const { PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/generic-server", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// FOR POST REQUESTS
app.use(express.urlencoded());
app.use(express.json());

// INJECT API
app.use("/api", api);

app.all("*", (req, res) => {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server's started.");
});
