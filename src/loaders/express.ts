import express from "express";

import api from "../api";

const expressLoader = (): express.Application => {
  const app = express();

  // FOR POST REQUESTS
  app.use(express.urlencoded());
  app.use(express.json());

  // INJECT API
  app.use("/api", api);

  return app;
};

export default expressLoader;
