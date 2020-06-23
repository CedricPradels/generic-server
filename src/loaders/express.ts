import express from "express";

import cors from "cors";

import api from "../api";

const expressLoader = (): express.Application => {
  const app = express();

  // FOR POST REQUESTS
  app.use(cors());
  app.use(express.json());

  // INJECT API
  app.use("/api", api);

  return app;
};

export default expressLoader;
