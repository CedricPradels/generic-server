import express from "express";

import cors from "cors";

import api from "../api";

import swaggerUI from "swagger-ui-express";
import doc from "../../doc";

import { handleError } from "../api/Error";

const expressLoader = (): express.Application => {
  const app = express();

  // FOR POST REQUESTS
  app.use(cors());
  app.use(express.json());

  app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(doc));
  // INJECT API
  app.use("/api", api);

  app.use(handleError);

  return app;
};

export default expressLoader;
