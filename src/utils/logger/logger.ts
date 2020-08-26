import winston from 'winston';
import config from '../../config';
import { SeverityLevel } from './severityLevel';
import { MongoDB } from 'winston-mongodb';

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.metadata(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

if (config.env.node == config.env.prod) {
  let mongoLogger = new MongoDB({
    level: SeverityLevel.INFO,
    label: config.server.name,
    collection: `${config.server.name}-log`,
    db: config.db.logs.connectionStringLogs,
    expireAfterSeconds: config.db.logs.expiredInSec,
    tryReconnect: true,
  });

  logger.add(mongoLogger);
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
    name: description,
    correlationId,
    user: user,
    level: severity,
    message: name,
    ...more,
  });
};
