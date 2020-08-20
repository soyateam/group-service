import * as express from "express";
import { ServerError, UserError } from "./errorTypes";
import { log } from "../logger/logger";
import { SeverityLevel } from "../logger/severityLevel";

export const userErrorHandler = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (error instanceof UserError) {
    log(
      SeverityLevel.INFO,
      "User Error",
      `${error.name} was thrown with status ${error.status} and message ${error.message}`,
      ""
    );
    return res.status(error.status).send({
      type: error.name,
      message: error.message,
    });
  } else {
    next(error);
  }
};

export const serverErrorHandler = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (error instanceof ServerError) {
    log(
      SeverityLevel.WARN,
      "Server Error",
      `${error.name} was thrown with status ${error.status} and message ${error.message}`,
      ""
    );
    return res.status(error.status).send({
      type: error.name,
      message: error.message,
    });
  } else {
    next(error);
  }
};

export function unknownErrorHandler(
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  log(
    SeverityLevel.ERROR,
    "Unknown Error",
    `${error.name} was thrown with status 500 and message ${error.message}`,
    ""
  );

  return res.status(500).send({
    type: error.name,
    message: error.message,
  });
}
