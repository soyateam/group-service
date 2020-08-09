import * as winston from 'winston';
import config from '../../config';
import { SeverityLevel } from './severityLevel';

export const logger = winston.createLogger({
  defaultMeta: { service: config.server.name },
  format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.json()),
});

if (process.env.NODE_ENV !== config.env.prod) {
  // Console handler
  logger.add(new winston.transports.Console());
} else {
  // File handler
  logger.configure({
    level: 'info',
    transports: [new winston.transports.File({ filename: './logs/hierarchy/service.log' })],
  });
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
export const log = (severity: SeverityLevel, name: string, description: string, correlationId?: string, user?: string, more?: object) => {
  logger.log({
    name,
    correlationId,
    user,
    level: severity,
    message: description,
    ...more,
  });
};
