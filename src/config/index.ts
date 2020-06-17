import dotenv from "dotenv";
dotenv.config();

const { PORT, MONGODB_URI } = process.env;

const config = {
  port: PORT,
  databaseUrl: MONGODB_URI,
};

export default config;
