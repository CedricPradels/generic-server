import express from "express";

import formidableMiddleware from "express-formidable";

import api from "../api";

const expressLoader = (): express.Application => {
  const app = express();

  // FOR POST REQUESTS
  app.use(formidableMiddleware());

  // INJECT API
  app.use("/api", api);

  return app;
};

export default expressLoader;
