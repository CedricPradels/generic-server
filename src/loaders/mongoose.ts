import mongoose from "mongoose";
import { Db } from "mongodb";
import config from "../config";

const connectDb = async (): Promise<Db | undefined> => {
  try {
    const connect = await mongoose.connect(
      config.databaseUrl || "mongodb://localhost:27017/generic-server",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Db connected");
    return connect.connection.db;
  } catch (error) {
    return error;
  }
};

export default connectDb;
