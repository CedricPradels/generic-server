import express from "express";

import cors from "cors";

import api from "../api";
import { handleError } from "../api/Error";

const expressLoader = (): express.Application => {
  const app = express();

  // FOR POST REQUESTS
  app.use(cors());
  app.use(express.json());

  // INJECT API
  app.use("/api", api);

  app.use(handleError);

  return app;
};

export default expressLoader;
