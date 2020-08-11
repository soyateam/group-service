import { SeverityLevel } from "./logger/severityLevel";
import { log } from "./logger/logger";
import config from "../config";
import * as mongoose from "mongoose";

// TODO: make a singleton connection to DB
export const connectToMongo = async () => {
  log(
    SeverityLevel.INFO,
    `[MongoDB] trying to mongo server:  ${config.db.connectionString}`,
    "connectToMongo"
  );
  try {
    await mongoose.connect(config.db.connectionString, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (err) {
    log(
      SeverityLevel.ERROR,
      `did not connect to ${config.db.connectionString}. error: ${err}`,
      "connectToMongo"
    );
    return;
  }

  log(
    SeverityLevel.INFO,
    `successfully connected: ${config.db.connectionString}`,
    "connectToMongo"
  );
};
