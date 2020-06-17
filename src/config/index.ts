import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  MONGODB_URI,
  MAILGUN_PRIVATE_API_KEY,
  MAILGUN_DOMAIN,
} = process.env;

const config = {
  port: PORT,
  databaseUrl: MONGODB_URI,
  mailgun: {
    privateApiKey: MAILGUN_PRIVATE_API_KEY,
    domain: MAILGUN_DOMAIN,
  },
};

export default config;
