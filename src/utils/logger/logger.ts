import winston from "winston";
import winstonDailyRotateFile from "winston-daily-rotate-file";
import config from "../../config";
import { SeverityLevel } from "./severityLevel";

export const logger = winston.createLogger({
  defaultMeta: { service: config.server.name },
  format: winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston.format.json()),
  transports: [new winston.transports.Console()],
});

if (config.env.node == config.env.prod) {
  logger.add(
    new winstonDailyRotateFile({
      level: SeverityLevel.INFO,
      datePattern: "YYYY-MM-DD",
      filename: process.env.LOG_FILE_NAME || `${config.server.name}-%DATE%.log`,
      dirname: process.env.LOG_FILE_DIR || ".",
    })
  );
}

/**
 * logs the data with its given parameters.
 * @param severity - the kind of log created.
 * @param name - name of the log. in our case, the function called.
 * @param description - description in text.
 * @param traceID - id to correlate to if there are several logs with some connection.
 * @param user - the user requesting for the service.
 * @param meta - additional optional information.
 */
export const log = (
  severity: SeverityLevel,
  name: string,
  description: string,
  correlationId?: string,
  user?: string,
  more?: object
) => {
  logger.log({
    name,
    correlationId,
    user,
    level: severity,
    message: description,
    ...more,
  });
};
