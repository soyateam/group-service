import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import * as errorhandlers from "./utils/erros/errorHandlers";
import config from "./config";
import addHeaders from "./utils/addHeaders";
import appRouter from "./router";
import { log } from "./utils/logger/logger";
import { SeverityLevel } from "./utils/logger/severityLevel";

export class Server {
  private static _instance: Server;
  public app: express.Application;

  private constructor() {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRouters();
    this.initializeErrorHandling();
  }

  public static bootstrap(): Server {
    if (!Server._instance) Server._instance = new Server();
    return Server._instance;
  }

  public listen() {
    this.app.listen(config.server.port, () => {
      log(
        SeverityLevel.INFO,
        `Server running in ${config.env.node} environment on port ${config.server.port}`,
        "connectedToServer"
      );
    });
  }

  private initializeMiddlewares() {
    this.app.use(addHeaders);
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(helmet());

    if (config.env.node === config.env.dev) {
      this.app.use(morgan("dev"));
    }
  }

  private initializeRouters() {
    this.app.use("/", appRouter);
  }

  private initializeErrorHandling() {
    this.app.use(errorhandlers.serverErrorHandler);
    this.app.use(errorhandlers.userErrorHandler);
    this.app.use(errorhandlers.unknownErrorHandler);
  }
}
